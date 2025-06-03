<template>
  <div>
    <div class="row gap-xl">
      <div class="col">
        <div id="map"></div>
      </div>
      <div class="col">
        <q-list>
        <template v-for="(day, i) in itinerary.days" :key="i">
          <q-item clickable @click="markerSelect(i)" @mouseover="markerMouseOver(i)" @mouseleave="markerMouseLeave(i)" dense bg-color="grey" :active="i === selectedMarkerIndex">
            <q-item-section avatar dense>
              <!-- <q-icon name="location_on" /> -->
              {{ i+1 }}.
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ day.title }}</q-item-label>
              <q-item-label caption>{{ day.location.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        </q-list>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { onMounted, type Ref, ref } from 'vue';
import type { Itinerary } from 'src/ts/models/models';

const props = defineProps<{itinerary: Itinerary;}>();

let map = undefined as L.Map | undefined
const markers : Ref<L.Marker[]> = ref([])

const selectedMarkerIndex = ref(-1)

onMounted(() => {

  // Init map
  map = L.map('map')
  if(map){
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers

    props.itinerary.days.forEach(day => {
      if(map){
        const marker = L.marker([day.location.coordinates[0], day.location.coordinates[1]],{icon: L.icon({iconUrl: 'icons/markers/marker_' + day.location.country_code.toLowerCase() + '.png', iconSize: [32,32], iconAnchor: [16,32]})})
        .addTo(map)

        // Popup
        marker.bindPopup(day.location.name,{offset: [0,-16],closeButton: false})

        markers.value.push(marker)
      }
    })

    // Connect markers
    L.polyline(markers.value.map(m => m.getLatLng())).addTo(map)

    // Set map bounds
    fitBounds()
  }

})

function fitBounds() {
  if(!map) { return }
  const group = L.featureGroup(markers.value);
  map.fitBounds(group.getBounds());
  // map.zoomOut()
}

function markerMouseOver(i: number){
  const marker = markers.value[i];
  if(!marker){ return}
  marker.openPopup()
}

function markerMouseLeave(i: number){
  const marker = markers.value[i];
  if(!marker){ return}
  if(i !== selectedMarkerIndex.value){
    marker.closePopup()
  }
}



function markerSelect(i: number){
  const marker = markers.value[i];
  if(!marker){ return}
  if(i !== selectedMarkerIndex.value){
    selectedMarkerIndex.value = i
    map?.flyTo(marker.getLatLng(), 10)
    marker.openPopup()
  }
  else {
    marker.closePopup()
    selectedMarkerIndex.value = -1
    fitBounds()
  }
}

</script>

<style lang="scss" scoped>

#map {
  width: 100%;
  height: 300px;
}

.leaflet-popup {
  position: relative;
}

</style>
