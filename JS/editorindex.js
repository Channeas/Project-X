var navOut = false;
var buttonHidden = false;
var sideNav = document.getElementById("mysidenav");
var openButton = document.getElementById("openbutton");

var user, uID, name, docRef, articleCount, currentArticleID;


// The ref to firestore
var firestore = firebase.firestore();

// This is what customizes the menu
var menuPref = null;


function openNav() { // Knappen för att öppna menyn
    if(navOut===false) {
	    sideNav.classList.add("sidenav-width");
	    console.log("Navbar is now out");
	    navOut = true;
	} else if(navOut===true) {
		sideNav.classList.remove("sidenav-width");
		navOut = false;
	};
};

firebase.auth().onAuthStateChanged(function(user) {
    user = firebase.auth().currentUser;
    uID = user.uid;
    console.log(user);
    console.log(uID);
    docRef = firestore.collection("users").doc(uID).collection("articles");
    console.log(docRef)

    if (user) {
    	// User is signed in.
    	name = firebase.auth().currentUser.displayName;
    	// Call the function that loads the data
    	loadData();
    	//document.getElementById("signedInAs").innerHTML = name;
    } else {
    	// No user is signed in.
    	console.log("error");
    }
});

// The function that loads the data from the firebase database
function loadData() {
	// Load all documents in the docRef
	docRef.get().then(function(documentLoad) {
		// Set the articleCount to equal documentLoad.size
			articleCount = documentLoad.size;
		// Check if there are any documents
		if(documentLoad.size > 0) {
			// Call the appendData() function for each doc
    		documentLoad.forEach(function(doc) {
    			var currentData = doc.data();

    			// Save all the required data into variables
    			var docTitle = currentData.title;
    			var docCreated = currentData.created;
    			var docEdited = currentData.edited;
    			var docWords = currentData.words;
    			var docID = doc.id;

    			// Call the function that appends the data into elements on the page
    			appendData(docTitle, docCreated, docEdited, docWords, docID);

    			/*console.log(doc.id, " => ", doc.data());
    			console.log(currentData.title); */
    		});
    		// console.log(documentLoad.size);
    	} else { // There are no documents
    		console.log("No documents to load");
    		noDocs();
    	};
    });
};

// Remove the hidden class from the noDocsDiv div
function noDocs() {
 	var noDocsDiv = document.getElementById("noDocsDiv");
 	noDocsDiv.classList.remove("hide");
};

// The function that creates the article elements and appends the required data into those elements
function appendData(title, created, edited, words, id) {

	// Create a reference to where the articles are going to be placed
	var articleRef = document.getElementById(articleLocation);

	// Create the article div
	var crArticleDiv = document.createElement("div");
	crArticleDiv.setAttribute("class", "article");
	crArticleDiv.setAttribute("id", id);
	// crArticleDiv.setAttribute("onclick", "redirectToEditor(this.id)");

	// Create the articletitle div
	var crArticleTitle = document.createElement("div");
	crArticleTitle.setAttribute("class", "articleTitle");
	crArticleTitle.setAttribute("id", id + ".title");
	crArticleTitle.innerHTML = title;

	// Create the articleCreated
	var crArticleCreated = document.createElement("div");
	crArticleCreated.setAttribute("class", "articleCreated");
	crArticleCreated.innerHTML = "Created: " + created;

	// Create the articleLastEdited
	var crArticleLastEdited = document.createElement("div");
	crArticleLastEdited.setAttribute("class", "articleLastEdited");
	crArticleLastEdited.innerHTML = "Last edited: " + edited;

	// Create the articleWordCount
	var crArticleWordCount = document.createElement("div");
	crArticleWordCount.setAttribute("class", "articleWordCount");
	crArticleWordCount.innerHTML = "Words: " + words;

	// Create the buttons div
	var crArticleButtonDiv = document.createElement("div");
	crArticleButtonDiv.setAttribute("class", "articleButtonDiv"); 

	// Create the edit button
	/*
	var crArticleEditButton = document.createElement("button");
	crArticleEditButton.setAttribute("class", "articleButton");
	crArticleEditButton.setAttribute("id", "articleEditButton");
	crArticleEditButton.innerHTML = "Edit"; */

	// Create the edit button
	var crArticleEditButton = document.createElement("a");
	crArticleEditButton.setAttribute("class", "ph-button ph-btn-blue");
	//crArticleEditButton.setAttribute("id", "articleEditButton");
	//crArticleEditButton.setAttribute("onclick", "redirectToEditor(this.parentNode.parentNode.id)");
	crArticleEditButton.setAttribute("onclick", "showOverlay(this.parentNode.parentNode.id)");
	crArticleEditButton.innerHTML = "Edit";

	// Create the publish button
	var crArticlePublishButton = document.createElement("a");
	crArticlePublishButton.setAttribute("class", "ph-button ph-btn-green");
	crArticlePublishButton.setAttribute("onclick", "publishArticle(this.parentNode.parentNode.id)");
	crArticlePublishButton.innerHTML = "Publish";

	// Create the delete button
	var crArticleDeleteButton = document.createElement("a");
	crArticleDeleteButton.setAttribute("class", "ph-button ph-btn-red deleteArticleButton");
	crArticleDeleteButton.setAttribute("onclick", "deleteArticle(this.parentNode.parentNode.id)");
	crArticleDeleteButton.innerHTML = "Delete";

	///////////////////////////////////
	// Append all the above elements //
	///////////////////////////////////

	// Append the article div
	articleLocation.appendChild(crArticleDiv);

	// Append the article title
	crArticleDiv.appendChild(crArticleTitle);

	// Append the articleCreated
	crArticleDiv.appendChild(crArticleCreated);

	// Append the articleLastEdited
	crArticleDiv.appendChild(crArticleLastEdited);

	// Append the articleWordCount
	crArticleDiv.appendChild(crArticleWordCount);

	// Append the button divs
	crArticleDiv.appendChild(crArticleButtonDiv);

	// Append the buttons
	crArticleButtonDiv.appendChild(crArticleEditButton);
	crArticleButtonDiv.appendChild(crArticlePublishButton);
	crArticleButtonDiv.appendChild(crArticleDeleteButton);

};

