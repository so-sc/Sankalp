import * as CryptoJS from 'crypto-js';

require('dotenv').config();

export const encrypt = async (text: string): Promise<string> => {
  const ciphertext = CryptoJS.AES.encrypt(text, process.env.KEY).toString();
  return ciphertext;
}

export const decrypt = async (ciphertext: string): Promise<string> => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.KEY);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return plaintext;
}

// Usage example
// const originalText = 'This is a secret message';

// const encryptedText = await encrypt(originalText);
// console.log('Encrypted:', encryptedText);

// const decryptedText = await decrypt(encryptedText);
// console.log('Decrypted:', decryptedText);
