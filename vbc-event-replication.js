export function replicateEvent(event,nodes){
  return nodes.map(n=>({node:n,event}))
}
