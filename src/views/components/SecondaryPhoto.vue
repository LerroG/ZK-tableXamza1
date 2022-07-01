<template>
  <div>
    <VueFileAgent
      ref="vueFileAgent"
      :theme="'grid'"
      :multiple="true"
      :deletable="true"
      :meta="false"
      :accept="'image/*,'"
      :maxSize="'10MB'"
      :maxFiles="14"
      :helpText="'Выбрать файл'"
      :errorText="{
        type: 'Неверный тип файла. Разрешены только изображения',
        size: 'Размер файлов не должен превышать 10 МБ.',
      }"
      @select="filesSelected($event)"
      @beforedelete="onBeforeDelete($event)"
      @delete="fileDeleted($event)"
      v-model="second_photo_model"
    ></VueFileAgent>

    <!-- <BButton @click="upload"> Отправить</BButton> -->

    <!-- <button :disabled="!second_photo.length" @click="uploadFiles()">
    Upload {{ second_photo.length }} files
  </button> -->
  </div>
</template>

<script>
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';
import { BButton } from 'bootstrap-vue';
// import { mapActions } from 'vuex';

export default {
  components: {
    BButton,
  },
  data: function () {
    return {
      second_photo_model: [],
      // uploadUrl: 'http://192.168.31.99:8000/api/v1/marked/marked/',

        second_photo: [], // maintain an upload queue
    }
  },
  props: {
    type: Array,
    second_photo_model:  {
      
      default () {
        return [
          
        ]
      },
    }
  },
  watch: {
    'second_photo_model'(value) {
      this.$emit('changeSecond', this.second_photo_model);
    },
  },
  methods: {
    // ...mapActions('shopList', ['ADD_SHOP_LIST']),

    // async upload() {
    //   let { second_photo } = this.formData;
    //   let req = new FormData();
    //   second_photo.forEach((item) => {
    //     req.append('second_photo', item.file);
    //   });
    //   // req.append('second_photo', second_photo);
    //   this.ADD_SHOP_LIST(req)
    //     .then(() => {
    //       console.log('Успешно');
    //     })
    //     .catch(() => {
    //       console.log('Неудача');
    //     });
    // },
    // deleteUploadedFile: function (second_photo) {
    //   // Using the default uploader. You may use another uploader instead.
    //   this.$refs.vueFileAgent.deleteUpload(
    //     this.uploadUrl,
    //     this.uploadHeaders,
    //     second_photo
    //   );
    // },
    filesSelected: function (fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter(
        (second_photo) => !second_photo.error
      );
      this.second_photo = this.second_photo.concat(validFileRecords);
    },
    onBeforeDelete: function (second_photo) {
      var i = this.second_photo.indexOf(second_photo);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.second_photo.splice(i, 1);
        var k = this.second_photo.indexOf(fileRecord);
        if (k !== -1) this.second_photo.splice(k, 1);
      } else {
        
          this.$refs.vueFileAgent.deleteFileRecord(second_photo); // will trigger 'delete' event
        
      }
    },
    fileDeleted: function (second_photo) {
      var i = this.second_photo.indexOf(second_photo);
      if (i !== -1) {
        this.second_photo.splice(i, 1);
      } else {
        this.deleteUploadedFile(second_photo);
      }
    },
    // submitFiles(){
    //     let formData = new FormData();
    //     for( var i = 0; i < this.files.length; i++ ){
    //       let file = this.second_photo[i];
    //       formData.append('second_photo[' + i + ']', file);
    //     }
    //     axios.post( '/marked/marked/',
    //       formData,
    //       {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //       }
    //     ).then(function(){
    //       console.log('SUCCESS!!');
    //     })
    //     .catch(function(){
    //       console.log('FAILURE!!');
    //     });
    //   },
  },
};
</script>

<style></style>
