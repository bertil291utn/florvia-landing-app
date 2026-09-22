'use client';

import { useEffect, useId, useRef } from 'react';

export type DemoId = 'receive' | 'inventory' | 'dispatch' | 'liquidation' | 'dashboard';

const descriptions: Record<DemoId, string> = {
  receive: 'Demostración de cómo se registraría y clasificaría una recepción.',
  inventory: 'Demostración de cómo se consultaría disponibilidad y movimientos.',
  dispatch: 'Demostración de cómo se prepararía un despacho.',
  liquidation: 'Demostración de cómo se prepararía una liquidación a proveedor.',
  dashboard: 'Demostración de cómo se recorrería una vista gerencial.',
};

export function DemoLoop({ demo }: { demo: DemoId }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const captionId = useId();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlayback = () => {
      video.defaultMuted = true;
      video.muted = true;
      void video.play().catch(() => undefined);
    };

    video.addEventListener('loadeddata', startPlayback);
    video.addEventListener('canplay', startPlayback);
    window.addEventListener('pageshow', startPlayback);
    document.addEventListener('visibilitychange', startPlayback);
    startPlayback();

    return () => {
      video.removeEventListener('loadeddata', startPlayback);
      video.removeEventListener('canplay', startPlayback);
      window.removeEventListener('pageshow', startPlayback);
      document.removeEventListener('visibilitychange', startPlayback);
    };
  }, []);

  return (
    <figure className="demo-loop">
      <video
        ref={videoRef}
        aria-describedby={captionId}
        autoPlay
        loop
        muted
        playsInline
        poster={`/demos/v3/${demo}.jpg`}
        preload="auto"
      >
        <source src={`/demos/v3/${demo}.mp4`} type="video/mp4" />
      </video>
       </figure>
  );
}
