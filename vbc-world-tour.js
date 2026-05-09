export function buildTour(events){
  return events.sort((a,b)=>a.date-b.date)
}
