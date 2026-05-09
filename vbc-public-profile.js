// Public athlete profile generator
export function buildPublicProfile(user){
  return {
    uid:user.uid,
    name:user.name,
    country:user.country,
    gym:user.gym || null,
    pts:user.pts || 0,
    rank:user.rank || null,
    achievements:user.achievements || [],
    shareUrl:`https://vbc.vibraalto.cl/athlete/${user.uid}`
  }
}
