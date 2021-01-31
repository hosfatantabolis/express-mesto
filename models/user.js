const mongoose = require('mongoose');

// eslint-disable-next-line
const linkRegexp = /^(https?)(\:\/\/)(www\.)?([\w.\-~:\/?#\[\]@!\$&'\(\)\*+,;=%]*)/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    match: [linkRegexp],
  },
});

module.exports = mongoose.model('user', userSchema);
