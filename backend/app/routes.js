var players = require('./model/players');
const express = require('express');
const router = express.Router();

//to display all players
router.get('/api/players', function(req, res){

        players.find(function(err, players){

            if(err){
                res.json("Error occured while fetching players info from api");
            }
            else{
                res.json(players);
            }
        });

});

//to add new player
router.post('/api/players', function(req, res){
    //you have to first create new object for it 
    let newPlayer = new players({
        Player : req.body.Player,
        Tm : req.body.Tm,
        season17_18 : req.body.season17_18 
    });
    
    //then add to players collection
    //moongoose doesnt have insertOne method use create or save
    newPlayer.save(function(err, players){
        if(err){
            res.json(err);
        }
        else{
            res.json({msg: 'Player was added successfully to the database'});
        }
    });


});

//to update existing player info
router.put('/api/players/:id', function(req, res){
    //take the id from the url 
    // console.log(req.params);
    players.findOneAndUpdate({_id : req.params.id}, {
        $set : {
            Player: req.body.Player,
            Tm: req.body.Tm,
            season17_18: req.body.season17_18
        }
    }, function (err, result) {
            if(err){
                res.json(err);
            }
            else{
                console.warn("Update was successfull");
                res.json(result);
            }
            
        }
    );
    //check if we have the same id in our document
    //if yes update the details for it 

});

//to delete specific player info
router.delete('/api/players/:id', function(req, res){

    players.findByIdAndDelete({_id : req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            // console.log("update and set was successfull");
            res.json(result);
        };
    });

});

module.exports = router;
//this is used if you use 3 in server.js
// module.exports = function(app){

// app.get('/api/players', function(req, res){
// });

// }
