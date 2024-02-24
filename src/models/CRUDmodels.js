const mongoose = require('mongoose');

const CRUDSchema = new mongoose.Schema({
    subjectCode:{
        require: true,
        type: String,
        unique: true
    },
    description:{
        require: true,
        type: String
    },
    units:{
        require: true,
        type: Number
    }
});

const CRUDModel = mongoose.model('Subject', CRUDSchema);

module.exports = CRUDModel;