var mongoose = require("mongoose");

var dbURI = "mongodb://localhost/polygon";

mongoose.connect(dbURI);

var readLine = require("readline");
if (process.platform === "win32") {
  var rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on("SIGINT", function() {
    process.emit("SIGINT");
  });
}

mongoose.connection.on("connected", function() {
  console.log("Mongoose connected to " + dbURI);
});
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose disconnected");
});
mongoose.connection.on("error", function() {
  console.log("Mongoose connection error");
});

var gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log("Mongoose disconnected through " + msg);
    callback();
  });
};

process.once("SIGUSR2", function() {
  gracefulShutdown("nodemon restart", function() {
    process.kill(process.pid, "SIGUSR2");
  });
});

process.on("SIGINT", function() {
  gracefulShutdown("app termination", function() {
    process.exit(0);
  });
});

process.on("SIGTERM", function() {
  gracefulShutdown("Heroku app shutdown", function() {
    process.exit(0);
  });
});

require("./images");
