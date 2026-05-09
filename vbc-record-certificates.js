// Record certificate generator
export function generateRecordCertificate(record){
  return {
    athlete:record.uid,
    lift:record.lift,
    weight:record.weight,
    date:record.date,
    certificateId:`VBC-${record.uid}-${Date.now()}`
  }
}
