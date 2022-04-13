let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/

let arrayComparison = [];

document.body.onload = startGame();


/*creiamo la variabile globale interval 
per poterla poi ripulire ogni volta che si inizia il gioco.*/
var interval;
var s = 0, m = 0, h = 0;
function startTimer() {
    s = 0, m = 0, h = 0;

    interval = setInterval(function () {
        document.getElementById("timer").innerHTML = h + " h " + m + " m " + s + " s";
        s++;
        if (s == 6) {
            //mostra le icone per i primi 5 secondi 
            for (var i = 0; i < arrayAnimali.length; i++) {
                document.getElementsByClassName("icon")[i].classList.toggle("show");
            }
        }
        if (s == 60) {
            m++;
            s = 0;
        }
        if (m == 60) {
            h++;
            m = 0;
        }
    }, 1000)
}
// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe fine 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer
var find = document.getElementsByClassName("find");
var modal = document.getElementById('modal');
var timer = document.querySelector(".timer");

//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}
// una funzione che rimuove la classe active e chiama la funzione startGame()
function playAgain() {
    modal.classList.remove("active");
    startGame();
}
// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, 
// pulisce tutti gli elementi che eventualmente contiene
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto

function startGame() {
    clearInterval(interval);


    var arrayShuffle = shuffle(arrayAnimali);
    var lista = document.getElementById("griglia");
    while (lista.hasChildNodes()) {
        lista.removeChild(lista.firstChild);
    }

    startTimer();


    for (var i = 0; i < arrayAnimali.length; i++) {
        var box = document.createElement("div");
        var element = document.createElement("div");
        element.className = "icon show";
        document.getElementById("griglia").appendChild(box).appendChild(element);
        element.innerHTML = arrayShuffle[i];


    }



    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    for (var i = 0; i < icons.length; i++) {

        icons[i].addEventListener("click", displayIcon);
        icons[i].addEventListener("click", modalOn);
    }
}

function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];

    //mette/toglie la classe show
    this.classList.toggle("show");
    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function (item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function () {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function (item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < find.length; i++) {
                        find[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
}

//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte
function modalOn() {
    if (find.length == arrayAnimali.length) {
        clearInterval(interval);
        modal.classList.add("active");
        document.getElementById("tempoTrascorso").innerHTML = document.getElementById("timer").innerHTML;
    }

}

// una funzione che nasconde la modale alla fine e riavvia il gioco

// una funzione che calcola il tempo e aggiorna il contenitore sotto



