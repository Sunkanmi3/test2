const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json())

const database = {
    user: [
        {
            id: "123",
            name: "johnson",
            email: "johnson@gmail.com",
            password: "cookies",
            entries: 0,
            joined: new Date()
        },
        {
            id: "124",
            name: "bimbo",
            email: "bimbo@gmail.com",
            password: "cookies",
            entries: 0,
            joined: new Date()
        },
    ]
}

app.get('/', (req, res)=>{
    res.json(database.user)
});

//Sign-in
app.post('/signin', (req, res)=>{
    if(req.body.email === database.user[0].email && 
        req.body.password === database.user[0].password){
            res.json("success")
        }else{
            res.status(400).json("your email or password is not correct")
        }
});

//Register
app.post("/register", (req, res)=>{
    const { email, name, password } = req.body;
    database.user.push({
            id: "125",
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
    });
    res.json(database.user[database.user.length -1])
})

//profile/user.id
app.get("/profile/:id", (req, res)=>{
    const { id } = req.params;

    let found = false;
    database.user.forEach((use) =>{
        if(use.id === id){
            found = true;
            return res.json(use)
        }
    })
    if(!found){
        res.status(404).json("no user found")
    }
})

//image entries

app.post("/image", (req, res)=>{
    const { id } = req.body;
    let found = false;
    database.user.forEach((use)=>{
        if(use.id === id){
            found = true;
            use.entries++
            return res.json(use.entries)
        }
    })
    if(!found){
        res.status(404).json("no user found")
    }
})

app.listen(5000, ()=>{
    console.log("app is running on port 5000");
});
