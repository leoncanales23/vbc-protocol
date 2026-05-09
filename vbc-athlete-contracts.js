export function signContract(athlete,gym){
  return {
    athlete,
    gym,
    date:Date.now()
  }
}
