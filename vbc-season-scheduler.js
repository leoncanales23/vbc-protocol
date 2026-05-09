export function generateSeason(events){
  return events.map((e,i)=>({
    round:i+1,
    event:e
  }))
}
