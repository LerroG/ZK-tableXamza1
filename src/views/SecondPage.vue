<template>
  <div>
    <BCard>
      <ValidationObserver>
        <BForm>
          <BRow class="d-flex justify-content-between mt-3 " cols="12" xl="12">
            <BCol cols="12" md="12" xl="6">
              <BRow>
                <BCol class="d-flex justify-content-center mb-2">
              <MainPhotoUpload
                :dataAvatar="formData.main_photo"
                :main_photo="formData.main_photo"
                @changeMain="setMainPhoto"
              />
                </BCol>
              </BRow>
              <hr/>
              <BRow class=" d-flex mt-3 mb-3">
                <BCol class="d-flex justify-content-center">

                  <SecondPhotoMy :second_photo.sync="formData.second_photo" />
                </BCol>
              </BRow>
            </BCol>

            <BCol xl="6">
              <BRow>
                <BCol cols="8">
                  <BFormGroup>
                    <label>{{ $t('references.home.type_cashback') }}:</label>
                    <ValidationProvider
                      #default="{ errors }"
                      name='"Тип"'
                      rules="required"
                    >
                      <v-select
                        v-model="formData.cash"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :label="$i18n.locale"
                        :options="option"
                        :placeholder="$t('references.home.type_cashback')"
                      />

                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </BFormGroup>
                </BCol>
                <BCol class="d-flex justify-content-end" col>
                  <BFormGroup>
                    <label style="font-size: 14px"
                      >{{ $t('references.home.location') }}: </label
                    ><br />

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
                  <BFormGroup>
                    <label>{{ $t('references.home.title') }}:</label>
                    <ValidationProvider
                      #default="{ errors }"
                      name='"Название"'
                      rules="required"
                    >
                      <BFormInput
                        size="lg"
                        :placeholder="$t('references.home.title')"
                        v-model="formData.title"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </BFormGroup>
                </BCol>
              </BRow>
              <BRow>
                <BCol>
                  <BFormGroup>
                    <label>{{ $t('references.home.district') }}:</label>
                    <ValidationProvider
                      #default="{ errors }"
                      name='"Район"'
                      rules="required"
                    >
                      <v-select
                        v-model="formData.region"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :label="$i18n.locale"
                        :options="getRegion"
                        :reduce="(getRegion) => getRegion.id"
                        :getOptionLabel="
                          (v) => (v.name && v.name[$i18n.locale]) || ''
                        "
                      :placeholder="$t('references.home.district')"
                      />

                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </BFormGroup>
                </BCol>
              </BRow>
              <BRow class="mb-1">
                <BCol>
                  <BFormGroup>
                    <label>{{ $t('references.home.address') }}:</label>
                    <BTabs>
                      <BTab
                        :title="lang.toUpperCase()"
                        v-for="(lang, index) in getLangs"
                        :key="index"
                      >
                        <ValidationProvider
                          #default="{ errors }"
                          name='"Адрес"'
                          rules="required"
                        >
                          <BFormTextarea
                            v-model="formData.address[lang]"
                            id="textarea-default"
                            rows="3"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </ValidationProvider>
                      </BTab>
                    </BTabs>
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
                    {{ $t('references.home.work_time') }}
                  </BButton>

                  <BTable
                    v-if="formData.work_time.length == 7"
                    bordered
                    :fields="fields"
                    :items="getActiveWorkingDayList"
                    class="text-center"
                  >
                  </BTable>
                  <BTable
                    v-else
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
                  <BFormGroup>
                    <label>{{
                      $t('references.second_page.phone_number')
                    }}</label>
                    <ValidationProvider
                      #default="{ errors }"
                      name='"Номер телефона"'
                      rules="required"
                    >
                      <BFormTags
                        v-model="formData.phones"
                        remove-on-delete
                      :placeholder="$t('references.second_page.phone_number')"
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
          <div>
            <EditWorkingHours
              v-if="formData.work_time.length == 7"
              :week="formData.work_time"
              @workDays="setWorkTime"
            />
            <AddWorkingHours v-else @workDays="setWorkTime" />
          </div>
        </BForm>
        <BRow class="mt-4">
          <BCol class="d-flex justify-content-end" col>
            <BButton variant="outline-danger" class="btn_hover_delete" href="/"
              >{{ $t('references.second_page.cancel') }}
            </BButton>

            <BButton
              type="submit"
              variant="outline-primary"
              class="ml-1 btn_hover"
              @click="onSubmit"
              >{{ $t('references.second_page.submit') }}
            </BButton>
          </BCol>
        </BRow>
      </ValidationObserver>
    </BCard>
  </div>
</template>

