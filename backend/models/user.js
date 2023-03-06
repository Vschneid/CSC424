const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    salt: {
      type: String,
      required: true,
      trim: true,
    },
    hash: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { collection: "users_list" }
);

UserSchema.methods.passwordEncrypt = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
}

UserSchema.methods.passwordCheck = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
  return hash === this.hash;
}

const User = mongoose.model("User", UserSchema);

module.exports = User;