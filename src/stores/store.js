import * as firebase from "firebase/app";
import "firebase/firestore";

import { Documents } from './Documents';
import { Users } from './Users';

import firebaseCredentials from '../../firebaseCredentials';

firebase.initializeApp(firebaseCredentials);
const db = firebase.firestore();

const docs = new Documents(db);
const users = new Users();

export default {
    docs,
    users
};