export function aggregateBoards(boards){
  const scores={}
  for(const b of boards){
    for(const e of b){
      scores[e.athlete]=(scores[e.athlete]||0)+e.score
    }
  }
  return scores
}
