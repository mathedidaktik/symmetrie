/* Hinweis: In dieser Datei wird der Haupteil des Codes ausgeführt.  */

/* Definition des Canvases */

const canvas = document.querySelector('.main'); /* Aktiver Mal Canvas */
const mainCtx = canvas.getContext('2d');
 
const mirrorCanvas = document.querySelectorAll('.mirror'); /* Canvas für Spiegelungen */
const ctx = [];

const typeCanvas = document.querySelector('.type'); /* Canvas über übergelagerte Markierungen */
const typeCtx = typeCanvas.getContext('2d');

/* Berechnung der Fenstergröße */

let WIDTH = 0; /* Ausnahme: Variable in Großbuchstaben zur Unterscheidung */

/* Überprüfen, ob die Seite im Hochformat oder Querformat geladen wurde, um dann die richtige Höhenangaben für die Berechung zu wählen. */

 if(window.innerWidth > window.innerHeight) {
  WIDTH = window.innerHeight-100; /*Falls es auf Safari angepasst werden soll, dann ändere den Wert 80*/
}else if(window.innerWidth < window.innerHeight) {
  WIDTH = window.innerWidth-100;
} 

const HEIGHT = WIDTH;

/* Größe des Canvases festlegen */

canvas.width = WIDTH;
canvas.height = HEIGHT;

typeCanvas.width = WIDTH;
typeCanvas.height = HEIGHT;

mirrorCanvas.forEach((canv) => { /* Anpassen der Größe für jedes Mirror Canvas */
  ctx.push(canv.getContext('2d')); /* Array ctx wird mit allen Mirror Canvases gefüllt */
  canv.width = WIDTH;
  canv.height = HEIGHT;
});

/* Definieren eines Hintergrundes (Wichtig für den Download) */

const background = document.querySelector('.background');
background.style.width = WIDTH + 'px';
background.style.height = HEIGHT + 'px';

/* Definieren des Grids */

const grid_size = document.querySelector('.grid');
grid_size.style.width = WIDTH + 'px';
grid_size.style.height = HEIGHT + 'px';

/* Definieren des Help-Fenster */

const help_size = document.querySelector('.help');
help_size.style.width = WIDTH + 'px';
help_size.style.height = HEIGHT + 'px';

const canvasbox_size= document.querySelector('.canvasBox');
canvasbox_size.style.width = WIDTH + 'px';
canvasbox_size.style.height = HEIGHT + 'px';

/* Definieren des User-Inputs & Array für Speichern der Ebenen */

let touchPosition = {
    x: 0,
    y: 0,
}

let saves = []; 
let positionOfSave = -1; /* Gibt an wo sich gerade der Fortschritt befindet, zeichnet die Draw History auf */

/* Variablen Definition von Farbe, Malstatus und ob gemalt wird */

let color = 'hsl(0, 0%, 0%)'; 
let painting = false;
let typeOfDrawing = 'normal'; /* Standard Malstatus */

/* Setzen der Startposion bei Input */

const startPosition = (touch) => {
    if(touchE && touch !== 'yes') return; /* Ist der Parameter Touch gleich yes, wenn nicht return */
    painting = true; /* Treffen die oberen beiden Bedingungen nicht zu dann kann gemalt werden */
    draw(touch);
}

/* Setzen der Endpositon bei Input */

const finishedPosition = () => {
    painting = false;
    ctx.forEach((c) => {
      c.beginPath();
    })
}

/* Malfunktion bei Input */

const draw = (touch) => {
    if(!painting) return; /* Überprüfung ob gerade aktiv gemalt wird */

    if(touch === 'yes') { /* Überprüfung ob Inputbewegung durch Touch */
          touchPosition.y -= window.innerHeight * 0.1 - 10 ;
          touchPosition.x -= document.querySelector('.menu__left').offsetWidth;
    }

    ctx.forEach((c) => {
      c.lineWidth = 3;
      c.lineCap = 'round';
      c.strokeStyle = color;
      c.fillStyle = color;
    });

    switch(typeOfDrawing) {
        case 'normal':
          normalDraw();
          break;
        case 'x':
          xDraw();
          break;
        case 'y':
          yDraw();
          break;
        case 'd1':
          d1Draw();
          break;
        case 'd2':
          d2Draw();
          break;
        case 's2':
          sDraw();
          break;
        case 's3':
          sDraw();
          break;
        case 's4':
          sDraw();
          break;
        case 's5':
          sDraw();
          break;
        case 's6':
          sDraw();
          break;
        case 's10':
          sDraw();
          break;
        case 'd4':
          normalDraw(); /* Nutzt normalDraw() Funktion um Code zu sparen */
          d4Draw();
          break;
     /* case 'xandy':
          xyDraw();
          break; */ 
     /* case 'd1d2':
          d1d2Draw();
          break;  */
      default:
        normalDraw();
        break;
    }
}

