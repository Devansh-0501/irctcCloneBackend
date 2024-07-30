const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const userModel = require('./models/user')
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const trainsRouter = require('./routes/trains');
const cors = require('cors');


app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.get('/' , (req,res) => {
    console.log('srver is connected');
    res.render("index");

    
});
app.get('/login' , (req,res) => {
    
    res.render("login");
    
});


app.use("/api/trains", trainsRouter);


app.post('/register' , async (req,res) => {
    let {username, email, name,password} = req.body;
    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User alreaaady registered")
    
    bcrypt.genSalt(10 , (err,salt)=> {
        bcrypt.hash(password,salt, async (err,hash) => {
           let createdUser= await userModel.create({
                name , 
                email,
                username,
                password:hash
            })

            let token = jwt.sign({email: email}, "hiiii")
            res.cookie("token" , token);
            res.send("registered Successfully");
        })
    })
});
app.post('/login' , async (req,res) => {
    let { email,password} = req.body;
    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("Something Wrong")
    
    bcrypt.compare(password,user.password, (err,result)=>{
        if(result) res.status(200).send("You can login")
        else res.redirect("/login");
    })
    
});

app.listen(4000);