export function scheduleEvent(event){
  return {
    id:event.id,
    name:event.name,
    country:event.country,
    date:event.date,
    createdAt:Date.now()
  }
}
