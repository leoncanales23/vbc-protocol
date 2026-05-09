// Simple public API layer for VBC protocol
export async function getProtocolStatus(){
  return {
    name:'VBC Protocol',
    version:'1.0',
    status:'active',
    endpoints:[
      '/api/leaderboard/global',
      '/api/leaderboard/country',
      '/api/athlete/:uid'
    ]
  }
}
