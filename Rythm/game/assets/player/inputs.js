import map from '../map/map.js';
import rhythm from '../map/rhythm.js';

let KeyBinds = ['q', 's', 'l', 'm'];
const keysLocked = {};
const isKeyDown = {};
const squares = document.querySelectorAll('.square');

function handleInput() {
  document.addEventListener('keydown', function (event) {
    const key = event.key;
    const index = KeyBinds.indexOf(key);

    if (index !== -1 && !keysLocked[key] && !isKeyDown[key]) {
      keysLocked[key] = true;
      squares[index].classList.add('lit');
      isKeyDown[key] = true;

      rhythm.forward(1); 

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
