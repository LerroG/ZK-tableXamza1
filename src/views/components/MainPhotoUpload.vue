<template>
  <BContainer class="mt-2">
    <BImg id="main_img" fluid :src="dataAvatar" v-if="dataAvatar" />
    <BImg id="main_img" fluid :src="dataAvatar" v-else />
    <BRow class="d-flex justify-content-between">
      <!-- <BButton @click="upload">asdasd</BButton> -->
      <BCol cols="6">
        <div class="mt-1 flex-wrap mb-1">
          <BFormFile
            style="width: 100%"
            v-model="main_photo"
            placeholder="Имя файла"
            browseText="Выбрать"
            @input="fileInput"
          />
        </div>
      </BCol>
      <!-- <BCol cols="4" class="d-flex justify-content-end"
        ><b-button
          variant="danger"
          class="mt-1"
          @click="clearImage"
          style="height: 36px"
          ><feather-icon icon="Trash2Icon" size="16" /></b-button
      ></BCol> -->
    </BRow>
    <!-- <BFormFile
        multiple
        v-model="files"
        placeholder="Имя файла"
        browseText="Выбрать"
        
      /> -->

    <!-- <b-button variant="danger" class="mt-1" @click="upload">upload</b-button> -->
  </BContainer>
</template>

<script>
import { mapActions } from 'vuex';
import {
  BFormGroup,
  BImg,
  BAvatar,
  BFormFile,
  BCol,
  BRow,
  BContainer,
  BButton,
} from 'bootstrap-vue';

export default {
  components: {
    BFormGroup,
    BImg,
    BAvatar,
    BFormFile,
    BCol,
    BRow,
    BContainer,
    BButton,
  },
  data() {
    return {
      // main_photo: null,
    };
  },
  props: {
    type: Object,
    dataAvatar: {
      default: () => ({}),
    },
    type: Object,
    main_photo: {
      default: () => ({}),
    },
  },
  watch: {
    main_photo(value) {
      this.$emit('changeMain', this.main_photo);
    },
  },
  methods: {
    ...mapActions('shopList', ['ADD_SHOP_LIST']),
    fileInput(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => (this.dataAvatar = reader.result);
    },
    clearImage() {
      this.dataAvatar = null;
      this.formData.main_photo = null;
    },
    // upload() {
    //   // this.$emit('changeMain', this.main_photo);
    //   // let { main_photo } = this.formData;
    //   // let req = new FormData();
    //   // req.append('main_photo', main_photo);
    //   // console.log(req);
    //   // this.ADD_SHOP_LIST(req)
    //   //   .then(() => {
    //   //     console.log('Не сосать');
    //   //   })
    //   //   .catch(() => {
    //   //     console.log('Cосать');
    //   //   })
    // },
  },
};
</script>

<style>
#main_img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>
