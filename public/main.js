$.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=BD515B8A421E653175305DDCDA2B4BD9&steamid=76561197960434622&format=json', (err, data) => {
  alert(data);
});
