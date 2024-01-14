import { PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "./state";

export const reducers = {
  setUser: (state: IAuthState, action: PayloadAction<any>) => {
    state.user = action.payload;
  },
  setRealmApp: (state: IAuthState, action: PayloadAction<any>) => {
    state.realmApp = action.payload;
  },
  setIsAuthenticated: (state: IAuthState, action: PayloadAction<boolean>) => {
    state.isAuthenticated = action.payload;
  }
}
export default reducers