const { DataTypes } = require("sequelize")

const CreatePostModel = async(sequelize) => {
    const Post = await sequelize.define("post",{
        title: {
            type: DataTypes.STRING,
          },
          content: {
            type: DataTypes.TEXT,
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "users", // Table name should match the User model
              key: "id",
            },
          },
    })

    await Post.sync({ alter: true });
    return Post
}

module.exports = {
    CreatePostModel
}