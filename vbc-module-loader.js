export function loadModules(modules){
  const registry={}
  for(const m of modules){
    registry[m.name]=m
  }
  return registry
}
