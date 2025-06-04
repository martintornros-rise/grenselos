<template>
  <q-layout view="hHh Lpr lFf" class="relative-position">
    <q-header id="header">
      <q-toolbar id="headerMenu">
        <q-btn flat dense round icon="map" aria-label="Menu" class="no-decoration" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          {{ $t('project_title') }}
        </q-toolbar-title>

        <LanguagePicker />

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :mini="leftDrawerMini" class="column justify-between">
      <q-list>

        <EssentialLink :title="$t('home')" icon="home" link="home" class="no-decoration"/>
        <EssentialLink :title="$t('itinerary.create')" icon="chat" link="create" class="no-decoration" />
        <EssentialLink :title="$t('itinerary.view')" icon="map" link="itinerary" class="no-decoration" />

      </q-list>

        <q-item clickable tag="router-link" @click="toggleLeftDrawer" >
    <q-item-section avatar>
      <q-icon name="menu" />
    </q-item-section>
  </q-item>


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

const leftDrawerOpen = ref(true);
const leftDrawerMini = ref(false);

function toggleLeftDrawer () {
  leftDrawerMini.value = !leftDrawerMini.value;
}
</script>


<style lang="scss" scoped>

#header {
  // height: 200px;
  background-image: url('/img/Svinesund_bruene.jpg');
  background-size: cover;
  background-position: bottom;
}

#headerMenu {
  position: sticky;
  top: 0;
  color: white;
  // mix-blend-mode: difference;
  // background-color: rgba(0,0,0,1);
}

</style>
