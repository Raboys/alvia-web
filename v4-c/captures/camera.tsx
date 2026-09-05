// Replace only the physical camera with V3's existing illustrative video.
// IdentityCapture itself, its layout, guide and controls are imported unchanged.
import React, { forwardRef, useEffect, useRef } from 'react';
export function useCameraPermissions() {
  return [{ granted: true, canAskAgain: true }, async () => ({ granted: true })];
}
export const CameraView = forwardRef(function FixtureCamera({ onCameraReady }: any, ref: any) {
  const preview = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    let cancelled = false;
    const source = document.createElement('video');
    (window as any).__captureCameraSource = source;
    source.src = '/camera.mp4'; source.muted = true; source.loop = true; source.playsInline = true;
    let stream: MediaStream;
    source.play().then(() => {
      if (cancelled || !preview.current) return;
      stream = (source as any).captureStream();
      preview.current.srcObject = stream;
      preview.current.play().then(() => { if (!cancelled) onCameraReady(); });
    });
    return () => { cancelled = true; source.pause(); stream?.getTracks().forEach(t => t.stop()); };
  }, []);
  return <video ref={preview} muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />;
});
