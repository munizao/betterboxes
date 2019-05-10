import { getSpectrum } from './poly.js';
import { tetrominoes } from './poly.js';
import { createAspects } from './poly.js';

const BOARD_SIZE = 5;
const toggleSet = new Set();
const aspects = createAspects(tetrominoes);


function toggleClicked(toggle, cellStr) {
    if (toggle.classList.contains('dark')) {
        toggle.classList.remove('dark');
        toggleSet.delete(cellStr);
    }
    else {
        toggle.classList.add('dark')
        toggleSet.add(cellStr);
    }
    const spectrum = getSpectrum(toggleSet, aspects)
    spectrum.forEach((count, index) => {
        const currentSpan = document.querySelector('#current-' + index);
        currentSpan.textContent = count;
    });
}

const toggleContainer = document.getElementById('toggle-container');
function makeToggles() {
    for (let i=0; i<BOARD_SIZE; i++) {
        const toggleRow = document.createElement('div');
        toggleContainer.appendChild(toggleRow);
        toggleRow.classList.add('toggle-row');
        for (let j=0; j<BOARD_SIZE; j++) {
            const toggle = document.createElement('span');
            toggleRow.appendChild(toggle);
            toggle.classList.add('toggle');
            toggle.addEventListener('click', () => {
                toggleClicked(toggle, JSON.stringify([i,j]));
            });
        }
    }
}

const objective = [1, 1, 1, 1, 0];

const indicatorContainer = document.getElementById('indicator-container');
function makeIndicators() {
    tetrominoes.forEach((poly, index) => {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator');
        indicatorContainer.appendChild(indicator);
        indicator.innerHTML = `<span class="objective">${objective[index]}</span> - <span id="current-${index}" class="current">0</span>`
        const miniBoard = document.createElement('div');
        indicator.appendChild(miniBoard);
        miniBoard.classList.add('mini-board');
        const polyStr = poly.map(JSON.stringify);
        for (let i = 0; i < poly.length; i++) {
            const squareRow = document.createElement('div');
            squareRow.classList.add('mini-row');
            miniBoard.appendChild(squareRow);
            for (let j = 0; j < poly.length; j++) {
                const square = document.createElement('span');
                square.classList.add('mini-square');
                squareRow.appendChild(square);
                if (polyStr.includes(JSON.stringify([i,j]))) {
                    square.classList.add('dark');
                }
            }
        }
    });
}

makeToggles();
makeIndicators();