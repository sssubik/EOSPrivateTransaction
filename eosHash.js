const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only

require('dotenv').config({ path: __dirname + '/.env' });
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');
const dataObj	= require('minimist')(process.argv.slice(2));
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
<<<<<<< HEAD
const defaultPrivateKey = process.env.PRIVATE_KEY_MAIN; // bob
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);


const rpc = new JsonRpc('https://eos.greymass.com:443', { fetch });
=======
const defaultPrivateKey = process.env.PRIVATE_KEY_TEST; // bob
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);


const rpc = new JsonRpc('https://jungle3.cryptolions.io:443', { fetch });
>>>>>>> testNetTxn
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

transaction = (async (dataObj) =>{
    let result = null
        if(dataObj.iscc !== undefined){
           result = sendISCCHash(dataObj.iscc)
        }

    }
)

sendISCCHash = async (iscc) => {
        try {
             result = await api.transact({
                actions: [{
<<<<<<< HEAD
                    account: 'proofofipbee',
                    name: 'dociscchash',
                    authorization: [{
                        actor: 'proofofipbee',
                        permission: 'active',
                    }],
                    data: {
                        from: 'proofofipbee',
=======
                    account: 'ipbeehashacc',
                    name: 'dociscchash',
                    authorization: [{
                        actor: 'ipbeehashacc',
                        permission: 'active',
                    }],
                    data: {
                        from: 'ipbeehashacc',
>>>>>>> testNetTxn
                        docISCCHash: iscc,
                        
                    }
                }]
            },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            )
            console.log(result)
        }
        catch (error) {
            console.log(error)
            result = error
        }
        
   
}

transaction(dataObj)