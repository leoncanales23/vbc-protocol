export function createToken(app){
  return btoa(app+Date.now())
}
