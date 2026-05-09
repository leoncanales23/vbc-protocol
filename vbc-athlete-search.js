export function searchAthletes(list,query){
  return list.filter(a =>
    a.name.toLowerCase().includes(query.toLowerCase())
  )
}
