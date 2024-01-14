import { PayloadAction } from "@reduxjs/toolkit";
import { IAppState } from "./state";

export const defaultReducers = {
  setTitle: (state: IAppState, action: PayloadAction<string>) => {
    state.title = action.payload;
  },
  setIsLoading: (state: IAppState, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
  },
  addError: (state: IAppState, action: PayloadAction<any>) => {
    state.errors = [...state.errors, action.payload];
  }
}
export default defaultReducers