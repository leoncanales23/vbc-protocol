export function assignBadge(score){

  if(score>10000) return "elite"
  if(score>5000) return "pro"
  if(score>2000) return "advanced"

  return "rookie"
}
