authdata = firebase.auth().currentUser;
var user = firebase.auth().currentUser;

// Variables for getting the users data
var name, email, photoUrl, uid, emailVerified, uNameOccupied, uNameOK, uName, userID, newEmail;

// This is what customizes the menu
var menuPref = null; 

uNameOK=true;
// Get elements
/*const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignup = document.getElementById('btnSignup');
const btnLogout= document.getElementById('btnLogout');
const btnChange = document.getElementById('change');*/

// Get user data
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    name = user.displayName.toUpperCase();
    email = user.email;
    userID = user.uid;  
    document.getElementById("txtDisplayName").value = user.displayName;
    document.getElementById("txtEmail").value = email;
    console.log(userID);
  } else {
    // No user is signed in.
    console.log("error");
  }
});

if(user != null) {
  uid = user.uid;
} else if(user === "null") {
  window.location.replace("index.html");
}

  // Log out button
  btnLogout.addEventListener("click", e=> {
    firebase.auth().signOut();
    // Move the user to the log in page if not already on it
    if(!window.location.href.match("index.html")) {
      window.location.replace("index.html");
    }
  });


// Search if the variable in the username input field is occupied
document.getElementById("txtDisplayName").onkeyup = function(uNameDBSearch){
  uInput = document.getElementById("txtDisplayName").value.toUpperCase();

  console.log("Key down");
  // If the username input is between 6 and 20 characters long, check with the database if it is not already taken
  if(uInput.length > 6 && uInput.length < 17 || uInput.length == 6 && uInput !=name){
    console.log("Starting search");
    firebase.database().ref("usernames").orderByKey().equalTo(uInput).on("value", function(snapshot) {
      name = firebase.auth().currentUser.displayName.toUpperCase();
      console.log("Search complete");
      if(snapshot.val() == null){
        document.getElementById("txtDisplayName").classList.remove("iptError");
        document.getElementById("unameError").innerHTML = "";
        uNameOccupied = false;
        console.log("1");
      } else if(uInput.toUpperCase() != name){
        document.getElementById("txtDisplayName").classList.add("iptError");
        document.getElementById("unameError").innerHTML = unameTaken;
        uNameOccupied = true;
        console.log("2");
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
  } else if(uNameOccupied == false){
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

// Change the username
changeUName.addEventListener("click", e => {
  console.log("clicked");
  if(uNameOccupied == false && uNameOK == true){
    // Redefine the variables used. Mostly to ensure that they are updated
    oldUName = firebase.auth().currentUser.displayName.toUpperCase();
    uName = txtDisplayName.value;
    uEmail = firebase.auth().currentUser.email;
    uEmailVerified = firebase.auth().currentUser.emailVerified;
    userID = firebase.auth().currentUser.uid;

    // Get the uppercase version of the username entered, which will be saved in the database for usernames
    uNameUC = txtDisplayName.value.toUpperCase();

    firebase.auth().currentUser.updateProfile({
      displayName: uName,
    });

    //Save information about the user in a separate database
    firebase.database().ref("users/" + firebase.auth().currentUser.uid).set({
      username: uName,
      email: uEmail,
      emailVerified: uEmailVerified,
    });

    // Save the new username to the /usernames database
    firebase.database().ref("usernames/" + uNameUC).set({
      id: userID,
    });

    // Remove the old username from the /usernames database
    firebase.database().ref("usernames/" + oldUName).remove();

    // Make sure that there is no error message being displayed
    document.getElementById("txtDisplayName").classList.remove("iptError");
    document.getElementById("unameError").innerHTML = "";

    //Display the success message and make the background color of the username input field green
    document.getElementById("txtDisplayName").classList.add("iptSuccess");
    document.getElementById("unameError").classList.add("success");
    document.getElementById("unameError").innerHTML = uNameChanged;

    // Set the timeout, that makes the green color of the text input and the succes text stay for x amount of seconds.
    window.setTimeout(uNameSuccess, 2000);

    // Wait for the amount of seconds set above, and then remove the success message
    function uNameSuccess() {
    document.getElementById("txtDisplayName").classList.remove("iptSuccess");
    document.getElementById("unameError").classList.remove("success");
    document.getElementById("unameError").innerHTML = "";

    };

    document.getElementById("txtDisplayName").classList.add("iptSuccess");

    name = firebase.auth().currentUser.displayName.toUpperCase();
     // Save the username first, with the users id as a child
    /*firebase.database().ref("usernames/" + dbUserName).set({
      id: userID,
    });*/
  };
});

  // Change the users email
  changeEmail.addEventListener("click", e => {
    newEmail = document.getElementById("txtEmail").value;
    email = firebase.auth().currentUser.email;
    // Check if whats written in the email input is not equal to the users current email
    if(newEmail != email){
      var user = firebase.auth().currentUser;
      user.updateEmail(newEmail).then(function() {

        // Reload the user data
        var user = firebase.auth().currentUser;
        userID = user.uid;
        uName = user.displayName;
        uEmail = user.email;

        // Send a verification email to the new email adress
        user.sendEmailVerification().then(function() {
            console.log("Email verification sent");
          }).catch(function(error) {
            console.log("An error happened, email verification not sent");
            console.log(error);
        });

        uEmailVerified = user.emailVerified;

        // Define for how long the success message will be shown
        window.setTimeout(emailSuccess, 3000);
        
        console.log("Email changed")

        // Add the success message
        document.getElementById("txtEmail").classList.add("iptSuccess");
        document.getElementById("emailError").classList.add("success");
        document.getElementById("emailError").innerHTML = emailChanged;

        // Remove the success message
        function emailSuccess() {
          document.getElementById("txtEmail").classList.remove("iptSuccess");
          document.getElementById("emailError").classList.remove("success");
          document.getElementById("emailError").innerHTML = null;
        };

        // Write the new email in the firebase database
        firebase.database().ref("/users/" + userID).set({
          username: uName,
          email: uEmail,
          emailVerified: uEmailVerified,
        });


      }).catch(function(error) { // Failed to change email
        console.log("An error occured");
        
        // This error can most likely be solved using the firebase reauth function

        // Define how long the error message will be displayed
        window.setTimeout(emailError, 3000);

        // Display the error message
        document.getElementById("txtEmail").classList.add("iptError");
        document.getElementById("emailError").innerHTML = errorEmail;

        // Remove the error message
        function emailError() {
          document.getElementById("txtEmail").classList.remove("iptError");
          document.getElementById("emailError").innerHTML = null;
        };
      });

      console.log("yes");
    } else { // If the input is already the users email, display an error message
      console.log("This is already your email");

      // Define how long the error message will be displayed
      window.setTimeout(sameEmail, 3000);
      
      // Display the error message
      document.getElementById("txtEmail").classList.add("iptError");
      document.getElementById("emailError").innerHTML = sameeEmail;
      
      // Remove the error message
      function sameEmail() {
        document.getElementById("txtEmail").classList.remove("iptError");
        document.getElementById("emailError").innerHTML = null;
      };
    };
  });

    function goToEditor() {
    window.location.replace("editorindex.html");
    console.log("Going to editor");
  }