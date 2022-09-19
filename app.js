//jshint esversion:6

const express = require("express");
const bodyParser= require("body-parser");
const date = require(__dirname + "/date.js")


const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workitems =[];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req, res) =>{

    
    const day = date.getDate();

   res.render("list", {
        listTitle : day,
        newlistItem : items
   });

   
});

app.post("/", (req, res) =>{

    const item= req.body.isi;
    if (req.body.list === "work"){
        workitems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", (req, res)=> {
res.render("list", {listTitle: "work list", newlistItem: workitems});
});

app.get("/about", (req, res) => {
   
    res.render("about");
});

app.post("/work", (req, res) => {
    const item = req.body.isi;
    workitems.push(item);
    res.redirect("/work");
});


app.listen(3000, () => {
    console.log("running in port 3000");
});
