export function createTournament(name){
  return {
    id:"tournament-"+Date.now(),
    name:name,
    created:Date.now(),
    status:"open"
  }
}
