export function connectFederations(list){
  const mesh={}
  for(const f of list){
    mesh[f.id]={country:f.country,gyms:f.gyms||[]}
  }
  return mesh
}
