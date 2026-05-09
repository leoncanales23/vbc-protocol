// Minimal admin utilities for managing competitions
export async function createTournament(db, name, startDate){
  const ref = db.collection('vbc_tournaments').doc()
  await ref.set({
    name,
    startDate,
    createdAt:Date.now(),
    status:'scheduled'
  })
  return ref.id
}

export async function closeTournament(db, id){
  const ref=db.collection('vbc_tournaments').doc(id)
  await ref.set({status:'finished',closedAt:Date.now()},{merge:true})
}
