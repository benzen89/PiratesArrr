/*
This is the game logic. Each marker will show a clue to which marker to find next. In Hamina the markers are attached to flagpoles and the clues are related to the flags' symbolism. For example a certain flag may be represented emojis for water, snow and cross. The clue tells the user to look for a flag with blue, white and a cross.

Progress is stored as HTML5 web storage
*/

var activeClue = null;	//the clue stored in the country marker
var clues = {denmark: "sweden", sweden: "estonia", estonia: "latvia", latvia: "lithuania", lithuania: "denmark"};
var markerVisible = false;
var clueChanged = false;
var wrongAnswerOnce = false;

//start the main loop onload in <body>
function Start(){
	DisplayProgress();
	window.setInterval(Update, 500);	//update once every half second
	if(localStorage.getItem("debug")){
		localStorage.removeItem("debug");
	}
}

//main loop
function Update(){
	CheckMarkers();
}

//These should preferably be run on an event when the marker becomes visible.
function CheckMarkers(){
	CheckSingleMarker("denmark", "lithuania");
	CheckSingleMarker("sweden", "denmark");
	CheckSingleMarker("estonia", "sweden");
	CheckSingleMarker("latvia", "estonia");
	CheckSingleMarker("lithuania", "latvia");
	CheckWrongAnswer();
}

//Check if a specific marker is visible. Correct answer if the current clue and answer match.
function CheckSingleMarker(markerCountry, clueAnswerCountry){
	var iden = "#" + markerCountry;
	if(document.querySelector(iden).object3D.visible == true){
		markerVisible = true;
		if(activeClue == null && activeClue !== markerCountry){	//empty & not already active -> runs once
			SetClueTo(markerCountry);
		} else if(activeClue == clueAnswerCountry){
			CorrectAnswer(clueAnswerCountry);
			SetClueTo(markerCountry);
		}
	}
}

//Indicate if wrong answer was given
function CheckWrongAnswer(){
	if(markerVisible && !clueChanged && !wrongAnswerOnce){
		wrongAnswerOnce = true;
		document.getElementById('wrong-sound').play();
	}
	if (!markerVisible){
		clueChanged = false;	//reset after marker is not visible
		wrongAnswerOnce = false;
	}
	markerVisible = false;
}

//Remove set active clue to null
function CancelClue(){
	activeClue = null;
	DisplayClue("no");
	document.getElementById('cancel-sound').play();
}

//Set clue to specific country
function SetClueTo(cntry){
	activeClue = cntry;
	DisplayClue(clues[cntry.toString()]);
	document.getElementById('select-sound').play();
	clueChanged = true; //this is for detecting for wrong answers
}

function CorrectAnswer(cntry){
	if(localStorage.getItem(cntry) !== "cleared"){
		StoreProgress(cntry);
		DisplayFlag(cntry);
		document.getElementById('success-sound').play();
	}
	if(localStorage.length > 4){
		console.log("5/5");
		document.getElementById('victory-sound').play();
	}
}

//save progress in browser local storage
function StoreProgress(cntry){
	if (typeof(Storage) !== "undefined") {
    	localStorage.setItem(cntry.toString(), "cleared");
	} else {
    	// Sorry! No Web Storage support.
	}
}

//visualize active clue on screen
function DisplayClue(image){
	document.getElementById("active-clue").src = 'img/' + image + '_clue.png';
}

//visualzie cleared flags on screen
function DisplayFlag(cntry){
	var myDiv = document.getElementById("cleared-flags");
	var oimg = document.createElement("img");
	oimg.setAttribute('src', 'img/' + cntry.toString() + '.png');
	oimg.setAttribute('height', '20');
	oimg.setAttribute('width', '30');
	myDiv.appendChild(oimg);
}

//visualize flags cleared in previous session
function DisplayProgress(){
	var myDiv = document.getElementById("cleared-flags");
	var i;
	for(i = 0; i < localStorage.length; i++){
		if(localStorage.getItem(localStorage.key(i)) == "cleared"){
			console.log(localStorage.key(i));
			var oimg = document.createElement("img");
			oimg.setAttribute('src', 'img/' + localStorage.key(i) + '.png');
			oimg.setAttribute('height', '20');
			oimg.setAttribute('width', '30');
			myDiv.appendChild(oimg);
		}
	}
}

function ToggleHowToPlay(){
	if(document.getElementById("how-to-play").style.display == 'none'){
		document.getElementById("how-to-play").style.display = 'block';
	} else {
		document.getElementById("how-to-play").style.display = 'none';
	}
}

function DeleteProgress(){
	localStorage.clear();
	var myNode = document.getElementById("cleared-flags");
	while (myNode.firstChild) {
	    myNode.removeChild(myNode.firstChild);
	}
	document.getElementById('cancel-sound').play();
	CancelClue();
	ToggleHowToPlay();
	//debug: *:error,*:info,*:warn
}