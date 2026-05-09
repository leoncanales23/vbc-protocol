export function recordResult(history,result){

  history.push({
    event:result.event,
    score:result.score,
    date:Date.now()
  })

  return history
}
