// VBC Athlete Passport

export function createAthletePassport(athlete){

  return {
    vbcId:athlete.id,
    name:athlete.name,
    country:athlete.country,
    joinDate:Date.now(),
    verified:false
  }

}
