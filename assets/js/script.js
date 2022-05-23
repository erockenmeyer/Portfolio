// html ids
const featuredEl = document.getElementById('featured');
const notFeaturedEl = document.getElementById('not-featured');
// choose which repos to feature, update as desired
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
    // create the elements
    const linkEl = document.createElement("a");
    const imgEl = document.createElement("img");
    const nameEl = document.createElement("div");

    // assign classes
    linkEl.classList = "position-relative col-auto";
    imgEl.classList = "mw-100";
    nameEl.classList = "featured-site-name pl-5 pr-1 py-1"

    // assign link to github repo
    linkEl.setAttribute("href", repo.html_url);

    // check which repo it is to add name, image, and alt
    if (repo.name === "the-spell-book") {
        // set img and alt
        imgEl.setAttribute("src", "./assets/images/the-spell-book.png");
        imgEl.setAttribute("alt", "a screenshot of the Spell Book website");

        // add name
        nameEl.textContent = "The Spell Book";
    } else if (repo.name === "wizards-code") {
        // same as above, basically
        // set img and alt
        imgEl.setAttribute("src", "./assets/images/dnd-char-roll.png");
        imgEl.setAttribute("alt", "a screenshot of the D&D Character Roller website");

        // add name
        nameEl.textContent = "D&D Character Generator";
    } else {
        // something has gone wrong!
        nameEl.textContent = "Oh no! If you're seeing this, something went wrong. Please let me know!"
    }

    // attach image and name to link
    linkEl.appendChild(imgEl);
    linkEl.appendChild(nameEl);

    // attach link to featured section
    featuredEl.appendChild(linkEl);
}

const displayRepo = repo => {
    // very similar to featured repos, but a few changes (no images!)
    // create containers
    const listEl = document.createElement("li");
    const linkEl = document.createElement("a");

    // assign their classes
    listEl.classList = "sites col-12 col-md-3 row justify-content-center mt-1";
    linkEl.classList = "site-name w-75";

    // assign link to repo
    linkEl.setAttribute("href", repo.html_url);

    // assign name of repo
    linkEl.textContent = repo.name;

    // append append append!
    listEl.appendChild(linkEl);
    notFeaturedEl.appendChild(listEl);
}

// on page load, initiate the script
getRepos();