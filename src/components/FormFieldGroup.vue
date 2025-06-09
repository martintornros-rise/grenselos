<template>
  <div class="row gap-sm items-center">
    <q-icon v-if="$q.screen.gt.sm" :name="icon" size="md"/>
    <div class="col gap-sm" :class="$q.screen.gt.sm ? 'row' : 'column'">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{icon: string}>();

</script>
