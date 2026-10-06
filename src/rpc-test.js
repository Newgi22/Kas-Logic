import init, {
  RpcClient,
  Transaction,
  TransactionInput,
  TransactionOutpoint,
  TransactionOutput,
  payToAddressScript,
  Resolver,
  payToScriptHashScript,
  payToScriptHashSignatureScript,
  addressFromScriptPublicKey
} from './kaspa-rpc/kaspa.js'
export {
  payToScriptHashScript,
  payToScriptHashSignatureScript,
  addressFromScriptPublicKey
}

async function testKaspaRpc() {
  try {
    console.log('Loading Kaspa WASM...')

    await init()

    console.log('Connecting to TN10...')

    const rpc = new RpcClient({
      resolver: new Resolver(),
      networkId: 'testnet-10'
    })

    await rpc.connect()

    console.log('Connected:', rpc.url)

    const info = await rpc.getBlockDagInfo()

    console.log('TN10 BlockDAG info:', info)
    console.log('LIVE Virtual DAA:', info.virtualDaaScore)
   
    window.kaspaRpc = rpc

 window.currentKaspaDaa = Number(info.virtualDaaScore)

  window.dispatchEvent(new CustomEvent('kaspa-daa-ready', {
  detail: window.currentKaspaDaa
}))

    const vaultAddress = "kaspatest:pzcyd5jsznwwdxvrm0mz4y2rssjyfk0l46060ukx4phfjgl90ufrch7e34heg"
    const utxos = await rpc.getUtxosByAddresses([vaultAddress])
    console.log("TIME VAULT UTXOs:", utxos)
    window.vaultUtxo = utxos.entries[0]
    console.log("VAULT UTXO:", { txid: utxos.entries[0]?.outpoint?.transactionId, index: utxos.entries[0]?.outpoint?.index, amount: utxos.entries[0]?.amount?.toString(), daa: utxos.entries[0]?.blockDaaScore?.toString() })


    // Keep the live DAA updated for Time Vault status
    setInterval(async () => {
      try {
        const liveInfo = await rpc.getBlockDagInfo()
        window.currentKaspaDaa = Number(liveInfo.virtualDaaScore)

        window.dispatchEvent(new CustomEvent('kaspa-daa-ready', {
          detail: window.currentKaspaDaa
        }))
      } catch (error) {
        console.error('DAA refresh error:', error)
      }
    }, 5000)

  } catch (error) {
    console.error('Kaspa RPC error:', error)
  }
}

testKaspaRpc()



window.payToScriptHashSignatureScript = payToScriptHashSignatureScript
window.payToScriptHashScript = payToScriptHashScript
window.addressFromScriptPublicKey = addressFromScriptPublicKey



Object.assign(window, { Transaction, TransactionInput, TransactionOutpoint, TransactionOutput, payToAddressScript })




