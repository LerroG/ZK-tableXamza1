<template>
  <div>
    <BCard>
      <ValidationObserver v-slot="{ handleSubmit }">
        <BForm @submit.prevent="handleSubmit()">
          <BRow class="d-flex justify-content-between mt-3" cols="12" xl="12">
            <BCol cols="12" md="12" xl="6">
              <div>
                <MainPhotoUpload @changeMain="formData.main_photo" />
              </div>
              <BRow class="mt-3 mb-3">
                <BCol class="d-flex justify-content-start">
                  <SecondaryPhoto @changeSecond="formData.second_photo" />
                </BCol>
              </BRow>
            </BCol>

            <BCol xl="6">
              <BRow>
                <BCol>
                  <BFormGroup label="Тип:">
                    <ValidationProvider
                      #default="{ errors }"
                      name='"Тип"'
                      rules="required"
                    >
                      <v-select
                        v-model="formData.cash"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        label="title"
                        :options="option"
                      />

                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </BFormGroup>
                </BCol>
                <BCol class="d-flex justify-content-end" cols="2">
                  <BFormGroup>
                    <label style="font-size: 14px">Локация:</label><br />

                    <BButton
                      style="width: 70px"
                      @click="onOpenAddLocationModal"
                      variant="success"
                      ><feather-icon icon="MapPinIcon" size="16" />
                    </BButton>
                  </BFormGroup>
                </BCol>
              </BRow>
              <BRow>
                <BCol>
                  <BFormGroup label="Название:">
                    <ValidationProvider
                      #default="{ errors }"
                      name='"Название"'
                      rules="required"
                    >
                      <BFormInput
                        size="lg"
                        placeholder="Название"
                        v-model="ONESHOP.title"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </BFormGroup>
                </BCol>
              </BRow>
              <BRow>
                <BCol>
                  <BFormGroup label="Район:">
                    <ValidationProvider
                      #default="{ errors }"
                      name='"Район"'
                      rules="required"
                    >
                      <v-select
                      selected=""
                        v-model="formData.region"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        label="title"
                        :options="option1"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </BFormGroup>
                </BCol>
              </BRow>
              <BRow class="mb-1">
                <BCol>
                  <BFormGroup label="Адрес:">
                    <ValidationProvider
                      #default="{ errors }"
                      name='"Адрес"'
                      rules="required"
                    >
                      <BFormTextarea
                        v-model="formData.address"
                        id="textarea-default"
                        placeholder="Адрес"
                        rows="3"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </BFormGroup>
                </BCol>
              </BRow>

              <BRow class="mb-1">
                <BCol >
                  
                  
                    <BButton @click="onOpenWorkingHoursModal" variant="outline-warning" class="btn_hover_warning mb-1">
                      График работы
                    </BButton>
                    
                  
                    
                    <BTable
                      v-if="formData.work_time.length"
                      bordered
                      responsive
                      :fields="fields"
                      :items="formData.working_time"
                      class="text-center"
                    >
                    </BTable>

                    <!-- <ValidationProvider
                      #default="{ errors }"
                      name='"График работы"'
                      rules="required"
                    > -->
                    <!-- <BFormInput
                        placeholder="График работы"
                        v-model="formData.working_hours"
                        v-b-modal.modal-workHours
                      /> -->
                    <!-- <BFormTags
                        placeholder=""
                        v-model="formData.working_hours"
                        remove-on-delete
                        
                        
                      >
                      <template v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, removeTag }">
        <b-input-group class="mb-2">
          <b-form-input
            v-bind="inputAttrs"
            v-on="inputHandlers"
            placeholder="New tag - Press enter to add"
            class="form-control"
          ></b-form-input>
          
        </b-input-group>
        <div class="d-inline-block" style="font-size: 1.5rem;">
          <b-form-tag
            v-for="tag in tags"
            @remove="removeTag(tag)"
            :key="tag"
            :title="tag"
            :variant="tagVariant"
            class="mr-1"
          >{{ tag }}</b-form-tag>
        </div>
      </template>
      </BFormTags> -->
                    

                    <!-- <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider> -->
                  
                </BCol>
              </BRow>
              <BRow>
                <BCol>
                  <BFormGroup label="Номер телефона:">
                    <ValidationProvider
                      #default="{ errors }"
                      name='"Номер телефона"'
                      rules="required"
                    >
                      <BFormTags
                        placeholder="Номер телефона"
                        v-model="formData.phones"
                        remove-on-delete
                      />

                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </BFormGroup>
                </BCol>
              </BRow>
            </BCol>
          </BRow>

          <!-- </BRow>
          </BCol> -->
          <!-- </BRow> -->
          <BRow class="mt-4">
            <BCol class="d-flex justify-content-end" col>
              <BButton
                variant="outline-danger"
                class="btn_hover_delete"
                href="/"
                >Отменить
              </BButton>

              <BButton
                type="submit"
                variant="outline-primary"
                class="ml-1 btn_hover"
                @click="submitEdit"
                >Отправить
              </BButton>
            </BCol>
          </BRow>
        </BForm>
        <!-- {{ formData.working_hours }} -->
        <AddLocationModal @submit="(latlng) => (formData.location = latlng)" />
        <AddEditWorkingHours
          @workDays="(workDays) => (formData.working_time = workDays)"
        />
      </ValidationObserver>
    </BCard>
  </div>
