const Sequelize = require('sequelize')

const sequelize = require('../util/databaseConnection')

const Send = sequelize.define('sendEOS',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    address:{
        type: Sequelize.STRING(40),
        allowNull:false
    },
    docHash: {
        type: Sequelize.STRING(4000),
        allowNull:false
    },
    docISCCHash:{
        type: Sequelize.STRING(4000),
        allowNull: false
    },
    tr_id:{
        type: Sequelize.STRING(64),
        
    },
    st:{
        type: Sequelize.INTEGER
    },
    tr_ts:{
        type: Sequelize.DATE
    }
},{   
    timestamps: false,
    freezeTableName:true, 
    tableName: "sendEOS"})

module.exports = Send