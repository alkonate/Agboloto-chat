const admin = require('firebase-admin');

require('dotenv').config()


var serviceAccount = require(process.env.REACT_APP_FIREBASE_SERVICE_ACCOUNT_CREDENTIAL_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
});