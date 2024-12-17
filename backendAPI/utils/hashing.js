const {hash}=require("bcryptjs")
const bcrypt = require("bcrypt");

exports.doHash=(value,saltValue)=>{
    const result=hash(value,saltValue);
    return result;
}

exports.doHashValidation=(value,hashedValue)=>{
    const result=bcrypt.compare(value,hashedValue);
    return result;

}