<template>
  <div>
    <a :href="location.url" target="_blank">{{ location.name }}</a>
    <p>{{ location.description }}</p>

    <iframe width="425" height="350"
      :src="'https://www.openstreetmap.org/export/embed.html?bbox=' +  (location.coordinates[1] - 0.1) + '%2C' + (location.coordinates[0] - 0.1) + '%2C' + (location.coordinates[1] + 0.1) + '%2C' + (location.coordinates[0] + 0.1) + '&amp;layer=mapnik&amp;marker=' + location.coordinates[0] + '%2C' + location.coordinates[1]"
      style="border: 1px solid black"></iframe><br /><small><a
        href="https://www.openstreetmap.org/?mlat=58.82267&amp;mlon=12.40871#map=13/58.82267/12.40871">Visa större
        karta</a></small>


  </div>
</template>

<script setup lang="ts">
import type { Location } from 'src/ts/models/models';

defineProps<{location: Location;}>();

</script>
