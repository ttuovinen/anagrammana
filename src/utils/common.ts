const specialChars = /[^a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ0-9]/gi;

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
