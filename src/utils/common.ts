export const specialChars = /[^a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ0-9]/gi;

const difference = (arr1: string[], arr2: string[]) =>
  arr1.filter((item) => !arr2.includes(item));

export const verseToIds = (verse: string) => {
  const processed = verse
    .toLowerCase()
    .replace(specialChars, "")
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
