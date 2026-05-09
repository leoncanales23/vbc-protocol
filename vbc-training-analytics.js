export function weeklyVolume(lifts){
  return lifts.reduce((a,b)=>a+b.weight*b.reps,0)
}
