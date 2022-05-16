const asyncHandler = require ('express-async-handler');

const Exchange= require('../model/exchangeModel')


//update crypto
// route PUT api/crypto/:id
const updateCrypto =asyncHandler(async (req, res)=>{
    const exchanges = await Exchange.findOneAndUpdate(req.params.id)
    .then(exchange => {
        exchange.dateTime =  Date.parse(req.body.dateTime);
        exchange.selectedCoin = req.body.selectedCoin
        exchange.amount = Number(req.body.amount);
        exchange.currencyType=  req.body.currencyType;
        exchange.curAmount = Number(req.body.curAmount);
        exchange.type = req.body.type;
        exchange.save()
       .then(res.status(200).json ({message: `{update crypto ${req.params.id}}`})) 
    })

    if (!Exchange) {
        throw new Error('Not found')
    }
})

//delete crypto
// route DELETE api/crypto/:id
const deleteCrypto =asyncHandler(async (req, res)=>{
    const exchanges = await Exchange.findOneAndDelete(req.params.id)

    if (!Exchange) {
        throw new Error('Not found')
    }

    await exchanges.remove()

    res.status(200).json({ id:req.params.id})
})










//get crypto 
// route GET api/crypto
const getCrypto = asyncHandler(async  (req, res)=>{
const exchanges = await Exchange.find()

    res.status(200).json(exchanges)
})




//set crypto
// route POST api/crypto
const setCrypto = asyncHandler(async (req, res)=>{

    // var dateObj = ();
    // var currentDate = dateObj.toUTCString();
    // date = currentDate;
    // key = Date.now();
    const dateTime = Date.parse(req.body.dateTime);
     const selectedCoin = req.body.selectedCoin
    const amount = Number(req.body.amount);
    const currencyType =  req.body.currencyType;
  const curAmount = Number(req.body.curAmount);
 const type = req.body.type;


    const newExchange = new Exchange({
        dateTime,
        selectedCoin,
        amount,
        currencyType,
      curAmount,
      type
    });
    
    newExchange.save()
    res.status(200).json({message: 'set crypto'})
})









module.exports= {
    getCrypto,setCrypto, updateCrypto, deleteCrypto
}