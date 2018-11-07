import firebase from 'firebase';

export const isLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
        if(user){
            return true;
        }
        else {
            return false;
        }
    })
}