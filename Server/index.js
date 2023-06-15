const express = require("express");
const app = express();
const cors = require('cors');
const http = require("http").createServer(app);
const PORT = process.env.PORT || 5000;
const db = require('./db');

app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{

    res.header("Access-Control-Allow-Origin" ,"http://localhost:4200" );
    res.header("Access-Control-Allow-Headers","Origin , X-Requested-With , Content-Type , Accept");
    next();
})

const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const productRoutes = require('./routes/product');
app.use("/users", userRoutes);
app.use('/carts', cartRoutes);
app.use('/products', productRoutes);

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on("error", (err) => {
    console.error(`Error starting server: ${err}`);
});
