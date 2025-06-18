<template>
  <q-page class="q-ma-md">

    <h1>{{$t('project_title')}}</h1>
    <p>{{$t('main.description')}}</p>
    <q-btn :label="$t('itinerary.create')" to="create" unelevated color="primary"/>

  </q-page>
</template>

<script setup lang="ts">
</script>
