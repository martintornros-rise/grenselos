<template>
  <q-page class="q-ma-md">

    <h1>AI instruktioner</h1>

    <h2>1. Skapa ny reseplan</h2>
    <p>All ifylld information kommer att försvinna.</p>
    <q-btn label="Skapa ny reseplan" @click="reset" unelevated color="primary"/>

    <q-separator class="q-mt-lg q-mb-lg"/>

    <h2>2. Fyll i information</h2>
    <div class="column gap-sm">
      <q-input v-model="promptParts.who" type="text" label="Vem/vilka önskar information?" outlined >
        <template v-slot:append>
          <q-icon name="add"/>
          <q-btn label="Familj" @click="promptParts.who += 'Familj '" dense outline size=""/>
          <q-btn label="Vuxet par" @click="promptParts.who += 'Vuxet par '" dense outline size=""/>
        </template>
      </q-input>
      <q-input v-model="promptParts.what" type="text" label="Vilken information önskas?" outlined />
      <q-input v-model="promptParts.where" type="text" label="Vilket geografiskt område?" outlined >
        <template v-slot:append>
          <q-icon name="add"/>
          <q-btn label="Jämtland" @click="promptParts.where += 'Jämtland '" dense outline size=""/>
          <q-btn label="Dalarna" @click="promptParts.where += 'Dalarna '" dense outline size=""/>
          <q-btn label="Hedmark" @click="promptParts.where += 'Hedmark '" dense outline size=""/>
          <q-btn label="Sør-Trøndelag" @click="promptParts.where += 'Sør-Trøndelag '" dense outline size=""/>
        </template>
      </q-input>
      <q-input v-model="promptParts.when" type="text" label="Vilken tidsperiod?"
        outlined />
      <q-input v-model="promptParts.likes" type="text" label="Något särskilt som besökaren gillar?" outlined />
      <q-input v-model="promptParts.avoid" type="text" label="Något som besökaren vill undvika?" outlined />
      <q-input v-model="promptParts.extra" type="text" label="Extra information?" outlined />
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

    <h2>3. Starta chatten</h2>
    <p>Starta konversation med AI-chattboten.</p>
    <p>Den ifyllda informationen / prompten skickas med automatiskt, tillsammans med andra instruktioner som hjälper dig att skapa en reseplan.</p>
    <q-btn @click="startChat" unelevated color="primary">Starta chatt</q-btn>

    <q-separator class="q-mt-lg q-mb-lg"/>

    <h2>4. Exportera en reseplan</h2>
    <p>
      När ni är nöjda med förslagen kan AI:n hjälpa att skapa en reseplan.
    </p>
    <p>
      Be chattbotten exportera en reseplan (JSON) och kopiera resultatet.
    </p>

    <q-separator class="q-mt-lg q-mb-lg"/>

    <h2>5. Klistra in resultatet</h2>
    <q-input v-model="itineraryString" type="textarea" label="Reseplan som JSON" outlined />

    <h2>6. Visa reseplan</h2>
    <q-btn label="Visa reseplan" to="/itinerary" unelevated color="primary"/>

  </q-page>
</template>

<script setup lang="ts">
import { useItineraryStore } from 'src/stores/itineraryStore';
import { computed, ref } from 'vue';
// import { useClipboard } from '@vueuse/core'

// const source = ref('')
// const { copy, copied } = useClipboard({ source })

const itineraryStore = useItineraryStore()

const promptParts = ref({
  who: '',
  what: '',
  where: '',
  when: '',
  likes: '',
  avoid: '',
  extra: '',
})
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
    if(promptParts.value.where){
      p += "Goegrafiskt område: " + promptParts.value.where + "\n\n"
    }
    if(promptParts.value.when){
      p += "Tidsperiod: " + promptParts.value.when + "\n\n"
    }
    if(promptParts.value.likes){
      p += "Saker som besökaren gillar: " + promptParts.value.likes + "\n\n"
    }
    if(promptParts.value.avoid){
      p += "Saker som besökaren vill undvika: " + promptParts.value.avoid + "\n\n"
    }
    if(promptParts.value.extra){
      p += "Extra information: " + promptParts.value.extra + "\n\n"
    }
    p += promptExport
    return p
  },
  set() {}
})

const promptExport = 'Efter varje nytt förslag som du ger, fråga om användaren vill exportera reseplanen. Om hen svarar ja, exportera reseplanen som JSON enligt:\n\nLocation = {\n"name": string,\n"coordinates": [number,number],\n"description": string,\n"url": string\n}\n\nDayPlan = {\n"title": string,\n"location": Location,\n"description": string,\n}\n\nItinerary = {\n"title": string,\n"days": DayPlan[]\n}"'

// function copyPrompt () {

// }

function reset () {
  promptParts.value = {
  who: '',
  what: '',
  where: '',
  when: '',
  likes: '',
  avoid: '',
  extra: '',
}
  itineraryStore.resetItinerary()
}

function startChat () {
  window.open('https://chat.openai.com/?model=gpt-4&q=' + prompt.value)
}

const itineraryString = computed({
  get(){
    return itineraryStore.itinerary ? JSON.stringify(itineraryStore.itinerary) : ''
  },
  set (value: string) {
    itineraryStore.itinerary = value ? JSON.parse(value) : undefined
  }

})

</script>

<style lang="scss" scoped>
.prompt {
  white-space: pre;
}
</style>
