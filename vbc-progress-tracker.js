export function trackProgress(history){
  if(history.length < 2) return 0
  return history[history.length-1] - history[0]
}
