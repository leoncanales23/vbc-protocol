// VBC Lift Validation System

export function validateLift(lift){

  const limits = {
    deadlift:600,
    bench:400,
    squat:500
  }

  if(lift.weight > (limits[lift.type] || 500)){
    return false
  }

  if(lift.weight <= 0) return false

  return true
}
