<template>
  <div class="gap-md" :class="$q.screen.gt.sm ? 'row' : 'column'">
    <div class="">
      <iframe width="100%" height="200"
        :src="'https://www.openstreetmap.org/export/embed.html?bbox=' +  (day.location.coordinates[1] - 0.02) + '%2C' + (day.location.coordinates[0] - 0.02) + '%2C' + (day.location.coordinates[1] + 0.02) + '%2C' + (day.location.coordinates[0] + 0.02) + '&amp;layer=mapnik&amp;marker=' + day.location.coordinates[0] + '%2C' + day.location.coordinates[1] + '&amp;marker=' + (day.location.coordinates[0] + 0.05) + '%2C' + day.location.coordinates[1]"
        style="border: 1px solid black">
      </iframe>
    </div>
    <div class="col" :class="{'order-first': !$q.screen.gt.sm}">
      <h2>{{ day.title }}</h2>
      <a :href="day.location.url" target="_blank">{{ day.location.name }}</a>
      <p>{{ day.location.description }}</p>
      <p>{{ day.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DayPlan } from 'src/ts/models/models';
// import ItineraryLocation from './ItineraryLocation.vue';

defineProps<{day: DayPlan;}>();

</script>
