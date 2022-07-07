import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  data() {
    return {
      _initTimeout: null,
    };
  },

  // уведомления
  methods: {
    async $_okToast(res) {
      let message = res?.message;
      this.$toast(
        {
          component: ToastificationContent,
          props: {
            title: "Успешно",
            icon: "CheckIcon",
            text: message || "",
            variant: "success",
          },
        },
        {
          position: "bottom-right",
        }
      );
    },
    async $_errorToast(err) {
      let message = err?.message;
      this.$toast(
        {
          component: ToastificationContent,
          props: {
            title: "Ошибка",
            icon: "AlertCircleIcon",
            text: message || "",
            variant: "danger",
          },
        },
        {
          position: "bottom-right",
        }
      );
    },

    setTimeoutFunc(callBack, arg, timeOut = 400) {
      return new Promise((resolve, reject) => {
        clearTimeout(this._initTimeout);
        this._initTimeout = setTimeout(() => {
          callBack(arg).then(resolve).catch(reject);
        }, timeOut);
      });
    },
  },

  // !уведомления
};
