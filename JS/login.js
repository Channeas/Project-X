authdata = firebase.auth().currentUser;

// Variables for getting the users data
var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified, newUser, uNameOccupied, uNameOK, pswdOK, docRef;

// Get elements
/*const txtEmail = document.getElementById("txtEmail");*/
/*const txtPassword = document.getElementById('txtPassword');*/
/*const btnLogin = document.getElementById('btnLogin');
const btnSignup = document.getElementById('btnSignup');
const btnLogout= document.getElementById('btnLogout');
const btnChange = document.getElementById('change');*/

function reset(){
  newUser = false;
}

  // Get the path to the firestore database
   var firestore = firebase.firestore();

window.onload = reset();

// Search if the variable in the username input field is occupied
document.getElementById("txtDisplayName").onkeyup = function(uNameDBSearch){
  uInput = document.getElementById("txtDisplayName").value.toUpperCase();
  console.log(uInput);

  // If the username input is between 6 and 20 characters long, check with the database if it is not already taken
  if(uInput.length > 5 && uInput.length < 16){
    console.log("Starting search")
    firebase.database().ref("usernames").orderByKey().equalTo(uInput).once("value").then(function(snapshot) {
      console.log("Search completed")
      if(snapshot.val() == null){
        console.log("yes!!!")
        document.getElementById("txtDisplayName").classList.remove("iptError");
        document.getElementById("unameError").innerHTML = "";
        uNameOccupied = false;
        console.log(uNameOccupied);
      } else {
        document.getElementById("txtDisplayName").classList.add("iptError");
        document.getElementById("unameError").innerHTML = unameTaken;
        uNameOccupied = true;
        console.log(uNameOccupied);
      }
      console.log(snapshot.val());
        snapshot.forEach(function(data) {
            console.log(data.key);
      });
    });
  };


  // Check if the username input is shorter than 6 characters. If it is, display an error message.
  if(uInput.length < 6 && uInput.length != 0) {
    document.getElementById("txtDisplayName").classList.add("iptError");
    document.getElementById("unameError").innerHTML = unameShort;
    uNameOK = false;
  } else {
    document.getElementById("txtDisplayName").classList.remove("iptError");
    document.getElementById("unameError").innerHTML = "";
    uNameOK = true;
  };

  // Check if the username input is longer than 16 characters. If it is, display an error message
  if(uInput.length > 16){
    document.getElementById("txtDisplayName").classList.add("iptError");
    document.getElementById("unameError").innerHTML = unameLong;
    uNameOK = false
  };
};

// Check if the password input length is at least 6 characters long
document.getElementById("txtPassword").onkeyup = function(passwordCheck){
  pInput = document.getElementById("txtPassword").value;
  if(pInput.length < 6 && pInput.length != 0){
    document.getElementById("txtPassword").classList.add("iptError");
    document.getElementById("pswdError").innerHTML = pswdShort;
    pswdOK = false;
  } else {
    document.getElementById("txtPassword").classList.remove("iptError"); 
    document.getElementById("pswdError").innerHTML = "";
    pswdOK = true;
  };
};



// Add a login event
btnLogin.addEventListener("click", e => {
  // Make sure that the username isn't affected by the login
  newUser = false;
  // Get email and pass
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
  user = firebase.auth().currentUser;
  console.log(user);
  if(user != null) {
    window.location.replace("profile.html");
  }
});




// Add a signup event
btnSignup.addEventListener("click", e => {
  if(uNameOccupied == false && uNameOK == true && pswdOK == true ){
    // Get email and pass
    var userName = txtDisplayName.value;
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    uProfilePic = null;
    // Create the user
    console.log(email);
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    newUser = true;



    /*userID = firebase.User.prototype.getIdToken()*/
    promise.catch(e => console.log(e.message));
    promise.then(function(user) {
      // Send verificationemail when a new user is registered
      user.sendEmailVerification();

      // Set the displayName
      user.updateProfile({
        displayName: userName 
      });
    });
  } else {
    console.log("Error");
    console.log(uNameOccupied);
    console.log(uNameOK);
    console.log(pswdOK);
  }
});


  firebase.auth().onAuthStateChanged(function(user) {
    /*if (user = null){
      newUser=false;
    };*/
    if (user != null){
      const userID = user.uid;
      const uID = user.uid;
      var uName = user.displayName;
      uEmail = user.email;
      uEmailVerified = user.emailVerified;
      if(newUser==true) {
        // The docref to the firestore db
        docRef = firestore.collection("users").doc(uID);

        const userName = txtDisplayName.value;
        var dbUserName = userName.toUpperCase();
        console.log(dbUserName);
        // Save information about the user in the realtime database
        firebase.database().ref("users/" + userID).set({
          username: dbUserName,
          email: uEmail,
          emailVerified: uEmailVerified,
          profilePic: uProfilePic,
        });

        // Save information about the user to firestore
        docRef.set({
          username: dbUserName,
          email: uEmail,
          emailVerified: uEmailVerified,          
        }).then(function() { 
          // Log a succes message to the console
          console.log("Input saved");
          // Calls the function to exit the index.html page
          setTimeout(exitIndex(), 500);
        }).catch(function (error) {
          // Catch potential errors, and log them to the console.
          console.log("Got an error: " + error);
        });

        // Save the username first, with the users id as a child
        firebase.database().ref("usernames/" + dbUserName).set({
          id: userID,
        });
        newUser = false;

        function exitIndex(){
          window.location.replace("profile.html");
        }
      };
    } else {
      newUser=false;
    };
  });

/*
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Set the displayName
      user.updateProfile({
        displayName: userName });
      } else(function(error) {
        // An error happened.
        console.log("Error")
      })
    });
  // Create account
*/