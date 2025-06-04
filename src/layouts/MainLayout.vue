<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          {{ $t('project_title') }}
        </q-toolbar-title>

        <LanguagePicker />

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          {{$t('itinerary.create')}}
        </q-item-label>
        <EssentialLink :title="$t('home')" icon="home" link="home" class="no-decoration"/>
        <EssentialLink :title="$t('itinerary.create')" icon="chat" link="create" class="no-decoration" />
        <EssentialLink :title="$t('itinerary.view')" icon="map" link="itinerary" class="no-decoration" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import LanguagePicker from 'src/components/LanguagePicker.vue';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
