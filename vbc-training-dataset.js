export function buildDataset(events){
  return events.map(e=>({
    lift:e.lift,
    weight:e.weight,
    reps:e.reps
  }))
}
