// The code to load text from the firebase database, and place it into the quilljs editor
// Should work as long as docRef is up to date, and contains something like /users/userID/documents/docID
/*
docRef.get().then(function (doc) {
	// save the data in a global variable
	loadedData = doc.data();
	
	// Turn the string into the required JSON object
	manipulatedData = JSON.parse(loadedData.text);
		
	// Load the manipulated text into the quilljs editor
	quill.setContents(manipulatedData);
	});
*/

// This is what customizes the menu
var menuPref = "editor";

// Get the user from firebase
var user, uID, newArticle, loadArticleID, newTitle;

const documentTitleRef = document.getElementById("articleTitle");

// Get the date. Note that this function is called everytime something is saved. 
// TODO: make it so that the getDate function is only called once.
var date = getDate() 

// Get the date
function getDate() {
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth()+1;
	var year = today.getFullYear();
	var todaysDate = day + "/" + month + "/" + year;
	return todaysDate;
}

console.log(date);

/*
firebase.auth().onAuthStateChanged(firebaseUser => {
	user = firebase.auth().currentUser
	uID = user.uid;
});
console.log(uID);
*/

firebase.auth().onAuthStateChanged(function(user) {
    user = firebase.auth().currentUser;
    uID = user.uid;
    console.log(user);
    console.log(uID);	
    if (user) {
      // User is signed in.
      name = firebase.auth().currentUser.displayName;
      console.log(name);
      //document.getElementById("signedInAs").innerHTML = name;
    } else {
      // No user is signed in.
      console.log("error");
    }
    // Load the article
    loadArticle(loadArticleID);

});



// firestore
var firestore = firebase.firestore();

// Get a reference to the database service
var database = firebase.database();

// Define the firebase firestore db reference
var db = firebase.firestore();

// Reference to where articles are stored
const userRef = firestore.doc("users/" + uID);	

// Variables that will be declared later
var documentDelta, loadedData, manipulatedData, docRef;


// This function is called when the exit editor button is pressed. It exits the editor
function exitEditor() {
	window.location.replace("editorindex.html");
};

function saveDocument() {
	// Get the text from the quilljs editor as an object, and turn it into a string
	documentDelta = JSON.stringify(quill.getContents());

	// Declare the local variable newTitle
	newTitle = document.getElementById("articleTitle").value;

	console.log(newTitle);

	// Save the text in the firestore database
	// Note that the docRef needs to be changed, so that the document is saved with a unique id, as well as the title in another text field in the same document
	if (newArticle == true) {
		// If the article is new, set all the text fields, including the "created" field
		console.log("Hello");
		docRef.set({
			title: newTitle,
			text: documentDelta,
			words: null,
			created: date,
			edited: date
		}).then(function() { 
			// Log a succes message to the console
			console.log("Input saved");
		}).catch(function (error) {
			// Catch potential errors, and log them to the console.
			console.log("Got an error: " + error);
		})
	} else if (newArticle == false) {
		// If the article is not new, merge the text fields below, excluding the "created" field
		docRef.set({
			//title: currentTitle,
			text: documentDelta,
			words: null,
			edited: date
		}, { merge: true }).then(function() { 
			// Log a succes message to the console
			console.log("Input saved");
		}).catch(function (error) {
			// Catch potential errors, and log them to the console.
			console.log("Got an error: " + error);
		}) 
	}

	// Article count
	db.collection("users").doc(uID).collection("articles").get().then(function(articleSnapshot) {
		console.log(articleSnapshot.size);
	})
};

// Function that logs the article ID
function logFunction() {
	// Get the article ID. It will be null when creating a new article
	loadArticleID = sessionStorage.getItem("LoadArticleID");

	// Get the title for a new article.
	newTitle = sessionStorage.getItem("NewArticleTitle");

	console.log(loadArticleID);
	// Check if creating a new article
	if (loadArticleID == "null") {
		quill.focus();
		newArticle = true;
		console.log("NewArticle == true");
		// Remove the loading screen
		removeLoadScreen();
	} else {
		newArticle = false;
		console.log("NewArticle == false");
	}
	console.log(uID);
}

window.onload = logFunction();


// Load the article
function loadArticle(articleID) {
	// Set the path to the article in the firebase database
	if (newArticle == true) {
		// Create a new article
		console.log(newArticle);
		docRef = firestore.collection("users").doc(uID).collection("articles").doc();

		// Set the title on the page
		document.getElementById("articleTitle").value = newTitle;

	} else {
		// Set the docRef to an already existing article
		console.log(newArticle);
		docRef = firestore.collection("users").doc(uID).collection("articles").doc(articleID);

		// Load the document data
		docRef.get().then(function(documentData) {
			if (documentData.exists) {
				// The document exists
				// Get the docData
				var docData = documentData.data();

				// Get the article title
				var docTitle = docData.title;
				// Set the title
				//documentTitleRef.value = docTitle;

				// Get the text
				var docText = docData.text;

				// Call the setText function, which sets the text
				setText(docText);

				// Set the title on the page
				document.getElementById("articleTitle").value = docTitle;

				console.log("Text loaded");

				// Remove the loading screen
				removeLoadScreen();

			} else {
				// The document does not exist
				console.log("Error: document does not exist"); 
			}
		}).catch(function(error) {
			// Got an error while loading document
			console.log("Error getting document: ", error)
		})
	}

	console.log(newArticle);
	console.log(articleID);
	console.log(docRef);
}


// The function that loads the text onto the page
function setText(rawText) {
	// Turn the string into the required JSON object
	manipulatedData = JSON.parse(rawText);
		
	// Load the manipulated text into the quilljs editor
	quill.setContents(manipulatedData);
}

// The function that removes the loading screen
function removeLoadScreen() {
	var loadScreen = document.getElementById("loadingScreen");
	loadScreen.setAttribute("hidden", "true");
}



// Loading a document: quill.setContents(documentDelta);

function myCallFunction() {
	console.log("Function successfully called");
}







function publishArticle() {
	console.log("Publishing document");
}