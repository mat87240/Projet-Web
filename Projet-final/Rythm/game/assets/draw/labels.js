import { player } from '../../main.js';

export function createLabel(text, fontSize = '48px', color = 'white', zIndex = 1000) {
    const labelContainer = document.createElement('div');
    labelContainer.style.position = 'absolute';
    labelContainer.style.top = '50%';
    labelContainer.style.left = '50%';
    labelContainer.style.transform = 'translate(-50%, -50%)';
    labelContainer.style.textAlign = 'center';
    labelContainer.style.fontSize = fontSize;
    labelContainer.style.color = color;
    labelContainer.style.fontWeight = 'bold';
    labelContainer.style.zIndex = zIndex;

    const labelText = document.createElement('div');
    labelText.innerText = text;
    labelContainer.appendChild(labelText);

    document.body.appendChild(labelContainer);

    return labelContainer;
}

export function updateLabel(labelContainer, text) {
    const labelText = labelContainer.querySelector('div');
    if (labelText) {
        labelText.innerText = text;
    }
}

export function startCountdown(labelContainer, startTime, duration, updateCallback, endCallback) {
    const checkPlayerPosition = () => {
        // Player position check for when countdown starts
        return player.y2 < 100 && player.y2 > -50 && player.x2 > 50;
    };

    let countdownStart = performance.now();
    let elapsedTime = 0;

    function updateCountdown() {
        // Only proceed with the countdown if the player meets the position condition
        if (checkPlayerPosition()) {
            elapsedTime = performance.now() - countdownStart;
            let progress = elapsedTime / duration;

            if (progress < 1) {
                let remainingTime = Math.ceil(duration / 1000 - progress * duration / 1000);
                updateCallback(remainingTime);
            } else {
                if (typeof endCallback === 'function') {
                    endCallback();
                }
                updateLabel(labelContainer, 'Done!');
                setTimeout(() => {
                    document.body.removeChild(labelContainer);
                }, 500);

                // Clear the interval once the countdown is done
                clearInterval(countdownInterval);
            }
        }
    }

    // Set interval to update the countdown every 100ms
    const countdownInterval = setInterval(updateCountdown, 100);

    // Ensure the interval stops after the specified duration
    setTimeout(() => {
        clearInterval(countdownInterval); 
    }, duration);
}


export function startDelay(duration, callback) {
    setTimeout(callback, duration);
}
