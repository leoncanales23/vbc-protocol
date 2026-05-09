// Global Athlete ID generator

export function generateAthleteId(uid){
  const short = uid.slice(0,6).toUpperCase()

  return `VBC-${short}-${Date.now()}`
}
