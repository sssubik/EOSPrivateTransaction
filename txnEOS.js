const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');

var util = require('util');
const { Op } = require('sequelize')
const send = require('./models/send')
/* onst config = {
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
    keyProvider: ["5JSWgESQeCM3DiBrXDmEsvQw4V4GYZQJwyv92NpaKfjtKNHkq8x"],
    httpEndpoint: 'https://jungle3.cryptolions.io:443',
    // TODO: changeable https://api.eosnewyork.io https://nodes.get-scatter.com
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
  }  */
const defaultPrivateKey = process.env.PRIVATE_KEY_TEST; // bob
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);


const rpc = new JsonRpc('http://jungle3.cryptolions.io:80', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

sendDocAndISCCHash = async (transactions) => {
    let results = []
    let result
    for (transaction of transactions) {
        try {
             result = await api.transact({
                actions: [{
                    account: 'ipbeehashacc',
                    name: 'timestamp',
                    authorization: [{
                        actor: 'ipbeehashacc',
                        permission: 'active',
                    }],
                    data: {
                        from: 'ipbeehashacc',
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
        }
        catch (error) {
            console.log(error)
            result = error
        }
        console.log(result)
        await saveTransaction({
            "result": result,
            "primaryId": transaction.id,
            "docISCCHash": transaction.docISCCHash,
            "docHash": transaction.docHash
        })
    }
    
}


module.exports = class TransactionUtils {
    static sendDocAndISCCHashTransaction = async (transactions) => {

        let result = await sendDocAndISCCHash(transactions)
        
    }
}

const saveTransaction = async(singleResult) =>{
    console.log('results in save transaction -->', singleResult)

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