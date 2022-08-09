export const nonAlphanumeric = /[^a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ0-9]/gi;
export const specialChars = /[^ a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ0-9]/gi;

export const alphaSort = (a: string, b: string) => a.localeCompare(b);
export const lengthSort = (a: string, b: string) => b.length - a.length;

const difference = (arr1: string[], arr2: string[]) =>
  arr1.filter((item) => !arr2.includes(item));

export const verseToIds = (verse: string) => {
  const processed = verse
    .toLowerCase()
    .replace(nonAlphanumeric, "")
    .split("")
    .sort()
    .join("");

  return processed
    .split("")
    .map(
      (char: string, idx: number) =>
        char + processed.substring(0, idx).split(char).length
    );
};

export const checkLetters = (seedIds: string[], inputText: string) => {
  const inputIds = verseToIds(inputText);
  const missing = difference(seedIds, inputIds);
  const extra = difference(inputIds, seedIds);
  return [missing, extra];
};

export const textToWords = (text: string) => [
  ...new Set(
    text
      .replace(/\s+/g, " ")
      .replace(specialChars, "")
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
  ),
];

// Missing letters might be like ['a3', 'a4', 't2] so this changes them to ['a1', 'a2', 't1']
const reId = (ids: string[]) =>
  verseToIds(ids.map((item) => item.split("")[0]).join(""));

export const hasNoExtraLetters = (seedIds: string[], inputText: string) => {
  return !checkLetters(reId(seedIds), inputText)[1].length;
};

export const findPossibleWords = (seedIds: string[], text: string) => {
  const words = [...new Set(textToWords(text))];
  return words.filter((item) => hasNoExtraLetters(seedIds, item));
};
