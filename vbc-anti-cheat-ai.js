export function detectAnomaly(lift){
  if(lift.weight > 700) return true
  if(lift.reps > 50) return true
  return false
}
