  ////////////////////////////////////////////////////////////////////
  /*                              Notes                             ^/
  /*             !Important! app.js MUST be read first              ^/
  /*                 since the firebase init is here                ^/
  ////////////////////////////////////////////////////////////////////
  */





  // Initialize errormessages
  const unameShort = "Your username must be at least 6 characters long";
  const unameLong = "Your username can't be more than 16 characters long";
  const unameTaken = "This username has already been taken by another user";
  const pswdShort = "Your password must be at least 6 characters long";
  const uNameChanged = "Your username has been changed";
  const sameeEmail = "This is already your email";
  const emailChanged = "Your email has been changed, and email verification sent";
  const errorEmail = "An error occured. You may have to relog";

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBgUxEqOnUHoAEjdnnbT0VxxCDoAoEJsSo",
    authDomain: "sign-in-and-out-test.firebaseapp.com",
    databaseURL: "https://sign-in-and-out-test.firebaseio.com",
    projectId: "sign-in-and-out-test",
    storageBucket: "sign-in-and-out-test.appspot.com",
    messagingSenderId: "151092480604"
  };
  firebase.initializeApp(config);

  authdata = firebase.auth().currentUser;

  // Variables for getting the users data
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  // Get elements
  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const btnLogout= document.getElementById('btnLogout');
  const btnChange = document.getElementById('change');

  // Add a login event
  /*

  btnLogin.addEventListener("click", e => {
    // Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });
    //document.querySelector("signedInAs").innerHTML = user.;

  // Add a signup event
  btnSignup.addEventListener("click", e => {
    // Get email and pass
    const userName = txtDisplayName.value;
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    // Create the user
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
    promise.then(function(user) {
      // Send verificationemail when a new user is registered
      user.sendEmailVerification();
    });


      // Set the displayName
      user.updateProfile({
        displayName: userName });
    }, function(error) {
      // An error happened.
      console.log("Error")
    })
    // Create account
*/
    /*ref.child("users").child(authData.uid).set({
          provider: authData.provider,
          name: displayName
        });*/





  // Add a realtime authentication listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      // Get the users data
      user = firebase.auth().currentUser;
      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                         // this value to authenticate with your backend server, if
                         // you have one. Use User.getToken() instead.

      }

    } else {
      console.log("Not logged in");
    }
  });

  firebase.auth().onAuthStateChanged(function(user) {
    user = firebase.auth().currentUser;
    console.log(user);
    if (user) {
      // User is signed in.
      name = firebase.auth().currentUser.displayName;
      console.log(name);
      //document.getElementById("signedInAs").innerHTML = name;
    } else {
      // No user is signed in.
      console.log("error");
    }
  });