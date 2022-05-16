const mongoose = require ('mongoose')

    
const exchangeSchema = mongoose.Schema ( {

      dateTime: {type: Date, required: true,
        default: Date.now
    },
    selectedCoin: {
        type: Array,
        required: true
     },
      amount: { type: Number, required: true
    },
    currencyType: {type: Array, required: true
    }, 
    curAmount: {type: Number, required:true
    }, 
    type: { type: String, required: true}


     
},

{
    timestamp: true,
    
}


)

module.exports = mongoose.model('Exchange' ,exchangeSchema)