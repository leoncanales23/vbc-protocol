export function mapGyms(gyms){
  return gyms.map(g=>({
    id:g.id,
    country:g.country,
    city:g.city
  }))
}
