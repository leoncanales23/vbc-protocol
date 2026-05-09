export function validatePacket(packet){
  if(!packet.endpoint) return false
  if(!packet.timestamp) return false
  return true
}
