const BOARD_SIZE = 5;

const syms = [cell => [ cell[0],  cell[1]],
              cell => [ cell[0], -cell[1]],
              cell => [-cell[0],  cell[1]],
              cell => [-cell[0], -cell[1]],
              cell => [ cell[1],  cell[0]],
              cell => [ cell[1], -cell[0]],
              cell => [-cell[1],  cell[0]],
              cell => [-cell[1], -cell[0]]];

export const tetrominoes = [[[0,0], [0,1], [0,2], [1,0]],
                     [[0,0], [0,1], [0,2], [1,1]],
                     [[0,0], [0,1], [1,1], [1,2]],
                     [[0,0], [0,1], [1,0], [1,1]],
                     [[0,0], [0,1], [0,2], [0,3]]];

function compareCells(cell1, cell2) {
    let compare = cell2[0] - cell1[0];
    if (compare === 0) {
        compare = cell2[1] - cell1[1];
    }
    return compare;
}

function canonicalize(poly) {
    poly.sort(compareCells);
    const min = poly[0];
    return poly.map(cell => [cell[0] - min[0], cell[1] - min[1]]);
}

function createSymforms(poly) {
    const symforms = new Set()
    syms.forEach(sym => {
        symforms.add(JSON.stringify(canonicalize(poly.map(sym))));
    });
    return symforms;
}

function translate(poly, vector) {
    return poly.map(cell => [cell[0] + vector[0], cell[1] + vector[1]])
}

export function createAspects(polys) {
    let aspects = {};
    let symforms = {};
    polys.forEach(poly => {
        symforms[JSON.stringify(poly)] = createSymforms(poly);
    });
    let key = null;
    for (key in symforms) {
        aspects[key] = [];
        symforms[key].forEach(poly => {
            for (let i=0; i<BOARD_SIZE; i++) {
                for (let j=0; j<BOARD_SIZE; j++) {
                    aspects[key].push(new Set(translate(JSON.parse(poly), [i, j]).map(cell => JSON.stringify(cell))));
                }
            }
        });
    }
    return aspects;
}

function isSuperset(set, subset) {
    for (var elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
}


export function getSpectrum(toggleSet, aspects) {
    const spectrum = [];
    for (const key in aspects) {
        let count = 0;
        aspects[key].forEach(aspect => {
            if (isSuperset(toggleSet, aspect)) {
                count++;
            }
        });
        spectrum.push(count);
    }
    return spectrum;
}