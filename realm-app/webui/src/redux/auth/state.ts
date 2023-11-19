
export interface IAuthState {
  user: Realm.User | null
  isAuthenticated: boolean
  userAuth?: string | null
  realmApp: Realm.App | null
}

export const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
  realmApp: null
};

