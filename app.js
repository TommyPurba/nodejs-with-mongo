//jshint esversion:6

const express = require("express");
const bodyParser= require("body-parser");
const mongoose = require("mongoose");
const _= require("lodash");


const app = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/todolistDB");

const listSchema = {
    name : String
}

const item = mongoose.model("Item", listSchema);

const items3 = new item({
    name : "Welcome to your todolist!"
});

const items2 = new item({
    name : "hit + to add item"
});

const items1 = new item({
    name : "hit delete to delete item!"
});

const deflautItem = [items1, items2, items3];

const nomSchema = {
    name : String,
    items : [listSchema] 
};  

const lists = mongoose.model("lists", nomSchema);


app.get("/", (req, res) =>{

    item.find({}, (err, fitem) => {

        if (fitem.length === 0){
                item.insertMany(deflautItem, (err)=>{
                    if (err){
                        console.log(err);
                    }else{
                        console.log("succes");
                    }
                });
                res.redirect("/");  
        }else{
                res.render("list", {
                    listTitle : "Today",
                    newlistItem : fitem
                    });  
        }
       
    });
});

app.post("/", (req, res) =>{

    const itemName = req.body.isi;
    const listNamesa = req.body.list;
    const items4 = new item({
        name : itemName
    });
    
    if(listNamesa === "Today"){
        items4.save();
        res.redirect("/");
    } else {
        lists.findOne({name: listNamesa}, (err, foundlist)=>{
            foundlist.items.push(items4);
            foundlist.save();
            res.redirect("/" + listNamesa);
        });
    }
    
    
});

app.post("/delete", (req, res)=>{
    const check = req.body.checkbox;
    const nameList = req.body.listName;

    if(nameList==="Today"){
        item.findByIdAndRemove(check, (err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("succes remove item");
                res.redirect("/");
            }
        });
    } else {
        lists.findOneAndUpdate({name : nameList}, {$pull : {items : {_id : check}}}, (err, foundlist)=>{
            if(!err){
                res.redirect("/" + nameList);
            }
        });
    }

    
});

app.get("/:cudtom", (req, res)=> {
    const customName = _.capitalize(req.params.cudtom);
    

    lists.findOne({name : customName},(err, foundlist)=>{
        if(!err){
            if(!foundlist){
                const lip = new lists({
                    name : customName,
                    items : deflautItem
                });
                res.redirect("/" + customName);
                lip.save();
            }else{
                //show an exiting list
                res.render("list", {
                    listTitle : foundlist.name,
                    newlistItem : foundlist.items
                    });  
            }
        }
    });
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
