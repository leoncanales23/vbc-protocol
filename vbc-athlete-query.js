export function queryAthlete(db,id){
  return db.find(a=>a.id===id)
}
