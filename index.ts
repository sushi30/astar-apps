import { ApiPromise } from '@polkadot/api';
import { BTreeMap, Option, Struct, u32 } from '@polkadot/types';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@astar-network/astar-api';
import {
  AccountId,
  Balance,
  EraIndex,
} from '@polkadot/types/interfaces';

interface EraStakingPoints extends Struct {
  readonly total: Balance;
  readonly stakers: BTreeMap<AccountId, Balance>;
  readonly formerStakedEra: EraIndex;
  readonly claimedRewards: Balance;
}

const getAddressEnum = (address: string) => ({ Evm: address });
const getEraStakes = async (
  api: ApiPromise,
  contractAddress: string
): Promise<Map<number, Option<EraStakingPoints>>> => {
  console.log({ contractAddress });
  const eraStakes = await api.query.dappsStaking.contractEraStake.entries<EraStakingPoints>(
    getAddressEnum(contractAddress)
  );

  let eraStakeMap = new Map();
  eraStakes.forEach(([key, stake]) => {
    eraStakeMap.set(parseInt(key.args.map((k) => k.toString())[1]), stake);
  });

  return eraStakeMap;
};

async function main() {
  const provider = new WsProvider('wss://shiden.api.onfinality.io/public-ws');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;
  const contractAddress = '0x072416b9df2382a62Df34956DffB7B0aDdf668F9';
  const staking = await api.query.dappsStaking.contractEraStake.entries<EraStakingPoints>(
    getAddressEnum(contractAddress)
  );
  console.log({ staking });
  await api.disconnect();
}
main();
