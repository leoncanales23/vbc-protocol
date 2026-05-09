export function validateRecord(votes){
  let yes=0
  for(const v of votes) if(v) yes++
  return yes > votes.length*0.66
}
