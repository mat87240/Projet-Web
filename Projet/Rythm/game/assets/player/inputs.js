import rhythm from '../map/rhythm.js';
import { player } from '../../main.js';
import { startCountdown, updateLabel, createLabel } from '../draw/labels.js';

let KeyBinds = ['q', 's', 'l', 'm'];
const keysLocked = {};
const isKeyDown = {};
const squares = document.querySelectorAll('.square');

// A flag to track if the countdown has started
let countdownStarted = false;

function handleInput() {
    document.addEventListener('keydown', function (event) {
        const key = event.key;
        const index = KeyBinds.indexOf(key);

        if (index !== -1 && !keysLocked[key] && !isKeyDown[key]) {
            const currentTile = rhythm.getCurrentTile();

            if (!rhythm.isInputAllowed()) return;

            // If countdown hasn't started yet, start it
            if (!countdownStarted && currentTile && currentTile.id === 2) {
                countdownStarted = true; // Mark countdown as started
                const countdownLabel = createLabel('Get Ready!', '48px', 'white');
                startCountdown(countdownLabel, performance.now(), 3000, (remainingTime) => {
                    updateLabel(countdownLabel, remainingTime.toString());
                }, () => {
                    console.log("Countdown ended!");
                    rhythm.canInput = true;
                });
                return;
            }

            keysLocked[key] = true;
            isKeyDown[key] = true;
            squares[index].classList.add('lit');

            const success = rhythm.checkSucces();
            
            if (success) {
                player.invert();
                rhythm.forward(1);
            }

            setTimeout(() => {
                squares[index].classList.remove('lit');
                isKeyDown[key] = false;
            }, 50);
        }
    });

    document.addEventListener('keyup', function (event) {
        const key = event.key;
        const index = KeyBinds.indexOf(key);

        if (keysLocked[key] && index !== -1) {
            keysLocked[key] = false;
            isKeyDown[key] = false;
        }
    });
}

function setKeyBinds(newKeys) {
    if (Array.isArray(newKeys) && newKeys.every(key => typeof key === 'string')) {
        KeyBinds = [...newKeys];
    }
}

export { handleInput, setKeyBinds };
