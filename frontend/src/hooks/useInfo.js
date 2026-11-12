import { useContext } from "react";
import { InfoContext } from "../contexts/InfoContext";

export const useInfo = () => {
  return useContext(InfoContext);
};