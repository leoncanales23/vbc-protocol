export function broadcastEvent(nodes,event){
  return nodes.map(n=>{
    return {node:n.id,event}
  })
}
