const express = require('express')
const app = express();
const UserRoute = require('./routes/user.routes') 
const CategoryRoute = require('./routes/category.routes') 
const MealRoute = require('./routes/meal.routes') 
const OrderRoute = require('./routes/order.routes') 
const db = require("./config/database")
const fs = require('fs');
const path = require('path');
const cors = require('cors');



const corsOptions = {
    origin: '*', // Replace with your frontend's actual domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type,Authorization',
  };
  
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'YOUR_FRONTEND_DOMAIN'); // Replace with your frontend's actual domain
    cors(corsOptions)(req, res, next);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//user routes
app.use('/users',UserRoute);
//category routes
app.use('/categorys',CategoryRoute);
//meal routes
app.use('/meals',MealRoute);
//order routes
app.use('/orders',OrderRoute);
//main
app.get('/' , (req,res)=>{
    res.send('All Oki')
})

// app.use('/meal_picture/', express.static('Picture/meal_picture'));
app.use("/meal_picture/", express.static(path.join(__dirname, "Picture/meal_picture")));

db.connect();
app.listen(process.env.APP_PORT);