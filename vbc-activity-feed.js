// Social activity feed for workouts and achievements
export async function publishActivity(db, uid, type, payload){
  const ref=db.collection('vbc_activity').doc()
  await ref.set({
    uid,
    type,
    payload,
    createdAt:Date.now()
  })
}

export async function getFeed(db, limit=50){
  const snap=await db.collection('vbc_activity')
    .orderBy('createdAt','desc')
    .limit(limit)
    .get()
  return snap.docs.map(d=>({id:d.id,...d.data()}))
}
