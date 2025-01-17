const captainModel = require("../models/captain.model");

module.exports.creatcaptain = async ({ email, password,lastname, firstname, color, plate,capacity, vehicletype}) => {
    if(!email || !password || !firstname || !color || !plate || !capacity || !vehicletype){
        throw new Error("all fields are required");
    }
    const captain = await captainModel.create({
        fullname:{
            firstname,
            lastname,
        },
        email,
        password,
        firstname,
        vehicle:{
            color,
            plate,
            capacity,
            vehicletype
        }
    });

    return captain
}