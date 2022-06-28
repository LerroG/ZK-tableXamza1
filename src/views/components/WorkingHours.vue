<template>
  <div>
    <BModal
      id="modal-workingHours"
      no-close-on-backdrop
      centered
      size="lg"
      ok-only
      ok-title="Назад"
    >
      <BTable :fields="fields" :items="items" class="text-center"> </BTable>
      
    </BModal>
  </div>
</template>

<script>
import { BModal, BContainer, BTable } from 'bootstrap-vue';

export default {
  components: {
    BModal,
    BTable,
    BContainer,
  },
  props: {
    items: {
      type: Array,
      default () {
        return [
          {
            is_active: true,
            title: "",
            start_time: "",
            end_time: "",
          }
        ]
      },
    },
  },

  data() {
    return {
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
    };
  },

  methods: {},
};
</script>

<style></style>
