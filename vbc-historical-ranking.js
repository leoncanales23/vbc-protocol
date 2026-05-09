// Historical ranking snapshots
export async function snapshotRanking(db, seasonId, ranking){
  const ref=db.collection('vbc_rank_history').doc()
  await ref.set({
    seasonId,
    ranking,
    createdAt:Date.now()
  })
}

export async function getSeasonHistory(db, seasonId){
  const snap=await db.collection('vbc_rank_history')
    .where('seasonId','==',seasonId)
    .get()
  return snap.docs.map(d=>d.data())
}
