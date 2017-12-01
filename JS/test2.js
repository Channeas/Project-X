authdata = firebase.auth().currentUser;

// Declare variables
const textEditor = document.getElementById("textEditor");
const box = document.getElementById("box");
var editorMenuHidden = true;
var editorMenuOptions = ["boxOptionH1", "boxOptionH2", "boxOptionP", "boxOptionUL", "boxOptionQT"];
var selectedOption = undefined;
var selObj = undefined; 

//////////////////////////////////////////////
// 			All the eventListeners 			//
//////////////////////////////////////////////

// The eventListeners for the editor, that triggers if a key is presed and let up of if the user clicks within the texteditor
textEditor.addEventListener("keyup", styleMenuPlacement);
textEditor.addEventListener("click", styleMenuPlacement);

// The event listener that checks is the menu button is clicked
box.addEventListener("click", showMenu)

// Remove all styling when a user pastes in rich text into the title 
document.querySelector("div[contenteditable]").addEventListener("paste", function(e) {
    e.preventDefault();
    var text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
});

// Remove all styling when a user pastes in rich text into the text editor
document.querySelector("h1[contenteditable]").addEventListener("paste", function(e) {
    e.preventDefault();
    var text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
});

// This function is called when the exit editor button is pressed. It exits the editor
function exitEditor() {
	window.location.replace("profile.html");
};

// Menu placement function
function styleMenuPlacement() {
	var selObj = window.getSelection(); 

	var rect = selObj.focusNode.parentElement.getBoundingClientRect();
	document.getElementById("box").style.top = rect.top - 4 + "px";
}

/* The code for adding a class to the selected element:
	var selObj = window.getSelection(); 
	var element = selObj.focusNode.parentElement;
	selObj.focusNode.parentElement.classList.add("head1");
	console.log(element);
*/

function showMenu() {
	if(editorMenuHidden === true) {
		// Set the menu hidden to false
		editorMenuHidden = false;

		//Adjust the height of the box
		document.getElementById("box").style.height = 150 + "px";

		// Remove the hidden attribute from the menu options
		for(i = 0; i < editorMenuOptions.length; i+= 1) {
			document.getElementById(editorMenuOptions[i]).removeAttribute("hidden");
		}

		console.log("done");
	} else {
		editorMenuHidden = true;

		//Add the attribute hidden
		for(i = 1; i< editorMenuOptions.length; i+= 1) {
			document.getElementById(editorMenuOptions[i]).setAttribute("hidden", true);
		}
		document.getElementById("box").style.height = 30 + "px";
	}
}

// Get which one of the options that was clicked, and store that option under the variable selectedOption
function boxChosen(ele) {
	if (editorMenuHidden === false) {
		console.log(selObj);
		selectedOption = ele.id;
		console.log(selectedOption);
		selectedObject.focusNode.parentElement.classList.add("head1");
	};
};