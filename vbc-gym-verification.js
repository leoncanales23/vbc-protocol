export function verifyGym(gym){

  return {
    ...gym,
    verified:true,
    verifiedAt:Date.now()
  }

}
