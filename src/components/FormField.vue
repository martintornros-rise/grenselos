<template>
  <div class="col column gap-xs">
    <q-input class="col" v-model="model" type="text" :label="label" outlined>
      <template v-slot:append>
        <slot name="append"></slot>
      </template>
    </q-input>
    <div v-if="options" class="row gap-xs items-center text-body2">
      <span class="text-grey-8">Lägg till:</span>
      <template v-for="o in options" :key="o">
        <q-btn :label="o" @click="model += (o + ', ')" dense unelevated text-color="grey-8" color="grey-2" no-caps/>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">

const model = defineModel<string>()

defineProps<{label: string, options?: string[]}>();


</script>
