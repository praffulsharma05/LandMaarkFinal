/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { FileText } from 'lucide-react';

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
      <div className="md3-brochure-fallback-container error" style={style}>
        <div className="fallback-glow"></div>
        <FileText className="fallback-pdf-icon" size={48} />
        <span className="fallback-pdf-badge">PREVIEW UNAVAILABLE</span>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '200px', ...style }}>
      {loading && (
        <div className="md3-brochure-fallback-container loading" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
          <div className="fallback-glow"></div>
          <FileText className="fallback-pdf-icon" size={48} />
          <span className="fallback-pdf-badge">LOADING PREVIEW...</span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'cover',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
};

export default PdfThumbnail;
