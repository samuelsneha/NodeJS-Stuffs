console.log('before');
getUser(1, (user) =>{
    getRepositories(user.gitHubUsername, (repos)=>{
        console.log('repos',repos)
    });
});
console.log('after');

function getUser( id,callback){
    setTimeout(() =>{
        console.log('reading from db 1');
        callback({id:id, gitHubUsername:'mosh'});
    }, 2000);
}

function getRepositories( username,callback){
    setTimeout(() =>{ //setTimeout is used to mimic db. in real scenario db would take time to fetch the result
        console.log('reading from db 2');
        callback([ 'repo1', 'repo2','repo3']);
    }, 2000);
}

