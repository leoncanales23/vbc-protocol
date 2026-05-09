import { calculateStrengthScore } from "./vbc-core-ranking-engine.js"

export function processWorkout(workout){

  const lifts = workout.lifts || []

  const score = calculateStrengthScore(lifts)

  return {
    uid: workout.uid,
    score,
    createdAt: Date.now()
  }

}
