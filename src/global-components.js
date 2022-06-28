import Vue from 'vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';




Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

Vue.component(FeatherIcon.name, FeatherIcon)
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);