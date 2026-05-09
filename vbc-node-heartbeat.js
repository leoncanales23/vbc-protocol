export function heartbeat(node){
  node.lastSeen=Date.now()
  return node
}
