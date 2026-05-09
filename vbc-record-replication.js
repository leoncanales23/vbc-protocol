export function replicateRecord(nodes,record){
  return nodes.map(n=>{
    return {node:n.id,record}
  })
}
