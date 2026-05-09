export function computeGlobalScore(totalLift,bodyweight){
  if(!bodyweight) return totalLift
  return totalLift/bodyweight
}
