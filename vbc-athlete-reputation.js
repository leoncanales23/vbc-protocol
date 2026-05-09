export function calculateAthleteReputation(events){
  let score = 0
  for(const e of events){
    if(e.verified) score += 5
    else score += 1
  }
  return score
}
