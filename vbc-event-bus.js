export function publish(bus,event){
  bus.push(event)
  return bus
}
