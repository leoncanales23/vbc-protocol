export function registerNode(nodes,node){
  nodes.push({
    id:node.id,
    country:node.country,
    url:node.url,
    lastSeen:Date.now()
  })
  return nodes
}
