// VBC Athlete Cache Layer

const cache = new Map()

export function getAthlete(id){
  return cache.get(id)
}

export function setAthlete(id,data){
  cache.set(id,data)
}
