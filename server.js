var express = require('express');
var app = express();
var request = require('request');
var _ = require('underscore');
var apiKey = process.env.API_KEY;
app.get('/findid/:user', (req, res) => {
  request('http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key='+apiKey+'&vanityurl='+req.params.user, (err, response, body) => {
    if(err) throw err;
    var json = JSON.parse(body);
    res.end(json.response.steamid);
  })
});
app.get('/:id', (req, res) => {
  var id = req.params.id;
  request('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key='+process.env.API_KEY+'&steamid='+id+'&format=json', function (err, response, body) {
    if(err) throw err;
    var json = JSON.parse(body);
    var games = json.response.games;
    var gameId = _.sample(games).appid;
    console.log(gameId);
    request('http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key='+apiKey+'&appid='+gameId, (err, response, body) => {
      if(err) throw err;
      var json = JSON.parse(body);
      var game = json.game.gameName;
      res.end(gameId + '\n' + game);
    });
  })
});

app.listen(process.env.PORT);
