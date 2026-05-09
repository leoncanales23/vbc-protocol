// Global events and challenges
export async function createGlobalEvent(db, name, startDate, endDate){
  const ref=db.collection('vbc_events').doc()
  await ref.set({
    name,
    startDate,
    endDate,
    participants:0,
    createdAt:Date.now()
  })
  return ref.id
}

export async function joinEvent(db, eventId, uid){
  const ref=db.collection('vbc_events').doc(eventId).collection('participants').doc(uid)
  await ref.set({joinedAt:Date.now()})
}
