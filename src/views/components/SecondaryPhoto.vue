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
      v-model="fileRecords"
    ></VueFileAgent>


    <!-- <button :disabled="!second_photo.length" @click="uploadFiles()">
    Upload {{ second_photo.length }} files
  </button> -->
    <!-- <template v-for="(fileRecord, i) in fileRecords">
      <VueFilePreview
          :key="i"
          :value="fileRecord"
          class="file-preview-wrapper grid-box-item grid-block"
        ></VueFilePreview> -->
    <!-- </template> -->
      <!-- <VueFileAgent
        ref="vueFileAgent"
        :theme="'grid'"
        :multiple="true"
        :deletable="true"
        :meta="false"
        :accept="'image/*'"
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
        v-model="fileRecords"
      ></VueFileAgent> -->
  </div>
</template>

<script>
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';

// export default {
//   data: function () {
//     return {
//     };
//   },
//   props: {
//     fileRecords: {
//       type: Array,
//       default() {
//         return [];
//       },
//     },
    
//   },
//   methods: {
//     deleteUploadedFile: function (fileRecord) {
//       this.$refs.vueFileAgent.deleteUpload(
//         this.uploadUrl,
//         this.uploadHeaders,
//         fileRecord
//       );
//     },
//     filesSelected: function (fileRecordsNewlySelected) {
//       var validFileRecords = fileRecordsNewlySelected.filter(
//         (fileRecord) => !fileRecord.error
//       );
//       this.fileRecordsForUpload =
//         this.fileRecordsForUpload.concat(validFileRecords);
//     },
//     onBeforeDelete: function (fileRecord) {
//       var i = this.fileRecordsForUpload.indexOf(fileRecord);
//       if (i !== -1) {
//         // queued file, not yet uploaded. Just remove from the arrays
//         this.fileRecordsForUpload.splice(i, 1);
//         var k = this.fileRecords.indexOf(fileRecord);
//         if (k !== -1) this.fileRecords.splice(k, 1);
//       } else {
//         if (confirm('Are you sure you want to delete?')) {
//           this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
//         }
//       }
//     },
//     fileDeleted: function (fileRecord) {
//       var i = this.fileRecordsForUpload.indexOf(fileRecord);
//       if (i !== -1) {
//         this.fileRecordsForUpload.splice(i, 1);
//       } else {
//         this.deleteUploadedFile(fileRecord);
//       }
//     },
//   },
// };

import { BButton } from 'bootstrap-vue';
import { mapActions } from 'vuex';

export default {
  components: {
    BButton,
  },
  data: function () {
    return {
        second_photo: [],
    }
  },
  props: {
    type: Array,
    fileRecords:  {
      default () {
        return []
      },
    }
  },
  watch: {
    'fileRecords'(value) {
      this.$emit('changeSecond', this.fileRecords);
    },
  },
  methods: {
    ...mapActions('shopList', ['ADD_SHOP_LIST']),

    // async upload() {
    //   let { second_photo_model } = this.formData;
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
        (second_photo_model) => !second_photo_model.error
      );
      this.second_photo_model = this.second_photo_model.concat(validFileRecords);
    },
    onBeforeDelete: function (second_photo_model) {
      var i = this.second_photo_model.indexOf(second_photo_model);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.second_photo_model.splice(i, 1);
        var k = this.second_photo_model.indexOf(fileRecord);
        if (k !== -1) this.second_photo_model.splice(k, 1);
      } else {

          this.$refs.vueFileAgent.deleteFileRecord(second_photo_model); // will trigger 'delete' event

      }
    },
    fileDeleted: function (second_photo_model) {
      var i = this.second_photo_model.indexOf(second_photo_model);
      if (i !== -1) {
        this.second_photo_model.splice(i, 1);
      } else {
        this.deleteUploadedFile(second_photo_model);
      }
    },
    uploaded_photo() {

    }
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
