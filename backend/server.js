const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.static("public"));
const expressServer = app.listen(4000);

const socketio = require("socket.io");
const io = socketio(expressServer, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
});

const snakes = {};

io.on("connection", (socket) => {
	console.log(`New client connected: ${socket.id}`);


    socket.on("disconnect", () => {
        console.log("Client disconnected");
        delete snakes[socket.id];
    });

    setInterval(() => {
        socket.emit("updateSnakes", "testSnakes" );
    }, 1000);

});