// usePreviousRoute.ts
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

let lastPath: string | null = null;

const usePreviousRoute = () => {
  const location = useLocation();
  const [previousRoute] = useState<string | null>(() => lastPath);

  useEffect(() => {
    lastPath = location.pathname;
  }, [location.pathname]);

  return previousRoute;
};

export default usePreviousRoute;