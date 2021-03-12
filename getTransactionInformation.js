EosApi = require('eosjs-api')

const { Api, JsonRpc } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');  // development only
const fetch = require('node-fetch'); //node only
const { TextDecoder, TextEncoder } = require('util'); //node only

const privateKeys = ["5KcWZS8ticj9HMFTytHFmBPmx1CXF3EvjPffvbK7ZuDQ7sPxCAJ"];

const signatureProvider = new JsSignatureProvider(privateKeys);
const rpc = new JsonRpc('https://eos.greymass.com:443', { fetch }); //required to read blockchain state
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }); //required to submit transactions

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

    result = await rpc.history_get_transaction("f0460b43f7b7708d21a3b9e201db20a6e7d390c4cdf67557f66d954a43b19708")
    console.log(result)
    //console.log(result.traces[0].receipt)
    console.log(result.trx.trx.actions)
  })();
}

getAPI()