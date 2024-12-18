const {hash,compare}=require("bcryptjs");
const bcrypt = require("bcrypt");
const {createHmac}=require("crypto");

exports.doHash=(value,saltValue)=>{
    const result=hash(value,saltValue);
    return result;
}

exports.doHashValidation=(value,hashedValue)=>{
    const result=bcrypt.compare(value,hashedValue);
    return result;

}

exports.hmacProcess=(value,key)=>{
    const result=createHmac("sha256",key).update(value).digest("hex")
    return result;
}

// sha256: The hash algorithm used to create the HMAC. You can replace it with others like sha1 or md5.
// update(message): Adds the data (message) to be hashed.
// digest("hex"): Converts the output to a readable hexadecimal string.
// Why Use createHmac?
// To verify message integrity and authenticity.
// Commonly used in API signing, secure data transfers, and cryptographic protocols.