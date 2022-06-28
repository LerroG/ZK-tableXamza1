<template>
  <div>
    <BCard>
      <BRow class="d-flex justify-content-between align-items-center">
        <BCol class="d-flex justify-content-left align-items-center" cols="6">
          <BCol>
            <BFormGroup label="Название:" label-for="basicInput">
              <BFormInput
                id="basicInput"
                v-model="filterData.search"
                @input="fetchData"
                placeholder="Введите название"
              />
            </BFormGroup>
          </BCol>
          <BCol>
            <BFormGroup label="Тип:" label-for="basicInput">
              <v-select
                v-model="selected"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="option"
              />
            </BFormGroup>
          </BCol>
          <!-- <BCol cols="2">
            <BButton
              variant="secondary"
              class="btn-sm form-control mt-25 p-50"
              @click="handleEmpty"
              style="width: 40px"
            >
              <FeatherIcon icon="XIcon" size="22" />
            </BButton>
          </BCol> -->
        </BCol>

        <BCol :cols="3" class="d-flex justify-content-end mt-25">
          <BButton
            variant="outline-success"
            class="btn_hover_success"
            @click="onOpenAddShopName"
          >
            Добавить
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
        <template #cell(main_photo)>
          <b-avatar
            v-if="SHOPLIST.results.main_photo"
            :src="SHOPLIST.results.main_photo"
            rounded
            class="main_image"
          />
          <b-avatar v-else rounded class="main_image" />
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
              variant="success"
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
        <span class="text-nowrap">Показать от 1 до</span>
        <BFormSelect
          v-model="filterData.page_size"
          @input="fetchData"
          :options="['1', '10', '20', '30']"
          class="mx-1"
        />
        <span class="text-nowrap">
          строк
        </span>
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
    </BCard>

    <AddShopName />
    <LocationModal :marker="localtion" />
    <WorkingHours :items="working_time_table" />

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
      option: [{ title: 'С кешбэком' }, { title: 'Без кешбэка' }],
      filterData: {
        search: '',
        page: 1,
        page_size: 10,
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
    // this.FETCH_SHOP_LIST();
    this.fetchData();
  },
  methods: {
    ...mapActions('shopList', ['FETCH_SHOP_LIST',
    'DELETE_SHOP_LIST']),
    // ...mapActions ("shopList", [
    //    "EDIT_SHOP_LIST",
    //    "DELETE_SHOP_LIST",
    // ])
    // handleEmpty() {
    //   (this.filterData.search = ''), (this.selected = null), true;
    // },
    fetchData() {
      let { search, page, page_size } = this.filterData;
      let req = { search, page, page_size };

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.FETCH_SHOP_LIST(req);
      }, 500);
    },
    editData(id) {
      this.$router.push(`/second-page/${id}`);
    },
    onOpenLocationModal(e) {
      this.localtion = e;
      this.$nextTick(() => {
        this.$bvModal.show('modal-location');
      });
    },
    onOpenWorkingHoursModal(e) {
      console.log('onOpenWorkingHoursModal', e);
      this.working_time_table = e;
      this.$nextTick(() => {
        this.$bvModal.show('modal-workingHours');
      });
    },
    onOpenAddShopName() {
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
            return this.DELETE_SHOP_LIST(req);
          }
        })
        .then(() => {
          // this.$_okToast();
          // this.fetchData();
          console.log('Удалено');
        })
        .catch(() => {
          // this.$_errorToast();
          console.log('Неудача');
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
