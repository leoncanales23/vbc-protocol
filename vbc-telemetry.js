export function ingest(data){
  return {
    received:Date.now(),
    payload:data
  }
}
