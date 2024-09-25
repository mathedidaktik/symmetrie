/* Hinweis: Aufgrund der vielen Schaltflächen und Interaktionsmöglichkeiten habe ich die Interaktion in diese Datei ausgelagert. Dies macht das Projekt übersichtlicher. */

/* Definieren von Elementen für die Schaltfläche und Zuordnung der jeweiligen Query-Selektoren */

const buttons = {
    red: document.querySelector('.red'),
    yellow: document.querySelector('.yellow'),
    blue: document.querySelector('.blue'),
    green: document.querySelector('.green'),
    black: document.querySelector('.black'),
    clear: document.querySelector('.clear'),
    x: document.querySelector('.x'),
    y: document.querySelector('.y'),
    d1: document.querySelector('.d1'),
    d2: document.querySelector('.d2'),
    two: document.querySelector('.two'),
    three: document.querySelector('.three'),
    four: document.querySelector('.four'),
    five: document.querySelector('.five'),
    six: document.querySelector('.six'),
    ten: document.querySelector('.ten'),
    d4: document.querySelector('.displacementFour'),
    undo: document.querySelector('.undo'),
    forward: document.querySelector('.forward'),
    grid: document.querySelector('.gridButton'),
    help: document.querySelector('.helpOpen'),
    helpClose: document.querySelector('.help__close'),
    normal: document.querySelector('.normal'),
    download: document.querySelector('.save')

 /* d1d2: document.querySelector('.d1d2'), Query Selector für doppelte Spiegelachse Diagonal (optional)*/ 
 /* xandy: document.querySelector('.xandy') Query Selector für doppelte Spiegelachse Horizontal/Vertikal (optional)*/ 
}

/* Definieren der Farben in einem Array */

const colors = ['red', 'yellow', 'blue', 'green', 'black'];

/* Entfernen der Klasse "color__active" sodass diese erneut hinzugefügt werden kann */

const colorsUnactive = () => {
    colors.forEach((c) => {
        buttons[c].classList.remove('color__active');
    })
}

/* Event Listener für die Farbauswahl definieren und die Farbe als HSL-Code in der Variable "color" speichern */

buttons.red.addEventListener('click', () => {
    colorsUnactive();                           /* Entfernen der "color__active"-Klasse, um Dopplungen zu vermeiden */
    buttons.red.classList.add('color__active'); /* Hinzufügen der "color__active"-Klasse */
    color = 'hsl(0, 100%, 50%)';                /* Farbe Rot */
});

buttons.yellow.addEventListener('click', () => {
    colorsUnactive();
    buttons.yellow.classList.add('color__active');
    color = 'hsl(56, 100%, 50%)';
});
buttons.blue.addEventListener('click', () => {
    colorsUnactive();
    buttons.blue.classList.add('color__active');
    color = 'hsl(219, 100%, 50%)';
});
buttons.green.addEventListener('click', () => {
    colorsUnactive();
    buttons.green.classList.add('color__active');
    color = 'hsl(120, 100%, 28%)';
});
buttons.black.addEventListener('click', () => {
    colorsUnactive();
    buttons.black.classList.add('color__active');
    color = 'hsl(0, 0%, 0%)';
});

/* Definiert Aussehen und Farbe der Symmetrielinie  */

const setLine = (element) => {
    element.clearRect(0,0,WIDTH,HEIGHT);
    element.beginPath();
    element.strokeStyle = 'hsl(36, 0%, 50%)';
    element.lineWidth = 2;
}

const cross = () => {
    setLine(typeCtx);
    typeCtx.arc(WIDTH/2,HEIGHT/2,7,0,2*Math.PI,false);
//    typeCtx.moveTo(WIDTH/2 - 20, HEIGHT/2); /* Einzeichnen der Markierung in der Mitte des Canvas mit -20 auf der x-Achse */
//    typeCtx.lineTo(WIDTH/2 + 20, HEIGHT/2); /* Einzeichnen der Markierung in der Mitte des Canvas mit +20 auf der x-Achse */
//    typeCtx.moveTo(WIDTH/2, HEIGHT/2 - 20); /* Einzeichnen der Markierung in der Mitte des Canvas mit -20 auf der y-Achse */
//    typeCtx.lineTo(WIDTH/2, HEIGHT/2 + 20); /* Einzeichnen der Markierung in der Mitte des Canvas mit +20 auf der y-Achse */
    typeCtx.stroke(); /* Zeichne die Linie */
}

/* Entfernt die CSS-Klasse "active" von einem ausgewählten Schaltfläche */

const removeActive = () => {
    for(const button in buttons) {
        if(button === 'grid') continue;
        buttons[button].classList.remove('active'); /* Entferne die CSS-Klasse "active" von allen Buttons */
    }
}

/* Event Listener für den Stift definieren */

