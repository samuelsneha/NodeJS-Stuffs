const p1 = Promise.resolve({id:1}); //this is promise class i js which has a static emthod of resolve and reject
p1.then( result => console.log('result is ...'+result));//returns  a promise that is already resolved
const p2 = Promise.reject(new Error('reason for rejection'));//returns  a promise that is already rejected
p2.catch( error => console.log('error is ...'+error));
