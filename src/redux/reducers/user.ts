import { ActionSheetIOS } from "react-native"

interface IUserState {
    currentUser: {} | null;
}

const initialState: IUserState = {
      currentUser: null
}
  
export const user = (state: IUserState = initialState, action: any) => ({
    ...state,
    currentUser: action.currentUser
});
