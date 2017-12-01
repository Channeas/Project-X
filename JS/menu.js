var menuOptions = [];
var menuLinks = [];
var alt = [];
function menuRender() {
	// The different menu options
	if(menuPref == "editor") {
		menuOptions = ["Save", "Publish", "Exit editor"];
		menuLinks = ["javascript:saveDocument()", `onclick="publishArticle()" `, "editorindex.html"];
	} else if(menuPref == null) {
		menuOptions = ["Discover", "Subscriptions", "Readlists", "Profile", "Editor"];
		menuLinks = ["#", "#", "#", "profile.html", "editorindex.html"];
	}

	// Get the div where the menu is going to be placed in
	var menuLocation  = document.getElementById("sideMenu");

	// The div for the button that opens the menu
	var crOpenButtonDiv = document.createElement("div");
	crOpenButtonDiv.setAttribute("id", "openbutton");

	//The "i" tag that contains the button
	var crOpenButton = document.createElement("i");
	crOpenButton.setAttribute("class", "fa fa-bars fa-3x");
	crOpenButton.setAttribute("aria-hidden", "true");
	crOpenButton.setAttribute("onclick", "openNav()");

	// The first div surrounding the menu, but not the open menu button
	var crDiv1 = document.createElement("div");
	crDiv1.setAttribute("class", "meny sidenav");
	crDiv1.setAttribute("id", "mysidenav");

	// Create the nav tag in the menu
	var crMyNav = document.createElement("nav");
	crMyNav.setAttribute("class", "navbar navbar-default navbar-fixed-side ")

	// Create the exit button in the menu
	var crExitButton = document.createElement("a");
	crExitButton.setAttribute("href", "javascript:void(0)");
	crExitButton.setAttribute("class", "closebtn");
	crExitButton.setAttribute("onclick", "openNav()");
	crExitButton.innerHTML = "&times;";

	// Create the menu list
	var crMenuList = document.createElement("ul");
	crMenuList.setAttribute("class", "nav alignBottom");

	// Create the list options

	for(i = 0; i <= menuOptions.length-1; i++){
		var currentAlt = i+1;
		// Create the li element
		alt[i] = document.createElement("li");

		// Set the attributes for the li element
		alt[i].setAttribute("class", "limeny");
		alt[i].setAttribute("id", "alt" + currentAlt);
		//alt[i].innerHTML = menuOptions[i];

		// Create the a element inside the li element
		var crListA = document.createElement("a");

		// Set which function is called when a button is clicked
		crListA.setAttribute("href", menuLinks[i]);
		crListA.innerHTML = menuOptions[i];
		alt[i].appendChild(crListA);
		console.log(i);
		if(i == menuOptions.length-1) {
			alt[i].setAttribute("class", "limeny lastMenuAlt");
			console.log("Class set");
		}
	}





	/////////////////////////////
	// Append all the elements //
	/////////////////////////////

	// Append the div for the button
	menuLocation.appendChild(crOpenButtonDiv);

	// Append the "i" tag (practically the button)
	crOpenButtonDiv.appendChild(crOpenButton);

	// Append the first div
	menuLocation.appendChild(crDiv1);
	
	// Append the nav tag within the first div
	crDiv1.appendChild(crMyNav);

	// Append the exit button
	crMyNav.appendChild(crExitButton);

	// Append the ul tag (the menu list)
	crMyNav.appendChild(crMenuList);

	// Append the menu options
	for(i = 0; i <= menuOptions.length-1; i++){
		crMenuList.appendChild(alt[i]);
	}	

}

window.onload = menuRender();

// The code for the menu open button
var navOut = false;
var buttonHidden = false;
var sideNav = document.getElementById("mysidenav");
var openButton = document.getElementById("openbutton");

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