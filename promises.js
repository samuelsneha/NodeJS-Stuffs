
console.log('before');

// //METHOD 1 - RESOLVING ASYNCHRONOUS CODE WITH CALLBACKS
// getUser(1, (user) =>{
//     getRepositories(user.gitHubUsername, (repos)=>{
//         console.log('repos',repos)
//     });
// });
// //METHOD 2 - RESOLVING ASYNCHRONOUS CODE WITH PROMISES
// const p = getUser(1);
// p.then(user => {
//     console.log('the user is ...'+user)
//     const p1 = getRepositories(user.gitHubUsername);
//     p1.then(repos => {
//         console.log('repositories are ..'+repos)
//     })
//     p1.catch(error => console.log(err.message))
// });
// p.catch(error => console.log(err.message));

//METHOD 3 - RESOLVING ASYNCHRONOUS CODE WITH PROMISES (SLIGHTLY MINIMIZED VERSION)
// getUser(1)
//   .then(user => {
//     console.log('the user is ...'+user)
//     return getRepositories(user.gitHubUsername);
// })
//   .then(repos => {
//         console.log('repositories are ..'+repos)
// })
//   .catch( err => { //handling errors thta come from any of the above then()
//         console.log(err.message);
//   })

//METHOD 4 - RESOLVING ASYNCHRONOUS CODE WITH PROMISES (FULLY MINIMIZED VERSION)
getUser(1)
    .then( user => getRepositories(user.gitHubUsername))
    .then( repos =>  console.log('repos are ...'+repos)) //don use curly brackets here for console.log
    .catch( err => console.log('error', err.message));

console.log('after');

function getUser(id){
    return new Promise( (resolve, reject) => {
        setTimeout(() =>{
        console.log('reading from db 1');
        resolve({id:id, gitHubUsername:'mosh'});
    }, 2000);
    });

}

function getRepositories(username){
    return new Promise( (resolve, reject) => {
        setTimeout(() =>{ //setTimeout is used to mimic db. in real scenario db would take time to fetch the result
        console.log('reading from db 2');
        resolve([ 'repo1', 'repo2','repo3']);
    }, 2000);
    });
}

