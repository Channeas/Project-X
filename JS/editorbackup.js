// Backup of old editor replaced by quilljs
// Backup of CSS and HTML at the bottom
authdata = firebase.auth().currentUser;

// Declare variables
const textEditor = document.getElementById("textEditor");
const box = document.getElementById("box");
var editorMenuHidden = true;
var editorMenuOptions = ["boxOptionH1", "boxOptionH2", "boxOptionP", "boxOptionUL", "boxOptionQT"];
var selectedOption = undefined;
var selObj = undefined
var idk; 

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
	console.log("hello text")
	var selObj = window.getSelection(); 
	idk = selObj;
	console.log(selObj);
	console.log(idk);
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

		console.log(idk);

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

	var sel = window.getSelection ? window.getSelection() : document.selection.createRange(); // FF : IE
	if(sel.getRangeAt){ // thats for FF
	    var range = sel.getRangeAt(0);
	    var newNode = document.createElement("span");
	    newNode.setAttribute('class', 'someclass');
	    range.surroundContents(newNode);

	}

		/* var selObj = styleMenuPlacement(selObj) */
		console.log(selObj);
		selectedOption = ele.id;
		console.log(selectedOption); 
		// selectedObject.focusNode.parentElement.classList.add("head1");
	};
};

/* CSS backup

body {
	background-color: #fafafa;
}

#backgroundBox {
	height:100%;
	position:fixed;
	width:50%;
	margin-left:25%;
	background-color:#fff;
	z-index: -1; 
	margin-top: -5px;
}

.inputArea {

	margin-left:25%;
	margin-top:-20px;
	width: 40%;
	height:100%;
	padding-left: 5%;
	padding-right: 5%;
}

#textEditor {
	margin-top: 200px;
	outline: none;
	line-height: 1.5em;
	text-decoration: none;
	color:#000;
	font-family: "Libre Franklin";
	
	font-weight: 1.25em;
}

#textEditor > p {
	
	font-weight: 1.25em;
}

#titleInput {
	font-family: "Libre Franklin";
	transition: all 0.25s ease;

	margin-left: 25%;
	padding-left: 5%;
	padding-right: 5%;
	padding-top: 0.5em;
	padding-bottom: 0.5em;
	text-decoration: none;
	width:40%;
	position:absolute;
	background-color: #3f3f3f;
	color: #fff;
	outline: none;
	font-size:2.5em;
	height:1em;
}

#titleInput:focus {
	transition: all 0.25s ease;
	background-color: #2a2a2a;
}

.head1 {
	font-size: 1.75em;
	font-weight: bold;
	background-color: #fafafa;
	padding-left: 5%;
	padding-top:0.5em;
	padding-bottom:0.5em;
	
}

#boxOptionQT {
	font-size: 60px;
}

#box {

	position: absolute;
	color: #fff;
	top: 205px;
	left: 27%;
	width: 30px;
	height: 30px;
	transition: background-color 0.5s;
	background-color: #bdbdbd;
	transition: all 0.5s ease;
}

#box > ul > li:hover {
	background-color: #7e7e7e;
}

#box > ul > li {
	width: 30px;
	height: 30px;
	list-style: none;
	font-size:1.5em;
	margin-left:-40px;

}

#box > ul > li > p {
	margin-top:	1px;
	text-align: center;
}

#boxOptionH1 {
	margin-top:-15px;
}
*/


/* HTML backup

<!DOCTYPE HTML>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Editor</title>
	<script src="https://www.gstatic.com/firebasejs/4.3.0/firebase.js"></script>
	<link href="https://fonts.googleapis.com/css?family=Libre+Franklin" rel="stylesheet">
	<link rel="stylesheet" href="CSS/stylesheet.css">
	<link rel="stylesheet" href="CSS/editor.css">
</head>
<body>
	<!-- The white background box -->
	<div id="backgroundBox"></div>
	
	<div class="wrapper">

		<button id="goToProfile" type="button" onclick="exitEditor()">
			Exit editor
		</button>

		<h1 id="titleInput" contenteditable="true" spellcheck="false">
			The title of your article
		</h1>

		<div class="inputArea">
			<!-- The actual text editor -->
			<div id="textEditor" contenteditable="true" spellcheck="false" autofocus> 
				<p id="p1"> Write here </p>
			</div>
		</div>

		<div id="box">
			<ul id="boxOptions">
				<li id="boxOptionH1" onclick="boxChosen(this)"> <p> H1 </p> </li>
				<li id="boxOptionH2" onclick="boxChosen(this)" hidden> <p> H2 </p> </li>
				<li id="boxOptionP"	 onclick="boxChosen(this)" hidden> <p> P </p> </li>
				<li id="boxOptionUL" onclick="boxChosen(this)" hidden> <p> UL </p> </li>
				<li id="boxOptionQT" onclick="boxChosen(this)" hidden> <p> " </p> </li>
			</ul>
		</div>


	</div>
</body>
<script src="JS/app.js"></script>
<script src="JS/editor.js"></script>
*/