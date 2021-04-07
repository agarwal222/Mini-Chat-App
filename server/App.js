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
const users = [
    // user object example
    // {
    //     "Name" : "Name of the user or userName",
    //     "email" : "Email of the user",
    // }
];

// Rooms data structure
const rooms = [
    // room object example
    // {
    //     "roomName" : "Name of the Room",
    //     "roomID" : "ID of the room",
    //     "isPrivate" : true or false (booion value)
    //     "users" : [array of users]
    // }
];

// user_room_relation data structure
const user_room_relation = [
    // user_room_relation array structure example
    // {
            // "userName" : "user's name (siaplay name)",
            // "roomName" : "room name he / she jponed in",
            // "roomID" : the room ID of the room
    // }
]

// Post request for the new user
app.post('/users', (req,res) => {
    
    // basic flag variables initilised
    let us_fnd , us_del

    // Finding the user if already exist
    const find = users.find((val,ind) => {
        if(req.body.user_name == val.user_name){
            console.log(ind); // index of the existing user
            res.status(500).send("User already exist");
            us_fnd = true
        }
    });
    
    //sending respnse if user do not exist and new user added
    if(!us_fnd){
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
            us_del = true
        }
    });

    if(!us_del){
        res.status(404).send("user not exist")
    }
    // console.log(req.params);
})

// GET api for Public rooms
app.get("/rooms/public", (req,res) => {
    // checking if the room is public or not
    const public_rooms = rooms.filter((val,ind) => {
        return val.isPublic
    })
    res.status(200).send(public_rooms)
})

// POST request for new room
app.post('/rooms', (req,res) => {
    //pushing user room relation info
    user_room_relation.push({
        "userName" : req.body.userName,
        "roomName" : req.body.roomName,
        "roomID" : req.body.roomID
    })

    console.log(user_room_relation);

    // pushing room info to rooms array
    rooms.push({
        "roomName" : req.body.roomName,
        "roomID" : req.body.roomID,
        "isPrivate" : req.body.isPrivate,
    }) ? res.status(200).send(req.body) : res.status(500).send("Bad Request")

    console.log(rooms);
})

// Server Listning
app.listen(3000 , () => (
    console.log("Server running")
))