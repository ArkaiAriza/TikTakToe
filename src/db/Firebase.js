import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB-GWviNMk7TVnq7ulvP2_zyVhNLNfg1UE',
  authDomain: 'tiktaktoe-13437.firebaseapp.com',
  databaseURL: 'https://tiktaktoe-13437.firebaseio.com/',
  projectId: 'tiktaktoe-13437',
  storageBucket: 'tiktaktoe-13437.appspot.com',
};

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