buttons.normal.addEventListener('click', () => {
    removeActive(); /* Entfernt vorhandene "active"-Klasse */
    typeOfDrawing = 'normal'; /* Setzt Malstatus */
    typeCtx.clearRect(0,0,WIDTH,HEIGHT); /* Vorbereiten des Canvas zum Malen */
    buttons.normal.classList.add('active'); /* "active"-Klasse zur Kennzeichnung hinzufügen */
});

/* Event Listner für Achsensymmetrie */

buttons.y.addEventListener('click', () => {
    typeOfDrawing = 'x'; /* Augrund der Y-Spiegelung liegt der Malbereich im X-Achsen-Bereich */
    setLine(typeCtx); 
    typeCtx.moveTo(WIDTH/2, 0); /* Definieren der Spiegelung in X-Achsen-Richtung in Bezug auf die Symmetrielinie */
    typeCtx.lineTo(WIDTH/2, HEIGHT);
    typeCtx.stroke(); /* Zeichnen der Linie */
    removeActive(); 
    buttons.y.classList.add('active'); 
});

buttons.x.addEventListener('click', () => {
    typeOfDrawing = 'y'; /* Augrund der X-Spiegelung liegt der Malbereich im Y-Achsen-Bereich */
    setLine(typeCtx);
    typeCtx.moveTo(0, HEIGHT/2); /* Definieren der Spiegelung in Y-Achsen-Richtung in Bezug auf die Symmetrielinie*/
    typeCtx.lineTo(WIDTH, HEIGHT/2);
    typeCtx.stroke();
    removeActive();
    buttons.x.classList.add('active');
});

buttons.d1.addEventListener('click', () => {
    typeOfDrawing = 'd1';
    setLine(typeCtx);
    typeCtx.moveTo(0, 0); /* Definieren der Spiegelung in X=Y-Richtung in Bezug auf die Symmetrielinie*/
    typeCtx.lineTo(WIDTH, HEIGHT);
    typeCtx.stroke();
    removeActive();
    buttons.d1.classList.add('active');
});

buttons.d2.addEventListener('click', () => {
    typeOfDrawing = 'd2';
    setLine(typeCtx);
    typeCtx.moveTo(WIDTH, 0); /* Definieren der Spiegelung in -Y=X-Richtung in Bezug auf die Symmetrielinie */
    typeCtx.lineTo(0, HEIGHT);
    typeCtx.stroke();
    removeActive();
    buttons.d2.classList.add('active');
});

/*Verschiebungssymmetrie*/

buttons.d4.addEventListener('click', () => {
    typeOfDrawing = 'd4'; /* Setzen des Malstatus */
    removeActive(); /* Entfernen der "active"-Klasse */

    /* Einzeichnen der Symmetriemarkeriungen */

    setLine(typeCtx); 
    typeCtx.moveTo(WIDTH/4, 0); 
    typeCtx.lineTo(WIDTH/4, HEIGHT);/* Teilen der absoluten Breite in 4/4 */

    typeCtx.moveTo(WIDTH/4*2, 0); 
    typeCtx.lineTo(WIDTH/4*2, HEIGHT);

    typeCtx.moveTo(WIDTH/4*3, 0); 
    typeCtx.lineTo(WIDTH/4*3, HEIGHT);
   
    typeCtx.stroke(); /* Zeichnen der Linie */
    buttons.d4.classList.add('active'); 
});

/*Drehsymmetrie*/

buttons.two.addEventListener('click', () => {
    typeOfDrawing = 's2';
    cross(); /* Fügt Markierung (Kreuz) hinzu */
    removeActive();
    buttons.two.classList.add('active');
});

buttons.three.addEventListener('click', () => {
    typeOfDrawing = 's3';
    cross();
    removeActive();
    buttons.three.classList.add('active');
});

buttons.four.addEventListener('click', () => {
    typeOfDrawing = 's4';
    cross();
    removeActive();
    buttons.four.classList.add('active');
});

buttons.five.addEventListener('click', () => {
    typeOfDrawing = 's5';
    cross();
    removeActive();
    buttons.five.classList.add('active');
});

buttons.six.addEventListener('click', () => {
    typeOfDrawing = 's6';
    cross();
    removeActive();
    buttons.six.classList.add('active');
});

buttons.ten.addEventListener('click', () => {
    typeOfDrawing = 's10';
    cross();
    removeActive();
    buttons.ten.classList.add('active');
});

/* Doppelte Spiegelachse Diagonal und Horizontal/Vertikal, optional bereits erster Ansatz zur Weiterentwicklung verfügbar  */

