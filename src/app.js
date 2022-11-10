const express = require('express');
const path = require('path');
const app = express();
require("./db/conn");
const Register = require("./models/registers");
const Message = require("./models/message");
const Details = require("./models/book_details");
const hbs = require("hbs");
const bcrypt = require('bcryptjs');
const port = process.env.PORT || 3000;

//built in middleware
const staticPath = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));  //get the input value of form.
app.use(express.static(staticPath));

// to set the view engine
    app.set("view engine", "hbs");
    app.set("views", template_path);
    hbs.registerPartials(partials_path);



// templete engine route

app.get("", (req, res) =>{
    res.render("index");
});
app.get("/login", (req,res)=>{
    res.render("login");
});
app.get("/register", (req,res)=>{
    res.render("register");
});
app.get("/about", (req,res)=>{
    res.render("about");
});
app.get("/contact", (req,res)=>{
    res.render("contact");
});
app.get("/gallery", (req,res)=>{
    res.render("gallery");
});
app.get("/packages", (req,res)=>{
    res.render("packages");
});
app.get("/booknow", (req,res)=>{
    res.render("booknow");
});
app.get("/chart", (req,res)=>{
    res.render("chart");
});
app.get("/success", (req,res)=>{
    res.render("success");
});



// create new user in database
app.post("/register", async(req,res)=>{
    try{
    //   console.log(req.body.username);
    //   res.send(req.body.username);
    const password =req.body.password;
    const cpassword = req.body.passwords;

    if(password ==cpassword){
        const costumerDetail = new Register({
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            password: password,
            passwords: cpassword
        });

        //password hash
        //first we need to install bcryptjs== npm i becryptjs


        const registered = await costumerDetail.save();
        const arrdata = [registered];
        res.status(201).render("index");
    }else{
        res.send("password not matching");
    }
    } catch(error) {
        res.status(400).send(error);
    }
});


//login check
app.post("/login", async(req,res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail =  await Register.findOne({email:email});
        const isMatch = await bcrypt.compare(password, useremail.password);

        // res.send(useremail);
        // console.log(useremail);
        if(isMatch){
            res.status(201).render("booknow");
        }
        else{
            res.send("Invalid email or password.");
        }

    } catch(error){
        res.status(400).send("Invalid email or password.");
    }
});

//booking check
app.post("/booknow", async(req,res) =>{
    
    try{
        // res.send(req.body);
        const userBook = new Details(req.body);
         await userBook.save();
        //  res.status(201).render("packages");
    }catch(error){
        res.status(500).send(error);
    }
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail =  await Register.findOne({email:email});
        const isMatch = await bcrypt.compare(password, useremail.password);

        // res.send(useremail);
        // console.log(useremail);


        if(isMatch){
            
            res.status(201).render("success");
            
            // alert("Your Tour has been booked.") 
        }
        else{
            res.send("Invalid email or password.");
        }

    } catch(error){
        res.status(400).send("Invalid email or password.");
    }
});

//message check
app.post("/contact", async(req,res) =>{
    try{
        // res.send(req.body);
        const userMessage = new Message(req.body);
         await userMessage.save();
         res.status(201).render("contact");
    }catch(error){
        res.status(500).send(error);
    }
});

//Book check
app.post("/booknow", async(req,res) =>{
    try{
        // res.send(req.body);
        const userBook = new Details(req.body);
         await userBook.save();
         res.status(201).render("packages");
    }catch(error){
        res.status(500).send(error);
    }
});

app.listen(port,()=>{
    console.log(`listening on port no ${port}`);
});