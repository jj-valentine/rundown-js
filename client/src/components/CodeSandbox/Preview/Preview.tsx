import React from "react";
  
/* 
interface PreviewProps {
  sourceHTML: string
}

export const Preview: React.FC<PreviewProps> = ({ sourceHTML }) => {
  return (
    <div className="preview-wrapper">
      <iframe 
        id="child-context" 
        title="Preview Context" 
        ref={iframeRef} 
        sandbox="allow-scripts" 
        srcDoc={sourceHTML}>
      </iframe>
    </div>
  );
}; 
*/

export const Preview: React.FC = () => {
  return <div className="preview-wrapper"></div>;
};