// Save the id of the article clicked and redirect the user to the editor
function redirectToEditor(articleID) {
	console.log("Redirecting...");
	console.log(articleID);
	sessionStorage.setItem("LoadArticleID", articleID);
	var LoadArticleID = sessionStorage.getItem("LoadArticleID");
	// If creating a new article set the sessionstorage to null
	console.log(LoadArticleID);

	// Redirect to the editor
	window.location.replace("editor.html");
};

// Show the overlay. The caller, passed with the function, determines what the button will say
function showOverlay(caller){
	var titleInputField = document.getElementById("articleTitle");

	console.log("Not hidden");
	console.log(caller);

	// Remove the hidden attribute
	titleOverlay.removeAttribute("hidden");

	// Create the overlayActionButton
	var crOverlayActionButton = document.createElement("button");
	//crOverlayActionButton.setAttribute("class", "overlayActionButton");
	crOverlayActionButton.setAttribute("id","overlayActionButton");


	if(caller == "createButton") {
		// Set the text, id and action of the button to create a new article
		crOverlayActionButton.setAttribute("onclick", "overlayAction('create')");
		crOverlayActionButton.setAttribute("class", "ph-button ph-btn-green");
		crOverlayActionButton.innerHTML = "Create article";

		// Make sure that the titleInputField is empty
		titleInputField.value = null;

		// Set the autofocus to the input field
		titleInputField.focus();

	} else {
		// Set the currentArticleID to be the caller
		currentArticleID = caller;

		// Get the title of the selected article
		var currentTitle = document.getElementById(caller + ".title").innerHTML;

		// Set the value of the titleInputField to be the current title of the selected article
		titleInputField.value = currentTitle;

		var crOverlayEditButton = document.createElement("button");

		// Set the onclick of the crOverlayActionButton to be overlayAction(edit)
		crOverlayEditButton.setAttribute("onclick", "redirectToEditor(currentArticleID)");

		// Set the classes of the crOverlayActionButton
		crOverlayEditButton.setAttribute("class", "ph-button ph-btn-blue");

		// Set the id of the crOverlayActionButton
		crOverlayEditButton.setAttribute("id", "overlayEditButton");

		// Set the title of the overlayActionButton to be "Save title"
		crOverlayEditButton.innerHTML = "Edit";

		// Append the crOverlayEditButton
		titleInputDiv.appendChild(crOverlayEditButton);



		// Set the onclick of the overlayActionButton to be overlayAction(edit)
		crOverlayActionButton.setAttribute("onclick", "overlayAction('editTitle')");

		// Set the classes of the crOverlayActionButton
		crOverlayActionButton.setAttribute("class", "ph-button ph-btn-green");

		// Set the title of the overlayActionButton to be "Save title"
		crOverlayActionButton.innerHTML = "Save title";
	}

	// Append the overlayActionButton
	titleInputDiv.appendChild(crOverlayActionButton);


	// Call the newArticleRedirect function and pass the title input by the user
	//newArticleRedirect(title);
}

