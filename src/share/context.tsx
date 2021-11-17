import React from "react";
import { StoreByArray } from "./store";

export const StoreContext = React.createContext<
  StoreByArray<{ id: string }, { id: string; name: string }>
>(new StoreByArray<{ id: string }, { id: string; name: string }>());
