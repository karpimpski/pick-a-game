var express = require('express');
var app = express();
var request = require('request');
var _ = require('underscore');
var apiKey = process.env.API_KEY;

app.get('/random/:user', (req, res) => {
  request('http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key='+apiKey+'&vanityurl='+req.params.user, (err, response, body) => {
    if(err) throw err;
    var json = JSON.parse(body);
    var id = json.response.steamid;
    request('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key='+process.env.API_KEY+'&steamid='+id+'&format=json&include_appinfo=1&include_played_free_games=1', (err, response, body) => {
      if(err) throw err;
      var json = JSON.parse(body);
      var games = json.response.games;
      var game = _.sample(games).name;
      res.end(game);
    })
  })

});

app.listen(process.env.PORT);
