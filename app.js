const util = require('util')

require('dotenv').config({ path: __dirname + '/.env' });

const { Op } = require('sequelize')
const send = require('./models/send')
const Transaction = require('./txnEOS')

module.exports = {
    sendDocAndISCCHash: async(transactions) => {
        let results = await Transaction.sendDocAndISCCHashTransaction(transactions)

        //await saveTransaction(results)
    }
    
}

const saveTransaction = async(results) =>{
    console.log('results in save transaction -->', results)

    for(singleResult of results){
        send.update({
            st:1,
            tr_id: singleResult.result.transaction_id
        },{
            where: {
                id: singleResult.primaryId
            }
        })
        console.log('saving.......')
    }
    
}