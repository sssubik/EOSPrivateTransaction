var util = require('util');
const {Op} = require('sequelize')
const send = require('./models/send')
var sendTransaction = require('./app.js')

const runscript = async() =>{
    var transactionsDocAndISCCHash = []
    var transactionsDocHash = []
    let allTransactions = await send.findAll({
        where: {
            tr_id:{
                [Op.eq]: null
            }
        }
    }).then(async(txns) => {
        for(txn of txns){
            if(txn.st == null && txn.docISCCHash !== null && txn.docHash !== null){
                transactionsDocAndISCCHash.push(
                    {
                        'id': txn.id,
                        'docHash': txn.docHash,
                        'docISCCHash':txn.docISCCHash
                    }
                )
            }
            else if(txn.st == null && txn.docISCCHash === null && txn.docHash !== null){
                transactionsDocHash.push({
                    'id': txn.id,
                    'docHash': txn.docHash
                })
            }
        }
    })

    if(transactionsDocAndISCCHash.length !== 0){
        await sendTransaction.sendDocAndISCCHash(transactionsDocAndISCCHash)
    }

    if(transactionsDocHash.length !==0){
        await sendTransaction.sendDocHash(transactionsDocHash)
    }
}

runscript()