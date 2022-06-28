<template>
  <div>
    <BModal id="modal-workHours" no-close-on-backdrop centered @ok="onSubmit">
      <BRow
        v-for="(day, index) in week"
        :key="index"
        class="d-flex justify-content-between mb-1"
      >
        <BCol cols="4" class="d-flex align-items-center">
          <BFormCheckbox v-model="day.is_active" name="check-button" inline>
            {{ day.title }}
          </BFormCheckbox>
        </BCol>
        <BCol class="d-flex">
          <BCol cols="6">
            <BFormTimepicker
              placeholder=""
              v-if="day.is_active"
              v-model="day.start"
            />
            <BFormTimepicker placeholder="" disabled v-else />
          </BCol>
          <BCol cols="6">
            <BFormTimepicker
              placeholder=""
              v-if="day.is_active"
              v-model="day.end"
            />
            <BFormTimepicker placeholder="" disabled v-else />
          </BCol>
        </BCol>
      </BRow>
    </BModal>
  </div>
</template>

<script>
import {
  BModal,
  BRow,
  BCol,
  BFormCheckbox,
  BFormTimepicker,
  BFormGroup,
} from 'bootstrap-vue';
import vSelect from 'vue-select';

export default {
  components: {
    BModal,
    BRow,
    BCol,
    BFormCheckbox,
    BFormTimepicker,
    BFormGroup,
    vSelect,
  },
  data() {
    return {
      workDays: {},
      week: [
        {
          is_active: true,
          title: 'Понедельник',
          start_time: '00:00:00',
          end_time: '00:00:00',
        },
        {
          is_active: true,
          title: 'Вторник',
          start_time: '00:00:00',
          end_time: '00:00:00',
        },
        { is_active: true, title: 'Среда', start: '00:00:00', end: '00:00:00' },
        {
          is_active: true,
          title: 'Четверг',
          start_time: '00:00:00',
          end_time: '00:00:00',
        },
        {
          is_active: true,
          title: 'Пятница',
          start_time: '00:00:00',
          end_time: '00:00:00',
        },
        {
          is_active: true,
          title: 'Суббота',
          start_time: '00:00:00',
          end_time: '00:00:00',
        },
        {
          is_active: true,
          title: 'Воскресенье',
          start_time: '00:00:00',
          end_time: '00:00:00',
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      let times;
      
        times = this.week.filter((item) => item.is_active);

        // times.push(this.workDays);
        // this.workDays = times
        let context = times
      
      this.$emit('workDays', context);
    },
  },
};
</script>

<style></style>
