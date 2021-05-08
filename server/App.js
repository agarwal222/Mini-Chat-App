const express = require('express');
const http = require('http');
const { exit } = require('process');
const app  = express();
const server = http.createServer(app)
const io = require('socket.io')(server ,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

// Middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json());

// enabling CORS API
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
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
    // }
];

// user_room_relation data structure
const user_room_relation = [
    // user_room_relation array structure example
    // {
            // "email" : "user's email",
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
        if(req.body.email == val.email){
            console.log(ind); // index of the existing user
            res.status(400).send("User already exist");
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
app.get("/delete/:email", (req,res) => {

    let us_del;
    console.log("deleting user .........");

    // deleating the user once found
    const delet = users.indexOf(req.params.email)
    users.splice(delet,1); // deleating user feom array
    const u_r_r_i = user_room_relation.indexOf(req.params.email)
    user_room_relation.splice(u_r_r_i,1); // Deleting from relation array
    console.log(user_room_relation, users);
    res.status(200).send(users);
    us_del = true
    console.log("user deleted......");

    if(us_del == false){
        res.status(404).send("user not exist")
    }
    // console.log(req.params);
})

// GET api for Public rooms
app.get("/rooms/public", (req,res) => {
    let pub_r = [];
    // checking if the room is public or not
    const public_rooms = rooms.forEach((val,ind) => {
        if(val.isPrivate == false){
            pub_r.push(val)
        }
    })
    console.log(pub_r);
    res.status(200).send(pub_r)
})

// POST request for new room
app.post('/rooms', (req,res) => {
    //pushing user room relation info
    user_room_relation.push({
        "email" : req.body.email,
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

// POST request for checking the room if avalable or not
app.post("/checkroom" ,(req, res) => {
    console.log(req.body);
    let fnd = false;
    const find = rooms.find((val,ind) => {
        if (req.body.roomID == val.roomID) {
            console.log("ID found");
            user_room_relation.push(
                {
                    "email" : req.body.email,
                    "roomName" : val.roomName,
                    "roomID" : val.roomID
                }
            )
            console.log(user_room_relation);
            res.status(200).send(val)
            fnd = true
        }
    })
    if(fnd == false){
        res.status(500).send("not found")
        console.log("not found room");
    }
})

// socket io
io.on("connection", (soc) => {
    console.log("connction mad with socket");

    soc.on("user",(socc) => {
        console.log(socc);
        // Joining room
        soc.join(socc.room_id)

        // Making an array of users in same room
        let room_users = [];
        user_room_relation.forEach((val) => {
            if (val.roomID == socc.room_id) {
                room_users.push(val.email)
            }
        })

        // Sending the room data
        io.in(socc.room_id).emit("room_details", {
            "roomID": socc.room_id,
            "users": room_users
        })

        soc.on("disconnect", () => {
            console.log("soc disconnected ..........");
            //TODO : To make the disconnection logic for socket (removing the user from the room_user array and emeting the aray again to front end)
        })
    })

    soc.on("msg_req" ,(msg_obj) => {
        console.log(msg_obj);
        io.in(msg_obj.roomID).emit("msg_res", {
            "message": msg_obj.message,
            "userName": msg_obj.userName,
            "email": msg_obj.email
        })
    })
})


// Server Listning
server.listen(3000 , () => {
    console.log("SERVER STARTED");
})
