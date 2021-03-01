const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');         

var util = require('util');
const {Op} = require('sequelize')
const send = require('./models/send')


  const defaultPrivateKey = "5KcWZS8ticj9HMFTytHFmBPmx1CXF3EvjPffvbK7ZuDQ7sPxCAJ"; // bob
  const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
  

  const rpc = new JsonRpc('https://eos.greymass.com:443', { fetch });
  const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
 
  sendTransaction = async (hash, iscchash) =>{
    const result = await api.transact({
      actions: [{
        account: 'ipbeehashacc',
        name: 'uploadhash',
        authorization: [{
          actor: 'ipbeehashacc',
          permission: 'active',
        }],
        data: {
          from: 'ipbeehashacc',
          docHash: hash,
          docISCCHash: iscchash
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

  sendBulkTxn = async () =>{
    let allTransaction = await send.findAll().then(async(txns) =>{
        for(txn of txns){
            
            await sendTransaction(txn.docHash,txn.docISCCHash)
        }
    })
  }
  
sendBulkTxn()

  