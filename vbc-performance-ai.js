export function predictNextPR(history){
  if(history.length<2) return null
  const last=history[history.length-1]
  return last*1.03
}
