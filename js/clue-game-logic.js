/*
This is the game logic. Each marker will show a clue to which marker to find next. In Hamina the markers are attached to flagpoles and the clues are related to the flags' symbolism. For example a certain flag may be represented emojis for water, snow and cross. The clue tells the user to look for a flag with blue, white and a cross.

Progress is stored as HTML5 web storage
*/

var current_clue;	//the clue stored in the country marker

function startUpdate(){
	window.setInterval(update, 1000);
}

function update(){
	console.log(current_clue);
	checkMarkers();
}

function checkMarkers(){
	if(document.querySelector("#denmark").object3D.visible == true){
		if(current_clue == null){
			setClueTo("Denmark");
		} else if(current_clue == "Lithuania"){
			correctAnswer();
			setClueTo("Denmark");
		}
	}
	if(document.querySelector("#sweden").object3D.visible == true){
		if(current_clue == null){
			setClueTo("Sweden");
		} else if(current_clue == "Denmark"){
			correctAnswer();
			setClueTo("Sweden");
		}
	}
	if(document.querySelector("#estonia").object3D.visible == true){
		if(current_clue == null){
			setClueTo("Estonia");
		} else if(current_clue == "Sweden"){
			correctAnswer();
			setClueTo("Estonia");
		}
	}
	if(document.querySelector("#latvia").object3D.visible == true){
		if(current_clue == null){
			setClueTo("Latvia");
		} else if(current_clue == "Estonia"){
			correctAnswer();
			setClueTo("Latvia");
		}
	}
	if(document.querySelector("#lithuania").object3D.visible == true){
		if(current_clue == null){
			setClueTo("Lithuania");
		} else if(current_clue == "Latvia"){
			correctAnswer();
			setClueTo("Lithuania");
		}
	}
}

function cancelClue(){
	current_clue = null;
}

function setClueTo(cntry){
	current_clue = cntry;
}

function correctAnswer(){
	console.log("Correct answer!");
}