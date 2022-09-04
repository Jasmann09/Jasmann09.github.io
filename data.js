const { Timestamp } = require('bson');
const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const dataschema=new Schema({
    name: {
        type: String,
        required:true

    },
    email:{
        type: String,
        required:true
    },
    vn:{
        type: String,
        required:true
    },

    weight:{
        type: Number,
        required:true
    },
    hieght:{
        type: Number,
        required:true
    },
    gender:{
        type: String,
        required:true
    },


}, {timestamps:true});

const Data = mongoose.model('Data',dataschema);
module.exports =Data;