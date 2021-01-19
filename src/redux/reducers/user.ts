import { State } from 'react-native-gesture-handler';
import {USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE} from '../constants/index'
interface IUserState {
    currentUser: {} ;
    posts: [];
}
interface IActions {
    type: string,
    currentUser: {},
    posts: []
}

const initialState: IUserState = {
  currentUser: {},
  posts: [],
};
  
export const user = (state: IUserState = initialState, action: IActions) => {
    switch (action.type) {
        case USER_POSTS_STATE_CHANGE:
            return {...state, posts: action.posts};
        case USER_STATE_CHANGE:
            return {...state, currentUser: action.currentUser};
    
        default:
            return state;
    }
};
