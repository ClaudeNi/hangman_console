// This is Hang Man.

function askQuestion(query) {
  var readline = require('readline');

  var rl = null;
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false 
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }))
} 

var words = ["Chicken", "Wonderful", "Earth", "Computer", "Code", "Apple", "JavaScript", "Fate", "Soldier", "Weapon", "Food", "Blade", "Moon", "Keyboard", "Mouse", "Screen", "Sun"];
var mistakes = 10;

startGame();


// prints out the logo and rules to start the game.
async function startGame() {
	var chosenWord = words[Math.floor(Math.random() * words.length)]; //chooses a random word from the list of words available to play with.
	var wordArr = [];
	var checkArr = [];
	for (var i = 0; i < chosenWord.length; i++) {
		wordArr.push(chosenWord[i]);
		checkArr.push(false);
	}
	printIntro();
	
	var ifBeaten = false;
	while(mistakes > 0 && !ifBeaten) {
		console.log("\nYou have " + mistakes + " mistakes left!");
		var wordStr = "";
		console.log("Your word is:");
		for (i = 0; i < wordArr.length; i++) {
			if (checkArr[i]) {
				wordStr += wordArr[i];
			} else {
				wordStr += "*";
			}
		}
		console.log(wordStr);
		var letterCheck = false;
		const guess = await askQuestion("What is your guess?\n");
		if (guess.length === 1 && guess.match(/[a-z]/i)) {
			for (i = 0; i < wordArr.length; i++) {
				if (wordArr[i] == guess || wordArr[i] == guess.toUpperCase() || wordArr[i] == guess.toLowerCase()) {
					checkArr[i] = true;
					letterCheck = true;
				}
			}
			if (!letterCheck) {
				mistakes--;
			}
		} else {
			console.log("---------Please type in only 1 letter and nothing else!---------");
		}
		if (checkIfBeaten(checkArr)) {
				ifBeaten = true;
		}
	}
	
	if (ifBeaten) {
		console.log("\n---------\nCongratulations! You have guessed the correct word! Which was \"" + chosenWord + "\".\nThanks for playing!");
	} else {
		console.log("\n---------\nUnforunately you lost... \nThe word was \"" + chosenWord + "\".");
	}
	process.exit()
}

// Prints the intro.
function printIntro() {
	console.log("\n /$$   /$$");
	console.log("| $$  | $$");
	console.log("| $$  | $$  /$$$$$$  /$$$$$$$   /$$$$$$        /$$$$$$/$$$$   /$$$$$$  /$$$$$$$ ");
	console.log("| $$$$$$$$ |____  $$| $$__  $$ /$$__  $$      | $$_  $$_  $$ |____  $$| $$__  $$");
	console.log("| $$__  $$  /$$$$$$$| $$  | $$| $$  | $$      | $$ | $$ | $$  /$$$$$$$| $$  | $$");
	console.log("| $$  | $$ /$$__  $$| $$  | $$| $$  | $$      | $$ | $$ | $$ /$$__  $$| $$  | $$");
	console.log("| $$  | $$|  $$$$$$$| $$  | $$|  $$$$$$$      | $$ | $$ | $$|  $$$$$$$| $$  | $$");
	console.log("|__/  |__/ |_______/|__/  |__/ |____  $$      |__/ |__/ |__/ |_______/|__/  |__/");
	console.log("                               /$$  | $$");
	console.log("                              |  $$$$$$/");
	console.log("                               |______/");
	console.log("\nHello and welcome to a game of Hang Man!");
	console.log("The game is simple! You receive a random word, and you have to guess what letters make up this word.");
	console.log("You guess letter by letter until you have the full word, but be careful! You only get to make 10 mistakes!");
}

// Checks if the player has guessed the entire word.
function checkIfBeaten (arr) {
	for (i = 0; i < arr.length; i++) {
		if (arr[i] == false) {
			return false;
		}
	}
	return true;
}