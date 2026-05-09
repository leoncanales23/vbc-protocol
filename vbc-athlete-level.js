export function athleteLevel(score){
  if(score>10000) return "elite"
  if(score>5000) return "pro"
  return "amateur"
}
