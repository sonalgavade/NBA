var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
    Player : String,
    Tm : String,
    season17_18 : String
});

module.exports = mongoose.model('players', playerSchema);
