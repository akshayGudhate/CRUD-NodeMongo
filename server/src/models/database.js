require('dotenv').config();
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL;

await mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;


////////////////////////
//      member        //
////////////////////////

const memberModel = new Schema(
    {
        name: { type: String },
        address: { type: String },
        taluka: { type: Number },
        district: { type: Number },
        pin: { type: Number },
        mobile: { type: Number, unique: true },
        email: { type: String, unique: true },
        gender: { type: String },
        blood: { type: String },
        qualification: { type: String },
        reference: { type: String },
        what_you_can_do: { type: String },
        company: { type: String },
        avatar: { type: String },
        aadhar: { type: String },
        active: { type: Boolean, deafult: true },
    }
);

module.exports = mongoose.model('Member', memberModel);