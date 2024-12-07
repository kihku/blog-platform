import React, { useEffect, useState } from "react";
import "./index.scss"; // Ensure this file contains the .fade-in class

const FadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const [fadeClass, setFadeClass] = useState("");

  useEffect(() => {
    setFadeClass("fade-in-element");
  }, []); // Triggers on component mount or re-render

  return <div className={fadeClass}>{children}</div>;
};

export default FadingWrapper;
