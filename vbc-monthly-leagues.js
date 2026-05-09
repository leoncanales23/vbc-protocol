// Automatic monthly leagues system
export function getLeagueId(date=new Date()){
  const y=date.getFullYear()
  const m=(date.getMonth()+1).toString().padStart(2,'0')
  return `league-${y}-${m}`
}

export async function joinMonthlyLeague(db, uid){
  const leagueId=getLeagueId()
  const ref=db.collection('vbc_leagues').doc(leagueId).collection('participants').doc(uid)
  await ref.set({
    joinedAt: Date.now()
  },{merge:true})
}

export async function recordLeagueScore(db, uid, pts){
  const leagueId=getLeagueId()
  const ref=db.collection('vbc_leagues').doc(leagueId).collection('participants').doc(uid)
  await ref.set({
    pts,
    updatedAt: Date.now()
  },{merge:true})
}
