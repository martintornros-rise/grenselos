<template>
  <q-page class="q-ma-md">

    <div class="row justify-between items-center">

      <h1>{{ $t('itinerary.create') }}</h1>
      <div class="text-right">

        <q-btn icon="refresh" :label="$t('itinerary.create.new')" @click="itineraryStore.resetItinerary" unelevated color="primary" />
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

      <FormFieldGroup icon="family_restroom">
        <FormField v-model="itineraryStore.promptParts.who" label="Vem/vilka önskar information?" :options="['Familj', 'Vuxet par']"/>
      </FormFieldGroup>

      <FormFieldGroup icon="info">
        <FormField v-model="itineraryStore.promptParts.what" label="Vilken information önskas?"/>
        <FormField v-model="itineraryStore.promptParts.likes" label="Något särskilt som besökaren gillar?"/>
        <FormField v-model="itineraryStore.promptParts.avoid" label="Något som besökaren vill undvika?"/>
      </FormFieldGroup>

      <FormFieldGroup icon="location_on">
          <FormField v-model="itineraryStore.promptParts.where" label="Vilket geografiskt område?" :options="['Østfold', 'Dalsland', 'Bohuslän']"/>
          <FormField v-model="itineraryStore.promptParts.whereStart" label="Var ska resan starta?">
            <template v-slot:append>
              <q-btn icon="location_on" @click="setCurrentStartLocation" dense flat/>
            </template>
          </FormField>
          <FormField v-model="itineraryStore.promptParts.whereEnd" label="Var ska resan sluta?"/>
      </FormFieldGroup>

      <FormFieldGroup icon="accessibility">
        <FormField v-model="itineraryStore.promptParts.accessibility" label="Tillgänglighetsaspekter" :options="['Bilparkering', 'Kollektivtrafik', 'Barnvagn', 'Rullstol', 'Tolk' ]"/>
      </FormFieldGroup>

      <FormFieldGroup icon="calendar_month">
          <FormField v-model="itineraryStore.promptParts.when" label="Vilken tidsperiod?"/>
      </FormFieldGroup>

      <FormFieldGroup icon="star">
          <FormField v-model="itineraryStore.promptParts.extra" label="Extra information?"/>
      </FormFieldGroup>
      <!-- <q-input v-model="prompt" type="textarea" label="Förslag på prompt" /> -->
      <q-expansion-item
        expand-separator
        icon="terminal"
        label="AI-prompt"
        caption="Visa den information som skickas till AI:n"
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
    <div class="row">
      <div class="col-12 col-md column gap-sm items-start">
        <p>Skicka informationen till en AI och invänta en färdig reseplan.</p>
        <div class="row gap-sm items-center">
          <q-btn icon="smart_toy" label="Skapa reseplan med AI" @click="callCloudOpenAI" unelevated color="primary" :loading="isGeneratingResponse" />
          <!-- <q-btn v-if="openAISuccess === true"  :to="{name: 'View'}" icon="check" label="Reseplanen är skapad" flat no-caps color="positive" class="no-decoration" /> -->
          <span v-if="openAISuccess === false" class="text-negative">Det gick inte att skapa reseplanen, försök igen.</span>
        </div>
        <!-- <q-btn icon="map" :label="$t('itinerary.view')" to="/itinerary" :disable="!itineraryStore.itinerary" unelevated color="primary" class="no-decoration"/> -->
      </div>
      <div class="row items-center q-ma-lg text-grey">
        ELLER
      </div>
      <div class="col-12 col-md column gap-sm items-start">
        <p>Starta en AI-chatt och arbeta successivt fram en reseplan.</p>
        <ol class="column gap-sm">
          <li>
        <!-- <div class="row items-start"> -->
          <div class="col">Starta chatt i nytt fönster.</div>
          <div class="row gap-sm">
            <q-btn icon="smart_toy" label="Starta chatt" @click="startChat" unelevated color="primary" />
            <!-- <q-btn icon="smart_toy" label="Starta Blixten-chatt" @click="startCustomChat('https://chatgpt.com/g/g-68403e5fd2948191900e0d910c368594-granslos')" unelevated color="primary" /> -->
          </div>
        <!-- </div> -->
        </li>
        <li>

          <div class="col">
            När ni är nöjda med reseplanen: Be chattbotten exportera som JSON, kopiera resultatet och klistra in nedan.
          </div>
          <div class="row gap-sm items-center">
            <q-btn icon="content_paste" :label="$t('paste')" @click="pasteItinerary" unelevated color="primary" />
            <!-- <q-btn v-if="itineraryValidated === true"  :to="{name: 'View'}" icon="check" label="Reseplanen är skapad" flat no-caps color="positive" class="no-decoration" /> -->
            <span v-if="itineraryValidated === false" class="text-negative">Det gick inte att skapa reseplanen, försök igen.</span>
          </div>

        </li>
        </ol>
        <!-- <q-btn icon="map" :label="$t('itinerary.view')" to="/itinerary" :disable="!itineraryStore.itinerary" unelevated color="primary" class="no-decoration"/> -->
      </div>


    </div>

    <!-- <q-separator class="q-mt-lg q-mb-lg"/>

    <h2>3. Visa reseplan</h2>
    <q-btn icon="map" :label="$t('itinerary.view')" to="/itinerary" :disable="!itineraryStore.itinerary" unelevated color="primary" class="no-decoration"/> -->

  </q-page>
