export function matchSponsors(athletes,sponsors){
  return athletes.map(a=>({
    athlete:a.id,
    sponsor:sponsors[Math.floor(Math.random()*sponsors.length)]
  }))
}
