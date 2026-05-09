export function createSeason(year){
  return {
    id:"season-"+year,
    year:year,
    createdAt:Date.now(),
    status:"active"
  }
}
