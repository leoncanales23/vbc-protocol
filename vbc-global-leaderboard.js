// Global and country leaderboard utilities
export async function getGlobalLeaderboard(db, limit=100){
  const snap = await db.collection('vbc_participants')
    .orderBy('pts','desc')
    .limit(limit)
    .get()
  return snap.docs.map(d=>({id:d.id,...d.data()}))
}

export async function getCountryLeaderboard(db, country, limit=100){
  const snap = await db.collection('vbc_participants')
    .where('country','==',country)
    .orderBy('pts','desc')
    .limit(limit)
    .get()
  return snap.docs.map(d=>({id:d.id,...d.data()}))
}
