var mongoose = require('mongoose');
var Schema = Schema = mongoose.Schema;

//Player Schema
var playerSchema = Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    nationalHandicap: Number,
    scores: [{
        type: Schema.Types.ObjectId,
        ref: 'Score'
    }]
});

var scoreSchema = Schema({
    score: Number
});

//Course Schema
var courseSchema = mongoose.Schema({
    courseName: String,
    courseLocation: String
});

//hole Schema
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

var Player = mongoose.model('Player', playerSchema);
var Score = mongoose.model('Score', scoreSchema);
var Course = mongoose.model('Course', courseSchema);
var Hole = mongoose.model('Hole', holeSchema);

module.exports = mongoose;