import { ImageResponse } from 'next/og';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '72px 86px',
          color: '#17263a',
          background: 'linear-gradient(120deg, #fbf8f1 0%, #f3ead7 100%)',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            right: -130,
            top: 70,
            border: '1px solid rgba(184, 134, 11, 0.22)',
            borderRadius: 250,
            display: 'flex',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 740 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 52 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: '#b8860b' }} />
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 4 }}>Tech Avora</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 62, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
            Production AI
            <br />
            starts with
            <br />
            <span style={{ color: '#a97908' }}>better data.</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 30, fontSize: 24, color: '#4e5a68', lineHeight: 1.45 }}>
            AI data operations and implementation
            <br />
            for enterprise teams.
          </div>
        </div>
        <div
          style={{
            width: 170,
            height: 170,
            borderRadius: 85,
            background: '#b8860b',
            color: '#fffdf7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: 4,
            boxShadow: '0 22px 60px rgba(58, 44, 12, 0.18)',
          }}
        >
          A
        </div>
        <div
          style={{
            position: 'absolute',
            left: 86,
            right: 86,
            bottom: 46,
            height: 2,
            background: 'rgba(23, 38, 58, 0.12)',
            display: 'flex',
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
