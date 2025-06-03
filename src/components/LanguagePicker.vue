<template>
  <div>
    <template v-for="l in languages" :key="l.code">
      <q-btn :label="l.label" @click="pickLanguage(l.code)" flat dense :class="{'text-bold' : locale === l.code}"/>
    </template>
  </div>
</template>

<script setup lang="ts">
// import { computed, ref } from 'vue';
// import type { Todo, Meta } from './models';
import { useI18n } from 'vue-i18n'
const { locale } = useI18n({ useScope: 'global' })

const languages = [
  {label: 'NO', code: 'no'},
  {label: 'SE', code: 'sv'},
  {label: 'EN', code: 'en'},
]

function pickLanguage (code: string) {
  locale.value = code
}


</script>
