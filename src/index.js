// Imports
var fs = require('fs');

// Init variables
var regServer = /^--gServer=(.*)/;
var runClient = false;
var gConfig = false;
var Travis = false;

// Configs values
var countServers = 1;

// Run PlitherWeb
process.argv.forEach(function(val) {
	if ( val == '--travis' ) {
		Travis = true;
	} else if ( val == '--client' ) {
		runClient = true;
	} else if (regServer.test(val)) {
		gConfig = regServer.exec(val)[1];
	}
});

if( runClient ){
	var GameClient = require('./GameClient');
	var gameClient = new GameClient(Travis);
	gameClient.start();
} else {
	var GameServer = require('./GameServer');
	var gameServer = new GameServer((fs.existsSync( gConfig ) ? gConfig : './configs/GameServer.json'), Travis);
	gameServer.start();
}