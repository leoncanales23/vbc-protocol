// Referral system with points rewards
export async function registerReferral(db, referrerUid, newUserUid){
  const ref=db.collection('vbc_referrals').doc(newUserUid)
  await ref.set({
    referrer: referrerUid,
    createdAt: Date.now()
  })
}

export async function rewardReferral(db, referrerUid, points=50){
  const ref=db.collection('vbc_participants').doc(referrerUid)
  await ref.set({
    referralPts: (points)
  },{merge:true})
}