/* Definition von Symmetriefunktionen mit Positionsinformationen (X,Y,d1,2)  */

const normalDraw = () => {
  ctx[0].lineTo(touchPosition.x, touchPosition.y);
  ctx[0].stroke();
  ctx[0].beginPath();
  ctx[0].moveTo(touchPosition.x, touchPosition.y);
}

/*Achsensymmetrie*/

const xDraw = () => {
  ctx[0].lineTo(touchPosition.x, touchPosition.y);
  ctx[0].stroke();
  ctx[0].lineTo(touchPosition.x, touchPosition.y);
  ctx[0].stroke();

  ctx[1].lineTo(WIDTH - touchPosition.x, touchPosition.y);
  ctx[1].stroke();
  ctx[1].lineTo(WIDTH - touchPosition.x, touchPosition.y);
  ctx[1].stroke();
}

const yDraw = () => {
  ctx[0].lineTo(touchPosition.x, touchPosition.y);
  ctx[0].stroke();
  ctx[0].lineTo(touchPosition.x, touchPosition.y);
  ctx[0].stroke();

  ctx[1].lineTo(touchPosition.x, HEIGHT - touchPosition.y);
  ctx[1].stroke();
  ctx[1].lineTo(touchPosition.x, HEIGHT - touchPosition.y);
  ctx[1].stroke();
}

//es kann für spätere Entwicklung hilfreich sein, es ist x und y achsen zusammengefügt!
/* const xyDraw=()=>{
  ctx[0].lineTo(touchPosition.x, touchPosition.y);
  ctx[0].stroke();
  ctx[0].lineTo(touchPosition.x, touchPosition.y);
  ctx[0].stroke();

  ctx[1].lineTo(WIDTH - touchPosition.x, touchPosition.y);
  ctx[1].stroke();
  ctx[1].lineTo(WIDTH - touchPosition.x, touchPosition.y);
  ctx[1].stroke();

  ctx[2].lineTo(WIDTH - touchPosition.x, HEIGHT - touchPosition.y);
  ctx[2].stroke();
  ctx[2].lineTo(WIDTH - touchPosition.x, HEIGHT - touchPosition.y);
  ctx[2].stroke();

  ctx[3].lineTo(touchPosition.x, HEIGHT - touchPosition.y);
  ctx[3].stroke();
  ctx[3].lineTo(touchPosition.x, HEIGHT - touchPosition.y);
  ctx[3].stroke();
} */

const d1Draw = () => {
  ctx[0].lineTo(touchPosition.x, touchPosition.y);
  ctx[0].stroke();
  ctx[0].lineTo(touchPosition.x, touchPosition.y);
  ctx[0].stroke();

  ctx[1].lineTo(touchPosition.y, touchPosition.x);
  ctx[1].stroke();
  ctx[1].lineTo(touchPosition.y, touchPosition.x);
  ctx[1].stroke();
}

const d2Draw = () => {
  ctx[0].lineTo(touchPosition.x, touchPosition.y);
  ctx[0].stroke();
  ctx[0].lineTo(touchPosition.x, touchPosition.y);
  ctx[0].stroke();

  ctx[1].lineTo(HEIGHT - touchPosition.y, WIDTH - touchPosition.x);
  ctx[1].stroke();
  ctx[1].lineTo(HEIGHT - touchPosition.y, WIDTH - touchPosition.x);
  ctx[1].stroke();
}


//es kann für spätere Entwicklung hilfreich sein, es ist x=y und x=-y achsen zusammengefügt!

/* const d1d2Draw = () => {
  ctx[0].lineTo(touchPosition.x, touchPosition.y);
  ctx[0].stroke();
  ctx[0].lineTo(touchPosition.x, touchPosition.y);
  ctx[0].stroke();

  ctx[1].lineTo(touchPosition.y, touchPosition.x);
  ctx[1].stroke();
  ctx[1].lineTo(touchPosition.y, touchPosition.x);
  ctx[1].stroke();

  ctx[2].lineTo(WIDTH - touchPosition.x, HEIGHT - touchPosition.y);
  ctx[2].stroke();
  ctx[2].lineTo(WIDTH - touchPosition.x, HEIGHT - touchPosition.y);
  ctx[2].stroke();

  ctx[3].lineTo(HEIGHT - touchPosition.y, WIDTH - touchPosition.x);
  ctx[3].stroke();
  ctx[3].lineTo(HEIGHT - touchPosition.y, WIDTH - touchPosition.x);
  ctx[3].stroke();

} */

