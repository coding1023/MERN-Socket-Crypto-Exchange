const mongoose = require ('mongoose')


const http = require('http')
const {Server} = require ('socket.io')
const server = http.createServer(app)

const axios = require('axios')
const io = new Server(server, { 
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})



// var io = require('socket.io-client');











const connectDB = async (db, error) => {
    try{
      const  conn = await mongoose.connect(process.env.MONGODB_URL)

      console.log(`MongoDB Connected ${conn.connection.host}`)
 

    } catch(error){
        console.log(error)
        process.exit(1)
    }
   

    io.on("connection", (socket) => {
      console.log(`User Connected : ${socket.id}`)
    let exchanges= db.collections('exchanges')


sendStatus= function(s){
  socket.emit('status', s)
}



    //  exchanges.find().toArray(function (err, names) {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         console.log(names);
    //       }
    //         mongoose.connectDB.close();
    //   });
      
  
      
      // const url= ``
  
      io.on("connect",  
      function getData (url){	
       url= `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false`
  
        axios.get(url).then((response)=> {
          let rawData= response.data;
           socket.emit('data',rawData)
  
           Object.keys(rawData).map(key => {
            return Number(rawData[key].usd)
            })
  
  
   
        }).catch((error =>{
          console.log(error)
        }))
        
        }) 
    
  
      // socket.emit('message', 'hello there')
     socket.on('disconnect',()=> {
         console.log('disconnected')
     })
  })
  
  




}

module.exports = connectDB;