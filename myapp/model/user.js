const { DataTypes } = require("sequelize")

const CreateUserModel = async(sequelize) => {
    const User = await sequelize.define("user",{
        name:{
            type:DataTypes.STRING
        },
        age:{
            type:DataTypes.STRING
        },
    })

    await User.sync({ alter: true });
    return User
}

module.exports = {
    CreateUserModel
}