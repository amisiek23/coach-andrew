"use client";

import { useRef, useEffect } from "react";

type Props = React.IframeHTMLAttributes<HTMLIFrameElement>;

export default function AutoIframe({ height: _height, scrolling: _scrolling, style: _style, ...props }: Props) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;

    const applyHeight = (h: number) => {
      if (iframe) iframe.style.height = h + "px";
    };

    // postMessage listener — fired by the script inside each HTML file
    const onMessage = (e: MessageEvent) => {
      if (
        e.data &&
        typeof e.data.iframeHeight === "number" &&
        e.source === iframe.contentWindow
      ) {
        applyHeight(e.data.iframeHeight);
      }
    };
    window.addEventListener("message", onMessage);

    // Same-origin fallback via onLoad
    const onLoad = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        applyHeight(doc.documentElement.scrollHeight);
        doc.fonts?.ready.then(() => applyHeight(doc.documentElement.scrollHeight));
      } catch {
        // cross-origin — postMessage will handle it
      }
    };
    iframe.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("message", onMessage);
      iframe.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <iframe
      {...props}
      ref={ref}
      style={{ border: "none", display: "block", width: "100%" }}
    />
  );
}
