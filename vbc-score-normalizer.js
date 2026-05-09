export function normalizeScore(score,bodyweight){

  if(!bodyweight) return score

  return score/bodyweight
}
