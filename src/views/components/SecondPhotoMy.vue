<template>
  <div style="max-width: 85%; min-width: 30%">
    <div
      class="d-flex align-items-center justify-content-center main-div flex-wrap"
    >
      <span class="second-photo-span m-50" v-if="photos == 0">{{
        $t('references.second_page.second_photo')
      }}</span>
      <span v-else></span>
      <div
        v-for="(photo, index) in photos"
        :key="index"
        class="d-flex justify-content-end mx-25 my-25 photo"
      >
        <feather-icon
          icon="XIcon"
          class="trash-icon"
          size="18"
          @click="deleteFile(photo, index)"
        /><br />

        <BImg
          class="img"
          :src="photo.image"
          style="max-width: 150px; max-height: 90px"
        />
      </div>
    </div>
    <div class="d-flex align-items-center justify-content-center mt-1">
      <span class="add-second-photo p-50  mt-1">{{
        $t('references.second_page.select_second_photo')
      }}</span>
      <!-- <feather-icon icon="PlusIcon" class="plusIcon" size="40" /> -->

      <BFormFile
        ref="formFileInput"
        style="opacity: 0; max-width: 15em; height: 5em; z-index: 1"
        multiple
        @input="fileInput"
      />
      <!-- v-model="second_photo" -->
    </div>
  </div>
</template>

<script>
import { BImg, BFormFile, BButton } from 'bootstrap-vue';
import { mapActions } from 'vuex';

export default {
  components: {
    BImg,
    BFormFile,
    BButton,
  },
  data() {
    return {
      photos: [],
    };
  },
  props: {
    second_photo: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  watch: {
    second_photo: {
      // прослуска событий внутри массивов и объектов
      handler() {
        this.photos = JSON.parse(JSON.stringify(this.second_photo));
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions('shopList', ['DELETE_SECOND_PHOTO']),
    emitUpdate() {
      this.$emit('update:second_photo', this.photos);
    },
    deleteFile(file, index) {
      let id = file.id;
      if (file.id) {
        this.DELETE_SECOND_PHOTO(
          // id: file.id,
          id
        ).then((r) => {
          this.photos.splice(index, 1);
          this.emitUpdate();
        });
      } else {
        this.photos.splice(index, 1);
        this.emitUpdate();
      }
    },
    async fileInput(file) {
      let files = [];
      if (Array.isArray(file)) {
        files = file;
      } else {
        files = [file];
      }

      let RF = (_file) => {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.readAsDataURL(_file);
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (e) => reject(e);
        });
      };

      for await (let f of files) {
        await RF(f).then((result) => {
          this.photos.push({
            id: null,
            image: result,
            binary: f,
          });
        });
      }
      this.emitUpdate();
    },
  },
};
</script>

<style scoped>
.btn_hover {
  transition: all 0.3s linear;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
  position: absolute;
}
.plusIcon:hover {
  background: #93a7e8 !important;
  /*#93a7e8 фиолетовый */
  color: white !important;
}
.trash-icon {
  color: rgb(254, 75, 75);
  cursor: pointer;
  position: absolute;
}
.plusIcon {
  color: #93a7e8;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  pointer-events: none;
  border: 1px solid;
  border-radius: 5px;
}

.main-div {
  border: 2px dashed grey;
  background-color: #f4f4f4;
}
.photo {
  border: 0.2px solid grey;
  background-color: #f4f4f4;
}
.second-photo-span {
  text-align: center;
}
.add-second-photo {
  width: 30%;
  position: absolute;
  border: 1px solid rgb(216, 216, 216);
  border-radius: 4px;
  text-align: center;
}
</style>
