import React from "react"

const generateRandomId = (alphabet => {
    const alphabetLength = alphabet.length;
    const randoIter = (key, n) => {
      if (n === 0) {
        return key;
      }
      const randoIndex = Math.floor(Math.random() * alphabetLength);
      const randoLetter = alphabet[randoIndex];
      return randoIter(key + randoLetter, n - 1);
    };
    return () => randoIter("", 10);
  })("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
  
export default generateRandomId;