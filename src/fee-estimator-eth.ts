import { config } from '../config'
import { Observable, Subscriber } from 'rxjs'
import { MempoolTx, MempoolTxCustom, MempoolTxDefault, GetBlockEth, Deal, MinsFromLastBlock }
  from './types'
import { setItem, getBufferAdded, getBufferRemoved, getBufferBlockSize, getMinsFromLastBlock }
  from './redis-adapter'

  import { WebsocketProvider } from 'web3x/providers';
import { Eth } from 'web3x/eth';  


const provider = new WebsocketProvider('ws://10.3.4.12:8546');
const eth = new Eth(provider);
const subscriberBlockHeader = eth.subscribe('newBlockHeaders')

export async function main(){
  //const txpool = await provider.send("txpool_content", []);
  //console.log(txpool.pending);

  

  const blockHash$: Observable<Buffer> =
  Observable.create((subscriber: Subscriber<any>) => {
    subscriberBlockHeader.on("data", function(blockHeader){
          console.log(blockHeader);
          return () => blockHeader.hash;
      })
      .on("error", console.error);


  }).share()          

  
}

const isValid = (x: number) => x != null && !isNaN(x) && x > 0

main().catch(console.error);