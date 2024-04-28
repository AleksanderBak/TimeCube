// CubeContext.js
import { createContext } from "react";

export const CubeContext = createContext({
  updateCube: () => {},
  refresh: false,
  setRefresh: () => {},
});

export default CubeContext;
