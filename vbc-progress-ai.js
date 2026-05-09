export function detectProgress(history){

  if(history.length<2) return 0

  const first=history[0]
  const last=history[history.length-1]

  return last-first
}
