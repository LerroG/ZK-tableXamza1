<template>
  <div>
    <BCard>
      <BRow class="d-flex justify-content-between align-items-center">
        <BCol cols="12" md="6" xl="3">
          <BFormGroup>
            <label>{{ $t('references.home.search') }}</label>
            <BFormInput
              id="basicInput"
              v-model="filterData.title"
              @input="fetchData"
              :placeholder="$t('references.home.search')"
            />
          </BFormGroup>
        </BCol>
        <BCol cols="12" md="6" xl="3">
          <BFormGroup>
            <label>{{ $t('references.home.type_cashback') }}</label>
            <v-select
              v-model="filterData.cash"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :label="$i18n.locale"
              :options="option"
              @input="fetchData"
              :reduce="(f) => f.value"
              :placeholder="$t('references.home.type_cashback')"
            />
          </BFormGroup>
        </BCol>
        <BCol cols="12" md class="d-flex justify-content-end mt-25">
          <BButton
            variant="outline-success"
            class="btn_hover_success"
            @click="onOpenAddShopName"
          >
            {{$t('references.home.add')}}
          </BButton>
        </BCol>
      </BRow>
    </BCard>

    <BCard>
      <BTable
        bordered
        responsive
        :fields="fields"
        :items="SHOPLIST.results"
        class="text-center"
      >
        <template #cell(main_photo)="props">
          
          <b-avatar
            :src="props.value"
            rounded
            class="main_image"
          />
        </template>
        <template #cell(cash)="props">
          {{props.value[$i18n.locale]}}
        </template>
        <template #cell(address)="props" style="min-height: 200px">
          {{props.value[$i18n.locale]}}
        </template>
        <template #cell(region)="props">
          {{props.value[$i18n.locale]}}
        </template>
        <template #cell(phones)="props"> 
          <div v-for="(phone,index) in props.value" :key="index">
          {{phone}}
          </div>
        </template>
        <template #cell(actions)="props">
          <div>
            <BButton
              class="p-50 mr-1"
              variant="warning"
              @click="editData(props.item)"
            >
              <feather-icon icon="EditIcon"></feather-icon>
            </BButton>
            <BButton
              class="p-50"
              variant="danger"
              @click="deleteData(props.item)"
            >
              <feather-icon icon="XIcon"></feather-icon>
            </BButton>
          </div>
        </template>
        <template #cell(location)="{ item }">
          <div>
            <BButton
              v-if="item.location"
              class="p-50 mr-1"
              variant="info"
              @click="onOpenLocationModal(item.location)"
            >
              <feather-icon icon="MapPinIcon"></feather-icon>
            </BButton>
          </div>
        </template>
        <template #cell(work_time)="{ item }">
          <div>
            <BButton
              class="p-50 mr-1"
              variant="success"
              @click="onOpenWorkingHoursModal(item.work_time)"
            >
              <feather-icon icon="EyeIcon"></feather-icon>
            </BButton>
          </div>
        </template>
      </BTable>
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex align-items-center mb-0 mt-1">
          <span class="text-nowrap">{{$t('references.home.show')}}</span>
          <BFormSelect
            v-model="filterData.page_size"
            @input="fetchData"
            :options="[10, 20, 30]"
            class="mx-1"
          />
          <span class="text-nowrap">{{$t('references.home.pages')}}</span>
          <!-- из {{ props.total }} -->
        </div>
        <div>
          <BPagination
            v-model="filterData.page"
            :total-rows="SHOPLIST.count"
            :per-page="filterData.page_size"
            first-number
            last-number
            align="right"
            prev-class="prev-item"
            next-class="next-item"
            class="mt-1 mb-0"
            @input="fetchData"
          >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </BPagination>
        </div>
      </div>
      <AddShopName />
      <LocationModal :marker="localtion" />
      <WorkingHours :items="working_time_table" />
    </BCard>

    <!-- :marker = "location" -->
  </div>
</template>

<script>
import AddShopName from './components/AddShopName.vue';
import LocationModal from './components/LocationModal.vue';
import WorkingHours from './components/WorkingHours.vue';

import { mapActions, mapGetters } from 'vuex';

import vSelect from 'vue-select';

import {
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BButton,
  BTable,
  BPagination,
  BAvatar,
  BContainer,
} from 'bootstrap-vue';

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BButton,
    BTable,
    BPagination,
    BAvatar,
    BContainer,
    vSelect,
    AddShopName,
    LocationModal,
    WorkingHours,
  },
  data() {
    return {
      timer: null,
      selected: null,
      localtion: {
        lat: '',
        lng: '',
      },
      working_time_table: [
        {
          is_active: true,
          title: '',
          start_time: '',
          end_time: '',
        },
      ],
      option: [
        { ru: 'С кешбэком', uz: 'Cashback bilan', value: true },
        { ru: 'Без кешбэка', uz: "Keshbek yo'q", value: false },
      ],
      filterData: {
        title: '',
        page: 1,
        page_size: 10,
        cash: null,
      },
      fields: [
        {
          key: 'main_photo',
          label: 'Фото',
        },
        {
          key: 'cash',
          label: 'Тип',
          sortable: true,
        },
        {
          key: 'title',

          label: 'Название',
          sortable: true,
        },
        {
          key: 'region',
          label: 'Район',
        },
        {
          key: 'address',
          label: 'Адрес',
        },
        {
          key: 'location',
          label: 'Локация',
        },

        {
          key: 'phones',
          label: 'Телефоны',
          sortable: true,
        },
        {
          key: 'work_time',

          label: 'Время работы',
          sortable: true,
        },
        {
          key: 'actions',
          label: 'Действия',
        },
      ],
    };
  },
  computed: {
    ...mapGetters('shopList', ['SHOPLIST']),
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions('shopList', ['FETCH_SHOP_LIST', 'DELETE_SHOP_LIST']),
  
    fetchData() {  //Фильтры
      let { title,
      page,
      page_size,
      cash } = this.filterData;

      let req = {
        title,
        page,
        page_size,
        cash,
      };

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.FETCH_SHOP_LIST(req);
      }, 500);
    },
    
    editData(item) {
      this.$router.push(`/second-page/${item.id}`);
    },
    onOpenLocationModal(e) {
      this.localtion = e;
      this.$nextTick(() => {
        this.$bvModal.show('modal-location');
      });
    },
    onOpenWorkingHoursModal(e) {
      this.working_time_table = e;
      console.log(this.SHOPLIST.results);
      this.$nextTick(() => {
        this.$bvModal.show('modal-workingHours');
      });
    },
    onOpenAddShopName() {
      console.log(this.SHOPLIST.results);
      this.$nextTick(() => {
        this.$bvModal.show('modal-center');
      });
    },
    deleteData(item) {
      this.$bvModal
        .msgBoxConfirm('Вы действительно хотите удалить эту запись?', {
          title: 'Удалить',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Подтвердить',
          cancelTitle: 'Отменить',
          hideHeaderClose: false,
          centered: true,
        })
        .then((accept) => {
          if (accept) {
            let req = { id: item.id };
            this.DELETE_SHOP_LIST(req)
              .then(() => {
                // this.$_okToast();
                // this.fetchData();
                console.log('Удалено');
                this.fetchData();
              })
              .catch(() => {
                // this.$_errorToast();
                console.log('Неудача');
              });
          }
        });
    },
  },
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.main_image {
  height: 65px;
  width: 100px;
}
.btn_hover_success {
  transition: all 0.3s linear;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
}
.btn_hover_success:hover {
  background: #43ce81 !important;
  color: white !important;
}
</style>
