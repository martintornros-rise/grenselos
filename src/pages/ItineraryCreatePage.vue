<template>
  <q-page class="q-ma-md">

    <div class="row justify-between items-center">
      <h1>{{ $t('itinerary.create') }}</h1>
      <div class="text-right">
        <q-btn icon="refresh" :label="$t('itinerary.create.new')" @click="itineraryStore.resetItinerary" unelevated color="primary" />
      </div>
    </div>

    <h2>1. {{$t('itinerary.form.fill_information')}}</h2>

    <div class="column gap-sm">

      <FormFieldGroup icon="family_restroom">
        <FormField v-model="itineraryStore.promptParts.who" :label="$t('itinerary.form.who')" :options="[$t('form.values.family'), $t('form.values.adult_couple')]"/>
      </FormFieldGroup>

      <FormFieldGroup icon="info">
        <FormField v-model="itineraryStore.promptParts.what" :label="$t('itinerary.form.what')"/>
        <FormField v-model="itineraryStore.promptParts.likes" :label="$t('itinerary.form.likes')"/>
        <FormField v-model="itineraryStore.promptParts.avoid" :label="$t('itinerary.form.avoid')"/>
      </FormFieldGroup>

      <FormFieldGroup icon="location_on">
          <FormField v-model="itineraryStore.promptParts.where" :label="$t('itinerary.form.where')" :options="['Østfold', 'Dalsland', 'Bohuslän']"/>
          <FormField v-model="itineraryStore.promptParts.whereStart" :label="$t('itinerary.form.whereStart')">
            <template v-slot:append>
              <q-btn icon="location_on" @click="setCurrentStartLocation" dense flat/>
            </template>
          </FormField>
          <FormField v-model="itineraryStore.promptParts.whereEnd" :label="$t('itinerary.form.whereEnd')"/>
      </FormFieldGroup>

      <FormFieldGroup icon="accessibility">
        <FormField v-model="itineraryStore.promptParts.accessibility" :label="$t('itinerary.form.accessibility')" :options="[$t('form.values.car_parking'), $t('form.values.public_transport'), $t('form.values.pram'), $t('form.values.wheelchair'), $t('form.values.interpreter') ]"/>
      </FormFieldGroup>

      <FormFieldGroup icon="calendar_month">
          <FormField v-model="itineraryStore.promptParts.when" :label="$t('itinerary.form.when')"/>
      </FormFieldGroup>

      <FormFieldGroup icon="star">
          <FormField v-model="itineraryStore.promptParts.extra" :label="$t('itinerary.form.extra')"/>
      </FormFieldGroup>
      <q-expansion-item
        expand-separator
        icon="terminal"
        :label="$t('itinerary.form.prompt')"
        :caption="$t('itinerary.form.view_prompt')"
      >
        <q-card class="prompt bg-grey-3 relative-position" flat bordered>
          <q-card-section>
            {{ prompt }}
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>

    <q-separator class="q-mt-lg q-mb-lg"/>

    <h2>2. {{ $t('itinerary.form.use_AI') }}</h2>
    <div class="row">
      <div class="col-12 col-md column gap-sm items-start">
        <p>{{ $t('itinerary.form.ai_api') }}</p>
        <div class="row gap-sm items-center">
          <q-btn icon="smart_toy" :label="t('itinerary.form.ai_generate')" @click="callCloudOpenAI" unelevated color="primary" :loading="isGeneratingResponse" />
          <span v-if="openAISuccess === false" class="text-negative">{{ $t('itinerary.form.ai_generate_error') }}</span>
        </div>
      </div>
      <div class="row items-center q-ma-lg text-grey">
        {{ $t('OR') }}
      </div>
      <div class="col-12 col-md column gap-sm items-start">
        <p>{{ $t('itinerary.form.ai_start_chat') }}</p>
        <ol class="column gap-sm">
          <li>
          <div class="col">{{ $t('itinerary.form.ai_chat_new_window') }}</div>
          <div class="row gap-sm">
            <q-btn icon="smart_toy" :label="$t('itinerary.form.ai_start_chat_btn')" @click="startChat" unelevated color="primary" />
          </div>
        </li>
        <li>

          <div class="col">
            {{ $t('itinerary.form.ai_JSON_instructions') }}
          </div>
          <div class="row gap-sm items-center">
            <q-btn icon="content_paste" :label="$t('paste')" @click="pasteItinerary" unelevated color="primary" />
            <span v-if="itineraryValidated === false" class="text-negative">{{ $t('itinerary.form.ai_generate_error') }}</span>
          </div>

        </li>
        </ol>
      </div>


    </div>

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
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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
    let p = ''
    if(itineraryStore.promptParts.who){
      p += t('prompt.who') + ": " + itineraryStore.promptParts.who + "\n\n"
    }
    if(itineraryStore.promptParts.what){
      p += t('prompt.what')+ ": " + itineraryStore.promptParts.what + "\n\n"
    }
    if(itineraryStore.promptParts.likes){
      p += t('prompt.likes') + ": " + itineraryStore.promptParts.likes + "\n\n"
    }
    if(itineraryStore.promptParts.avoid){
      p += t('prompt.avoid') + ": " + itineraryStore.promptParts.avoid + "\n\n"
    }
    if(itineraryStore.promptParts.where){
      p += t('prompt.where') + ": " + itineraryStore.promptParts.where + "\n\n"
    }
    if(itineraryStore.promptParts.whereStart){
      p += t('prompt.whereStart') + ": " + itineraryStore.promptParts.whereStart + "\n\n"
    }
    if(itineraryStore.promptParts.whereEnd){
      p += t('prompt.whereEnd') + ":  " + itineraryStore.promptParts.whereEnd + "\n\n"
    }
    if(itineraryStore.promptParts.accessibility){
      p += t('prompt.accessibility') + ": " + itineraryStore.promptParts.accessibility + "\n\n"
    }
    if(itineraryStore.promptParts.when){
      p += t('prompt.when') + ": " + itineraryStore.promptParts.when + "\n\n"
    }
    if(itineraryStore.promptParts.extra){
      p += t('prompt.extra') + ": " + itineraryStore.promptParts.extra + "\n\n"
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

  const exportInstructions = t('prompt.export')

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

  response.value = await p.callCloudOpenAI(t('prompt.intro'), prompt.value, t('prompt.export_api') + '\n\n' + promptJSON)
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
