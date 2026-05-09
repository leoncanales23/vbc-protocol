export function createNotification(user,msg){
  return {
    user:user,
    message:msg,
    time:Date.now()
  }
}
