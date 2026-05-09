export function addMedal(athlete,medal){

  if(!athlete.medals) athlete.medals=[]

  athlete.medals.push(medal)

  return athlete
}
