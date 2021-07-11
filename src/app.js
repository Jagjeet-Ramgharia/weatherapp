const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
require('./db/conn');
const Register = require("./models/register");
const auth = require('./middlewares/auth');

const staticpath = path.join(__dirname,"../public");
const templates_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");

app.set('view engine','hbs');
app.set('views', templates_path);
hbs.registerPartials(partial_path)
app.use(express.static(staticpath))

// MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))


app.get("/", (req, res)=>{
    res.render("index");
})

app.get("/about", (req, res)=>{
    res.render("about");
})

app.get("/weather", auth ,(req, res)=>{
    res.render("weather");
})

app.get("/register", (req,res)=>{
    res.render("register")
})

app.post("/register", async(req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password === cpassword){
            const registerUser = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                age: req.body.age,
                phone: req.body.phone,
                password: password,
                confirmpassword: cpassword
            })

            const token = await registerUser.generateAuthToken()

            res.cookie("userCookie", token, {
                expires: new Date(Date.now() + 600000),
                httpOnly:true
            })

            const userRegisted = await registerUser.save();
            res.render("index");
        }else{
            res.send("Password and ConfirmPassword does not match.");
        }
    }catch(e){
        res.status(400).send(e)
    }
})

app.get('/login' , (req,res)=>{
    res.render("login")
})

app.post('/login', async(req,res)=>{
    try{
        const email = req.body.email
        const password = req.body.password

        const useremail = await Register.findOne({email:email})

        const pwdCompare = await bcrypt.compare(password,useremail.password)

        const token = await useremail.generateAuthToken()

        res.cookie("userCookie", token, {
            expires: new Date(Date.now() + 60000),
            httpOnly:true
        })

        if(pwdCompare){
            res.status(201).render("index")
        }else{
             res.send("Invalid username and Password")
        }
    }catch(e){
        res.status(400).send(e)
    }
})

app.get('/logout', auth, async(req,res)=>{
    try{
        //for logout from current device 
        // req.user.tokens = req.user.tokens.filter((currentElem)=>{
        //     return currentElem.token !== req.token
        // })

        //for logout from all devices 
        req.user.tokens = [];

        res.clearCookie("userCookie");
        console.log("LogOut Successfully")
        req.user.save()
        res.status(201).render("login")
    }catch(err){
        res.status(400).send(err);
    }
})

app.get("*", (req, res)=>{
    res.render("error");
})

app.listen(port, ()=>{
    console.log("Listening to the port 8000");
})





