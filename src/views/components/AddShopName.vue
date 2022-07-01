<template>
  <div>
    <BModal
      id="modal-center"
      centered
      title="Добавить магазин"
      cancel-title="Отмена"
      ok-title="Сохранить"
      @ok.prevent="saveEdit"
    >
    <BFormGroup
        label="Введите название"
        label-for="basicInput"
      >
        <BFormInput
          id="basicInput"
          placeholder="Название"
          v-model="formData.title"
        />
      </BFormGroup>
      
    </BModal>
  </div>
</template>

<script>
import {BModal, BFormGroup,BFormInput} from 'bootstrap-vue'
import {mapActions} from 'vuex'
export default {
  components: {
    BModal,
    BFormGroup,
    BFormInput,
  },
  data() {
    return {
      formData: {
title: '',
      }
    }
  },
  methods: {
    ...mapActions("shopList", [
    "ADD_SHOP_LIST", 
    "EDIT_SHOP_LIST"
    ]),
    async saveEdit() {
      
      let {
        
        title,
        main_photo,
        second_photo,
        location,
        cash,
        region,
        address,
        work_time,
        phones,
      } = this.formData
      
      let req = {
        
        title,
        main_photo,
        second_photo,
        location,
        cash,
        region,
        address,
        work_time,
        phones,
      }
      this.ADD_SHOP_LIST(req)
      .then((req) => {
        
       this.$router.push(`/second-page/${req.data.id}`); 
      console.log(req) 
      })
      .catch((err) => {
console.log(err)
      })
    }
  }

}
</script>

<style>

</style>