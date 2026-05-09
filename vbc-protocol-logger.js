export function logEvent(e){
  return {
    event:e,
    timestamp:Date.now()
  }
}
