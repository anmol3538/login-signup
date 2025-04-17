const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect('mongodb://localhost/adbms_dev');
}

module.exports = connect;