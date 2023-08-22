const express = require ("express")
const path = require ("path")
const app = express()

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port = 4444;


//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
const contact = mongoose.model('contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use("/static", express.static('static')) //for serving static files
app.use(express.urlencoded());

//PUG SPECIFIG STUFF
app.set('view engine', 'pug') //set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory

//ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
res.status(200).render('home.pug', params)
})

app.get('/contact', (req, res) => {
    const params = {}
res.status(200).render('contact.pug', params)
})

app.post('/contact', (req, res) => {
  var mydata = new contact (req.body)
  mydata.save().then(()=>{
    res.send("this item has been saved")
  }).catch(()=>{
    res.statusCode(400).send("iteam is not saved")
  })
  
})

//START THE SERVER
app.listen(port, () => {
    console.log(`the application is sucessfully started on port ${port}`)
});