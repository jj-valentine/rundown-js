import React from "react";

export const Cell: React.FC = ({ children }) => {
  return (
    <div className="cell-wrapper">
      {children}
    </div>
  );
};