// Deferred loader to reduce initial JS blocking
export function deferLoad(fn){
  if('requestIdleCallback' in window){
    requestIdleCallback(fn)
  }else{
    setTimeout(fn,200)
  }
}

export function lazyInit(initFunctions=[]){
  deferLoad(()=>{
    initFunctions.forEach(f=>{
      try{ if(typeof f==='function') f() }catch(e){}
    })
  })
}
