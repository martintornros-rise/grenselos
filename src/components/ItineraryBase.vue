<template>
  <div class="">
    <h1>{{ itinerary.title }}</h1>

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

</script>
