"use client";

import React from "react";

export default function PdfViewer({ file, height = "80vh" }: { file: string; height?: string }) {
  // Simple, compatible PDF viewer that relies on the browser's built-in
  // PDF rendering (via <iframe> / <object>). This approach avoids server-side
  // evaluation issues (DOMMatrix) and is very reliable across environments.
  return (
    <div className="w-full" style={{ height }}>
      <div className="flex items-center justify-between mb-2 flex-col sm:flex-row gap-2">
        <div className="text-sm text-neutral-300">PDF Preview</div>
        <div className="flex gap-2">
          <a
            className="text-sm text-neutral-200 underline"
            href={file}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Open PDF in new tab"
          >
            Open
          </a>
          <a
            className="text-sm text-neutral-200 underline"
            href={file}
            download
            aria-label="Download PDF"
          >
            Download
          </a>
        </div>
      </div>

      <div className="w-full h-full bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
        {/* Primary viewer: iframe (works in modern browsers) */}
        <iframe src={file} title="PDF Viewer" className="w-full h-[60vh] sm:h-[80vh] md:h-[80vh]" style={{ border: "none" }} />

        {/* Fallback for browsers that don't show PDFs in an iframe */}
        <div style={{ display: "none" }}>
          <object data={file} type="application/pdf" width="100%" height="100%">
            <p className="p-4 text-neutral-400">
              Your browser does not support embedded PDFs. You can <a href={file}>download the PDF</a> to
              view it.
            </p>
          </object>
        </div>
      </div>
    </div>
  );
}
