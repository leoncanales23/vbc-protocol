export function recordHash(record){
  return btoa(record.athlete+record.weight+record.date)
}
