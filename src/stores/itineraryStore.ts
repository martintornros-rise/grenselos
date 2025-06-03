import { defineStore, acceptHMRUpdate } from 'pinia';
import type { Itinerary } from 'src/ts/models/models';
import {itineraryTestData} from 'app/src/ts/models/itinerary'

export const useItineraryStore = defineStore('itinerary', {
  state: () => ({
    itinerary: itineraryTestData as Itinerary | undefined,
  }),

  getters: {
  },

  actions: {
    resetItinerary() {
      this.itinerary = undefined
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useItineraryStore, import.meta.hot));
}
