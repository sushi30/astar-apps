import { useStore } from 'src/store';
import { computed, Ref, watch, ref } from 'vue';
import { contractInstance } from 'src/config/web3/contracts';
import dappsStakingContractAbi from 'src/config/web3/abi/dapps-staking-abi.json';
import { Staking } from 'src/config/web3/contracts/staking';
import { $web3 } from 'boot/api';

export function useStaking(addressRef: Ref<string>) {
  const store = useStore();
  const isH160Formatted = computed(() => store.getters['general/isH160Formatted']);
  const stakingRef = ref();

  // dApps Staking precompiled contract address
  const PRECOMPILED_ADDR = '0x0000000000000000000000000000000000005001';

  watch(
    () => addressRef.value,
    async () => {
      const ci = contractInstance(
        $web3.value!!,
        dappsStakingContractAbi,
        PRECOMPILED_ADDR,
        addressRef.value
      );
      stakingRef.value = new Staking(ci);
    },
    { immediate: true }
  );

  const getEraInfo = () => {
    const result = ref();

    watch(
      () => stakingRef.value,
      async () => {
        result.value = {
          currentEra: await stakingRef.value.getCurrentEra(),
          unbondingPeriod: await stakingRef.value.getUnbondingPeriod(),
        };
      },
      { immediate: true }
    );

    return { result };
  };

  const getStakingInfoByEra = (era: number) => {
    const result = ref();

    watch(
      () => stakingRef.value,
      async () => {
        result.value = {
          eraReward: await stakingRef.value.getEraReward(era),
          eraStaked: await stakingRef.value.getEraStaked(era),
        };
      },
      { immediate: true }
    );

    return { result };
  };

  const getStakedAmount = (staker: string) => {
    const result = ref();

    watch(
      () => stakingRef.value,
      async () => {
        result.value = {
          stakedAmount: await stakingRef.value.getStakedAmount(staker),
        };
      },
      { immediate: true }
    );

    return { result };
  };

  const getContractEraStake = (contract_id: string, era: number) => {
    const result = ref();

    watch(
      () => stakingRef.value,
      async () => {
        result.value = {
          stakedAmount: await stakingRef.value.getContractEraStake(contract_id, era),
        };
      },
      { immediate: true }
    );

    return { result };
  };

  /* extrinsic calls */
  const callRegister = async (contractAddr: string) => {
    let txHash;
    try {
      txHash = await stakingRef.value.callRegister(contractAddr);
    } catch (e) {
      console.error(e);
    }
    return txHash;
  };

  const callBondAndStake = async (contractAddr: string, amount: number) => {
    let txHash;
    try {
      txHash = await stakingRef.value.callBondAndStake(contractAddr, amount);
    } catch (e) {
      console.error(e);
    }
    return txHash;
  };

  const callUnbondAndUnstake = async (contractAddr: string, amount: number) => {
    let txHash;
    try {
      txHash = await stakingRef.value.callUnbondAndUnstake(contractAddr, amount);
    } catch (e) {
      console.error(e);
    }
    return txHash;
  };

  const callWithdrawUnbonded = async () => {
    let txHash;
    try {
      txHash = await stakingRef.value.callWithdrawUnbonded();
    } catch (e) {
      console.error(e);
    }
    return txHash;
  };

  const callClaim = async (contractAddr: string, amount: number) => {
    let txHash;
    try {
      txHash = await stakingRef.value.callClaim(contractAddr, amount);
    } catch (e) {
      console.error(e);
    }
    return txHash;
  };

  return {
    getEraInfo,
    getStakingInfoByEra,
    getStakedAmount,
    getContractEraStake,
    callRegister,
    callBondAndStake,
    callUnbondAndUnstake,
    callWithdrawUnbonded,
    callClaim,
  };
}
