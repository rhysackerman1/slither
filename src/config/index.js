module.exports = {
    // Client Configs
	serverPort: process.env.PORT || 8000,
	serverName: "Plither",
	serverUrl: "slither.gq",
	gameservers: [
		{
			ip: "127.0.0.1",
			po: 8080
		}
	],
    // Server Configs
    port: 8080,
    bots: 0, // Not Implemented
    maxConnections: 100,
	highscoreName: "How to change Highscore Msg",
	highscoreMsg: "Set this message in the config",
    food: 20000,
    foodColours: 8,
    foodSize: [15, 47],
    foodPerSpawn: 1000, // Not Implemented
    gameRadius: 21600,
    sectorSize: 480
};