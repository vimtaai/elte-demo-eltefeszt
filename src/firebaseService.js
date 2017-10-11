import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB3mFDaMnCQV6xF1XnQqFbEA9MnFJW254A",
  databaseURL: "https://eltefeszt.firebaseio.com",
  projectId: "eltefeszt"
};

const app = firebase.initializeApp(config);

export default app;