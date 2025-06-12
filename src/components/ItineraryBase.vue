<template>
  <div class="">

    <div class="row items-start">
      <h1 class="col">{{ itinerary.title }}</h1>
      <q-btn icon="print" flat @click="print" class="no-print"/>
    </div>

    <q-card bordered flat class="row items-center text-body2 q-mb-md bg-red-1">
      <q-card-section>
      <q-icon name="smart_toy" size="sm"/>
      </q-card-section>
      <q-card-section class="col q-pa-xs ">
        Denna reseplan är skapad automatiskt med hjälp av AI baserat på tillhandahållen information. I förekommande fall kan svaren vara vilseledande eller felaktiga. Det rekommenderas att du själv undersöker sådant som är av särskild vikt, för att säkerställa att informationen stämmer.
      </q-card-section>

    </q-card>

    <ItineraryMap :itinerary="itinerary"/>

    <q-separator class="q-mt-lg q-mb-lg"/>

    <template v-for="(day, i) in itinerary.days" :key="i">
      <ItineraryDay :day="day" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Itinerary } from 'src/ts/models/models';
import ItineraryDay from './ItineraryDay.vue';
import ItineraryMap from './ItineraryMap.vue';

defineProps<{itinerary: Itinerary;}>();

function print(){
  window.print()
}

</script>
