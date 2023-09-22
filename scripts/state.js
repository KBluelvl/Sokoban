"use strict";

class state {

    /**
     * Constructeur state.
     * @param {Position} playerPosition - Position du joueur.
     * @param {Position} boxPosition - Position de la dernière boite déplacé.
     */
    constructor(playerPosition, boxPosition) {
        this.playerPosition = playerPosition;
        this.boxPosition = boxPosition;
    }

    /**
     * @returns La position du joueur.
     */
    getplayerPosition() {
        return this.playerPosition;
    }

    /**
     * @returns La position de la dernière boite déplacer.
     */
    getboxPosition() {
        return this.boxPosition;
    }

    /**
     * @param {Position} playerPosition - Change la position du joueur
     */
    setplayerPosition(playerPosition) {
        this.playerPosition = playerPosition;
    }

    /**
     * @param {Position} boxPosition - La position de la derière boite déplacée.
     */
    setboxPosition(boxPosition) {
        this.boxPosition = boxPosition;
    }
}
