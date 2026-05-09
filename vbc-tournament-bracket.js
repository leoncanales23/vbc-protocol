export function buildBracket(players){

  const shuffled=[...players].sort(()=>Math.random()-0.5)

  const matches=[]

  for(let i=0;i<shuffled.length;i+=2){
    matches.push([shuffled[i],shuffled[i+1]])
  }

  return matches
}
