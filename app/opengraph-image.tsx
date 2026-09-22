import { ImageResponse } from 'next/og';

export const alt = 'Florvia, software de postcosecha para flores';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const leafBase = {
  position: 'absolute' as const,
  width: 120,
  height: 230,
  borderRadius: '100% 0 100% 0',
  transformOrigin: 'bottom center',
};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          padding: '76px 86px',
          background: '#f4f1ea',
          color: '#16382f',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: 710, zIndex: 1 }}>
          <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 28, color: '#376853', marginBottom: 32 }}>FLORVIA</div>
          <div style={{ display: 'flex', fontSize: 78, lineHeight: 1.02, letterSpacing: -4, fontWeight: 700 }}>Tu postcosecha bajo control.</div>
          <div style={{ display: 'flex', marginTop: 32, fontFamily: 'Arial, sans-serif', fontSize: 30, lineHeight: 1.35, color: '#50695f' }}>Recepción, calidad, pedidos y liquidaciones en una sola plataforma.</div>
        </div>
        <div style={{ display: 'flex', position: 'absolute', right: 80, bottom: 12, width: 380, height: 430, transform: 'rotate(27deg)' }}>
          <div style={{ ...leafBase, background: '#376853', left: 110, bottom: 42, transform: 'rotate(-42deg)' }} />
          <div style={{ ...leafBase, background: '#c9897a', left: 110, bottom: 42, transform: 'rotate(10deg)' }} />
          <div style={{ ...leafBase, background: '#376853', left: 110, bottom: 42, transform: 'rotate(56deg)' }} />
        </div>
      </div>
    ),
    size,
  );
}
