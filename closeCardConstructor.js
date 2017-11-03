var inquirer = require("inquirer");

var fs = require('fs');

var cardData = require("./clozeCard.json")

function clozeCard(fullText, answer){
	var clozePositions = clozeDelete(fullText, answer);
	this.partial = getPartial(fullText,clozePositions);
	this.answer = answer; 

	function clozeDelete(fullText,answer) {
		var start = fullText.indexOf(answer);
		if (start !== -1){
			return [start, start+answer.length];
		}
		throw new Error("Could not find answer in fullText");
		}
	function getPartial(fullText,clozePositions){
		var start = fullText.slice(0, clozePositions[0]);
		var end = fullText.slice(clozePositions[1],fullText.length);
		return start+"..."+end;
	}
	}
	function createNewCard(){
inquirer.prompt([{
	type : "input",
	name : "frontside",
	message : "What is the fullTextof the card you want to make?"
},{
	type : "input",
	name : "backside",
	message : "What is the answer to the card?"
}]).then(function(inputs){
	var card = new clozeCard(inputs.frontside, inputs.backside);
	cardData.push(card);
	var newCardData = JSON.stringify(cardData, null, '\t');
	fs.writeFile('./clozeCard.json', newCardData, function(err){
		if(err) throw err;
		console.log("Done."); 
	})
})
}
createNewCard();
