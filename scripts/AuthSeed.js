require('./firebaseAdmin');

const { getAuth } = require ('firebase-admin/auth')

const { getStorage } = require ('firebase-admin/storage')

const { getFirestore } = require ('firebase-admin/firestore')

require('dotenv').config()

// get auth instance
const auth = getAuth();

// get db instance
const db = getFirestore();

// get the storage bucket instance 
const bucket = getStorage().bucket();

// the default local profil path
const profilPath = "scripts\\upload\\user-profile-avatar.png";
// the the cloud storage path to the default profil 
const profilDestinationPath = "/default/profil/avatar.png";

/**
 * Upload a file to the cloud storage. 
 * @param {string} filePath the file path.
 * @param {string} destinationPath the file destination path.
 */
const uploadFile = async (filePath,destinationPath) => {
  try {
    await bucket.upload(filePath,{
      destination : destinationPath
    })
    console.log(`${filePath} uploaded to ${bucket.name}`);
  } catch (error) {
    console.log(error)
  }
}


// the default super admin user.
const defaultUser = [
  { 
    email: process.env.REACT_APP_SUPER_ADMIN_EMAIL || "superadmin@example.com",
    phoneNumber: process.env.REACT_APP_SUPER_ADMIN_PHONE_NUMBER || "+221334343434",
    password: process.env.REACT_APP_SUPER_ADMIN_DEFAULT_PASSWORD || "secretPassword",
    displayName: process.env.REACT_APP_SUPER_ADMIN_DISPLAY_NAME || "SuperAdmin",
    emailVerified: false,
    // photoURL: "",
    disabled: false
  }
]

/**
 * Delete all the default users.
 */
 const deleteUsers = async () => {

  const userUID = [];
  
  try {
    const getUsersResult = await auth.getUsers(defaultUser)
  
    console.log('Successfully fetched user data:');
  
    getUsersResult.users.forEach((userRecord) => {
      console.log(userRecord);
      userUID.push(userRecord.uid)
    });
  
    console.log('Unable to find users corresponding to these identifiers:');
    getUsersResult.notFound.forEach((userIdentifier) => {
      console.log(userIdentifier);
    });
    } catch (error) {
    console.log('Error fetching user data:', error);
    }
  
     // delete all user default user accounts
    if(userUID.length > 0) {
      try {
        
        // delete user from auth
        const deleteUsersResult = await auth.deleteUsers(userUID)
            
        console.log(`Successfully deleted ${deleteUsersResult.successCount} users`);
        
        console.log(`Failed to delete ${deleteUsersResult.failureCount} users`);
        
        deleteUsersResult.errors.forEach((err) => {
          console.log(err.error.toJSON());
        });

        // delete user from firestore
        userUID.forEach(async uid => {
           await db.doc(`users/${uid}`).delete();
           console.log("users delete : ",uid)
        })
        
    
      } catch (error) {
        console.log('Error deleting users:', error); 
      }
       
    }
}



const createUsers = async () => {

    defaultUser.forEach(async user => {
      try {
        const userRecord =  await auth.createUser(user)
        const userRecordClaims = await auth.setCustomUserClaims(userRecord.uid, { superAdmin : true } )
        // See the UserRecord reference doc for the contents of userRecord.
        console.log(`Successfully created new user:, ${userRecord.uid} ,claims : ${userRecordClaims}`);
      } catch (error) {
        console.log('Error creating new user:', error);        
      }
    })
}

const startup = async () => {
    await uploadFile(profilPath,profilDestinationPath);
    await deleteUsers();
    await createUsers();
    console.log("Firebase startup finished.")
}

startup();