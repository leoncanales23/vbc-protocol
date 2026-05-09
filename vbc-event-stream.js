export function streamEvent(event){
  return {
    id:event.id,
    type:event.type,
    time:Date.now()
  }
}
