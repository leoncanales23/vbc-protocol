export function syncNodes(local,remote){
  const map={}
  for(const n of [...local,...remote]){
    map[n.id]=n
  }
  return Object.values(map)
}
