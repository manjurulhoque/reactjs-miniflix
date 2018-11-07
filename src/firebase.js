import { firebaseApp } from './firebaseConfig';

const db = firebaseApp.database();
export const videosRef = db.ref('miniflix');