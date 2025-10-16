const express=require('express');
const cors=require('cors');
const sequelize = require('./config/database');
require('./models/OriginalProductDetails');
require('./models/OptimizeProductDetails');
require('./utils/ScrappedDetails');
require('./utils/ai');
const dotenv=require('dotenv');
dotenv.config();

const PORT=process.env.PORT || 40000;
const app=express();
app.use(cors({
    origin:'*',
    credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async()=>{
    try{
        await sequelize.sync();
        console.log('All models were synchronized successfully.');
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch(err){
        console.error('Unable to synchronize the models:', err);
    }
})();

app.use('/api',require('./routes/ProductRoute'));
app.use('/api',require('./routes/HistoryRoute'));

app.get('/',(req,res)=>{
    res.send('API is running...');
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
