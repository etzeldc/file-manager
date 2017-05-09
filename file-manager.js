// Include fs module
var fs = require("fs"); 

function useStdin() { //use standard input from a command line
	var input = process.stdin.read(); // reads the input and stores it for other processes under the var input

	if (input === null) { // if no input...
		return; //no retuern
	}

	// console.log(input.toString()); //consoles the input as a string

	// this converts to string, trims whitespace, and splits to array of words
	var inputSplit = input.toString().trim().split(" "); 

	if (inputSplit[0] === "cat") { // if the first argument is cat...
		 catFile(inputSplit[1]); // call this function (written below) on the next word in the command (input), thus the [1]
	} else if (inputSplit[0] === "touch") { // if the first argument is touch...
		touchFile(inputSplit[1]); // call this function (written below) on the next word in the command
	} else if (inputSplit[0] === "rm") { // if the first argument is touch...
		removeFile(inputSplit[1]); // call this function (written below) on the next word in the command
	} else if (inputSplit[0] === "replace") { // if the first argument is touch...
		findAndReplace(inputSplit[1], inputSplit[2], inputSplit[3]); // call this function (written below) on the next 3 words in the command as there are 3 arguments
	} else if (inputSplit[0] === "grep") { // if the first argument is touch...
		findLine(inputSplit[1], inputSplit[2]); // call this function (written below) on the next 2 words in the command as there are 2 arguments
	} else if (inputSplit[0] === "softrm") { // if the first argument is touch...
		confirmDel(inputSplit[1]);	// call this function (written below) on the next word in the command
	} else if (inputSplit[0] === "newdir") { // if the first argument is touch...
		createDir(inputSplit[1]); // call this function (written below) on the next word in the command
	} else if (inputSplit[0] === "losedir") { // if the first argument is touch...
		takeDir(inputSplit[1]); // call this function (written below) on the next word in the command
	}
}

process.stdin.on("readable", useStdin); // when the input is "readable", call the usestdin function on it

function catFile(fileName) { // declares a function, called catfile, that takes in a file name as an argument
	fs.readFile(fileName, function(err, data) { // calls a function that reads the file and performs a callback function (takes in the error and the data from the read file) on it 
		if (err) { // if theres an error...
			console.log(err); // console it
			return; // and no return
		}
		console.log(data.toString()); // consoles. the data argument as a string
	});
}

function touchFile(fileName) { // declares a function, called touchfile, that takes in a file name as an argument
	fs.appendFile(fileName, "", function(err) { // calls a function that appends the file entered as the first argument, appends contents of the string to the contents of the file, and runs an if-error bit
		if (err) { // if an error exists...
			console.log(err); // console it
			return; // and no return
		}

		console.log("Touched file!"); // console that the file was touched
	});
}

/*
Your assignment is to implement the following functionality:
	* remove a file
		"rm" <file name>
		> rm hello.txt
			entirely delete the file hello.txt
*/

function removeFile(fileName) { // declaring a function to take in a file name as an argument
	fs.unlink(fileName, function(err) { // calls a function that removes the file entered, and runs an error test
		if (err) { // if an error exists...
			console.log(err); // console it
			return; // and no return
		}
	});
	console.log("That file is outta here!"); // lets the user know a file has been deleted
}

/*
	* find and replace a word in the file
		"replace" <file to search> <word to replace> <replacement word>
		> replace hello.txt hello goodbye
			replace all instances of hello in hello.txt with goodbye
		> replace what.txt there their
			replace all instances of there in what.txt with their
*/
function findAndReplace(fileName, oldWord, newWord) { // declares a function that takes in three parameters: a file name, a word to search for, and a word to replace it with
	fs.readFile(fileName, function(err, data) { // calls a function that reads the file entered, and runs an error test or processes the data read
		if (err) { // if an error exists...
			console.log(err); // console it
			return; // and no return
		} // if there wasn't an error, we'll continue on with operations
		var fileStr = data.toString().split(oldWord).join(newWord); // declaring a var to hold the the data read (as an array), but first turning it into a string, splitting at every sought word, and joining with the replacing word
		fs.writeFile(fileName, fileStr, function(err) { // calls a function to write the file under the provided file name, uses the new var, and runs am error test
			if (err) { // if an error exists...
				console.log(err); // console it
				return; // and no return
			}
		});
		console.log("Replaced " + oldWord + " with " + newWord + "!"); // lets the user know this word was replaced with that word
	});
}

/*
	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"
*/

function findLine(fileName, someWord) { // declares a function that takes in two arguments: a file name and a word to look for
	fs.readFile(fileName, function(err, data) { // calls a function to read the provided file name, and runs an error test or processes the files data
		if (err) { // if an error exists...
			console.log(err); // console it
			return; // and no return
		} // if there wasn't an error, we'll continue on with operations
		var arrOfLines = data.toString().split("\n"); // declares a var to hold the data read (in an array) by turning it into a string and splitting it at every line break
		for (var i = 0; i < arrOfLines.length; i++) { // counts through the length of the array of strings
			if (arrOfLines[i].includes(someWord)) { // checks to see if the current string in the count includes the provided sought after word
				console.log("This line has the word: " + arrOfLines[i]); // if it does, it will console that line for the user
			}
		}
	});
}

/*
	Bonus work:
		* Ask for confirmation before deleting a file
		*** Still need to figure out how to run through the secondary input and comment out***
*/
function useScdIn(input2) {
    input2 = process.stdin.read();

    if (input2 === null) {
        return;
    }

    input2 = input2.toString().trim();

  	if (input2 === "yes") {
		fs.unlink(fileName, function(err) {
			if (err) {
				console.log(err);
				return;
			}
		});
    } else if (input2 === "no") {
        console.log("The file was not deleted.")
    }
}

function confirmDel(fileName) {
	console.log("Are you sure you want to delete this file? Enter: 'yes' or 'no'");
	useScdIn();
}


/*
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
*/

/*
		* Have grep take a regular expression as the word to find
*/

/*
		* Create mkdir and rmdir
*/

function createDir(directory) { // declares a function that takes in a new directory's name as its argument
	fs.mkdir(directory, function(err) { // calls a function that creates a new directory using the provided name, and runs an error test
		if (err) { // if an error exists...
			console.log(err); // console it
			return; // and no return
		}
		console.log("Created a new directory called: " + directory + "!"); // lets the user know a new directory was created by the name provided
	});
}

function takeDir(directory) { // declares a function that takes in a directory to be deleted's name as its argument
	fs.rmdir(directory, function(err) { // calls a function that removes a directory using the provided name, and runs an error test
		if (err) { // if an error exists...
			console.log(err); // console it
			return; // and no return
		}
		console.log("Say goodbye to my little friend!"); // lets the user know a directory has been deleted
	});
}