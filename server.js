const { error } = require("console");
const express = require("express");
const session = require("express-session");
const path = require("path");

var db = require("./db")

const app = express();
const PORT = 9090


app.use(express.static(path.join(__dirname, './')))
app.use(express.urlencoded({extended:true})); 
app.use(session({secret:"oauhsdlmfnaliustydfialjbkwegf"}))

app.set("views", "templates");
app.set("view engine", "pug");

////////////////////////////////////////////////////////////////////////
// REDIRECT TO MY ABOUT ME PAGE
app.get("/", (req, res) =>{
    //send to myAboutMe
    res.redirect("/myAboutMe")
});


////////////////////////////////////////////////////////////////////////
// CONTACT LOG PAGE
var category = "All";
var numRows = 1;
app.get("/contactLog", async (req, res) =>{
    if (req.query.category){
        category = req.query.category;
    }

    const contactData = await db.getContactForm(category)
    numRows = contactData.length;
    
    res.render("contactLog", {numRows:numRows, contactData:contactData})
});


////////////////////////////////////////////////////////////////////////
// ABOUT ME PAGE
app.get("/myAboutMe", (req, res) =>{
    res.render("myAboutMe")
});


////////////////////////////////////////////////////////////////////////
// MY CONTACTS PAGE
app.get("/myContacts", (req, res) =>{
    res.render("myContacts")
});


////////////////////////////////////////////////////////////////////////
// MY WIDGET PAGE
var click = 0;
app.get("/myWidgets", (req, res) =>{
    // click = req.session.clickCount;
    res.render("myWidgets", {clickCount:click})
});

app.get("/api/click", (req, res) => {
    res.json({clickCount:click})
})

app.post("/api/click", (req, res) => {
    click += 1;
    res.json({clickCount:click})
})


////////////////////////////////////////////////////////////////////////
// LOGIN PAGE
var loggedin = false;
var name = "";
app.get("/login", (req, res) =>{
    res.render("login", {loggedin:loggedin, user:name})
});

app.post("/theNav", (req, res) =>{
    if (loggedin){
        loggedin = false
        user = "Login"
    }
    else {
        loggedin = true
        req.session.username = req.body.username
        user = req.session.username
        name = req.session.username
    }
    res.redirect("/myAboutMe")
});


////////////////////////////////////////////////////////////////////////
// CONTACT ME PAGE
var isSubmitted = 0;
app.get("/contactMe", (req, res) =>{
    isSubmitted = 0;
    res.render("contactMe", {isSubmitted:isSubmitted})
});

app.post("/contactMe", async function(req, res) {  
    const title = req.body.postTitle || null
    const email = req.body.email || null
    const username = req.body.username || null
    const link = req.body.link || null
    const category = req.body.category || null
    const message = req.body.message || null

    try {
        const temp = await db.addContactForm(title, email, username, link, category, message);
        res.render("contactMe", {isSubmitted:1})
    } catch(err){
        res.render("contactMe", {isSubmitted:2})
    }
});


////////////////////////////////////////////////////////////////////////
// Start the web server
app.listen(PORT, function() {
    console.log(`Listening on http://localhost:${PORT}`);
});
