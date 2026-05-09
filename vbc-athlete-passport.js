export function createPassport(id,country){
  return {
    id,
    country,
    created:Date.now()
  }
}
