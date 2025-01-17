const userModel = require("../models/user.model");

module.exports.cerateUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("all feilds are required");
  }
  const user = await userModel.create({
    fullname: {
        firstname,
        lastname,
    },
    email,
    password,
});
  return user;
};

