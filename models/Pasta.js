const mongoose = require("mongoose");
const crypto = require('crypto');
const Schema = mongoose.Schema;

const pastaScheme = new Schema({
    title: String,
    text: String,
    isPublic: Boolean,
    duration: Number,
    timestamp: Date
});
const Model = mongoose.model("Pasta", pastaScheme);

const secret_key ="foo";

Model.prototype.encryptLink = function(){
    const cipher = crypto.createCipher('aes128', secret_key);
    var encrypted = cipher.update(this._id.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

Model.decryptLink = function(encrypted){
    const decipher = crypto.createDecipher('aes128', secret_key);
    var decrypted = decipher.update(encrypted,'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

Model.prototype.toDTO = function(){
    var copy = JSON.parse(JSON.stringify(this));
    copy.link = this.encryptLink();
    delete copy._id;
    return copy;
}

module.exports = Model;