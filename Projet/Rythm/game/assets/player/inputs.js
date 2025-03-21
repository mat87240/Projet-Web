import rhythm from '../map/rhythm.js';
import { player } from '../../main.js';
import { startCountdown, updateLabel, createLabel } from '../draw/labels.js';

// Default key bindings
let KeyBinds = ['q', 's', 'l', 'm'];

// Track locked keys to prevent multiple activations
const keysLocked = {};
const isKeyDown = {};

// Select all elements with the class 'square'
const squares = document.querySelectorAll('.square');

// A flag to track if the countdown has started
let countdownStarted = false;

/**
 * Handles keyboard input events for the rhythm game.
 */
function handleInput() {
    document.addEventListener('keydown', function (event) {
        const key = event.key;
        const index = KeyBinds.indexOf(key);

        if (index !== -1 && !keysLocked[key] && !isKeyDown[key]) {
            const currentTile = rhythm.getCurrentTile();

            // Prevent input if not allowed
            if (!rhythm.isInputAllowed()) return;

            // Start countdown if it's the first time pressing a key on tile id 2
            if (!countdownStarted && currentTile && currentTile.id === 2) {
                countdownStarted = true; // Mark countdown as started
                const countdownLabel = createLabel('Get Ready!', '48px', 'white');

                startCountdown(
                    countdownLabel,
                    performance.now(),
                    3000, // Countdown duration (3 seconds)
                    (remainingTime) => {
                        updateLabel(countdownLabel, remainingTime.toString());
                    },
                    () => {
                        console.log("Countdown ended!");
                        rhythm.canInput = true;
                    }
                );
                return;
            }

            // Lock the key to avoid multiple activations
            keysLocked[key] = true;
            isKeyDown[key] = true;
            squares[index].classList.add('lit'); // Visually highlight the key press

            // Check if input is successful
            const success = rhythm.checkSucces();
            if (success) {
                player.invert(); // Trigger player action
                rhythm.forward(1); // Move forward in the rhythm sequence
            }

            // Remove visual highlight after 50ms
            setTimeout(() => {
                squares[index].classList.remove('lit');
                isKeyDown[key] = false;
            }, 50);
        }
    });

    document.addEventListener('keyup', function (event) {
        const key = event.key;
        const index = KeyBinds.indexOf(key);

        // Unlock key when released
        if (keysLocked[key] && index !== -1) {
            keysLocked[key] = false;
            isKeyDown[key] = false;
        }
    });
}

/**
 * Updates key bindings dynamically.
*/
function setKeyBinds(newKeys) {
    if (Array.isArray(newKeys) && newKeys.every(key => typeof key === 'string')) {
        KeyBinds = [...newKeys];
    }
}

export { handleInput, setKeyBinds };
