"use client";
"use client";

import { useEffect, useState } from "react";

type PDFModule = {
  Document: any;
  Page: any;
  pdfjs: any;
};

export default function PdfViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState(0);
  const [PDF, setPDF] = useState<PDFModule | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      // Dynamically import react-pdf and its client-only CSS to avoid evaluating
      // pdfjs on the server during prerender.
      const [{ Document, Page, pdfjs }, annotationCss, textCss] = await Promise.all([
        import("react-pdf"),
        import("react-pdf/dist/Page/AnnotationLayer.css"),
        import("react-pdf/dist/Page/TextLayer.css"),
      ]);

      // Prefer the local worker copied to `public/` in the build; keep CDN fallback.
      try {
        if (typeof window !== "undefined") {
          pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
        } else {
          pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
        }
      } catch (e) {
        // ignore errors here
      }

      if (mounted) setPDF({ Document, Page, pdfjs });
    }
    load().catch((e) => console.error("Failed to load react-pdf on client:", e));
    return () => {
      mounted = false;
    };
  }, []);

  if (!PDF) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center bg-neutral-950 border border-neutral-800 rounded-xl p-4">
        <p className="text-neutral-400">Loading PDF viewer…</p>
      </div>
    );
  }

  const { Document, Page } = PDF;

  return (
    <div className="w-full h-[80vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-xl p-4">
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={(err) => console.error("PDF load error:", err)}
        loading={<p className="text-neutral-400">Loading PDF…</p>}
      >
        {Array.from({ length: numPages }, (_, i) => (
          <Page
            key={i}
            pageNumber={i + 1}
            width={900}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="mb-6 flex justify-center"
          />
        ))}
      </Document>
    </div>
  );
}
}
