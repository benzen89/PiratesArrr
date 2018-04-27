/*
This is the game logic. Each marker will show a clue to which marker to find next. In Hamina the markers are attached to flagpoles and the clues are related to the flags' symbolism. For example a certain flag may be represented emojis for water, snow and cross. The clue tells the user to look for a flag with blue, white and a cross.

Progress is stored as HTML5 web storage
*/

var activeClue;	//the clue stored in the country marker
var countries = ["denmark", "sweden", "estonia", "latvia", "lithuania"];
var clues = {denmark: "sweden", sweden: "estonia", estonia: "latvia", latvia: "lithuania", lithuania: "denmark"};

function Start(){
	DisplayProgress();
	window.setInterval(Update, 500);	//update once every half second
}

function Update(){
	CheckMarkers();
}

function CheckMarkers(){
	CheckSingleMarker("denmark", "lithuania");
	CheckSingleMarker("sweden", "denmark");
	CheckSingleMarker("estonia", "sweden");
	CheckSingleMarker("latvia", "estonia");
	CheckSingleMarker("lithuania", "latvia");
}

function CheckSingleMarker(markerCountry, clueAnswerCountry){
	var iden = "#" + markerCountry;
	if(document.querySelector(iden).object3D.visible == true){
		if(activeClue == null && activeClue !== markerCountry){
			SetClueTo(markerCountry);
		} else if(activeClue == clueAnswerCountry){
			CorrectAnswer(clueAnswerCountry);
			SetClueTo(markerCountry);
		}
	}
}

function CancelClue(){
	activeClue = null;
	console.log(activeClue);
	DisplayClue("no");
	document.getElementById('cancel-sound').play();
}

function SetClueTo(cntry){
	if(localStorage.getItem(cntry) !== "cleared"){
		activeClue = cntry;
		DisplayClue(clues[cntry.toString()]);
		console.log(activeClue);
	} else{
		console.log("already selected");
	}
	document.getElementById('select-sound').play();
}

function CorrectAnswer(cntry){
	if(localStorage.getItem(cntry) !== "cleared"){
		console.log("Correct answer!");
		StoreProgress(cntry);
		DisplayFlag(cntry);
		document.getElementById('success-sound').play();
	} else{
		console.log("already cleared");
	}
}

function StoreProgress(cntry){
	if (typeof(Storage) !== "undefined") {
    	localStorage.setItem(cntry.toString(), "cleared");
	} else {
    	// Sorry! No Web Storage support.
	}
}

function DisplayClue(image){
	document.getElementById("active-clue").src = 'img/' + image + '_clue.png';
}

function DisplayFlag(cntry){
	var myDiv = document.getElementById("cleared-flags");
	var oimg = document.createElement("img");
	oimg.setAttribute('src', 'img/' + cntry.toString() + '.png');
	oimg.setAttribute('height', '20');
	oimg.setAttribute('width', '30');
	myDiv.appendChild(oimg);
}

function DisplayProgress(){
	var myDiv = document.getElementById("cleared-flags");
	var i;
	for(i = 0; i < localStorage.length; i++){
		if(localStorage.getItem(localStorage.key(i)) == "cleared"){
			var oimg = document.createElement("img");
			oimg.setAttribute('src', 'img/' + countries[(i-1)] + '.png');
			oimg.setAttribute('height', '20');
			oimg.setAttribute('width', '30');
			myDiv.appendChild(oimg);
		}
	}
}