// Perform the overlayAction, either create a new article or edit the title of an existing one
function overlayAction(action) {
	// Get the title input
	var newTitle = document.getElementById("articleTitle").value;

	if(action == "create") {
		// Call the newArticleRedirect(title) function
		console.log("Creating new article");
		newArticleRedirect(newTitle)
	} else if(action == "editTitle") {
		// Change the title here

		console.log(newTitle);

		// Set the reference to firestore
		docRef = firestore.collection("users").doc(uID).collection("articles").doc(currentArticleID);

		// Change the title in the firestore database
		docRef.set({
			title: newTitle
		}, { merge: true }).then(function() { 
			// Log a succes message to the console
			console.log("Title saved");

			// Change the title on the page
			var displayTitle = document.getElementById(currentArticleID + ".title");

			// Set the value of the title display on the page
			displayTitle.innerHTML = newTitle;

		}).catch(function (error) {
			// Catch potential errors, and log them to the console.
			console.log("Got an error: " + error);
		}) 
		console.log("Changing title");
		console.log(currentArticleID);
	}
}


// Hide the overlay
function closeOverlay(caller){
	// Check if the function was callled by clicking the closeOverlayButton
	if(caller == "btn") {
		// Remove the buttons
		var overlayActionBtn = document.getElementById("overlayActionButton");
		overlayActionBtn.parentNode.removeChild(overlayActionBtn);

		var overlayEditButton = document.getElementById("overlayEditButton");
		
		if(overlayEditButton != null) {
			overlayEditButton.parentNode.removeChild(overlayEditButton);
		}

		// Hide the overlay
		titleOverlay.setAttribute("hidden", "true");
	} else {
		console.log("Unknown caller");
	}
}

// Redirect to the editor where a new article is created
function newArticleRedirect(title) {
	// Set the sessionStorage variable to the title passed with the function
	sessionStorage.setItem("NewArticleTitle", title);

	// Set the sessionStorage variable LoadArticleID to null
	sessionStorage.setItem("LoadArticleID", null);
	
	// Redirect to the editor
	window.location.replace("editor.html");
};

// Publish the article
/*function publishArticle(articleID) {
	console.log(articleID);
	testTest();
};*/

// Delete the article
function deleteArticle(articleID) {
	console.log(articleID);
	articleLocation = firestore.collection("users").doc(uID).collection("articles").doc(articleID);
	articleLocation.delete().then(function() { // After the article has been deleted in firestore
		console.log("Document deleted");

		// Call the function that removes the article
		removeVisualDoc(articleID);

		// Remove 1 from the articleCount
		articleCount -= 1;

		// If articleCount == 0, displat the noDocs div by calling the noDocs function
		if (articleCount == 0) {
			noDocs();
		}
	}).catch(function(error) {
		console.error("Error deleting document: ", error);
	})
	// deleteCollection(firestore, articleLocation, 10);
};

// Remove the article from the current page
function removeVisualDoc(ID) {
	var docElement = document.getElementById(ID);
	docElement.parentNode.removeChild(docElement);
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// The code for deleting the article. 																	//
// If there are errors with deleting the article, look at latest the firebase firestore documentation: 	//
// https://firebase.google.com/docs/firestore/manage-data/delete-data									//
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Delete a collection, in batches of batchSize. Note that this does
 * not recursively delete subcollections of documents in the collection
 */
function deleteCollection(db, collectionRef, batchSize) {
    var query = collectionRef.orderBy('__name__').limit(batchSize);

    return new Promise(function(resolve, reject) {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
    });
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
    query.get()
        .then((snapshot) => {
            // When there are no documents left, we are done
            if (snapshot.size == 0) {
                return 0;
            }

            // Delete documents in a batch
            var batch = db.batch();
            snapshot.docs.forEach(function(doc) {
                batch.delete(doc.ref);
            });

            return batch.commit().then(function() {
                return snapshot.size;
            });
        }).then(function(numDeleted) {
            if (numDeleted <= batchSize) {
                resolve();
                return;
            }

            // Recurse on the next process tick, to avoid
            // exploding the stack.
            process.nextTick(function() {
                deleteQueryBatch(db, query, batchSize, resolve, reject);
            });
        })
        .catch(reject);
}


// This is just a testFunction
function testFunction(){
	console.log("This test works");
}