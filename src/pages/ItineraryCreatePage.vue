<template>
  <q-page class="q-ma-md">

    <div class="row justify-between items-center">

      <h1>{{ $t('itinerary.create') }}</h1>
      <div class="text-right">

        <q-btn icon="refresh" :label="$t('itinerary.create.new')" @click="reset" unelevated color="primary" />
        <!-- <p>{{$t('itinerary.create.clear_warning')}}</p> -->
      </div>
    </div>

    <!-- <h2>1. {{$t('itinerary.create.new')}}</h2> -->

    <!-- <div class="row gap-sm items-center">
      <q-btn @click="reset" unelevated color="primary">{{ $t('itinerary.create.new') }}</q-btn>
      <div>{{$t('itinerary.create.clear_warning')}}</div>
    </div>

    <q-separator class="q-mt-lg q-mb-lg"/> -->

    <h2>1. Fyll i information</h2>

    <div class="column gap-sm">

      <div class="row gap-sm items-center">
        <q-icon name="family_restroom" size="md"/>
        <div class="col row gap-sm">
          <FormField v-model="promptParts.who" label="Vem/vilka önskar information?" :options="['Familj', 'Vuxet par']"/>
        </div>
      </div>

      <div class="row gap-sm items-center">
        <q-icon name="info" size="md" />
        <div class="col row gap-sm">
          <FormField v-model="promptParts.what" label="Vilken information önskas?"/>
          <FormField v-model="promptParts.likes" label="Något särskilt som besökaren gillar?"/>
          <FormField v-model="promptParts.avoid" label="Något som besökaren vill undvika?"/>
        </div>
      </div>

      <div class="row gap-sm items-center">
        <q-icon name="location_on" size="md" />
        <div class="col row gap-sm">
          <FormField v-model="promptParts.where" label="Vilket geografiskt område?" :options="['Østfold', 'Dalsland', 'Bohuslän']"/>
          <FormField v-model="promptParts.whereStart" label="Var ska resan starta?">
            <template v-slot:append>
              <q-btn icon="location_on" @click="setCurrentStartLocation" dense flat/>
            </template>
          </FormField>
          <FormField v-model="promptParts.whereEnd" label="Var ska resan sluta?"/>
        </div>
      </div>

      <div class="row gap-sm items-center">
        <q-icon name="calendar_month" size="md"/>
        <div class="col row gap-sm">
          <FormField v-model="promptParts.when" label="Vilken tidsperiod?"/>
        </div>
      </div>
      <div class="row gap-sm items-center">
        <q-icon name="star" size="md"/>
        <div class="col row gap-sm">
          <FormField v-model="promptParts.extra" label="Extra information?"/>
        </div>
      </div>
      <!-- <q-input v-model="prompt" type="textarea" label="Förslag på prompt" /> -->
      <q-expansion-item
        expand-separator
        icon="terminal"
        label="Prompt till AI"
        caption="Visa den text som inleder AI-chatten."
      >
        <q-card class="prompt bg-grey-3 relative-position" flat bordered>
          <q-card-section>
            {{ prompt }}
          </q-card-section>
          <!-- <q-btn icon="content_copy" size="sm" flat class="absolute-top-right q-ma-sm q-pa-sm" @click="copy(prompt)">
            <span v-if="!copied">Copy</span>
            <span v-else>Copied!</span>
          </q-btn> -->
        </q-card>
      </q-expansion-item>
    </div>

    <q-separator class="q-mt-lg q-mb-lg"/>

    <h2>2. Starta chatten</h2>
    <p>Starta konversation med AI-chattboten.</p>
    <p>Den ifyllda informationen / prompten skickas med automatiskt, tillsammans med andra instruktioner som hjälper dig att skapa en reseplan.</p>
    <div class="row gap-sm">
      <q-btn icon="smart_toy" label="Starta chatt" @click="startChat" unelevated color="primary" />
      <q-btn icon="smart_toy" label="Starta Blixten-chatt" @click="startCustomChat('https://chatgpt.com/g/g-68403e5fd2948191900e0d910c368594-granslos')" unelevated color="primary" />
    </div>

    <q-separator class="q-mt-lg q-mb-lg"/>

    <h2>3. Exportera en reseplan</h2>
    <p>
      När ni är nöjda med förslagen kan AI:n hjälpa att skapa en reseplan.
    </p>
    <p>
      Be chattbotten exportera en reseplan (JSON) och kopiera resultatet.
    </p>

    <q-separator class="q-mt-lg q-mb-lg"/>

    <h2>4. Klistra in resultatet</h2>
    <!-- <q-input v-model="itineraryString" type="textarea" label="Reseplan som JSON" outlined /> -->
     <div class="row gap-sm items-center">
      <q-btn icon="content_paste" :label="$t('paste')" @click="pasteItinerary" unelevated color="primary" />
      <span v-if="parseResult === true" class="text-positive">Reseplanen är skapad</span>
      <span v-else-if="parseResult === false" class="text-negative">Det gick inte att skapa reseplanen, försök igen.</span>
    </div>

    <!-- {{ text }} -->

    <h2>5. Visa reseplan</h2>
    <q-btn icon="map" :label="$t('itinerary.view')" to="/itinerary" unelevated color="primary" class="no-decoration"/>

  </q-page>
