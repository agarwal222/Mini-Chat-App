const express = require('express');
const http = require('http');
const { exit } = require('process');
const app  = express();

// Middleware

app.use(express.urlencoded({extended:false}))
app.use(express.json());

// enabling CORS API
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:1234"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Users Data Structure

const users = [];

// Post request for the nw user

app.post('/users', (req,res) => {

    // Finding the user if already exist
    const find = users.find((val,ind) => {
        if(req.body.user_name == val.user_name){
            console.log(ind); // index of the existing user
            res.status(500).send("User already exist");
            return ind
        }else{
            return false
        }
    });
    
    //sending respnse if user do not exist and new user added
    if(!find){
        console.log("Not found");
        users.push(req.body) ? res.status(200).send("New User Added") : res.status(500).send("bad request")
    }
    console.log(users); // logging users array
})

// Delete request for the user

app.delete("/delete/:user_name", (req,res) => {

    // deleating the user once found
    const delet = users.find((val,ind) => {
        if(req.params.user_name == val.user_name){
            // console.log(ind); // index of the existing user
            users.splice(ind,1); // deleating user feom array
            res.status(200).send(users);
            return ind
        }else{
            return false
        }
    });

    if(!delet){
        res.status(404).send("user not exist")
    }
    // console.log(req.params);
})

// Server Listning

app.listen(3000 , () => (
    console.log("Server running")
))