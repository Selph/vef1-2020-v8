/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n, alphabet = '') {
  let string = str.toLocaleUpperCase();
  const upprunalegtFylki = alphabet.split('');
  const hlidradFylki = [];
  // eslint-disable-next-line no-use-before-define
  string = sigtun(string, alphabet);
  const dulkodadFylki = string.split('');
  for (let i = 0; i < alphabet.length; i += 1) {
    if (i - n < 0) {
      hlidradFylki[i + alphabet.length - n] = upprunalegtFylki[i];
    } else {
      hlidradFylki[i - n] = upprunalegtFylki[i];
    }
  }
  for (let i = 0; i < dulkodadFylki.length; i += 1) {
    for (let j = 0; j < alphabet.length; j += 1) {
      if (dulkodadFylki[i] === upprunalegtFylki[j]) {
        dulkodadFylki[i] = hlidradFylki[j];
        break;
      }
    }
  }
  const dulkodi = dulkodadFylki.join('');
  return dulkodi;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet = '') {
  let string = str.toLocaleUpperCase();
  const parsed = parseInt(n, 10);
  const upprunalegtFylki = alphabet.split('');
  const hlidradFylki = [];
  // eslint-disable-next-line no-use-before-define
  string = sigtun(string, alphabet);
  const afkodadFylki = string.split('');
  for (let i = 0; i < alphabet.length; i += 1) {
    if (i + parsed > alphabet.length - 1) {
      hlidradFylki[i - alphabet.length + parsed] = upprunalegtFylki[i];
    } else {
      hlidradFylki[i + parsed] = upprunalegtFylki[i];
    }
  }
  for (let i = 0; i < afkodadFylki.length; i += 1) {
    for (let j = 0; j < alphabet.length; j += 1) {
      if (afkodadFylki[i] === upprunalegtFylki[j]) {
        afkodadFylki[i] = hlidradFylki[j];
        break;
      }
    }
  }
  const afkodi = afkodadFylki.join('');
  return afkodi;
}

// Hjálparfall til að sigta út stafi sem eru ekki í lykil
function sigtun(e, alphabet) {
  const regex = new RegExp(`[^${alphabet}]`, 'g');
  const utspyting = e.match(regex);
  const nyttFylki = [];
  if (utspyting != null) {
    for (let i = 0, j = 0; i < e.length - utspyting.length; i += 1, j += 1) {
      for (let k = 0; k < utspyting.length; k += 1) {
        if (e[j] === utspyting[k]) {
          j += 1;
          for (let l = 0; l < utspyting.length; l += 1) {
            if (e[j] === utspyting[l]) {
              j += 1;
            }
          }
        }
      }
      nyttFylki[i] = e[j].replaceAll(utspyting, '');
    }
    const output = nyttFylki.join('');
    return output;
  }
  return e;
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  // Strengur
  let str;

  // Kóði
  let kodi;

  function init() {
  // Event listeners

    // Stafrófsgluggi
    const lyklabox = document.querySelector('#alphabet[type=text]');
    // eslint-disable-next-line no-use-before-define
    lyklabox.addEventListener('input', (stafrof));

    // Radio takkar
    const radio = document.querySelector('.radio');
    // eslint-disable-next-line no-restricted-syntax
    for (const item of radio.querySelectorAll('label')) {
      const radioVal = item.querySelector('input');
      // eslint-disable-next-line no-use-before-define
      radioVal.addEventListener('click', radioGaga);
    }

    // Hliðrunarslider
    const slider = document.querySelector('#shift[type=range]');
    // eslint-disable-next-line no-use-before-define
    slider.addEventListener('input', hlidra);

    // Strengur
    const string = document.querySelector('#input[type=text]');
    // eslint-disable-next-line no-use-before-define
    string.addEventListener('input', strengur);

    // Kóði
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(''));
    p.className = 'foo';
    document.querySelector('.result').appendChild(p);

    // Event handlers

    // Stafrófslykill
    function stafrof(e) {
      const lykill = e.target.value;
      alphabet = lykill;
      if (type === 'encode') {
        kodi = encode(str, shift, alphabet);
        document.querySelector('.foo').textContent = kodi;
      } else if (type === 'decode') {
        kodi = decode(str, shift, alphabet);
        document.querySelector('.foo').textContent = kodi;
      }
    }

    // Radio box
    function radioGaga(e) {
      type = e.target.value;
      if (type === 'encode') {
        kodi = encode(str, shift, alphabet);
        document.querySelector('.foo').textContent = kodi;
      } else if (type === 'decode') {
        kodi = decode(str, shift, alphabet);
        document.querySelector('.foo').textContent = kodi;
      }
    }

    // Hliðrun
    function hlidra(e) {
      const max = e.target;
      max.max = alphabet.length;
      const sliderNumber = document.querySelector('.shiftValue');
      const hlidrunarnumer = e.target.value;
      sliderNumber.textContent = hlidrunarnumer;
      shift = hlidrunarnumer;
      if (type === 'encode') {
        kodi = encode(str, shift, alphabet);
        document.querySelector('.foo').textContent = kodi;
      } else if (type === 'decode') {
        kodi = decode(str, shift, alphabet);
        document.querySelector('.foo').textContent = kodi;
      }
    }
  }

  // Strengur
  function strengur(e) {
    str = e.target.value;
    if (type === 'encode') {
      kodi = encode(str, shift, alphabet);
      document.querySelector('.foo').textContent = kodi;
    } else if (type === 'decode') {
      kodi = decode(str, shift, alphabet);
      document.querySelector('.foo').textContent = kodi;
    }
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
