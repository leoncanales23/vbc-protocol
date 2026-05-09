export function vote(proposal,votes){
  const yes=votes.filter(v=>v==="yes").length
  const no=votes.filter(v=>v==="no").length
  return yes>no
}
