const express = require("express");
const bodyParser = require("body-parser");
const app = express();


let newItems = [] ;
app.set("view engine", "ejs");

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//static
app.use(express.static('public'));

app.get("/", (req, res) => {
  const today = new Date();
  let options = { weekday: 'long', month: 'long', day: 'numeric' };
  
  let day = today.toLocaleDateString("en-US", options)

  res.render("list", { kindOfDay: day , addedItem: newItems });
});

app.post("/", (req,res)=>{
    let newItem = req.body.newItem

    newItems.push(newItem) ;
    res.redirect("/")
})



app.listen(3000, () => {
  console.log("Server started on port 3000");
});
