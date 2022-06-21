const express=require("express");
const BodyParser=require("body-parser");
const mongoose=require("mongoose");
const bodyParser = require("body-parser");
const ejs=require("ejs");

const app=express();

app.use(BodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.set("view engine","ejs");

mongoose.connect("mongodb://127.0.0.1:27017/Wiki-DB");

const ArticleSchema=mongoose.Schema({
    name:String,
    desc:String
})

const articles=mongoose.model("info",ArticleSchema);

app.route("/articles")
   .get((req,res)=>{
     articles.find((err,foundlist)=>{
        if(!err){
            console.log(foundlist);
        }else{
            console.log(err)
        }
     })
    })
   .post((req,res)=>{
     console.log(req.body.name);
     console.log(req.body.desc);
     const new_info=new articles({
        name:req.body.name,
        desc:req.body.desc
     })
     new_info.save((err)=>{
        if(!err){
            console.log("Item has been saved!")
        }else{
            console.log(err)
        }
     });
    })
   .delete((req,res)=>{
    console.log("Dont be destructive lol")
    })

app.route("/articles/:articleTitle")
.get((req,res)=>{
    
    articles.findOne({name:req.params.articleTitle},(err,foundlist)=>{
        if(!err){
            res.send(foundlist);
        }else{
            console.log(err)
        }

    })
})
.put((req,res)=>{
    articles.updateOne({name:req.params.articleTitle},{name:req.body.name,content:req.body.desc},{overwrite:false},(err,foundlist)=>{
        if(!foundlist){
            console.log(err)
        }else{
            res.send(foundlist);
        }
    })
})
.patch((req,res)=>{
    articles.updateOne({title:req.params.articleTitle},{$set:{name:req.body.name,desc:req.body.desc}},(err)=>{
        if(!err){
            console.log("Succesfully patched!")
        }else{
            console.log(err);
        }
        
    })
})
.delete((req,res)=>{
   articles.deleteOne({name:req.params.articleTitle},(err)=>{
    if(!err){
        console.log("Succesfully deleted")
    }else{
        console.log(err)
    }
   })

})
app.get("/articles",)

app.post("/articles",)

app.delete("/articles",)



app.listen(3000,()=>{
    console.log("Server has connected succesfully")
})