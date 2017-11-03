var inquirer = require("inquirer");

var fs = require('fs');

var cardData = require('./basicCard.json');

function basicCard(frontside, backside) {
	this.front = frontside;
	this.back = backside; 
}

function createNewCard(){
inquirer.prompt([{
	type : "input",
	name : "frontside",
	message : "What question do you want to ask?"
},{
	type : "input",
	name : "backside",
	message : "What is the answer to the above question?"
}]).then(function(inputs){
	var card = new basicCard(inputs.frontside, inputs.backside);
	cardData.push(card);
	var newCardData = JSON.stringify(cardData, null, '\t');
	fs.writeFile('./basicCard.json', newCardData, function(err){
		if(err) throw err;
		console.log("Done."); 
	})
})
}
createNewCard();