/*
buttons.xandy.addEventListener('click', () => {
    typeOfDrawing = 'xandy'; /* x und y zusammenfügen! Versuch?? 
    setLine(typeCtx);
    typeCtx.moveTo(WIDTH/2, 0);
    typeCtx.lineTo(WIDTH/2, HEIGHT);
    typeCtx.moveTo(0, HEIGHT/2);  /* Definieren der Spiegelung in XundY-Achsen-Richtung 
    typeCtx.lineTo(WIDTH, HEIGHT/2);
    typeCtx.stroke();
    removeActive();
    buttons.xandy.classList.add('active');
}); 

buttons.d1d2.addEventListener('click', () => {
    typeOfDrawing = 'd1d2';
    setLine(typeCtx);
    typeCtx.moveTo(WIDTH, 0); /* Definieren der Spiegelung in -Y=X-Richtung 
    typeCtx.lineTo(0, HEIGHT);
    typeCtx.moveTo(0, 0); /* Definieren der Spiegelung in X=Y-Richtung 
    typeCtx.lineTo(WIDTH, HEIGHT);
    typeCtx.stroke();
    removeActive();
    buttons.d1d2.classList.add('active');
});
*/

const loadedSave = new Image(); /* Erstellt neues Image Objekt für undo/redo/download */

buttons.undo.addEventListener('click', () => {
    mainCtx.clearRect(0,0,WIDTH,HEIGHT) /* Lösche aktuellen Canvas Inhalt */
    if(positionOfSave <= 0) { 
        positionOfSave = -1; /* Resetten der Save Position, damit nicht mehr rückgängig gemacht werden kann, als gezeichnet wurde */
        return;
    }

    loadedSave.src = saves[positionOfSave-1]; /* Setzen des der Image Quelle auf Saves Array Position -1, Wo befindet sich die letzte Version */
    loadedSave.onload = () => { 
        mainCtx.drawImage(loadedSave,0,0); /* Zeichne den abgerufenen Inhalt in das Canvas ein */
        positionOfSave--; /* Aktualisieren der neuen Draw History Position */
    }
    //console.log(positionOfSave); nur zum Testen!
});

buttons.forward.addEventListener('click', () => {
    if(positionOfSave >= saves.length - 1) return; /* Verhindern dass man in die Zukunft reisen kann --> User möchte weitergehen als das was gespeichert ist --> beenden */
    mainCtx.clearRect(0,0,WIDTH,HEIGHT); /* Lösche aktuellen Canvas Inhalt */
    loadedSave.src = saves[positionOfSave+1];
    loadedSave.onload = () => {
        mainCtx.drawImage(loadedSave,0,0); /* Zeichne den abgerufenen Inhalt in das Canvas ein */
        positionOfSave++; /* Aktualisieren der neuen Draw History Position */
    }
    //console.log(positionOfSave); nur zum Testen!
});

buttons.clear.addEventListener('click', () => {
    mainCtx.clearRect(0,0,WIDTH,HEIGHT) /* Lösche aktuellen Canvas Inhalt */

    if(saves.length > positionOfSave && positionOfSave >= 0) {
         saves = saves.slice(0, positionOfSave + 1); /* Position beim ersten Malen festlegen */
    }
        
    saves.push(canvas.toDataURL('image/png')); /* Speichert Zwischenstand in das Saves Array */
    positionOfSave++;
    });
    
/* Event Listner für Gitter */

buttons.grid.addEventListener('click', () => {
    document.querySelector('.grid').classList.toggle('show'); /* Einblenden des Grids im Hintergrund */
    buttons.grid.classList.toggle('active');
});

/* Event Listner für Download */

buttons.download.addEventListener('click', () => {
    if(saves.length) { /* Prüfen ob Saves vorhanden sind wenn TRUE dann ausführen */
        ctx[0].fillStyle = '#fff'; /* Setzten der Füllfarbe */
        ctx[0].fillRect(0,0,WIDTH,HEIGHT); /* Setzten des Füllbereichs */
        ctx[0].drawImage(canvas, 0, 0); /* Malen des weißen Hintergrunds */
        const download = document.createElement('a'); /* Erstellen eines Link Elements (für den User nicht sichtbar) */
        download.download = 'symm_download.png'; /* Setzten des Download Namens */
        download.href = mirrorCanvas[0].toDataURL('image/png'); /* Verlinken des Link auf den letzten Zwischenspeicherstand */
        download.click(); /* Simulieren des Klicks zum Download des Bildes */
        ctx[0].clearRect(0,0, WIDTH, HEIGHT); /* Löschen des Hintergrunds nach dem Download */
    }
});

/* Help Button öffnen und Schließen*/

buttons.help.addEventListener('click', () => {
    document.querySelector('.help').classList.toggle('hide');
    document.querySelector('.helpOpen').classList.toggle('active');
});

buttons.helpClose.addEventListener('click', () => {
    document.querySelector('.help').classList.toggle('hide');
    document.querySelector('.helpOpen').classList.toggle('active');
});

