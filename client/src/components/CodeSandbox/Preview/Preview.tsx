import React, { useEffect, useRef } from "react";
// Utils → Plugins + Helpers
import { iFrameHTML } from "../../../utils/iframe-html";
  
interface PreviewProps {
  bundledCode: string;
}

export const Preview: React.FC<PreviewProps> = ({ bundledCode }) => {
  const iFrameRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!iFrameRef.current || !iFrameRef.current.contentWindow) return;
    const iFrameWindow = iFrameRef.current.contentWindow;
    /* send updated/freshly bundled code to 'iframe' via message */
    iFrameWindow.postMessage(bundledCode, "*");
  }, [bundledCode]);

  return (
    <div className="preview-wrapper">
      <iframe 
        title="preview" 
        sandbox="allow-scripts" 
        ref={iFrameRef} 
        srcDoc={iFrameHTML}
      ></iframe>
    </div>
  );
}; 


