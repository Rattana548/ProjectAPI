require("dotenv").config()
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');



app.use(cors())
app.use(express.json());
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});


app.get("/showuser", (req, res) => {
    connection.query("SELECT * FROM mn_user", (err, result) => {
        if (err) return res.status(200).send(err);
        else return res.status(200).send(result);
    })

})

app.post("/register", (req, res) => {
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email
    const phone = req.body.phone
    const password = req.body.password
    if (!fname || !lname || !email || !phone || !password) {
        return res.status(400).send({ message: "You must provide" })
    } else {
        connection.query("SELECT * FROM mn_user WHERE email = ?", [email], (err, result) => {
            if (err) console.log(err)
            else if(result.length == 0){
                connection.query("INSERT INTO mn_user(fname, lname, email, phone, password) VALUES (?,?,?,?,?)", [fname, lname, email, phone, password], (err, result) => {
                    if (err) res.send(err);
                    else {
                        return res.send({ message: "Register success" })
                    };
                })
            }
            return res.status(200).send({ message: "Email has been registered" });
        })

    }

})


app.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    console.log(email,password)
    if (!email || !password) {
        return res.status(400).send({ message: "You must provide" })
    } else {
        connection.query("Select * from mn_user where email = ? and password = ?", [email, password], (err, result) => {
            if (err) res.send(err);
            else if(result.length == 0){
                return res.status(400).send({message:"Email and password are not  valid"});
            }else{
                return res.status(200).send({ user: result, message: "Login success" });
            }
        })
    }
})


app.get("/", (req, res) => {
    res.send("<h2>This is API in ProjectJS</h2> <br> <br><h4>/login can use if wanna Login <br> /register can use if wanna Register <br> /showuser can use if wanna see All user</h4>")
})



const port = process.env.port
app.listen(port,() => console.log(`Server Started on port ${port}..`));
