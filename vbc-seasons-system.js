// Competitive seasons system
export async function createSeason(db, name, startDate, endDate){
  const ref=db.collection('vbc_seasons').doc()
  await ref.set({
    name,
    startDate,
    endDate,
    createdAt:Date.now(),
    status:'active'
  })
  return ref.id
}

export async function closeSeason(db, id){
  const ref=db.collection('vbc_seasons').doc(id)
  await ref.set({status:'closed',closedAt:Date.now()},{merge:true})
}
