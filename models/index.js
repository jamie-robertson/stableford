/*
* Relationships
* ----------------------
* Course has many holes
* Player has many rounds
* Round has 1 course
* Round has many scores
* */

var mongoose = require('mongoose');
var Schema = Schema = mongoose.Schema;

var playerSchema = Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    nationalHandicap: Number,
    hand: String,
    round: [{
        type: Schema.Types.ObjectId,
        ref: 'Round'
    }]
});

var roundSchema = Schema({
    round: Number,
    courseName: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    score: [{
        type: Schema.Types.ObjectId,
        ref: 'Score'
    }]
});

var scoreSchema = Schema({
    score: Number
});

var courseSchema = mongoose.Schema({
    courseName: String,
    courseDifficulty: String,
    courseLocation: [{
        address1: String,
        address2: String,
        county: String,
        telephone: Number,
        email: String
    }],
    courseHoles: [{
        type: Schema.Types.ObjectId,
        ref: 'Hole'
    }]
});

var holeSchema = Schema({
    course: [{
      type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    holeName: String,
    holeNumber: Number,
    holePar: Number,
    holeIndex: Number
});


//Register models
var Player = mongoose.model('Player', playerSchema);
var Round = mongoose.model('Round', roundSchema);
var Score = mongoose.model('Score', scoreSchema);
var Course = mongoose.model('Course', courseSchema);
var Hole = mongoose.model('Hole', holeSchema);

module.exports = mongoose;