<script>
import { required } from '@validations';
import MainPhotoUpload from './components/MainPhotoUpload.vue';
import SecondaryPhoto from './components/SecondaryPhoto.vue';
import AddLocationModal from './components/AddLocationModal.vue';
import EditWorkingHours from './components/EditWorkingHours.vue';
import AddWorkingHours from './components/AddWorkingHours.vue';
import SecondPhotoMy from './components/SecondPhotoMy.vue';
import vSelect from 'vue-select';
import { mapActions, mapGetters } from 'vuex';

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
  BTab,
  BTabs,
  BImg,
} from 'bootstrap-vue';
import { title } from '@/@core/utils/filter';
import { image } from 'vee-validate/dist/rules';

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
    BTab,
    BTabs,
    BImg,
    EditWorkingHours,
    AddWorkingHours,
    vSelect,
    MainPhotoUpload,
    SecondaryPhoto,
    AddLocationModal,
    SecondPhotoMy,
  },
  data() {
    return {
      required,
      option: [
        { ru: 'С кешбэком', uz: 'Cashback bilan', value: true },
        { ru: 'Без кешбэка', uz: "Keshbek yo'q", value: false },
      ],
      fields: [
        {
          key: 'title',
          label: 'День',
        },
        {
          key: 'start_time',
          label: 'Открытие',
          i18n: '',
        },
        {
          key: 'end_time',
          label: 'Закрытие',
          i18n: '',
        },
      ],

      formData: {
        title: '',
        work_time: [],
        location: {
          lat: 41,
          lng: 69,
        },
        address: {},
        phones: [],
        region: null,
        cash: {},
        main_photo: null,
        second_photo: [],
      },
    };
  },
  computed: {
    ...mapGetters('shopList', ['ONESHOP', 'SHOPREGION']),

    getLangs() {
      return ['ru', 'uz'];
    },

    getActiveWorkingDayList() {
      return this.formData.work_time.filter((item) => item.is_active);
    },
    getRegion() {
      return this.SHOPREGION.results;
    },
  },

  mounted() {
    this.fetchOneShopList();
    this.FETCH_ONE_SHOP_LIST_PHOTOS(this.$route.params.id).then((r) => {
      this.formData.second_photo = r.data; // это приходит раньше и ты задаешь картинки переменной
    });
    this.FETCH_SHOP_REGION();
  },
  methods: {
    ...mapActions('shopList', [
      'EDIT_SHOP_LIST',
      'FETCH_ONE_SHOP_LIST',
      'FETCH_ONE_SHOP_LIST_PHOTOS',
      'ADD_SECOND_PHOTO',
      'FETCH_SHOP_REGION',
    ]),

    setMainPhoto(v) {
      this.formData.main_photo = v;
    },

    getSecondPhoto() {
      let photos = [];
      this.formData.second_photo.forEach((photo) => {
        photos.push(photo);
      });
      return photos;
    },

    setWorkTime(workDays) {
      this.formData.work_time = JSON.parse(JSON.stringify(workDays));
    },

    async fetchOneShopList() {
      let id = this.$route.params.id;
      await this.FETCH_ONE_SHOP_LIST(id).then((res) => {
        let {
          title,
          work_time,
          location,
          address,
          phones,
          region,
          cash,
          main_photo,
        } = res;

        this.formData = {
          ...this.formData,
          title,
          work_time,
          location,
          address,
          phones,
          region: region && region.id,
          cash,
          main_photo,
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

      let secondPhoto = new FormData();
      secondPhoto.append('mark', this.$route.params.id);
      // second_photo.forEach((item) => {

      //   secondPhoto.append('image', JSON.stringify(item))
      // })
      second_photo.forEach((item) => {
        secondPhoto.append('image', item.binary);
      });

      this.ADD_SECOND_PHOTO(secondPhoto);
      let req = new FormData();
      req.append('id', this.$route.params.id);

      // if (typeof second_photo != 'string' && second_photo.lenght) {
      //   second_photo.forEach((item) => {
      //     req.append('second_photo', item.file);
      //   });
      // }
      // else{second = second_photo && second_photo.lenght == 0}
      if (typeof main_photo != 'string' && main_photo != null) {
        req.append('main_photo', main_photo);
      }
      req.append('cash', cash.value);
      req.append('title', title);
      req.append('address', JSON.stringify(address));
      req.append('region', region);
      req.append('location', JSON.stringify(location));
      req.append('work_time', JSON.stringify(work_time));
      req.append('phones', JSON.stringify(phones));

      this.EDIT_SHOP_LIST(req)
        .then(() => {
          this.$router.push('/');
        })
        .catch((err) => {
          console.log( err);
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
