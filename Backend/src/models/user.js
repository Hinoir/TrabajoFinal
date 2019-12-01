const { Schema, model } = require('mongoose');

// Estructura del modelo creado en la DB
const userSchema = new Schema({
    //name que contiene first name y last name
    name: String,
    //Username minimo 8 chars
    username: {type: String, min: 8},
    //identificatión tipo number
    identification: Number,
    //Password
    password: String,
    //Phto que es una url
    photo: String,
    //Active boolean
    active: Boolean,
},{
    timestamps: true
});

module.exports = model('User',userSchema);