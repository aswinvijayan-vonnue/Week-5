export function debounce < T extends unknown[], R >(this:unknown,fn:(...args:T)=>R, delay:number = 300):(...args:T)=>void {
  let timer:number;
  
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this,args);
    }, delay);
  };
}

