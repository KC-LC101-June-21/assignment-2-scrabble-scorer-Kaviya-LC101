// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
  let scrabblePoints=0
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      scrabblePoints +=Number(pointValue)
		 }
 
	  }
	}
	//console.log(letterPoints);
  return scrabblePoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let userWord= input.question('Enter a Word to score: ')
   return userWord
  // console.log(oldScrabbleScorer(userWord));
   
};


function simpleScore(word){
  let simpleScorePoints=word.length;
  return simpleScorePoints;
}


function vowelBonusScore(word){
  let vowelBonusScorePoints=0;
  word=word.toUpperCase();
  vowel=['A','E','I','O','U'];
  for(i=0;i<word.length;i++){
    if(vowel.includes(word[i])){
      vowelBonusScorePoints +=3;
    }
    else{
      vowelBonusScorePoints +=1;
    }
  }
  return vowelBonusScorePoints;
}

/*let simpleScore={
  name: 'Simple',
  description: 'One point per Character',
  scoringFunction: simpleScore
};
let vowelBonusScore ={
  name: 'Vowel Bonus',
  description: 'Vowels are worth 3 points',
  scoringFunction: vowelBonusScore,
}
let scrabbleScore ={
   name: 'Scrabble',
  description: 'Uses Scrabble point system',
  scoringFunction: scrabbleScore,
}*/
//const scoringAlgorithms = [simpleScore,vowelBonusScore,scrabbleScore];

const scoringAlgorithms=[
  {name: 'Simple',description: 'One point per Character',scoringFunction: simpleScore},
  {name: 'Vowel Bonus',description: 'Vowels are worth 3 points',scoringFunction: vowelBonusScore},
  {name: 'Scrabble',description: 'Uses Scrabble point system',scoringFunction: scrabbleScore}
];

function scorerPrompt(word) {
  console.log('Which scoring algorithm would you like to use?')
  for(i=0;i<scoringAlgorithms.length;i++){
    console.log(`\n${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`)
  }
  
   let algorithm= input.question('\nEnter 0, 1, 2: ');
   console.log(`\nalgorithm name: ${scoringAlgorithms[algorithm].name}`)
   console.log(`\nscoringFunction result: ${scoringAlgorithms[algorithm].scoringFunction(word)}`)
}
function transform(object) {
  let newObject={};
  
  for(items in object ){
    let letter=object[items]
    for(i=0;i<letter.length;i++){
     newObject[letter[i].toLowerCase()]=items
    }
    
  }
return newObject
};

let newPointStructure = transform(oldPointStructure)

function scrabbleScore(word){
  word = word.toLowerCase();
  let scrabblePoints=0
  for(i=0;i<word.length;i++){
   
    scrabblePoints +=Number(newPointStructure[word[i]])
  
  }
  return scrabblePoints
}


//console.log(newScrabbleScore('kaviya'))
function runProgram() {
   let scoreword=initialPrompt();
   scorerPrompt(scoreword)
  
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

