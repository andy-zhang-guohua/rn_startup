export function sha256Base64(rawPassword) {
    let CryptoJS = require("crypto-js");
    let cypherPassword = CryptoJS.SHA256(rawPassword).toString(CryptoJS.enc.Base64);
    return cypherPassword;
}