// Simple anti-cheat validation for workout submissions
export function validateWorkoutEntry({reps, weight, durationSec}){
  if(reps <=0 || weight <0) return {valid:false,reason:'invalid_values'}
  const maxRepsPerSec = 2
  if(durationSec && reps/durationSec > maxRepsPerSec){
    return {valid:false,reason:'too_fast'}
  }
  const maxWeight = 600
  if(weight > maxWeight){
    return {valid:false,reason:'weight_outlier'}
  }
  return {valid:true}
}
