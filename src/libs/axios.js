import Vue from 'vue';

// axios
import axios from 'axios';
import configs from '../../axios.config';

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: configs.baseURL,
  timeout: 20000,
  // headers: {'X-Custom-Header': 'foobar'}
});
export { configs };

Vue.prototype.$http = axiosIns;

export default axiosIns;
