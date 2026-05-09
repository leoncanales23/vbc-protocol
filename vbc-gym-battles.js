// Gym vs Gym tournament system
export async function joinGym(db, uid, gymId){
  const ref=db.collection('vbc_gyms').doc(gymId).collection('members').doc(uid)
  await ref.set({joinedAt:Date.now()},{merge:true})
}

export async function recordGymPoints(db, gymId, pts){
  const ref=db.collection('vbc_gyms').doc(gymId)
  await ref.set({
    pts: pts,
    updatedAt: Date.now()
  },{merge:true})
}
