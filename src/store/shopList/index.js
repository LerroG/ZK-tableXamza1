import {
  getShopList,
  createShopList,
  editShopList,
  deleteShopList,
  getOneShopList,
  getShopList2,
} from '@/api/shopList';

export default {
  namespaced: true,
  state: () => ({
    shoplist: {
      results: [],
      count: 0,
    },
    shop: {},
    shoplist_two: [],
  }),

  mutations: {
    SET_SHOP_LIST(state, shoplist) {
      state.shoplist = shoplist;
    },
    SET_SHOP_LIST_TWO(state, shoplist_two) {
      state.shoplist_two = shoplist_two;
    },
    SET_ONE_SHOP_LIST(state, data) {
      state.shop = data;
    },
  },
  actions: {
    async FETCH_SHOP_LIST({ commit }, params) {
      return new Promise((resolve, reject) => {
        getShopList(params)
          .then((res) => {
            commit('SET_SHOP_LIST', res.data);
            resolve(res.data);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    
    async FETCH_ONE_SHOP_LIST({ commit }, id) {
      return new Promise((resolve, reject) => {
        getOneShopList(id)
          .then((res) => {
            commit('SET_ONE_SHOP_LIST', res.data);
            resolve(res.data);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    async ADD_SHOP_LIST({}, params) {
      return createShopList(params);
    },
    async EDIT_SHOP_LIST({}, params) {
      return editShopList(params);
    },
    async DELETE_SHOP_LIST({}, params) {
      return deleteShopList(params);
    },
  },
  getters: {
    SHOPLIST(state) {
      return state.shoplist;
    },
    ONESHOP(state) {
      return state.shop;
    },
  },
};
