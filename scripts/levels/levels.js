"use strict";

/**
 * @typedef {Object} Level Description d'un niveau de Sokoban.
 * @property {"easy" | "medium" | "difficult"} difficulty La dificulté du jeu.
 * @property {number} [best] Le nombre minimal de mouvement pour gagner.
 * @property {string[]} map
 * La carte du niveau, ligne par ligne, avec la signification suivante pour chaque symbole :
 *   * `🧍` – le joueur,
 *   * `x` – une cible,
 *   * `#` – une boite,
 *   * `@` – une boite sur une cible,
 *   * ` ` – (espace) le sol,
 *   * *autre* – un mur.
 */

/**
 * Structure de données *globale* pour les données concernant les différents niveaux du jeu.
 * @type {Level[]}
 */
const levels = [
    {
        difficulty: "easy",
        best: 10,
        map: [
            "          ",
            "   ┌─┐    ",
            "   │x│    ",
            "   │ └──┐ ",
            " ┌─┘#🧍#x│ ",
            " │x # ┌─┘ ",
            " └──┐#│   ",
            "    │x│   ",
            "    └─┘   ",
            "          ",
        ],
    },
    {
        difficulty: "easy",
        best: 89,
        map: [
            "           ",
            " ┌───┐     ",
            " │🧍  │ ┌─┐ ",
            " │ ##│ │x│ ",
            " │ # └─┘x│ ",
            " └┬┐    x│ ",
            "  ├┘  ╷  │ ",
            "  │   ├──┘ ",
            "  │   │    ",
            "  └───┘    ",
            "           ",
        ],
    },
    {
        difficulty: "easy",
        best: 33,
        map: [
            "        ",
            "  ┌──┐  ",
            " ┌┘  │  ",
            " │🧍# │  ",
            " ├┐# └┐ ",
            " ├┘ # │ ",
            " │x#  │ ",
            " │xx@x│ ",
            " └────┘ ",
            "        ",
        ],
    },
    {
        difficulty: "medium",
        best: 253,
        map: [
            "                     ",
            "     ┌───┐           ",
            "     │   │           ",
            "     │#  │           ",
            "   ┌─┘  #└┐          ",
            "   │  # # │          ",
            " ┌─┘ │ ┌┐ │   ┌────┐ ",
            " │   │ └┘ └───┘  xx│ ",
            " │ #  #          xx│ ",
            " └───┐ ═══ ╷🧍┌┐  xx│ ",
            "     │     ├───────┘ ",
            "     └─────┘         ",
            "                     ",
        ],
    },
    {
        difficulty: "medium",
        map: [
            "                 ",
            " ┌────┬──────┐   ",
            " │xx  │      └─┐ ",
            " │xx  │ #  #   │ ",
            " │xx  ╵#──┬┐   │ ",
            " │xx    🧍 └┘   │ ",
            " │xx  ╷ ╷  #  ╶┤ ",
            " └─┬──┘ └╴# #  │ ",
            "   │ #  # # #  │ ",
            "   │           │ ",
            "   └───────────┘ ",
            "                 ",
        ],
    },
    {
        difficulty: "medium",
        map: [
            "                    ",
            "         ┌──────┐   ",
            "         │     🧍│   ",
            "         │ #═# ┌┘   ",
            "         │ #  #│    ",
            "         ├╴# # │    ",
            " ┌──────┬┤ # ═ └─┐  ",
            " │xxxx  └┘ #  #  │  ",
            " ├╴xxx    #  #   │  ",
            " │xxxx  ┌────────┘  ",
            " └──────┘           ",
            "                    ",
        ],
    },
    {
        difficulty: "difficult",
        best: 57,
        map: [
            "              ",
            "  ┌──┐  ┌───┐ ",
            " ┌┘  │  │   │ ",
            " │ # └──┘#  │ ",
            " │  #xxxx # │ ",
            " └┐    ╷ 🧍 ┌┘ ",
            "  └────┴───┘  ",
            "              ",
        ],
    },
];
