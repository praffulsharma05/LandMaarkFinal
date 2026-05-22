/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source to the bundled worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

interface PdfThumbnailProps {
  url: string;
  className?: string;
  style?: React.CSSProperties;
}

const PdfThumbnail: React.FC<PdfThumbnailProps> = ({ url, className, style }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const renderPage = async () => {
      try {
        setLoading(true);
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        if (cancelled) return;

        const page = await pdf.getPage(1);
        if (cancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Use a higher scale for good quality
        const viewport = page.getViewport({ scale: 2 });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const renderContext: any = {
          canvasContext: ctx,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        if (!cancelled) setLoading(false);
      } catch (err) {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    };

    renderPage();

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (error) {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          aspectRatio: '4/3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--md-sys-color-surface-container)',
          borderRadius: '12px',
          color: 'var(--md-sys-color-on-surface-variant)',
          fontSize: '14px',
          fontWeight: 700,
          ...style,
        }}
      >
        PDF Preview Unavailable
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: '100%',
        display: 'block',
        borderRadius: '12px',
        opacity: loading ? 0.3 : 1,
        transition: 'opacity 0.3s ease',
        ...style,
      }}
    />
  );
};

export default PdfThumbnail;
