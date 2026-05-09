export function syncFederationRanking(data){
  return {
    federation:data.name,
    updated:Date.now(),
    athletes:data.athletes.length
  }
}
