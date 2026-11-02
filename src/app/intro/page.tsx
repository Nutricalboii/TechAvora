'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Shader source ───────────────────────────────────────────────────
const INTRO_VS = `attribute vec2 a_position;varying vec2 v_uv;void main(){v_uv=a_position*0.5+0.5;gl_Position=vec4(a_position,0.0,1.0);}`;

const INTRO_FS = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
varying vec2 v_uv;

void main() {
    float zoom = 1.8;
    float speed = 0.5;
    float wave_intensity = 1.19;
    float brightness = 0.017;
    vec3 color = vec3(54.0/255.0, 38.0/255.0, 13.0/255.0);

    // Normalize coordinates and adjust for aspect ratio
    vec2 uv = ((gl_FragCoord.xy / u_resolution.xy) - 0.5) * 2.0 / zoom;
    uv.x *= u_resolution.x / u_resolution.y;

    vec3 c = vec3(0.0);

    for (int i = 0; i < 6; i++) {
        uv.x -= u_time * speed / float(i + 2);
        uv.y += sin(uv.x + u_time * speed / float(i + 1) + float(i) * 0.5) * wave_intensity / float(i + 1);
        c += brightness / abs(uv.y);
    }

    c = mix(vec3(0.0), color, c);
    
    // Add film grain to prevent banding
    float grain = fract(sin(dot(gl_FragCoord.xy+u_time*0.01, vec2(12.9898,78.233))) * 43758.5453);
    c += (grain - 0.5) * 0.02;

    gl_FragColor = vec4(c, 1.0);
}`;

function useWebGL(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function sync() {
      if (!canvas) return;
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
      }
    }
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(sync) : null;
    ro?.observe(canvas); sync();

    const gl = (canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    const cs = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, INTRO_VS));
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, INTRO_FS));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uT = gl.getUniformLocation(prog, 'u_time');
    const uR = gl.getUniformLocation(prog, 'u_resolution');
    const uM = gl.getUniformLocation(prog, 'u_mouse');

    const onMM = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - r.left) / r.width * canvas.width,
        y: (1-(e.clientY - r.top) / r.height) * canvas.height,
      };
    };
    window.addEventListener('mousemove', onMM, { passive: true });

    const render = (t: number) => {
      if (!gl || !canvas) return;
      if (!ro) sync();
      gl.viewport(0,0,canvas.width,canvas.height);
      if (uT) gl.uniform1f(uT, t*0.001);
      if (uR) gl.uniform2f(uR, canvas.width, canvas.height);
      if (uM) gl.uniform2f(uM, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMM);
      ro?.disconnect();
    };
  }, [canvasRef]);
}

export default function IntroPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  useWebGL(canvasRef);
  useEffect(() => { router.prefetch('/'); }, [router]);

  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    sessionStorage.setItem('techavora_intro_seen', '1');
    router.push('/');
  };

  // Also enter on scroll
  useEffect(() => {
    let ticking = false;
    const onWheel = () => {
      if (!ticking) { ticking = true; enter(); }
    };
    window.addEventListener('wheel', onWheel, { passive: true, once: true });
    return () => window.removeEventListener('wheel', onWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          key="intro"
          className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* WebGL canvas — fills entire screen */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full"
          />

          {/* Dark overlay so text is legible */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">
            {/* Logo wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.0, ease: [0.22,1,0.36,1] }}
              className="mb-6"
            >
              <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-white/80">
                Tech Avora
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 1.1, ease: [0.22,1,0.36,1] }}
              className="font-heading text-[15vw] md:text-[10vw] lg:text-[8vw] uppercase leading-none tracking-wide mb-3 text-white"
            >
              Tech Avora
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1.0 }}
              className="font-sans text-base md:text-lg text-white/80 tracking-wide max-w-xs mb-16"
            >
              Institutional AI Infrastructure
            </motion.p>

            {/* CTA button */}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8, ease: [0.22,1,0.36,1] }}
              onClick={enter}
              className="group relative flex items-center gap-3 px-8 py-4 bg-[#B8860B] border-[#B8860B] text-white font-sans font-semibold text-sm tracking-[0.12em] uppercase hover:bg-[#a67809] shadow-lg transition-all duration-400"
            >
              <span>Explore Services</span>
              <span className="text-white transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.button>

            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
