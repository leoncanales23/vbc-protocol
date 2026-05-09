export const VBC_PLUGINS={}

export function registerPlugin(name,plugin){
  VBC_PLUGINS[name]=plugin
}

export function loadPlugin(name){
  return VBC_PLUGINS[name]
}
