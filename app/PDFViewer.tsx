"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Use a CDN-hosted worker so Next.js can load the pdf.worker file at runtime.
// This avoids needing to copy pdf.worker into `public/`.
// Prefer the local worker (copied to `public/` during build). Fallback to CDN if not running in browser.
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
} else {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
}

export default function PdfViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState(0);

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