</template>

<script>
import { required, email } from '@validations';
import MainPhotoUpload from './components/MainPhotoUpload.vue';
import SecondaryPhoto from './components/SecondaryPhoto.vue';
import AddLocationModal from './components/AddLocationModal.vue';
import AddEditWorkingHours from './components/AddEditWorkingHours.vue';
import vSelect from 'vue-select';
import { mapActions,mapGetters } from 'vuex';

import {
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BButton,
  BForm,
  BFormTextarea,
  BFormTags,
  BInputGroup,
  BFormTag,
  BTable,
} from 'bootstrap-vue';
import { title } from '@/@core/utils/filter';

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BButton,
    BForm,
    BFormTextarea,
    BFormTags,
    BInputGroup,
    BFormTag,
    BTable,
    AddEditWorkingHours,
    vSelect,
    MainPhotoUpload,
    SecondaryPhoto,
    AddLocationModal,
  },
  data() {
    return {
      required,
      email,
      selected: { title: 'С кешбэком' },
      option: [{ title: 'С кешбэком' }, { title: 'Без кешбэка' }],
      selected1: { title: 'Алмазарский район' },
      option1: [
        { title: 'Алмазарский район' },
        { title: 'Бектемирский район' },
        { title: 'Мирабадский район' },
        { title: 'Мирзо-Улугбекский район' },
        { title: 'Сергелийский район' },
        { title: 'Учтепинский район' },
        { title: 'Чиланзарский район' },
        { title: 'Шайхантахурский район' },
        { title: 'Юнусабадский район' },
        { title: 'Яккасарайский район' },
        { title: 'Янгихаётский район' },
        { title: 'Яшнабадский район' },
      ],

      fields: [
        {
          key: 'title',
          label: 'День',
        },
        {
          key: 'start',
          label: 'Открытие',
        },
        {
          key: 'end',
          label: 'Закрытие',
        },
      ],

      formData: {
        title: {},
        work_time: [],
        location: {},
        address: {},
        phones: [],
        region: { title: 'Алмазарский район' },
        cash: { title: 'С кешбэком' },
        main_photo: {},
        second_photo: [],
      },
      // phoneNumbers: [{ phoneNumber: '' }],
    };
  },
  computed: {
    ...mapGetters('shopList', ['ONESHOP'])
  },

  mounted() {
    this.FETCH_ONE_SHOP_LIST()
  },
  methods: {
    ...mapActions('shopList', ['EDIT_SHOP_LIST', 'FETCH_ONE_SHOP_LIST']),

    onOpenAddLocationModal() {
      this.$nextTick(() => {
        this.$bvModal.show('modal-addlocation');
      });
    },
    onOpenWorkingHoursModal() {
      this.$nextTick(() => {
        this.$bvModal.show('modal-workHours');
      });
    },

    async submitEdit() {
      // let {
      //   title,
      //   main_image,
      //   second_image,
      //   location,
      //   type,
      //   district,
      //   adress,
      //   working_hours,
      //   phoneNumbers,
      // } = this.formData
      //
      // let req = {
      //   title,
      //   main_image,
      //   second_image,
      //   location,
      //   type,
      //   district,
      //   adress,
      //   working_hours,
      //   phoneNumbers,
      // }
      // this.EDIT_SHOP_LIST(req)
      // .then(() => {
      // console.log("OK")
      // })
      // .catch((err) => {
      // console.log("NO")
      // })
    },

    // log(v) {
    //   console.log(v);
    // },
    // addRow() {
    //   let item = {
    //     phoneNumber: '',
    //   };
    //   this.phoneNumbers.push(item);
    // },
    // deleteRow(item) {
    //   //  нужно исправить потом
    //   this.phoneNumbers.splice(this.phoneNumbers.indexOf(item), 1);
    // },
  },
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.btn_hover {
  transition: all 0.3s linear;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
}
.btn_hover:hover {
  background: #93a7e8 !important;
  /*#93a7e8 фиолетовый */
  color: white !important;
}
.btn_hover_delete {
  transition: all 0.3s linear;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
}
.btn_hover_delete:hover {
  background: rgb(255, 85, 85) !important;
  color: white !important;
}
.btn_hover_warning {
  transition: all 0.3s linear;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
}
.btn_hover_warning:hover {
  background: #ffaf63 !important;
  color: white !important;
}
#main_img {
  display: flex;
  height: 40vh;
}
.tableWorkingHours {
  border: solid #d8d6de 0.2px;
}
</style>
