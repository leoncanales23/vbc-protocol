export function networkHealth(nodes){
  return nodes.filter(n=>Date.now()-n.lastSeen<60000).length
}
