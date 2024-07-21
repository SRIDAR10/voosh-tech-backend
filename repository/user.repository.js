const UserModel = require('../db/models/User.model');
const User = require('../db/models/User.model');

async function insertUser(user) {
  const { email, name, password, sso, alias_name, bot_name } = user;
    try {
     const userResponse = await UserModel.create({
        email,
        name,
        password: sso ? null : password,
        sso: !!sso,
        alias_name,
        bot_name,
      });

        console.log(userResponse);
        return userResponse.toJSON();
      } catch (error) {
        throw new Error('Unable to insert data: ' + error.message);
      }
}

async function getUserByEmail(email) {
  try {
      const response = await User.findOne({where : {email}});
      return response ? response.toJSON() : null;
    } catch (error) {
      throw new Error('Unable to insert data: ' + error.message);
    }
}


module.exports = {
  insertUser,
  getUserByEmail
};