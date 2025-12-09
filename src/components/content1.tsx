import React, { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.css";

interface ContentProps {
  children: ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return <div className="p-3"> {children} </div>;
};
export default Content;
