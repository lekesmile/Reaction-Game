/*jshint esversion: 6 */


// The startgame event to start the game on line 7.


startgame.addEventListener('click', function () {
var nappulat = [
  document.getElementById('nappula0'),
  document.getElementById('nappula1'),
  document.getElementById('nappula2'),
  document.getElementById('nappula3')
];

// onclick-käsittelyjät kaikille nappuloille.
// same function as below but this is es6 style
// nappulat[0].onclick = function() { painallus(0) };
// nappulat[1].onclick = function() { painallus(1) };
// nappulat[2].onclick = function() { painallus(2) };
// nappulat[3].onclick = function() { painallus(3) }
nappulat[0].onclick = function () {
  painallus(0);
};

nappulat[1].onclick = function () {
  painallus(1);
};

nappulat[2].onclick = function () {
  painallus(2);
};

nappulat[3].onclick = function () {
  painallus(3);
};



var nykyinen = 0;   // nykyinen aktiivinen nappula
var ativitebutton = []; //empty array to store the active button

var startgame = document.getElementById("startgame");
var tulos =document.getElementById("tulos");
var tulosToNumber = parseInt(tulos.innerHTML);
var counting = 0;
var timecount = document.getElementById('timer'),
seconds = 0, minutes = 0, hours = 0,t;
var finalResult = document.getElementById("overlay");
var gameover = document.getElementById("gameover");



// käynnistetään kone
// arvotaan ensimmäinen aktiivinen nappula 1500ms päästä, sitten 1000ms
// 1500 on parametri setTimeout-funktiolle
// 1000 on parametri aktivoiSeuraava-funktiolle


var ajastin = setTimeout(aktivoiSeuraava, 1500, 1000);

// funktio, joka pyörittää konetta: aktivoi seuraavan nappulan ja ajastaa
// sitä seuraavan nappulanvaihdon
function aktivoiSeuraava(aika) {
  if (ativitebutton.length >= 3) {
    lopetaPeli();
    return;
  }
  // arvo seuraava aktiivinen nappula
  var seuraava = arvoUusi(nykyinen);

  ativitebutton.push(seuraava);
  // päivitä nappuloiden värit: vanha mustaksi, uusi punaiseksi
  nappulat[nykyinen].style.backgroundColor = "black"; // vanha mustaksi
  nappulat[seuraava].style.backgroundColor = "red"; // uusi punaiseksi
  getRandomInt(0, 3);
  // aseta uusi nykyinen nappula
  nykyinen = seuraava;
  ativitebutton.shift(nykyinen);
  // aseta ajastin seuraavalle vaihdolle
  console.log("Aktiivinen " + nykyinen);
  ajastin = setTimeout(aktivoiSeuraava, aika, aika);
  function arvoUusi(edellinen) {
    var uusi = getRandomInt(0, 3);
    if(uusi != ativitebutton.shift())
    return uusi;
  }
}

// Tätä funktiota kutsutaan aina, kun jotain nappulaa painetaan

function painallus(i) {
 if (i === nykyinen){
    counting = counting + 1;
    tulos.innerHTML = counting;
    console.log("Painallus ", i);
  }
  else{
  lopetaPeli();
  console.log(i);
}
}

// Game over function. Kutsu tätä funktiota, kun peli loppuu.
function lopetaPeli() {
    clearTimeout(ajastin); // pysäytä ajastin
    for (var i = 0; i < 4; i++) {
      nappulat[i].style.backgroundColor = "red"; // aseta kaikki punaisiksi
      nappulat[i].onclick = null; // disabloi nappuloiden käsittelijät
    }

  // lopputuloksen näyttämiseen. Aseta overlay-elementti näkyväksi
  // ja näytä tulos gameoover-elementissä
    finalResult.style.visibility = "visible";
    gameover.innerHTML = "Game Over ! your score is " + counting ;
    clear();
    setTimeout(function(){ location.reload(); }, 3000);
  }


  // generoi satunnaisen kokonaisluvun väliltä min - max
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }


// timer function

    function add() {
      seconds++;
      if (seconds >= 60) {
          seconds = 0;
          minutes++;
          if (minutes >= 60) {
              minutes = 0;
              hours++;
          }
      }

      timecount.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

      timer();
  }
  function timer() {
      t = setTimeout(add, 1000);
  }

  timer();

  // Stop function to stop the time when the game is over
    function clear() {
      clearTimeout(t);
  }

  // Clear function to reset the time
  function timerReset() {
      timecount.textContent = "00:00:00";
      seconds = 0; minutes = 0; hours = 0;
  }


  });
