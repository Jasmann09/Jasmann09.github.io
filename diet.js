const { Timestamp } = require('bson');
const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const dietschema=new Schema({
    day: {
        type: Number,
        required:true

    },
    break:{
        type: String,
        required:true
    },
    lunch:{
        type: String,
        required:true
    },

    snak:{
        type: String,
        required:true
    },
    dinner:{
        type: String,
        required:true
    },


}, {timestamps:true});

const Diet = mongoose.model('Diet',dietschema);
module.exports =Diet;