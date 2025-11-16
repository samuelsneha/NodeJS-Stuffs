async function displayRepositories(){
    try{
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        console.log(repos);
    }catch(error){
        console.log('error', +error.message);
    }
}

displayRepositories();

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
