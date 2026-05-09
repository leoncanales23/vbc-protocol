// VBC Gym Reputation Engine

export function calculateGymScore(events){

  let score = 0

  for(const e of events){

    if(e.verified) score += 10
    else score += 2

  }

  return score
}
