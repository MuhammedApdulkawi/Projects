import crypto from "node:crypto";

const IV_LENGTH = 16; 
const ENCRYPTION_SECRET_KEY = Buffer.from('15975315975315975315975315975312'); 

export const encrypt = (text) => {

    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_SECRET_KEY, iv);

    let cipherText = cipher.update(text,'utf-8', 'hex');

    cipherText += cipher.final('hex');

    return `${iv.toString('hex')}:${cipherText}`;
};


export const decrypt = (cipherText) => {
    
    const [iv, encryptedText] = cipherText.split(':');
    const binaryIv = Buffer.from(iv, 'hex');

    const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_SECRET_KEY, binaryIv);

    let decryptedText = decipher.update(encryptedText, 'hex', 'utf-8');

    decryptedText += decipher.final('utf-8');

    return decryptedText;
};