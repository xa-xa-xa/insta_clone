// import firebase from "firebase"
import firebase from 'firebase/app';
import { USER_STATE_CHANGE } from '../constants'


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