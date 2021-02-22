const {Op} = require('sequelize')
const send = require('./models/send')
const sendEOS = require('./models/sendEOS')
const runScript = async() =>{
    let k
    let allTransactions  = await send.findAll({
        where:{
            id: 1
        }
    }).then(async(txns) =>{
        console.log(txns)
        for(txn of txns){
            separatedDocHashes = txn.docHash.split('\r\n');
            separatedDocISCCHashes = txn.docISCCHash.split('\r\n');
            console.log(separatedDocHashes)
            for(k=0; k< separatedDocHashes.length-1;k++){
                await saveDocAndISCCHashes
                ({      "address": txn.address,
                        "docHash":separatedDocHashes[k],
                        "docISCCHash": separatedDocISCCHashes[k]
                    
                })
            }
           
        }
    })

  
}
const saveDocAndISCCHashes = async(result)=>{
    console.log(result)
    await sendEOS.create(
        {   
            address: result.address,
            docHash: result.docHash,
            docISCCHash: result.docISCCHash
        }
    )
}
runScript()