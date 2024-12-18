const { Sequelize } = require('sequelize');
const {CreateUserModel} = require("./model/user");
const { CreatePostModel } = require('./model/post');

const sequelize = new Sequelize('postgres://postgres:0809@host.docker.internal:5432/postgres')


let UserModel = null
let PostModel = null
const connection = async (params) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        UserModel = await CreateUserModel(sequelize)
        PostModel = await CreatePostModel(sequelize)
        UserModel.hasMany(PostModel)
        PostModel.belongsTo(UserModel)
        await sequelize.sync()
        console.log("DB Sync")
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

const getUserModel = () => {
    if (!UserModel) {
      throw new Error('UserModel is not initialized. Make sure to call connection() first.');
    }
    return UserModel;
  };

  const getPostModel = () => {
    if (!PostModel) {
      throw new Error('UserModel is not initialized. Make sure to call connection() first.');
    }
    return PostModel;
  };



module.exports = {
    connection,
    getUserModel,
    getPostModel
}