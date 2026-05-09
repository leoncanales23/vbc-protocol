// Clubs / gym communities
export async function createClub(db, name, ownerUid){
  const ref=db.collection('vbc_clubs').doc()
  await ref.set({
    name,
    ownerUid,
    createdAt:Date.now(),
    members:1
  })
  return ref.id
}

export async function joinClub(db, clubId, uid){
  const ref=db.collection('vbc_clubs').doc(clubId).collection('members').doc(uid)
  await ref.set({joinedAt:Date.now()})
}
