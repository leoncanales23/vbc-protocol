export function createGym(gym){

  return {
    id: gym.id,
    name: gym.name,
    country: gym.country,
    createdAt: Date.now(),
    members: []
  }

}

export function addMember(gym, uid){

  gym.members.push(uid)

  return gym

}
