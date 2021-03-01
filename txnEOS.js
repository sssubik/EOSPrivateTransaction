const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');
const logger = require('./logs/winston')
var util = require('util');
const { Op } = require('sequelize')
const send = require('./models/send')

const defaultPrivateKey = process.env.PRIVATE_KEY_TEST_EOSIO; // bob
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc('https://api.testnet.eos.io', { fetch });

//const rpc = new JsonRpc('http://jungle3.cryptolions.io:80', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

sendDocAndISCCHash = async (transactions) => {
    let results = []
    let result
    for (transaction of transactions) {
        try {
             result = await api.transact({
                actions: [{
                    account: 'wemkmoegoqei',
                    name: 'timestamp',
                    authorization: [{
                        actor: 'wemkmoegoqei',
                        permission: 'active',
                    }],
                    data: {
                        from: 'wemkmoegoqei',
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
                    account: 'wemkmoegoqei',
                    name: 'timestamphash',
                    authorization: [{
                        actor: 'wemkmoegoqei',
                        permission: 'active',
                    }],
                    data: {
                        from: 'wemkmoegoqei',
                        hash: transaction.docHash,
                    
                    }
                }]
            },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            )
        }
        catch (error) {
            result = error
            logger.error(result)
            console.log(result)
        }
        
        await saveTransaction({
            "result": result,
            "primaryId": transaction.id,
            "docISCCHash": transaction.docISCCHash,
            "docHash": transaction.docHash
        })
        console.log(result)
    }
    
}
module.exports = {
    sendDocAndISCCHashTransaction: async (transactions) => {

        let result = await sendDocAndISCCHash(transactions)
        
    },
    sendDocHash: async (transactions) => {

        let result = await sendDocHash(transactions)
        
    }
}

const saveTransaction = async(singleResult) =>{
    logger.info('saving transaction ------------', singleResult)

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