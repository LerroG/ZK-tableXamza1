<template>
  <div>
    <BCard>
      <ValidationObserver>
        <BForm>
          <BRow class="d-flex justify-content-between mt-3" cols="12" xl="12">
            <BCol cols="12" md="12" xl="6">
              <MainPhotoUpload
                :dataAvatar="formData.main_photo"
                @changeMain="setMainPhoto"
              />

              <BRow class="mt-3 mb-3">
                <BCol class="d-flex justify-content-start">
                  <!-- <SecondaryPhoto :formData="formData.second_photo" @changeSecond="formData.second_photo" /> -->
                </BCol>
              </BRow>
            </BCol>

            <BCol xl="6">
              <BRow>
                <BCol cols="8">
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
                        :reduce="(option) => option.value"
                      />

                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </BFormGroup>
                </BCol>
                <BCol class="d-flex justify-content-end" col>
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
                        v-model="formData.title"
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
                <BCol cols="12">
                  <BButton
                    @click="onOpenWorkingHoursModal"
                    variant="outline-warning"
                    class="btn_hover_warning mb-1"
                  >
                    Время работы
                  </BButton>

                  <BTable
                    v-if="formData.work_time.length"
                    bordered
                    :fields="fields"
                    :items="getActiveWorkingDayList"
                    class="text-center"
                  >
                  </BTable>
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
          <AddLocationModal
            :marker="formData.location"
            @submit="(latlng) => (formData.location = latlng)"
          />
          <AddEditWorkingHours
            :week="formData.work_time"
            @workDays="setWorkTime"
          />
          <!-- @workDays="(workDays) => (formData.work_time = workDays)" -->
        </BForm>
        <BRow class="mt-4">
          <BCol class="d-flex justify-content-end" col>
            <BButton variant="outline-danger" class="btn_hover_delete" href="/"
              >Отменить
            </BButton>

            <BButton
              type="submit"
              variant="outline-primary"
              class="ml-1 btn_hover"
              @click="onSubmit"
              >Отправить
            </BButton>
          </BCol>
        </BRow>
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
import { mapActions, mapGetters } from 'vuex';
import convertToFormdata from './convertFormData.js';

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

      selected: '',
      option: [
        { title: 'С кешбэком', value: true },
        { title: 'Без кешбэка', value: false },
      ],
      selected1: { title: 'Алмазарский район' },
      option1: [
        {title: 'Алмазарский район'},
        {title: 'Бектемирский район'},
        {title: 'Мирабадский район'},
        {title: 'Мирзо-Улугбекский район'},
        {title: 'Сергелийский район'},
        {title: 'Учтепинский район'},
        {title: 'Чиланзарский район'},
        {title: 'Шайхантахурский район'},
        {title: 'Юнусабадский район'},
        {title: 'Яккасарайский район'},
        {title: 'Янгихаётский район'},
        {title: 'Яшнабадский район'},
      ],

      fields: [
        {
          key: 'title',
          label: 'День',
        },
        {
          key: 'start_time',
          label: 'Открытие',
        },
        {
          key: 'end_time',
          label: 'Закрытие',
        },
      ],

      formData: {
        title: '',
        work_time: [],
        location: {
          lat: 41,
          lng: 69,
        },
        address: null,
        phones: [],
        region: null,
        cash: '',
        main_photo: '',
        second_photo: [],
      },
    };
  },
  computed: {
    ...mapGetters('shopList', ['ONESHOP']),

    getActiveWorkingDayList() {
      return this.ONESHOP.work_time.filter((item) => item.is_active);
    },
  },

  mounted() {
    this.fetchOneShopList();
  },
  methods: {
    ...mapActions('shopList', ['EDIT_SHOP_LIST', 'FETCH_ONE_SHOP_LIST']),

    setMainPhoto(v) {
      this.formData.main_photo = v;
    },

    setWorkTime(workDays) {
      this.ONESHOP.work_time = JSON.parse(JSON.stringify(workDays));
    },

    fetchOneShopList() {
      let id = this.$route.params.id;
      this.FETCH_ONE_SHOP_LIST(id).then((res) => {
        let {
          title,
          work_time,
          location,
          address,
          phones,
          region,
          cash,
          main_photo,
          second_photo,
        } = res.data;

        this.formData = {
          title,
          work_time,
          location,
          address,
          phones,
          region,
          cash,
          main_photo,
          second_photo,
        };

        // this.formData = JSON.parse(JSON.stringify(this.ONESHOP));
      });
    },

    onOpenAddLocationModal() {
      this.$nextTick(() => {
        this.$bvModal.show('modal-addlocation');
      });
    },
    onOpenWorkingHoursModal() {
      // console.log(this.ONESHOP.work_time);
      this.$nextTick(() => {
        this.$bvModal.show('modal-workHours');
      });
    },

    async onSubmit() {
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

      let req = new FormData();
      req.append('id', this.$route.params.id);
      req.append('cash', cash);
      req.append('title', title);
      req.append('main_photo', main_photo);
      req.append('main_photo', main_photo);
      req.append('main_photo', main_photo);
      // req.append('second_photo', second_photo)
      req.append('location.lat', location.lat);
      req.append('location.lng', location.lng);
      // req.append('region', region)
      req.append('address', address);
      req.append('work_time', work_time);
      req.append('phones', phones);
      console.log(this.formData);

      this.EDIT_SHOP_LIST(req)
        .then(() => {
          this.$router.push('/');
          console.log('OK');
        })
        .catch((err) => {
          console.log('NO', err);
        });
    },
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
