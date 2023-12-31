const express = require('express');
const app = express();
const UserRoute = require('./routes/user.routes');
const CategoryRoute = require('./routes/category.routes');
const MealRoute = require('./routes/meal.routes');
const OrderRoute = require('./routes/order.routes');
const db = require("./config/database");
const path = require('path');
const cors = require('cors');

const cors = require('cors');

const corsOptions = {
  origins:  [ 'http://localhost:3000', 'https://panda-snack.vercel.app' ] ,
  methods: ['GET,HEAD,PUT,PATCH,POST,DELETE']
};

app.use(cors(corsOptions));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user routes
app.use('/users', UserRoute);
// category routes
app.use('/categorys', CategoryRoute);
// meal routes
app.use('/meals', MealRoute);
// order routes
app.use('/orders', OrderRoute);

// main
app.get('/', (req, res) => {
    res.send('All Oki');
});

// Serve static meal pictures
app.use("/meal_picture/", express.static(path.join(__dirname, "Picture/meal_picture")));

db.connect();
app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
});
