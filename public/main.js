var form = document.getElementById('form');
var steamid = document.getElementById('steamid');
var result = document.getElementById('result');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var json = JSON.parse(xhttp.responseText);
      var game = json.game;
      result.innerHTML = game;
    }
  };
  xhttp.open("GET", "/random/" + steamid.value, true);
  xhttp.send();
});