/*Drehsymmetrie*/

const sDraw = () => {
  /* Eine Funktion für unterschiedliche Ausführungen, code sparend */
  const times = parseInt(typeOfDrawing.slice(1)); /* Wir schneiden den ersten Buchstaben des typeOfDrawing ab (s6 --> 6);
													Umwandeln der übriggebliebenen Zahl in einen Integer damit man mit ihm rechnen kann */
  for(let i = 0; i<times; i++) { 
    ctx[i].translate(WIDTH/2, HEIGHT/2); /* Teil das Canvas durch 2 */
    ctx[i].rotate(( (360 / times * i) ) * Math.PI / 180); /* rad= deg * Math.PI/180.*/
    /* Abhängig von der Anzahl der Durchgänge Ausrichtung bestimmen, immer gegenüberliegende Punkte je nach Anzahl der Wiederholungen */
    /*console.log(360/times*i); //Degree
    console.log(((360/times*i))*Math.PI/180); zum Testen*/
    ctx[i].lineTo(touchPosition.x - WIDTH/2, touchPosition.y - HEIGHT/2); /* Linie abhängig von der Mitte aus */
    ctx[i].stroke(); /* Malen der Striche */
    ctx[i].lineTo(touchPosition.x - WIDTH/2, touchPosition.y - HEIGHT/2);
    ctx[i].stroke();
    ctx[i].setTransform(1, 0, 0, 1, 0, 0); /* Reset der Skalierung sodass keine Verzerrung auftritt */
  }
}

/*Verschiebungssymmetrie*/

function d4Draw() {
  let xC = 0; /* Indikator für den aktiven Canvas */

  /* Definieren des aktiven Canvas abhängig von derTouchposition */

  if(touchPosition.x >= WIDTH/4 && touchPosition.x < WIDTH/4*2) xC = 1; /* Tritt ein wenn die Spalte benutzt wird */
  if(touchPosition.x >= WIDTH/4*2 && touchPosition.x < WIDTH/4*3) xC = 2;
  if(touchPosition.x >= WIDTH/4*3 && touchPosition.x < WIDTH) xC = 3;

  for(let i=0; i<4; i++){ /* For-Schleife geht durch 3 Runden um die Symmetrien einzuzeichen auf Mirror-Canvas */
    ctx[i].drawImage(mirrorCanvas[0], (i-xC) * WIDTH/4, 0); 
  }
}



const saveFunction = () => {
  ctx.forEach((c, index) => { 
    mainCtx.drawImage(mirrorCanvas[index], 0, 0); /* Mal unseren Inhalt des Hauptcanvas in ein Mirror Canvas */
    c.clearRect(0,0,WIDTH,HEIGHT);
  });

  if(saves.length > positionOfSave && positionOfSave >= 0) {
    saves = saves.slice(0, positionOfSave + 1); /* Position beim ersten Malen festlegen */
  }

  saves.push(canvas.toDataURL('image/png')); /* Speichert Zwischenstand in das Saves Array */
  positionOfSave++;
}

let touchE = false;
let touchType;

/* Event Listeners für Touch-Input */

canvas.addEventListener('touchstart', (e) => {
    touchE = true;
    touchType = e.touches[0].touchType; /* Fragt den Touch Type ab und zu erfahren, ob mit der Hand oder einem Stift gemalt wird */
    touchPosition.x = e.touches[0].clientX;
    touchPosition.y = e.touches[0].clientY;
    if(touchType == "stylus" || touchType == undefined){ /* Wenn Touch Type Stylus oder undefined ist dann wird der Malvorgang gestartet. Touch Type undefined ist für die Emulation im Browser notwendig, da dort kein Stylus eingesetzt werden kann. */
    startPosition('yes');
  }
});

canvas.addEventListener('touchend', () => {
  touchE = true;
  finishedPosition();
  saveFunction();
});


canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    touchPosition.x = e.touches[0].clientX;
    touchPosition.y = e.touches[0].clientY;
    touchE = true;
      draw('yes');
},
 false
);

/* Verhindern des Kontextmenüs, sodass das Malen nicht unterbrochen wird */

canvas.addEventListener('contextmenu', (e) => { e.preventDefault(); 
});