export function publish(event){
  return {
    event,
    time:Date.now()
  }
}
