<template>
  <q-page class="q-ma-md">

    <h1>Reseplan</h1>

    <ItineraryBase v-if="itineraryStore.itinerary" :itinerary="itineraryStore.itinerary" />

    <div v-else>
      <p>Ingen reseplan är skapad.</p>
      <q-btn label="Skapa ny reseplan" to="/ai" unelevated color="primary"/>
    </div>

  </q-page>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
import ItineraryBase from 'src/components/ItineraryBase.vue';
// import {itineraryTestData} from 'app/src/ts/models/itinerary'
import { useItineraryStore } from 'src/stores/itineraryStore';

const itineraryStore = useItineraryStore()

</script>
