const { Model, DataTypes } = require('sequelize');
const sequelize=require('../config/database');


class OptimizeProductDetails extends Model {}
 OptimizeProductDetails.init({
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
  },
  product_id:{
    type:DataTypes.INTEGER,
    allowNull:false,  
    references:{
        model:'original_product_details',
        key:'id',
    },
  },
  optimized_title:{
    type:DataTypes.STRING,
  },
  optimized_bullets:{
    type:DataTypes.JSON,
  },
  optimized_description:{
    type:DataTypes.TEXT,
  },
  keywords:{
    type:DataTypes.JSON,
  },
  created_at:{
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW,
  },
 },{
  sequelize,modelName:'OptimizeProductDetails',tableName:'optimize_product_details',timestamps:false
 }) ;

module.exports=OptimizeProductDetails;