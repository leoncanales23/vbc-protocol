export function createFederationSDK(node){
  return {
    node,
    registerAthlete:(a)=>({node,athlete:a}),
    submitResult:(r)=>({node,result:r})
  }
}
