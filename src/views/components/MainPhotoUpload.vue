<template>
  <BContainer class="mt-2" style="width: 100%;">
    <BRow>
    <BCol xl>
    <div v-if="dataAvatar"><BImg id="main_img" rounded :src="dataAvatar"  /></div>
    <div class="div-photo  d-flex justify-content-center align-items-center" v-else> <span class="main-photo mb-2"><strong>{{ $t('references.second_page.main_photo')}}</strong></span></div>
    </BCol>
    </BRow>
    <BRow class="d-flex justify-content-center ml-4">
      <BCol cols="6">
        <div class="mt-1 flex-wrap mb-1">
          <span class="load_file p-50">
                     {{ $t('references.second_page.select_main_photo')}}</span>
          <BFormFile
            style="width: 75%; opacity: 0; z-index: 2;"
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
  },
};
</script>

<style>
#main_img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.div-photo{
  width: 100%;
  height: 20em;
  border: 1px solid grey;
  border-radius: 0.3em;
  background-color: #f4f4f4;
  }
.main-photo{
  font-size: 2em;
  }
.load_file {
  width: 70%;
  border: 1px solid rgb(216, 216, 216);
  border-radius: 4px;
  position: absolute;
  text-align: center;
  z-index: 1;
}
</style>
