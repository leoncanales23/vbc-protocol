export function buildAthleteGraph(athletes){
  const graph={}
  for(const a of athletes){
    graph[a.id]={
      gyms:a.gyms||[],
      competitions:a.events||[]
    }
  }
  return graph
}
