// Here we're creating our User Schema, specifying the type of data
const mongoose = require("mongoose");
// Bcrypt will be used to encrypt all the passwords
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  name: { type: String, required: true},
  username: { type: String, required: true, index:{unique:true} },
  password: { type: String, required:true },
  wallet: { type: Number, default: 10000 },
  budget: [{ type: Schema.Types.ObjectId, ref: "Budget" }],
  special: [{ type: Schema.Types.ObjectId, ref: "Special" }]
});

userSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};
const User = mongoose.model("User", userSchema);

module.exports = User;