'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 640, y: 360 });
  const rafRef = useRef<number>(0);
  const pathname = usePathname();

  // Only run shader on the home page
  const isActive = pathname === '/';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;

    function syncSize() {
      if (!canvas) return;
      // Cap pixel ratio at 1.5 to avoid burning GPU on Retina displays
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncSize) : null;
    ro?.observe(canvas);
    syncSize();

    const gl = (canvas.getContext('webgl', { antialias: false, powerPreference: 'default' }) ??
      canvas.getContext('experimental-webgl', { antialias: false })) as WebGLRenderingContext | null;
    if (!gl) return;

    const VS = `attribute vec2 a_position;varying vec2 v_uv;void main(){v_uv=a_position*0.5+0.5;gl_Position=vec4(a_position,0.0,1.0);}`;

    // Reduced from 8 to 5 iterations — visually identical, ~40% cheaper
    const FS = `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_uv;

void main() {
  vec2 p=(gl_FragCoord.xy*2.0-u_resolution.xy)/min(u_resolution.x,u_resolution.y);
  float t=u_time*0.10;
  vec2 mouse=(u_mouse/u_resolution)-0.5;
  for(float n=1.0;n<6.0;n++){
    p.x+=0.5/n*sin(n*p.y+t+0.6*n)+mouse.x*0.03;
    p.y+=0.4/n*sin(n*p.x+t+0.4*n)-mouse.y*0.03;
  }
  vec3 brightGold = vec3(0.90, 0.78, 0.38);
  vec3 veryPaleCream = vec3(1.0, 0.98, 0.92);
  vec3 highlight = vec3(1.0, 1.0, 1.0);
  float flow = abs(sin(p.x*1.2+p.y*1.2+t*0.5));
  vec3 color = mix(brightGold, veryPaleCream, smoothstep(0.1, 0.9, flow));
  float line1 = pow(1.0 - flow, 24.0);
  float line2 = pow(flow, 24.0);
  color += highlight * (line1 + line2 * 0.5) * 1.1;
  gl_FragColor=vec4(color,1.0);
}`;

    function compileShader(type: number, src: string): WebGLShader {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime  = gl.getUniformLocation(prog, 'u_time');
    const uRes   = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    // Throttle mouse updates — only read, don't trigger reflow
    function onMouseMove(e: MouseEvent) {
      mouseRef.current = {
        x: e.clientX / window.innerWidth * (canvas!.width),
        y: (1 - e.clientY / window.innerHeight) * (canvas!.height),
      };
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    function render(t: number) {
      if (!gl || !canvas) return;
      if (!ro) syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime)  gl.uniform1f(uTime, t * 0.001);
      if (uRes)   gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    }
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      ro?.disconnect();
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -10,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
