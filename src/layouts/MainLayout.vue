<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Grenseløs
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Skapa en reseplan
        </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" class="no-decoration" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

const linksList: EssentialLinkProps[] = [
{
    title: 'Hem',
    caption: '',
    icon: 'home',
    link: '/',
  },
{
    title: 'AI-chat',
    caption: 'Instruktioner för ChatGPT',
    icon: 'chat',
    link: 'ai',
  },
  {
    title: 'Reseplan',
    caption: 'Visa reseplanen',
    icon: 'map',
    link: 'itinerary'
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
