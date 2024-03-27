const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({

    equipmentName: {
        type: String,
        required: true
    },

    equipmentCategory: {
        type: String,
        required: true
    },

    quantity: {
        type: String,
        required: true
    },

    value: {
        type: String,
        required: true
    },

    updateDate: {
        type: String,
        required: true
    },

    equipmentDetails: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Equipments', equipmentSchema);