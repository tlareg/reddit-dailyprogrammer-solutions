const input = `
"wisdom" ? "mid sow"
"Seth Rogan" ? "Gathers No"
"Reddit" ? "Eat Dirt"
"Schoolmaster" ? "The classroom"
"Astronomers" ? "Moon starer"
"Vacation Times" ? "I'm Not as Active"
"Dormitory" ? "Dirty Rooms"
`;

const expectedOutput = `
"wisdom" is an anagram of "mid sow"
"Seth Rogan" is an anagram of "Gathers No"
"Reddit" is NOT an anagram of "Eat Dirt"
"Schoolmaster" is an anagram of "The classroom"
"Astronomers" is NOT an anagram of "Moon starer"
"Vacation Times" is an anagram of "I'm Not as Active"
"Dormitory" is NOT an anagram of "Dirty Rooms"
`;

(function test() {
  const output = parse(input);
  output.trim() === expectedOutput.trim()
    ? console.log('OK')
    : console.log('fail');
})();

function parse(input) {
  return input
    .trim()
    .split('\n')
    .map(parseInputRow)
    .join('\n');
}

function parseInputRow(row) {
  const [ first, second ] = getRowPhrases(row);
  const isAnagram = checkIfAnagrams(first, second);
  return `${first} is ${isAnagram ? '' : 'NOT '}an anagram of ${second}`;
}

function getRowPhrases(row) {
  return row
    .split('?')
    .map(w => w.trim());
}

function checkIfAnagrams(first, second) {
  second = second.toLowerCase();

  const isEveryCharOfFirstInSecond = str2Arr(first.toLowerCase())
    .filter(filterNotCheckedCharacters)
    .every(c => {
      const idx = second.indexOf(c);
      if (idx < 0) return false;
      second = second.replace(c, '');
      return true;
    });

  if (!isEveryCharOfFirstInSecond) return false;

  const anyCharsLeftInSecond = !!str2Arr(second)
    .filter(filterNotCheckedCharacters).length;

  return !anyCharsLeftInSecond;
}

function str2Arr(str) {
  return str.split('');
}

function filterNotCheckedCharacters(c) {
  return c !== ' ' && c !== '\"' && c !== '\'';
}