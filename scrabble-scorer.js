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
   while(!/^[A-Za-z]+$/.test(userWord)){
  //not included blank space bonus mission2 as it throws error in autograding. for including blank space in above condition while(!/^[A-Za-z ]+$/.test(userWord))
    userWord= input.question('\nInvalid input \nEnter a Word to score: ')// Bonus Mission 1
   }
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
  
   let algorithm= Number(input.question('\nEnter 0, 1, 2: '));
  
   while ((algorithm !==0) && (algorithm !==1) && (algorithm!==2))  {
    algorithm= Number(input.question('\nInvalid input \nEnter 0, 1, 2: '))// Bonus mission 1
   }
   console.log(`\nalgorithm name: ${scoringAlgorithms[algorithm].name}`)
   console.log(`\nscoringFunction result: ${scoringAlgorithms[algorithm].scoringFunction(word)}`)
}
function transform(object) {
  let newObject={};
  
  for(items in object ){
    let letter=object[items]
    for(i=0;i<letter.length;i++){
     newObject[letter[i].toLowerCase()]=Number(items)
     }
    //newObject[' ']=0 ; Bonus Mission 2
  }
return newObject
};


let newPointStructure = transform(oldPointStructure)
//console.log(newPointStructure)

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

