// @ts-nocheck
"use strict";

/**
 * @type {number} - Un compteur qui compte le nombre de mouvements du joueur.
 */
let compteur = 0;
/**
 * @type {number} - Le niveau courant.
 */
let niveau = 0;
/**
 * @type {state[]} - Un tableau de state.
 */
let states = [];
/**
 * @type {string[]} - Un tableau avec toutes les directions emprunté par le joueur.
 */
let directionJoueur = ["Front"];
/**
 * @type {number}Montre si c'est la première fois que le code s'execute.
 */
let first = 0;
/**
 * Un boolean qui montre si le jeu est fini.
 */
let fin = false;

/**
 * Affiche le niveau.
 * @param {number} level - Le numéro du niveau.
 */
function buildLevel(level) {
    // Supprime le niveau d'avant.
    $(".ligne, h2").remove();
    // Construit le niveau.
    for (let i = 0; i < levels[level].map.length; i++) {
        $("#world").append("<div class=ligne></div>");
        for (let j = 0; j < levels[level].map[i].length; j++) {
            const str = `.ligne:nth-child( ${i + 1} )`;
            const char = levels[level].map[i].charAt(j);

            switch (char) {
            case "\ud83e":
                $(str).append("<div class='square sol joueur joueurFront'></div>");
                break;
            case "\uddcd":
                break;
            case "x":
                $(str).append("<div class='square cible'></div>");
                break;
            case "#":
                $(str).append("<div class='square sol boite'></div>");
                break;
            case " ":
                $(str).append("<div class='square sol'></div>");
                break;
            case "@":
                $(str).append("<div class='square cible boiteSurCible'></div>");
                break;
            default:
                $(str).append("<div class='square mur'></div>");
                break;
            }
        }
    }
    $("button").show();
    directionJoueur = ["Front"];
    first = 0;
    niveau = level;
    states = [];
    states.push(new state(getPlayerPosition(), null));
    changeLevel();
}

class Position {
    /**
     * Constructeur qui initialise x et y.
     * @param {number} x - La ligne.
     * @param {number} y - La colonne.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
    * Crée une position à partir d'un string donnée.
    * @param {String} direction - la direction dans laquel le joueur veut aller.
    * @this {Position} - la position du joueur.
    * @returns {Position} - la nouvelle position du joueur.
    */
    next(direction) {
        let pos = "";
        switch (direction) {
        case "Left": pos = new Position(this.x - 1, this.y);
            break;
        case "Right": pos = new Position(this.x + 1, this.y);
            break;
        case "Front": pos = new Position(this.x, this.y + 1);
            break;
        case "Up": pos = new Position(this.x, this.y - 1);
            break;
        }
        return pos;
    }
}

/**
 * Renvoie la position du joueur.
 * @returns {Position} - La position du joueur.
 */
function getPlayerPosition() {
    const x = $(".joueur").index();
    const y = $(".joueur").parent()
        .index();
    const pos = new Position(x, y);
    return pos;
}

/**
 * Retourne la case du jeu qui se trouve à la position donnée en paramètre.
 * @param {Position} position - La position donnée.
 * @returns Un div (case du jeu).
 */
function getSquareAt(position) {
    return $("#world").children()
        .eq(position.y)
        .children()
        .eq(position.x);
}

/**
 * Déplace le joueur d’une case en fonction des touches directionnelles.
 */
function move() {
    $(document).keydown(function (event) {
        if (compteur !== levels[niveau].best * 2) {
            if (!allOnTarget()) {
                if (event.key === "ArrowLeft") {
                    deplacement("Left");
                } else if (event.key === "ArrowRight") {
                    deplacement("Right");
                } else if (event.key === "ArrowDown") {
                    deplacement("Front");
                } else if (event.key === "ArrowUp") {
                    deplacement("Up");
                }
            }
        } else {
            alert("vous avez perdu car vous avez fait trop de coup !");
            initLevel();
        }
    });
}

/**
 * Déplace le joueur dans une direction donnée et enregistre la position du joueur dans une liste.
 * @param {string} dir - la direction où le joueur veut aller.
 */
function deplacement(dir) {
    const squarePlayer = getSquareAt(getPlayerPosition());
    const oneSquare = getSquareAt(getPlayerPosition().next(dir));
    const boxPosition = getPlayerPosition().next(dir)
        .next(dir);
    const twoSquare = getSquareAt(getPlayerPosition().next(dir)
        .next(dir));
    stopPlayer();
    if (oneSquare.hasClass("mur") || !isFree(oneSquare) && !isFree(twoSquare)) {
        squarePlayer.addClass(`joueur${dir}`);
    } else if (!containsBox(oneSquare)) {
        movePlayer(oneSquare, squarePlayer, dir);
        directionJoueur.push(dir);
        enregistrer(null);
        incrMoves();
    } else if (isFree(twoSquare)) {
        movePlayer(oneSquare, squarePlayer, dir);
        // On retire la boite.
        if (oneSquare.hasClass("boite")) {
            oneSquare.removeClass("boite");
        } else {
            oneSquare.removeClass("boiteSurCible");
        }
        directionJoueur.push(dir);
        enregistrer(boxPosition);
        // On avance la boite.
        if (twoSquare.hasClass("cible")) {
            twoSquare.addClass("boiteSurCible");
        } else {
            twoSquare.addClass("boite");
        }
        incrMoves();
    }
}

/**
 * d
 * @param {string} dir - in
 */
