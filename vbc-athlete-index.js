export function buildIndex(athletes){
  const index={}
  for(const a of athletes){
    index[a.id]=a
  }
  return index
}
