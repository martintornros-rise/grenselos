export type Location = {
  name: string,
  coordinates: [number,number],
  description: string,
  url: string
}

export type DayPlan = {
  title: string,
  location: Location,
  description: string,
}

export type Itinerary = {
  title: string,
  days: DayPlan[]
}
