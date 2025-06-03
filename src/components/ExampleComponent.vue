<template>
  <div>
    <p>{{ name }}</p>
  </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{name: string}>(), {});

</script>
