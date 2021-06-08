const express = require('express');
const app = express();
const port = process.env.PORT || 8000
const path = require('path');
const hbs = require('hbs');

const staticpath = path.join(__dirname,"../public");
const templates_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");
console.log(staticpath);
app.set('view engine','hbs');
app.set('views', templates_path);
hbs.registerPartials(partial_path)
app.use(express.static(staticpath))
app.get("/", (req, res)=>{
    res.render("index");
})

app.get("/about", (req, res)=>{
    res.render("about");
})

app.get("/weather", (req, res)=>{
    res.render("weather");
})

app.get("*", (req, res)=>{
    res.render("error");
})

app.listen(port, ()=>{
    console.log("Listening to the port 8000");
})