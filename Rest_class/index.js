const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");
const multer = require("multer");

app.use(methodOverride("_method"));

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use("/uploads", express.static(path.join(__dirname,"uploads")));

const upload = multer({dest: "uploads/"});

let posts = [
    {
        id: uuid(),
        username: "aadi.b_27",
        image: "https://images.unsplash.com/photo-1789349050760-cc196eed88b1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: "This is my first post",
    },
    {
        id: uuid(),
        username: "triptibansal08",
        image: "https://images.unsplash.com/photo-1789394075701-20a385f71a24?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: "I hate Aadi",
    },
    {
        id: uuid(),
        username: "thakurvipasha_",
        image: "https://plus.unsplash.com/premium_photo-1789200609644-cbcd8711dae2?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: "I love to torment Aadi",
    },
]

app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts});
});

app.post("/posts", upload.single("image"), (req, res)=>{
    let {username, content} = req.body;
    let id = uuid();
    let image = `/uploads/${req.file.filename}`;
    posts.push({id,username, image, content});
    res.redirect("/posts");
});

app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});

app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});



