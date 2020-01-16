const makeFirstLetterCapital = (word: string) => {
  return word.replace(/^\w/, c => c.toUpperCase());
};

export {
  makeFirstLetterCapital
};
