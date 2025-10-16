const { Model, DataTypes } = require('sequelize');
const sequelize=require('../config/database');


class OriginalProductDetails extends Model {}
OriginalProductDetails.init(
  {
    id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
  },
  asin:{
    type:DataTypes.STRING,
    allowNull:false,  
    unique:true,
  },
  title:{
    type:DataTypes.STRING,
  },
  bullets:{
    type:DataTypes.JSON,
  },
  description:{
    type:DataTypes.TEXT,
  },
  last_fetched_at:{
    type:DataTypes.DATE,
  },
  created_at:{
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW,
  },
},
{sequelize,modelName:'OriginalProductDetails',tableName:'original_product_details',timestamps:false}
) ;

module.exports=OriginalProductDetails;