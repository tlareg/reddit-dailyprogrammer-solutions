/*
    Example:

    Spenglerium, Ee -> true
    Zeddemorium, Zr -> true
    Venkmine, Kn -> true
    Stantzon, Zt -> false
    Melintzum, Nn -> false
    Tullium, Ty -> false
 */

(function test() {
  [
    'Spenglerium, Ee',
    'Zeddemorium, Zr',
    'Venkmine, Kn',
    'Stantzon, Zt',
    'Melintzum, Nn',
    'Tullium, Ty'
  ].forEach(i => console.log(isValid3(...parseInput(i))));
})();

function parseInput(inputStr) {
  return inputStr.split(',').map(s => s.trim().toLowerCase());
}

function isValid(name, elSymbol) {
  let letterToSearch = elSymbol[0];
  let firstLetterFound = false;

  for (let i = 0, len = name.length; i < len; i++) {
    if (name[i] != letterToSearch) continue;
    if (firstLetterFound) return true;
    firstLetterFound = true;
    letterToSearch = elSymbol[1];
  }

  return false;
}

function isValid2(name, elSymbol) {
  const firstIdx = name.indexOf(elSymbol[0]); 
  const secondIdx = name.substr(firstIdx + 1, name.length - 1).indexOf(elSymbol[1]);
  return firstIdx > -1 && secondIdx > -1;
}

function isValid3(name, elSymbol) {
  return new RegExp(elSymbol.split('').join('.*'), 'i').test(name);
}