var express = require('express');
var router = express.Router();

var mongoose = require('../models/index');
var Player = mongoose.model('Player');

/*
 * GET userlist.
 */
router.get('/playerlist', function(req, res) {
    Player.find(function (err, players) {
        if (err) return console.error(err);
        res.json(players);
    });
});

/*
 * POST to adduser.
 */
router.post('/saveplayer', function(req, res) {
    var newPlayer = new Player(req.body);
    newPlayer.save(function(err, newPlayer, result){
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

/*
 * POST to updateuser.
 */
router.post('/updateplayer/:id', function(req, res) {
    Player.update({_id:req.params.id}, req.body, function(err, result){
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

/*
 * DELETE to deleteuser.
 */
router.post('/deleteplayer/:id', function(req, res) {
    Player.remove({_id:req.params.id}, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});


module.exports = router;