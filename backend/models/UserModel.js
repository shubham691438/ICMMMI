const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  salutation: String,
  firstName: String,
  lastName: String,
  nationality: String,
  email: { type: String, required: true, unique: true },
  phoneNo: String,
  organization: String,
  category: String,
  papertitle: String,
  paperId: String,
  password: String,
  amount: String,
  transactionRefNo: String,
  paymentProof: String, // New field to store the uploaded payment proof path or URL
});

// Static register method
UserSchema.statics.register = async function (
  salutation,
  firstName,
  lastName,
  nationality,
  email,
  phoneNo,
  organization,
  category,
  papertitle,
  paperId,
  password,
  amount,
  transactionRefNo,
  paymentProof // Accept the file path or URL for the payment proof
) {
  // Validation
  if (!salutation) {
    throw Error('Salutation is Required');
  }
  if (!firstName) {
    throw Error('First Name is Required');
  }
  if (!nationality) {
    throw Error('Nationality is Required');
  }
  if (!email) {
    throw Error('Email is required');
  }
  if (!validator.isEmail(email)) {
    throw Error('Invalid email address');
  }
  if (password.length < 8) {
    throw Error('Password should be at least 8 characters');
  }
  if (phoneNo && phoneNo.length < 10) {
    throw Error('Phone number is not valid');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('User is already registered, Login Now');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    salutation,
    firstName,
    lastName,
    nationality,
    email,
    phoneNo,
    organization,
    category,
    papertitle,
    paperId,
    password: hashedPassword,
    amount,
    transactionRefNo,
    paymentProof, // Save the payment proof
  });

  return user;
};

// Static login method
UserSchema.statics.login = async function (email, password) {
  if (!email) {
    throw Error('Email is required');
  }

  if (!password) {
    throw Error('Password is required');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Email not registered');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', UserSchema);
