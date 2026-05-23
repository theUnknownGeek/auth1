import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const app = express()
app.use(express.static("public"))
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/userDB")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userSchema);

app.get("/", (req,res)=>{
    res.render("home");
})

app.get("/login", (req,res)=>{
    res.render("login");
})

app.get("/register", (req,res)=>{
    res.render("register");
})

app.post("/register", async (req,res)=>{
    try{

        const hashedPass = await bcrypt.hash(req.body.password,10)

        const newUser = new User({
            username: req.body.username,
            password: hashedPass
        })

        await newUser.save();

        res.render("secrets")
    } catch(err){
        console.log(err)

        res.send("Registration failed")
    }
    
})

app.post("/login", async (req,res)=>{
    const usernameLog = req.body.username
    const passwordLog = req.body.password

    const foundUser = await User.findOne({
        username: usernameLog
    })

    if(foundUser){
        const match = await bcrypt.compare(
            req.body.password, foundUser.password
        )

        if(match){
            res.render("secrets")
        } else{
            res.send("Incorrect Password")
        }
    } else{
        res.send("Username not Found");
    }
})

app.listen(5000, ()=>{
    console.log("Server is Listening");
})