<template>
  <div>
    <BModal
      id="modal-center"
      centered
      :title="$t('references.home.add_shop')"
      :cancel-title="$t('references.home.cancel')"
      :ok-title="$t('references.home.add')"
      @ok.prevent="saveEdit"
    >
      <BFormGroup>
        <label>{{$t('references.home.enter_shopname')}}</label>
        <ValidationProvider #default="{ errors }" name='"Название"' rules="required">
          <BFormInput
            id="basicInput"
            :placeholder="$t('references.home.title')"
            v-model="formData.title"
          />
          <small class="text-danger">{{ errors[0] }}</small>
        </ValidationProvider>
      </BFormGroup>
    </BModal>
  </div>
</template>

<script>
import { BModal, BFormGroup, BFormInput } from 'bootstrap-vue';
import { mapActions } from 'vuex';
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
        location: {
          lat: 41.308513,
          lng: 69.259016,
        },
      },
    };
  },
  methods: {
    ...mapActions('shopList', ['ADD_SHOP_LIST', 'EDIT_SHOP_LIST']),
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
      } = this.formData;

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
      };
      this.ADD_SHOP_LIST(req)
        .then((req) => {
          this.$_okToast();
          this.$router.push(`/second-page/${req.data.id}`);
        })
        .catch((err) => {
          this.$_errorToast();
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
