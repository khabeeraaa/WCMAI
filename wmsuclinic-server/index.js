const express = require("express");
const app = express();
const cors = require("cors");

//middleware

app.use(express.json()); //req.body
app.use(cors());

//routes

//register and login routes
app.use( '/auth' , require( './routes/jwtAuth' ) );


//dashboard route

app.use("/dashboard", require("./routes/dashboard"));
//app.use("/dashboard", require("./routes/dashboard"));

//settings
app.use("/settings", require("./routes/settings"));
//patient routes
app.use("/transaction", require("./routes/transaction"));


app.listen(process.env.PORT || 5000, () =>{
    console.log("Server is running at port 5000");
});