const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))



const uri = "mongodb+srv://myDbUser:Dibyo178@cluster0.weawa.mongodb.net/FirstDb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/',(req, res)=>{
    //  res.send('hello world')
      res.sendFile(__dirname + '/index.html')
    //  res.sendFile(`${__dirname}`,'./index.html')
})

// const { MongoClient } = require('mongodb');

client.connect(err => {
  const productCollection = client.db("FirstDb").collection("DbCollection");
  console.log('database connection');

app.get('/products',(req, res)=>{
  // productCollection.find({}).limit(1)
  productCollection.find({})
  .toArray((err,documents) => {
    res.send(documents);
  })
})

  app.get("/product/:id", (req, res) => {
      productCollection.find({_id: ObjectId(req.params.id)})
      .toArray((err, documents) => {
          res.send(documents[0])
      })
  })

app.post('/addProduct',(req,res) => {
    // const product = req.body;
    const product=JSON.parse(JSON.stringify(req.body));
    // console.log(product);
     // send data
     productCollection.insertOne(product)
     .then(result=>{
       console.log('product added');
    //    res.send('success')
          res.redirect('/')
     })
    // res.end()
  })

app.patch('/update/:id', (req, res) => {
          productCollection.updateOne({_id: ObjectId(req.params.id)},
          {
            $set: {price: req.body.price, quantity: req.body.quantity}
          } )
          .then(result => {
            res.send(result.modifiedCount > 0)
        })
      })
 


app.delete('/delete/:id',(req, res)=>{
  productCollection.deleteOne({_id:ObjectId( req.params.id)})
  .then(result =>{
    //   console.log(result)
    res.send(result.deletedCount>0)
  })
})

  


  


  // send data
//  const product={name:'modeu',price:23,quantity:12};
//   collection.insertOne(product)
//   .then(result => {
//     console.log('one product inserted')
//   })
  // perform actions on the collection object

});


app.listen(3000),()=>{
  console.log('Hello mongo')
};

