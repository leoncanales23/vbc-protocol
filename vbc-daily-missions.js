// Daily mission generator to boost engagement
export function generateDailyMissions(user){
  const missions=[]

  missions.push({id:'log_workout',pts:20,desc:'Log a workout today'})

  if(user.streak>=3){
    missions.push({id:'streak_boost',pts:30,desc:'Maintain 3 day streak'})
  }

  missions.push({id:'community',pts:15,desc:'Invite a friend'})

  return missions
}
