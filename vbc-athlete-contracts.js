export function createContract(athlete,gym){

  return {
    athlete,
    gym,
    signedAt:Date.now()
  }

}
