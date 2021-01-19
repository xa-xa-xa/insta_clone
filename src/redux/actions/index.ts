// import firebase from "firebase"
import firebase from 'firebase/app';
import { USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE } from '../constants';


export function fetchUser() {
    return ((dispatch: any) => {
        firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser?.uid)
            .get()
            .then((snapshot: any) => {                
                if (snapshot.exists) {
                    dispatch({
                        type: USER_STATE_CHANGE,
                        currentUser: snapshot.data()
                    })
                } else {
                    console.error("error: snapshot does not exist!")
            }
        })
    } )
};

export function fetchUserPosts() {
  return (dispatch: any) => {
    firebase
      .firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser?.uid)
      .collection('userPosts')
      .orderBy('creation', 'asc')
      .get()
      .then((snapshot: any) => {
        const posts = snapshot.docs.map((i: { data: () => any; id: any }) => {
          const data = i.data();
          const id = i.id;
          return { id, data };
        });
        console.log('posts:', posts);
        dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
      });
  };
}