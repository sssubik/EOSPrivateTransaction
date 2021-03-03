var util = require('util');
const {Op} = require('sequelize')
const send = require('./models/send')
var sendTransaction = require('./app.js')

const pending = 0
const started = 1
const done = 2

const runscript = async() =>{
    var transactionsDocAndISCCHash = []
    var transactionsDocHash = []
    let allTransactions = await send.findAll({
        where: {
            tr_id:{
                [Op.eq]: null
            },
            [Op.and]:[
               {
                   st: {[Op.ne]:started}
                },
               {
                   st: {[Op.ne]:done}}
            ]
        }
    }).then(async(txns) => {
        for(txn of txns){
            if(txn.st == 0 && txn.docISCCHash !== null && txn.docHash !== null){
                transactionsDocAndISCCHash.push(
                    {
                        'id': txn.id,
                        'docHash': txn.docHash,
                        'docISCCHash':txn.docISCCHash
                    }
                )
                
            }
            else if(txn.st == 0 && txn.docISCCHash === null && txn.docHash !== null){
                transactionsDocHash.push({
                    'id': txn.id,
                    'docHash': txn.docHash
                })
            }
            await updateStatus(txn.id)
        }
    })
    console.log(transactionsDocAndISCCHash.length)
    if(transactionsDocHash.length !==0){
        await sendTransaction.sendDocHash(transactionsDocHash)
    }

    if(transactionsDocAndISCCHash.length !== 0){
        await sendTransaction.sendDocAndISCCHash(transactionsDocAndISCCHash)
    }

 
}

const updateStatus = async primaryId=>{
    send.update({
        st: started
    },{
        where:{
            id:primaryId
        }
    }
    
    )
    return 
}

runscript()