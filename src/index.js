// Init variables
var runMaster = true;
var Travis = false;

// Handle arguments
process.argv.forEach(function(val) {
    if (val == "--nomaster") {
        runMaster = true;
    } else if (val == "--travis") {
        Travis = true;
    } else if (val == "--help") {
        console.log("Proper Usage: node index.js [--nomaster]");
        console.log("    --nomaster          Run the game server.");
        console.log("    --travis            Run travis debug");
        console.log("    --help              Help menu.");
        console.log("");
    }
});

if (runMaster) {
    // Initialize the master server
    var MasterServer = require('./MasterServer');
    var masterServer = new MasterServer(Travis);
    masterServer.start();
} else {
    // Initialize the game server
    var GameServer = require('./GameServer');
    var gameServer = new GameServer();
    gameServer.start();
}