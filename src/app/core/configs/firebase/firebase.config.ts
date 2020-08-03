


import { environment } from 'src/environments/environment';
import firebase from 'firebase/app';
import 'firebase/firestore';


firebase.initializeApp(environment.firebase);

export { firebase };