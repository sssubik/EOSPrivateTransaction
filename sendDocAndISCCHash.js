var util = require('util');
const {Op} = require('sequelize')
const send = require('./models/send')
var sendTransaction = require('./app.js')

const runscript = async() =>{
    var transactions = []
    let allTransactions = await send.findAll({
        where: {
            tr_id:{
                [Op.eq]: null
            }
        }
    }).then(async(txns) => {
        for(txn of txns){
            if(txn.st == null && txn.docISCCHash !== null && txn.docHash !== null){
                transactions.push(
                    {
                        'id': txn.id,
                        'docHash': txn.docHash,
                        'docISCCHash':txn.docISCCHash
                    }
                )
            }
        }
    })

    if(transactions.length !== 0){
        await sendTransaction.sendDocAndISCCHash(transactions)
    }
}

runscript()