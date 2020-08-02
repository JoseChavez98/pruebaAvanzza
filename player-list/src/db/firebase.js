import * as firebase from 'firebase/app'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyBEMNxXR1SQ2kK-vE0jNDABBSwH1TlN6v8',
  authDomain: 'avanzza-test.firebaseapp.com',
  databaseURL: 'https://avanzza-test.firebaseio.com',
  projectId: 'avanzza-test',
  storageBucket: 'avanzza-test.appspot.com',
  messagingSenderId: '493507979268',
  appId: '1:493507979268:web:9bf5db6e0082328f1c2d51'

}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()

// collection references
const playersCollection = db.collection('players')

// export utils/refs
export {
  db,
  playersCollection
}
