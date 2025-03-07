import { Dark } from 'quasar';
import type { ChainInfo } from 'src/hooks/useChainInfo';
import type { Extensions } from 'src/hooks/useMetaExtensions';
import { MutationTree } from 'vuex';
import { ConnectionType, GeneralStateInterface as State, SubstrateAccount } from './state';

export interface GeneralMutations<S = State> {
  setInitialized(state: S): void;
  setLoading(state: S, isLoading: boolean): void;
  setShowAlertMsg(state: S, showAlert: boolean): void;
  setAlertMsg(state: S, msg: string): void;
  setAlertType(state: S, type: string): void;
  setChainInfo(state: S, type: ChainInfo): void;
  setMetaExtensions(state: S, type: Extensions): void;
  setExtensionCount(state: S, type: number): void;
  setSubstrateAccounts(state: S, type: SubstrateAccount[]): void;
  setCurrentNetworkStatus(state: S, networkStatus: ConnectionType): void;
  setCurrentNetworkIdx(state: S, networkIdx: number): void;
  setCurrentAddress(state: S, address: string): void;
  setCurrentCustomEndpoint(state: S, endpoint: string): void;
}

const mutation: MutationTree<State> & GeneralMutations = {
  setInitialized(state) {
    state.initialized = true;
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setShowAlertMsg(state, msg) {
    state.alertBox.showAlertMsg = msg;
  },
  setAlertMsg(state, msg) {
    state.alertBox.alertMsg = msg;
  },
  setAlertType(state, type) {
    state.alertBox.alertType = type;
  },
  setChainInfo(state, chainInfo) {
    state.chainInfo = chainInfo;
  },
  setMetaExtensions(state, extensions) {
    state.metaExtensions = extensions;
  },
  setExtensionCount(state, count) {
    state.extensionCount = count;
  },
  setSubstrateAccounts(state, accounts) {
    state.substrateAccounts = accounts;
  },
  setCurrentNetworkStatus(state, networkStatus) {
    state.currentNetworkStatus = networkStatus;
  },
  setCurrentNetworkIdx(state, networkIdx) {
    state.currentNetworkIdx = networkIdx;
  },
  setIsEthWallet(state, isEthWallet) {
    state.isEthWallet = isEthWallet;
  },
  setIsH160Formatted(state, isH160Formatted) {
    state.isH160Formatted = isH160Formatted;
  },
  setCurrentEcdsaAccount(state, ecdsa) {
    state.currentEcdsaAccount = ecdsa;
  },
  setCurrentAddress(state, address) {
    state.currentAddress = address;
  },
  setCurrentCustomEndpoint(state, endpoint) {
    state.currentCustomEndpoint = endpoint;
  },
  setTheme(state, theme) {
    if (theme == 'DARK') {
      Dark.set(true);
      document.documentElement.classList.add('dark');
    } else {
      Dark.set(false);
      document.documentElement.classList.remove('dark');
    }

    state.currentTheme = theme;
  },
};

export default mutation;
