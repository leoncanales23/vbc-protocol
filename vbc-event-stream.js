export function publishEvent(type,data){

  return {
    type,
    data,
    timestamp:Date.now()
  }

}
