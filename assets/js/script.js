const featuredRepos = ['the-spell-book', 'wizards-code'];

// use github api to grab my repos
const getRepos = () => {
    const apiUrl = "https://api.github.com/users/erockenmeyer/repos";

    // api request
    fetch(apiUrl).then(response => {
        if (response.ok) {
            response.json().then(data => checkRepos(data));
        } else {
            alert("Sorry, something went wrong!");
        }
    })
        .catch(err => {
            console.log(err);
            alert("Unable to connect.");
        })
}

// using returned json, iterate through and display repos
const checkRepos = (repos) => {
    console.log(repos);

    // loop through repos
    for (let i = 0; i < repos.length; i++) {
        // check whether repo is a featured repo
        let check = featureCheck(repos[i].name);

        if (check) {
            displayFeaturedRepo(repos[i]);
        } else {
            displayRepo(repos[i]);
        }
    }
}

const featureCheck = (name) => {
    // check against repos in featuredRepos array
    for (let i = 0; i < featuredRepos.length; i++) {
        if (name == featuredRepos[i]) {
            return true;
        }
    }
    return false;
}

const displayFeaturedRepo = repo => {
    console.log(repo);
}

const displayRepo = repo => {
    console.log(repo.url);
}