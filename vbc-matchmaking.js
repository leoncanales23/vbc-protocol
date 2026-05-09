export function matchAthletes(list){
  const shuffled=[...list].sort(()=>Math.random()-0.5)
  const pairs=[]
  for(let i=0;i<shuffled.length;i+=2){
    pairs.push([shuffled[i],shuffled[i+1]])
  }
  return pairs
}
