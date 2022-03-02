# How to run this script?

```shell
git clone ... astar-apps-test
cd astar-apps-test
yarn
yarn ts-node -O '{"module": "commonjs"}' index.ts
```

In powershell:

```powershell
yarn ts-node -O '{\"module\": \"commonjs\"}' .\index.ts
```

## Result

```javascript
2022-03-02 12:59:49        RPC-CORE: queryStorageAt(keys: Vec<StorageKey>, at?: BlockHash): Vec<StorageChangeSet>:: Unable to decode storage dappsStaking.contractEraStake: entry 0:: createType(PalletDappsStakingEraStakingPoints):: decodeU8a: failed at 0xd38515e62f83f804861803773ae17af0… on stakers: BTreeMap<AccountId,Balance>:: Number can only safely store up to 53 bits
2022-03-02 12:59:49             DRR: Unable to decode storage dappsStaking.contractEraStake: entry 0:: createType(PalletDappsStakingEraStakingPoints):: decodeU8a: failed at 0xd38515e62f83f804861803773ae17af0… on stakers: BTreeMap<AccountId,Balance>:: Number can only safely store up to 53 bits
(node:19704) UnhandledPromiseRejectionWarning: Error: Unable to decode storage dappsStaking.contractEraStake: entry 0:: createType(PalletDappsStakingEraStakingPoints):: decodeU8a: failed at 0xd38515e62f83f804861803773ae17af0… on stakers: BTreeMap<AccountId,Balance>:: Number can only safely store up to 53 bits    
    at RpcCore._newType (C:\Users\user\projects\astar-apps\node_modules\@polkadot\api\node_modules\@polkadot\rpc-core\bundle.cjs:477:13)
    at RpcCore._formatStorageSetEntry (C:\Users\user\projects\astar-apps\node_modules\@polkadot\api\node_modules\@polkadot\rpc-core\bundle.cjs:456:17)       
    at C:\Users\user\projects\astar-apps\node_modules\@polkadot\api\node_modules\@polkadot\rpc-core\bundle.cjs:433:25
    at Type.reduce (<anonymous>)
    at RpcCore._formatStorageSet (C:\Users\user\projects\astar-apps\node_modules\@polkadot\api\node_modules\@polkadot\rpc-core\bundle.cjs:432:17)
    at C:\Users\user\projects\astar-apps\node_modules\@polkadot\api\node_modules\@polkadot\rpc-core\bundle.cjs:406:58
    at Array.map (<anonymous>)
    at RpcCore._formatOutput (C:\Users\user\projects\astar-apps\node_modules\@polkadot\api\node_modules\@polkadot\rpc-core\bundle.cjs:401:29)
    at RpcCore._formatResult (C:\Users\user\projects\astar-apps\node_modules\@polkadot\api\node_modules\@polkadot\rpc-core\bundle.cjs:237:27)
    at callWithRegistry (C:\Users\user\projects\astar-apps\node_modules\@polkadot\api\node_modules\@polkadot\rpc-core\bundle.cjs:261:19)
```

