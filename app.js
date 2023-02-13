const express = require("express");
const bodyParser = require("body-parser");
const day = require(__dirname + "/public/date");
const app = express();
const mongoose = require("mongoose")

app.set("view engine", "ejs");

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//static
app.use(express.static("public"));




mongoose.set('strictQuery', false)



mongoose.connect('mongodb://localhost:27017/todoDB', {
      useNewUrlParser: true
      
    })



const itemSchema = {
  name: String
}



const Item = mongoose.model("Item", itemSchema)

const item1 =new Item ({
  name :"tanvir"
})
const item2 = new Item ({
  name :"imam"
})
const item3 = new Item ({
  name :"mitul"
})

const items = [item1,item2 ,item3]



app.get("/", (req, res) => {

  Item.find({}, (err,foundItem)=>{

    if(foundItem.length===0){

      Item.insertMany(items, (err)=> {
        if (err){
          console.log(err);
        }else{
          console.log('successsfully added');
          
        }
      })

      res.redirect("/")
    }else{
      res.render("list", { kindOfDay: day.day, addedItem: foundItem });
    }
    
  })
  
});


//adding to database
app.post("/", (req, res) => {
  
  let newItem = req.body.newItem;
  console.log(newItem);

  const item = new Item ({
    name : newItem 
  })

  item.save()
  res.redirect("/");
});




//deleting from database on checked

app.post("/delete", (req,res)=>{

   const checkBoxId = req.body.checkbox ;
   
   Item.findByIdAndRemove(checkBoxId , (err)=>{
    if(!err){
      console.log("success on deleteting");
    } else{
      console.log(err);
    }
   })

   res.redirect("/") ;
})



app.listen(3000, () => {
  console.log("Server started on port 3000");
});


