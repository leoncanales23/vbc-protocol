export function buildCachedRanking(leaderboard){

  return leaderboard.map((item, index) => ({
    rank: index + 1,
    uid: item.uid,
    score: item.score
  }))

}
