// VBC Season Engine

export function createSeason(year){

  return {
    id:"season-"+year,
    year:year,
    start:Date.now(),
    status:"active"
  }

}
