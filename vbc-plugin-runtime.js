export function runPlugin(plugin,data){
  if(plugin && plugin.run){
    return plugin.run(data)
  }
}
