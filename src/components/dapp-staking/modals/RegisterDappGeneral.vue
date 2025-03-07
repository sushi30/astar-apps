<template>
  <div>
    <div class="tw-mb-6">
      <label
        class="
          tw-block tw-text-sm tw-font-medium tw-text-gray-500
          dark:tw-text-darkGray-400
          tw-mb-2
        "
        >{{ $t('dappStaking.modals.logo') }}</label
      >

      <input-file :file="imageFromFile" :extension="fileExtensions" @dropFile="onDropFile">
        <Avatar v-if="!!data.iconFile" :url="data.iconFile" class="tw-mx-auto tw-w-20 tw-h-20" />
        <icon-base
          v-else
          class="tw-h-20 tw-w-20 tw-mx-auto dark:tw-text-darkGray-100"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <icon-document />
        </icon-base>
      </input-file>
    </div>

    <q-input
      v-model="data.name"
      outlined
      label="Name"
      maxlength="200"
      class="tw-my-2"
      :rules="[(v) => (v && v.length > 0) || 'dApp name is required.']"
    />
    <q-input
      v-model="data.address"
      outlined
      maxlength="48"
      label="Contract address"
      class="tw-my-2"
      :rules="[(v) => isValidAddress(v) || 'Enter a valid EVM or SS58 contract address.']"
    />
    <q-input
      v-model="data.url"
      outlined
      maxlength="1000"
      label="Project url"
      class="tw-my-2"
      :rules="[(v) => v !== '' || 'Enter project url.', (v) => isUrlValid(v) || 'Invalid url.']"
    />
  </div>
</template>
<script lang="ts">
import { PropType, reactive, watch, ref } from 'vue';
import { NewDappItem } from 'src/store/dapp-staking/state';
import { defineComponent } from 'vue';
import { useFile, FileState } from 'src/hooks/useFile';
import { isEthereumAddress } from '@polkadot/util-crypto';
import { isValidAddressPolkadotAddress } from 'src/hooks/helper/plasmUtils';
import InputFile from 'src/components/contracts/modals/InputFile.vue';
import Avatar from 'components/common/Avatar.vue';
import IconBase from 'components/icons/IconBase.vue';
import IconDocument from 'components/icons/IconDocument.vue';
import { isUrlValid } from 'components/common/Validators';

export default defineComponent({
  components: {
    InputFile,
    Avatar,
    IconBase,
    IconDocument,
  },
  props: {
    value: {
      type: Object as PropType<NewDappItem>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const data = reactive<NewDappItem>(props.value);
    const { fileRef: imageFromFile, setFile } = useFile();
    const fileExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

    const encodeImage = (fileType: string, data: Uint8Array): string => {
      const buffer = Buffer.from(data);
      return `data:${fileType};base64,${buffer.toString('base64')}`;
    };

    const onDropFile = (fileState: FileState): void => {
      setFile(fileState);

      data.iconFileName = fileState.name;
      data.iconFile = encodeImage(fileState.type, fileState.data);
    };

    const isValidAddress = (address: string): boolean => isEthereumAddress(address); // || isValidAddressPolkadotAddress(address);
    // TODO uncoment the code above when we will support ink contract.

    watch(
      () => data,
      () => {
        emit('dataChanged', data);
      },
      { deep: true }
    );

    return {
      imageFromFile,
      fileExtensions,
      onDropFile,
      data,
      isEthereumAddress,
      isUrlValid,
      isValidAddress,
    };
  },
});
</script>
