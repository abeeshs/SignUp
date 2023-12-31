module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName:{
            type:DataTypes.STRING,  
            allowNull:false
        },
        email:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false

        }

    })
    return User

}