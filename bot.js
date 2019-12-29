const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready',() => {
	console.log("Connected as, " + client.user.tag)

	client.user.setActivity("Discord", {type: "WATCHING"})
	
	console.log("Servers: test")
	client.guilds.forEach((guild) => {
		console.log(guild.name)
		guild.channels.forEach((channel) => {
			console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
		})
		//General channel id: 654595783907344393
	})
	
	let generalChannel = client.channels.get("654595783907344393")
	generalChannel.send("Hello, everyone.")
})

client.on('message', (receivedMessage) => {
	if (receivedMessage.author == client.user) {
		return
	}
	receivedMessage.channel.send("Message received: " + receivedMessage.author.toString() 
		+ ": " + receivedMessage.content)
	if (receivedMessage.content.startsWith("!")) {
		processCommand(receivedMessage)
	}
})

function processCommand(receivedMessage) {
	var fullCommand = receivedMessage.content.substr(1)
	var splitCommand = fullCommand.split(" ")
	var primaryCommand = splitCommand[0]
	var arguments = splitCommand.slice(1)
	
	
	if (primaryCommand == "help") {
		helpCommand(arguments, receivedMessage)
	} else if (primaryCommand == "multiply") {
		multiplyCommand(arguments, receivedMessage)
	} else {
		receivedMessage.channel.send("Unknown command. Try `!help` or `!multiply`")
	}
}

function multiplyCommand(arguments, receivedMessage) {
	if (arguments.length < 2) {
		receivedMessage.channel.send("Not enough arguments. Try `!multiply 2 10`")
		return
 }
 let product = 1
 arguments.forEach((value) => {
 	product = product * parseFloat(value)
 })
 receivedMessage.channel.send("The product of " + arguments + " is " + product.toString())
}



function helpCommand(arguments, receivedMessage) {
	if (arguments.length == 0) {
		receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
	} else {
		receivedMessage.channel.send("It looks like you need help with " +arguments)
	}
}



client.login(process.env. .token)
