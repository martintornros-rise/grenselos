<template>
  <q-page class="q-ma-md">

    <!-- <h1>Reseplan</h1> -->

    <div  v-if="itineraryStore.itinerary">
      <ItineraryBase :itinerary="itineraryStore.itinerary" />
    </div>

    <div v-else>
      <p>{{ $t('view.no_itinerary') }}</p>
      <q-btn :label="$t('itinerary.create.new')" :to="{name: 'Create'}" unelevated color="primary"/>
    </div>

  </q-page>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
import ItineraryBase from 'src/components/ItineraryBase.vue';
import { useItineraryStore } from 'src/stores/itineraryStore';

const itineraryStore = useItineraryStore()

</script>
