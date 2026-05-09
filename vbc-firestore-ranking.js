// Realtime Firestore ranking listener
export function watchRanking(db, renderRanking, trackRankChange, checkRankAchievements){
  return db.collection("vbc_participants")
    .orderBy("pts","desc")
    .limit(50)
    .onSnapshot((snap)=>{
      const rankingData = snap.docs.map(d=>({id:d.id,...d.data()}))
      if(typeof renderRanking === 'function') renderRanking(rankingData)
      if(typeof trackRankChange === 'function') trackRankChange(rankingData)
      if(typeof checkRankAchievements === 'function') checkRankAchievements(rankingData)
    })
}
