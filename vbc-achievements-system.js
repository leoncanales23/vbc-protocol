// Achievement and badge engine
export function evaluateAchievements(user){
  const achievements=[]
  if(user.pts>=1000) achievements.push('bronze_strength')
  if(user.pts>=5000) achievements.push('silver_strength')
  if(user.pts>=10000) achievements.push('gold_strength')
  if(user.referrals>=5) achievements.push('community_builder')
  return achievements
}
