//imports

require ('dotenv').config({ path: 'backend/.env' });

const express = require ('express');

const  cors = require("cors");

const mongoose = require('mongoose');

// const connectDB = require ('../backend/config/db')

const app = express();

//incresed numb of MaxListeners due to error
require('events').EventEmitter.defaultMaxListeners = 16;


//socket connection
const http = require('http')
const {Server} = require ('socket.io')
const server = http.createServer(app)

const axios = require('axios');
const { type } = require('os');



//new server
const io = new Server(server, { 
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
},
allowEIO3: true
    
},
options = {
  ping_interval:50,
    path: '/socket.io-client',
    autoConnect:false,
  })


//headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );

  next();
});



app.use(express.json())

app.use(cors());

app.use(express.urlencoded({extended:false}))

// Routes
app.use('/', require('./routes/criptoRouter'))

app.use(express.static(__dirname + '/public'));


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


//port

const PORT = process.env.PORT || 5000
server.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})






//Exchange mongoose model
const Exchange = require('./model/exchangeModel')


//connect to db 
 
 mongoose.connect(process.env.MONGODB_URL, async function(err,db){

    if(err){
        throw err;
    }

    console.log(`MongoDB Connected `)

    let exchanges= await db.collection('exchanges')



 

   
    //socket on connection
     io.on("connection", (socket) => {
      console.log(`User Connected : ${socket.id}`)

    

sendStatus= function(s){
  socket.emit('status', s)
}



  
  //get data from
  exchanges.find().limit(3).sort({_id:1}).toArray(function (err, res) {
    if (err) {
      console.log(err);
    } else {
      socket.emit('exchangesData',res)

    }

});

setTimeout(() => {

exchanges.find().limit(2).sort({_id:1}).toArray(function (err, res) {
  if (err) {
    console.log(err);
  } else {
    socket.emit('apiRequest',res)

  }

     
  socket.on('apiRequest', function(data){

    let dateTime = data.dateTime
    let selectedCoin = data.selectedCoin
     let amount= data.amount
      let currencyType= data.currencyType
     let curAmount= data.curAmount
     let type   = "Live Price";


      if (dateTime == '' || selectedCoin == '' || amount== ''
      || currencyType== ''
      || curAmount== '' || type== '') {
      } else {
      
          //insert exchange
          exchanges.insertOne({ 
            dateTime: dateTime,
            selectedCoin:selectedCoin,
              amount:amount,
              currencyType: currencyType,
              curAmount: curAmount,
              type   : "Live Price"
        }, function(){
                  socket.emit('apiRequest', [data]);
    console.log('data sent')
                
              })
      }

    });
  });
 
}, 9000)

    
     socket.on('disconnect',()=> {
         console.log('disconnected')
         socket.disconnect()
     })
  
  


})


  
})
  



