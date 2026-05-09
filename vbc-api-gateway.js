export function routeRequest(endpoint,data){
  return {
    endpoint,
    data,
    received:Date.now()
  }
}
