<template>
  <div>
    <BModal
      id="modal-location"
      @shown="reloadMap()"
      no-close-on-backdrop
      centered
      size="lg"
      ok-only
      ok-title="Назад"
      
    >
      <div style="height: 60vh; width: 10wh">
        <l-map
          ref="map"
          :zoom="zoom"
          
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @update:bounds="boundsUpdated"
        >
          <!-- @click="addMarker" -->
          <!-- <l-marker
            v-for="(marker, index) in markers"
            :key="index"
            :lat-lng="marker"
            @click="removeMarker(index)"
          ></l-marker> -->
          <l-marker :lat-lng="marker"></l-marker>
          <l-tile-layer :url="url"></l-tile-layer>
        </l-map>
      </div>
    </BModal>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';




delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

import { BModal, BContainer } from 'bootstrap-vue';

export default {
  components: {
    BModal,
    LMap,
    LTileLayer,
    LMarker,
    BContainer,
  },
  name: 'MapComponent',
  props: {
    marker: {
      type: Object,
      default: () => ({
        lat: '',
        lng: ''
      })
    }
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

      zoom: 11,
      center: [41.29965, 69.24577],
      bounds: null,
      markers: [],

      // marker: {
      //   lat: '',
      //   lng: ''
      // },
    };
  },
  
  methods: {
    
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
    reloadMap: function () {
      this.$refs.map.mapObject.invalidateSize();
    },
    // removeMarker(index) {
    //   this.markers.splice(index, 1);
    // },
    // addMarker(event) {
    //   if (this.markers < 1) {
    //     this.markers.push(event.latlng);
    //   }
    // },
    
    
  },
};
</script>

<style></style>