</template>

<script setup lang="ts">
import FormField from 'src/components/FormField.vue';
import { useItineraryStore } from 'src/stores/itineraryStore';
// import { Itinerary } from 'src/ts/models/models';
import { computed, ref } from 'vue';
// import { useClipboard } from '@vueuse/core'
// import { Itinerary } from 'src/ts/models/models';

// const source = ref('')
// const { text } = useClipboard({ source })

const itineraryStore = useItineraryStore()

const promptParts = ref({
  who: '',
  what: '',
  where: '',
  whereStart: '',
  whereEnd: '',
  when: '',
  likes: '',
  avoid: '',
  extra: '',
})

// const whereSelected = ref([] as string[])

// const prompt = 'En familj på 2 vuxna och 2 tonåringar kommer vara en vecka i dalsland och gränserna mot norge. de gillar äventyr men är rädda för vatten. ge förslag på en rutt med en aktivitet per dag. de tältar om det behövs men sover gärna bekvämt. de gillar fiskpinnar.'
const prompt = computed({
  get () {
    let p = 'Du är ett stöd till en turistbyrå eller guide som har fått en fråga från turister eller besökare.\n\n'
    if(promptParts.value.who){
      p += "Beskrivning av vem/vilka som önskar information: " + promptParts.value.who + "\n\n"
    }
    if(promptParts.value.what){
      p += "Beskrivning av vad för typ av information önskas: " + promptParts.value.what + "\n\n"
    }
    if(promptParts.value.likes){
      p += "Besökaren gillar: " + promptParts.value.likes + "\n\n"
    }
    if(promptParts.value.avoid){
      p += "Besökaren vill undvika: " + promptParts.value.avoid + "\n\n"
    }
    if(promptParts.value.where){
      p += "Geografiskt område: " + promptParts.value.where + "\n\n"
    }
    if(promptParts.value.whereStart){
      p += "Resans start: " + promptParts.value.whereStart + "\n\n"
    }
    if(promptParts.value.whereEnd){
      p += "Resans slut:  " + promptParts.value.whereEnd + "\n\n"
    }
    if(promptParts.value.when){
      p += "Tidsperiod: " + promptParts.value.when + "\n\n"
    }
    if(promptParts.value.extra){
      p += "Extra information: " + promptParts.value.extra + "\n\n"
    }
    p += promptExport
    return p
  },
  set() {}
})

const promptExport = 'När reseplanen är klar, fråga om användaren vill exportera reseplanen. Om hen svarar ja, exportera reseplanen som JSON enligt:\n\nLocation = {"name": string, "coordinates": [number,number], "country_code": string, "description": string, "url": string}\n\nDayPlan = {"title": string, "location": Location, "description": string}\n\nItinerary = {"title": string,"days": DayPlan[]}"'

// function copyPrompt () {

// }

function reset () {
  promptParts.value = {
  who: '',
  what: '',
  where: '',
  whereStart: '',
  whereEnd: '',
  when: '',
  likes: '',
  avoid: '',
  extra: '',
}
  itineraryStore.resetItinerary()
}

function setCurrentStartLocation(){
  navigator.geolocation.getCurrentPosition((position) => {
    promptParts.value.whereStart = position.coords.latitude + ', ' + position.coords.longitude
  });
}

function startChat () {
  // Blixten: https://chatgpt.com/share/68414aaa-ba24-8012-a954-013d48549684
  window.open(encodeURI('https://chat.openai.com/?q=' + prompt.value))
}

function startCustomChat (url: string) {
  // Blixten: https://chatgpt.com/share/68414aaa-ba24-8012-a954-013d48549684
  window.open(encodeURI(url + '/?q=' + prompt.value))
}


// const itineraryString = computed({
//   get(){
//     return itineraryStore.itinerary ? JSON.stringify(itineraryStore.itinerary) : ''
//   },
//   set (value: string) {
//     itineraryStore.itinerary = value ? JSON.parse(value) : undefined
//   }

// })
const parseResult = ref(undefined as true | false | undefined)
async function pasteItinerary() {
  const text = await navigator.clipboard.readText();
  try {
    itineraryStore.itinerary = JSON.parse(text)
    parseResult.value = true
  }
  catch {
    parseResult.value = false
  }
}

</script>

<style lang="scss" scoped>
.prompt {
  white-space: pre;
}
</style>
