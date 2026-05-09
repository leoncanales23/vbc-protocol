export const WORLD_RECORDS = {
  bench:335,
  deadlift:501,
  squat:477,
  overhead:225
}

export function getWorldRecord(type){
  return WORLD_RECORDS[type]
}