function movePlayer(oneSquare, squarePlayer, dir) {
    oneSquare.addClass(`joueur${dir}`);
    // Le joueur avance.
    squarePlayer.removeClass("joueur");
    oneSquare.addClass("joueur");
}

/**
 * Retire la classe (animation) joueur du div contenant le joueur.
 */
function stopPlayer() {
    const squarePlayer = getSquareAt(getPlayerPosition());
    if (squarePlayer.hasClass("joueurFront")) {
        squarePlayer.removeClass("joueurFront");
    } else if (squarePlayer.hasClass("joueurLeft")) {
        squarePlayer.removeClass("joueurLeft");
    } else if (squarePlayer.hasClass("joueurRight")) {
        squarePlayer.removeClass("joueurRight");
    } else if (squarePlayer.hasClass("joueurUp")) {
        squarePlayer.removeClass("joueurUp");
    }
}

/**
 * Vérifie si une case est vide (donc n'est pas une boite ou un mur).
 * @param {div} square - un case donnée.
 * @returns true si la case est vide sinon false.
 */
function isFree(square) {
    return !square.hasClass("boite") && !square.hasClass("boiteSurCible") && !square.hasClass("mur");
}

/**
 * Vérifie si une case donnée contiens une boite.
 * @param {div} square - une case donnée.
 * @returns true si la case contiens une boite.
 */
function containsBox(square) {
    return square.hasClass("boite") || square.hasClass("boiteSurCible");
}

/**
 * Incrémente le compteur de movements.
 */
function incrMoves() {
    compteur++;
    $("#compteur").text(compteur);
}

/**
 * Vérifie si toutes les boites sont sur des cibles.
 */
function allOnTarget() {
    if ($(".cible").length === $(".boiteSurCible").length) {
        return true;
    }
    return false;
}

/**
 * Prépare le prochain niveau et reset le compteur.
 */
function initLevel() {
    compteur = 0;
    buildLevel(niveau);
    $("#compteur").text(compteur);
}

/**
 * Permet de lancer le niveau suivant une fois la touche espace enfoncée.
 * et affiche un message de félicitations à chaque niveau réussi.
 */
function finishLevel() {
    $(document).keydown(function (event) {
        if (!fin && event.keyCode === 32 && allOnTarget()) {
            niveau++;
            if (niveau === levels.length) {
                $("#world").append("<h2>Félicitations ! Vous avez fini le jeux !</h2>");
                fin = true;
                $("#compteur").hide();
            } else {
                initLevel();
            }
        }
    });
}

/**
 * Recommence le niveau quand on clique sur le bouton "restart".
 */
function restart() {
    $("#restart").click(function () {
        initLevel();
    });
}

/**
 * Affiche une aide quand on clique sur le bouton "Comment jouer?".
 */
function displayHelp() {
    $("#help").click(function () {
        $(".modal").show();
        $(".close").click(function () {
            $(".modal").hide();
        });
        const modal = document.getElementById("myModal");
        window.onclick = function (event) {
            if (event.target === modal) {
                $(".modal").hide();
            }
        };
    });
}

/**
 * Enregistre la position du joueur et de la boite déplacée.
 * @param {Position} boxPosition - Position de la boite déplacée.
 */
function enregistrer(boxPosition) {
    states.push(new state(getPlayerPosition(), boxPosition));
}

/**
 * Fait reculer le joueur à chaque fois que l'utilisateur clique sur
 * le bouton "retour".
 */
function boutonRetour() {
    $(".retour").click(function () {
        if (states.length > 1) {
            const squareJoueur = getSquareAt(getPlayerPosition());
            const lastPositionjoueur = states[states.length - 2].getplayerPosition();
            const lastSquarejoueur = getSquareAt(lastPositionjoueur);
            const positionBoite = states[states.length - 1].getboxPosition();

            squareJoueur.removeClass("joueur");
            squareJoueur.removeClass(`joueur${directionJoueur[directionJoueur.length - 1]}`);
            lastSquarejoueur.addClass("joueur");
            if (directionJoueur.length === 1) {
                lastPositionjoueur.addClass("joueurFront");
            } else {
                lastSquarejoueur.addClass(`joueur${directionJoueur[directionJoueur.length - 2]}`);
            }
            directionJoueur.pop();
            if (positionBoite !== null) {
                const squareBoite = getSquareAt(positionBoite);
                if (squareBoite.hasClass("boite")) {
                    squareBoite.removeClass("boite");
                } else {
                    squareBoite.removeClass("boiteSurCible");
                }
                if (squareJoueur.hasClass("cible")) {
                    squareJoueur.addClass("boiteSurCible");
                } else {
                    squareJoueur.addClass("boite");
                }
            }
            states.pop();
            compteur--;
            $("#compteur").text(compteur);
        }
    });
}

function changeLevel() {
    $("#changer").click(function () {
        const niveauDemander = $("#change").val() - 1;
        if (niveauDemander >= 0 && niveauDemander <= 6) {
            initLevel2(niveauDemander);
        } else {
            alert("Doit être entre 1 et 7 !");
        }
    });
}

/**
 * Prépare le prochain niveau et reset le compteur.
 */
function initLevel2(game) {
    compteur = 0;
    niveau = game;
    buildLevel(niveau);
    $("#compteur").text(compteur);
}

$(function () {
    initLevel();
    finishLevel();
    displayHelp();
    restart();
    move();
    boutonRetour();
});
