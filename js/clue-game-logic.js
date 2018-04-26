/*
This is the game logic. Each marker will show a clue to which marker to find next. In Hamina the markers are attached to flagpoles and the clues are related to the flags' symbolism. For example a certain flag may be represented emojis for water, snow and cross. The clue tells the user to look for a flag with blue, white and a cross.

Progress is stored as HTML5 web storage
*/

function startUpdate(){
	window.setInterval(update, 1000);
}

function update(){
	console.log("update called");
	checkMarkers();
}

function checkMarkers(){
	if(document.querySelector("#denmark").object3D.visible == true){
		console.log("Denmark detected");
	}
	if(document.querySelector("#sweden").object3D.visible == true){
		console.log("Sweden detected");
	}
	if(document.querySelector("#estonia").object3D.visible == true){
		console.log("Estonia detected");
	}
	if(document.querySelector("#latvia").object3D.visible == true){
		console.log("Latvia detected");
	}
	if(document.querySelector("#lithuania").object3D.visible == true){
		console.log("Lithuania detected");
	}
}