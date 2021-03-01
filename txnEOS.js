const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');
const logger = require('./logs/winston.js')
var util = require('util');
const { Op } = require('sequelize')
const send = require('./models/send')

const defaultPrivateKey = process.env.PRIVATE_KEY_MAIN; // bob
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);


const rpc = new JsonRpc('https://eos.greymass.com:443', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

sendDocAndISCCHash = async (transactions) => {
    let results = []
    let result
    for (transaction of transactions) {
        try {
             result = await api.transact({
                actions: [{
                    account: 'proofofipbee',
                    name: 'timestamp',
                    authorization: [{
                        actor: 'proofofipbee',
                        permission: 'active',
                    }],
                    data: {
                        from: 'proofofipbee',
                        hash: transaction.docHash,
                        security4dhash: transaction.docISCCHash
                    }
                }]
            },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            )
            await saveTransaction({
                "result": result,
                "primaryId": transaction.id,
                "docISCCHash": transaction.docISCCHash,
                "docHash": transaction.docHash
            })
        }
        catch (error) {
            result = error
            logger.error(result)
            console.log(result)
        }
        console.log(result)
       
    }
    
}



sendDocHash = async (transactions) => {
    let results = []
    let result
    for (transaction of transactions) {
        try {
             result = await api.transact({
                actions: [{
                    account: 'proofofipbee',
                    name: 'timestamphash',
                    authorization: [{
                        actor: 'proofofipbee',
                        permission: 'active',
                    }],
                    data: {
                        from: 'proofofipbee',
                        hash: transaction.docHash,
                    }
                }]
            },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            )
            await saveTransaction({
                "result": result,
                "primaryId": transaction.id,
                "docHash": transaction.docHash
            })
        }
        catch (error) {
            result = error
            logger.error(result)
            
        }
        console.log(result)
        
    }
    
}
module.exports = {
    sendDocAndISCCHashTransaction: async (transactions) => {

        let result = await sendDocAndISCCHash(transactions)
        
    },
    sendDocHash:  async (transactions) => {

        let result = await sendDocHash(transactions)
        
    }
}

const saveTransaction = async(singleResult) =>{
    logger.info('results in save transaction -->', singleResult)
    
    logger.info('Saved-----------'+singleResult)
        send.update({
            st:1,
            tr_id: singleResult.result.transaction_id
        },{
            where: {
                id: singleResult.primaryId
            }
        })
    
    
}