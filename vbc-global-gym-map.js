export function registerGym(gym){
  return {
    id:gym.id,
    name:gym.name,
    country:gym.country,
    created:Date.now()
  }
}
