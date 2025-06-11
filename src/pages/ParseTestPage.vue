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

    <h2>ENV-variabler</h2>
    <ul>
      <li>CI: {{ env.CI }}</li>
      <li>PARSE_APP_ID: {{ env.PARSE_APP_ID }}</li>
      <li>FOO: {{ env.FOO }}</li>
    </ul>

    <h2>1. Fyll i information</h2>

    <div class="column gap-sm">

      <FormFieldGroup icon="family_restroom">
        <FormField v-model="promptParts.who" label="Vem/vilka önskar information?" :options="['Familj', 'Vuxet par']"/>
      </FormFieldGroup>

      <FormFieldGroup icon="info">
        <FormField v-model="promptParts.what" label="Vilken information önskas?"/>
        <FormField v-model="promptParts.likes" label="Något särskilt som besökaren gillar?"/>
        <FormField v-model="promptParts.avoid" label="Något som besökaren vill undvika?"/>
      </FormFieldGroup>

      <FormFieldGroup icon="location_on">
          <FormField v-model="promptParts.where" label="Vilket geografiskt område?" :options="['Østfold', 'Dalsland', 'Bohuslän']"/>
          <FormField v-model="promptParts.whereStart" label="Var ska resan starta?">
            <template v-slot:append>
              <q-btn icon="location_on" @click="setCurrentStartLocation" dense flat/>
            </template>
          </FormField>
          <FormField v-model="promptParts.whereEnd" label="Var ska resan sluta?"/>
      </FormFieldGroup>

      <FormFieldGroup icon="calendar_month">
          <FormField v-model="promptParts.when" label="Vilken tidsperiod?"/>
      </FormFieldGroup>

      <FormFieldGroup icon="star">
          <FormField v-model="promptParts.extra" label="Extra information?"/>
      </FormFieldGroup>
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

    <h2>2. Använd AI</h2>
    <p>Skicka informationen till en AI och invänta reseplan</p>
    <div class="row gap-sm">
      <q-btn icon="smart_toy" label="Skapa reseplan med AI" @click="callCloudOpenAI" unelevated color="primary" :loading="isGeneratingResponse" />
      <q-btn icon="smart_toy" label="Hello" @click="callCloudHello" unelevated color="primary" :loading="isGeneratingResponse" />
      <span v-if="openAISuccess === true" class="text-positive">Reseplanen är skapad</span>
      <span v-else-if="openAISuccess === false" class="text-negative">Det gick inte att skapa reseplanen, försök igen.</span>
    </div>
    <q-expansion-item
        v-if="response"
        expand-separator
        icon="smart_toy"
        label="Svar från AI"
      >
        <q-card class="prompt bg-grey-3 relative-position" flat bordered>
          <q-card-section>
            <pre>{{ response.choices[0].message.content }}</pre>
          </q-card-section>
          <!-- <q-btn icon="content_copy" size="sm" flat class="absolute-top-right q-ma-sm q-pa-sm" @click="copy(prompt)">
            <span v-if="!copied">Copy</span>
            <span v-else>Copied!</span>
          </q-btn> -->
        </q-card>
      </q-expansion-item>

    <q-separator class="q-mt-lg q-mb-lg"/>

    <h2>3. Visa reseplan</h2>
    <q-btn icon="map" :label="$t('itinerary.view')" to="/itinerary" unelevated color="primary" class="no-decoration"/>

  </q-page>
</template>

<script setup lang="ts">
import FormField from 'src/components/FormField.vue';
import FormFieldGroup from 'src/components/FormFieldGroup.vue';
import { useItineraryStore } from 'src/stores/itineraryStore';
import { useParse } from 'src/ts/useParse';
// import { Itinerary } from 'src/ts/models/models';
import { computed, onMounted, ref } from 'vue';
// import { useClipboard } from '@vueuse/core'
// import { Itinerary } from 'src/ts/models/models';

// const source = ref('')
// const { text } = useClipboard({ source })

const itineraryStore = useItineraryStore()
const p = useParse();

const env = computed(() => process.env)

onMounted(() =>{
  console.log(env.value.MODE, env.value.CI, env.value.PARSE_APP_ID, env.value.FOO)
})

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

const promptExport = 'Returnera reseplanen som JSON enligt:\n\nLocation = {"name": string, "coordinates": [number,number], "country_code": string, "description": string, "url": string}\n\nDayPlan = {"title": string, "location": Location, "description": string}\n\nItinerary = {"title": string,"days": DayPlan[]}"'

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

// Parse

onMounted(() => {
  p.parseInitialize()
})

async function callCloudHello(){
  await p.callCloudHello('Martin')
}

const isGeneratingResponse = ref(false)
const response = ref()
const openAISuccess = ref(undefined as true | false | undefined)
async function callCloudOpenAI(){
  isGeneratingResponse.value = true
  response.value = await p.callCloudOpenAI(prompt.value)
  try{
    itineraryStore.itinerary = JSON.parse(response.value.choices[0].message.content)
    openAISuccess.value = true
    isGeneratingResponse.value = false
  }
  catch{
    openAISuccess.value = false
    isGeneratingResponse.value = false
  }
}

</script>

<style lang="scss" scoped>
.prompt {
  white-space: pre;
}
</style>
