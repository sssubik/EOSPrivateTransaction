EosApi = require('eosjs-api')

const { Api, JsonRpc } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');  // development only
const fetch = require('node-fetch'); //node only
const { TextDecoder, TextEncoder } = require('util'); //node only

const privateKeys = ["5KcWZS8ticj9HMFTytHFmBPmx1CXF3EvjPffvbK7ZuDQ7sPxCAJ"];

const signatureProvider = new JsSignatureProvider(privateKeys);
const rpc = new JsonRpc('https://eos.greymass.com:443', { fetch }); //required to read blockchain state
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }); //required to submit transactions


var util = require('util');
const {Op} = require('sequelize')
const send = require('./models/send')
var sendTransaction = require('./app.js')


options = {
    httpEndpoint: "https://eos.greymass.com:443"
}

eos = EosApi(options)

account_name = "proofofipbee"
pos = 0
offset = 5
//eos.getActions(account_name, pos, offset).then(result => console.log(result))

//eos.getTransaction("4dffcb867f01f3c805a2b32b24735db89ac40a350b7831404016b325f1bc153c").then(result => console.log(result))
async function getAPI(){
(async () => {

    result = await rpc.history_get_transaction("4dffcb867f01f3c805a2b32b24735db89ac40a350b7831404016b325f1bc153c")
    console.log(result)
  })();
}


const runscript = async() =>{
    var transactionsDocAndISCCHash = []
    var transactionsDocHash = []
    let allTransactions = await send.findAll({
        where: {
            tr_ts:{
                [Op.eq]: null
            }
        }
    }).then(async(txns) => {
        for (txn of txns){
            await updateTimestamp(txn)
        }
    })
}

updateTimestamp = async (txn) =>{
    console.log(txn.tr_id)
    result = await rpc.history_get_transaction(txn.tr_id)
    send.update({
        tr_ts:result.traces[0].block_time
    },{
        where: {
            id: txn.id
        }
    })
}
runscript()