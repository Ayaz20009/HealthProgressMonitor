
export interface IAppState {
  errors: string[]
  isLoading: boolean
  title: string
}

export const initialState: IAppState = {
  errors: [],
  isLoading: false,
  title: 'My Demo App'
};