</template>

<script setup lang="ts">
import FormField from 'src/components/FormField.vue';
import FormFieldGroup from 'src/components/FormFieldGroup.vue';
import { useItineraryStore } from 'src/stores/itineraryStore';
import { useParse } from 'src/ts/useParse';
// import { Itinerary } from 'src/ts/models/models';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
// import { useClipboard } from '@vueuse/core'
// import { Itinerary } from 'src/ts/models/models';

// const source = ref('')
// const { text } = useClipboard({ source })

const itineraryStore = useItineraryStore()
const p = useParse()

// const whereSelected = ref([] as string[])

// const prompt = 'En familj på 2 vuxna och 2 tonåringar kommer vara en vecka i dalsland och gränserna mot norge. de gillar äventyr men är rädda för vatten. ge förslag på en rutt med en aktivitet per dag. de tältar om det behövs men sover gärna bekvämt. de gillar fiskpinnar.'
const prompt = computed({
  get () {
    let p = 'Du är ett stöd till en turistbyrå eller guide som har fått en fråga från turister eller besökare.\n\n'
    if(itineraryStore.promptParts.who){
      p += "Beskrivning av vem/vilka som önskar information: " + itineraryStore.promptParts.who + "\n\n"
    }
    if(itineraryStore.promptParts.what){
      p += "Beskrivning av vad för typ av information önskas: " + itineraryStore.promptParts.what + "\n\n"
    }
    if(itineraryStore.promptParts.likes){
      p += "Besökaren gillar: " + itineraryStore.promptParts.likes + "\n\n"
    }
    if(itineraryStore.promptParts.avoid){
      p += "Besökaren vill undvika: " + itineraryStore.promptParts.avoid + "\n\n"
    }
    if(itineraryStore.promptParts.where){
      p += "Geografiskt område: " + itineraryStore.promptParts.where + "\n\n"
    }
    if(itineraryStore.promptParts.whereStart){
      p += "Resans start: " + itineraryStore.promptParts.whereStart + "\n\n"
    }
    if(itineraryStore.promptParts.whereEnd){
      p += "Resans slut:  " + itineraryStore.promptParts.whereEnd + "\n\n"
    }
    if(itineraryStore.promptParts.accessibility){
      p += "Tillgänglighetsaspekter:  " + itineraryStore.promptParts.accessibility + "\n\n"
    }
    if(itineraryStore.promptParts.when){
      p += "Tidsperiod: " + itineraryStore.promptParts.when + "\n\n"
    }
    if(itineraryStore.promptParts.extra){
      p += "Extra information: " + itineraryStore.promptParts.extra + "\n\n"
    }
    return p
  },
  set() {}
})

const promptJSON = 'Location = {"name": string, "coordinates": [number,number], "country_code": string, "description": string, "url": string}\n\nDayPlan = {"title": string, "location": Location, "description": string}\n\nItinerary = {"title": string,"days": DayPlan[]}"'

function setCurrentStartLocation(){
  navigator.geolocation.getCurrentPosition((position) => {
    itineraryStore.promptParts.whereStart = position.coords.latitude + ', ' + position.coords.longitude
  });
}

function startChat () {
  // Blixten: https://chatgpt.com/share/68414aaa-ba24-8012-a954-013d48549684

  const exportInstructions = 'När reseplanen är klar, fråga om användaren vill exportera reseplanen. Om hen svarar ja, exportera reseplanen som JSON enligt:'

  const promptFinal = prompt.value + exportInstructions + '\n\n' + promptJSON

  window.open(encodeURI('https://chat.openai.com/?q=' + promptFinal))
}

// function startCustomChat (url: string) {
//   // Blixten: https://chatgpt.com/share/68414aaa-ba24-8012-a954-013d48549684
//   window.open(encodeURI(url + '/?q=' + prompt.value))
// }

const itineraryValidated = ref(undefined as true | false | undefined)
async function pasteItinerary() {
  const text = await navigator.clipboard.readText();
  try {
    itineraryStore.itinerary = JSON.parse(text)
    itineraryValidated.value = true
    await router.push({name: 'View'})
  }
  catch {
    itineraryValidated.value = false
  }
}

// PARSE & OPENAI
onMounted(() => {
  p.parseInitialize()
})
const isGeneratingResponse = ref(false)
const response = ref()
const openAISuccess = ref(undefined as true | false | undefined)
async function callCloudOpenAI(){
  isGeneratingResponse.value = true

  const exportInstructions = 'Returnera reseplanen som JSON enligt:'

  const promptFinal = prompt.value + exportInstructions + '\n\n' + promptJSON

  response.value = await p.callCloudOpenAI(promptFinal)
  try{
    itineraryStore.itinerary = JSON.parse(response.value.choices[0].message.content)
    openAISuccess.value = true
    isGeneratingResponse.value = false
    await router.push({name: 'View'})
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
