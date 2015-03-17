var mongoose = require('mongoose');

//Player Schema
var playerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    nationalHandicap: Number
});

var Player = mongoose.model('Player', playerSchema);


//Scores Schema

var courseSchema = mongoose.Schema({
    courseName: String,
    holeOne: Number,
    holeTwo: Number,
    holeThree: Number,
    holeFour: Number,
    holeFive: Number,
    holeSix: Number,
    holeSeven: Number,
    holeEight: Number,
    holeNine: Number,
    holeTen: Number,
    holeEleven: Number,
    holeTwelve: Number,
    holeThirteen: Number,
    holeFourteen: Number,
    holeFifteen: Number,
    holeSixteen: Number,
    holeSeventeen: Number,
    holeEighteen: Number

});

var Score = mongoose.model('Score', courseSchema);

module.exports = mongoose;