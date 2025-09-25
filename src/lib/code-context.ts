import { createContext, useContext } from "react";

export const IsInCodeBlockContext = createContext<boolean>(false);

export const useIsInCodeBlock = () => {
  return useContext(IsInCodeBlockContext);
};
