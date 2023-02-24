
const jokeText = document.querySelector("#joke-text");
const newJokeBtn = document.querySelector("#new-joke-button");
const categoryForm= document.querySelector("#category-form");
const categorySelect = document.querySelector("#category-select");

document.addEventListener('DOMContentLoaded' , fetchJoke);
// newJokeBtn.addEventListener('click', getJoke);

// function getJoke(){
//     fetch('https://icanhazdadjoke.com/' ,{
//         headers:{
//             'Accept': 'application/json',
//         }
//     }).then(data => data.json())
//     .then(obj => jokeText.innerHTML = obj.joke)
// }

function fetchJoke(category = "") {
    let url = "https://api.chucknorris.io/jokes/random";

    if(category) {
        url = `https://api.chucknorris.io/jokes/random?category=${category}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            jokeText.innerText = data.value;
        })
        .catch(error => console.log(error));
}


function fetchCategories() {
    fetch("https://api.chucknorris.io/jokes/categories")
        .then(response => response.json())
        .then(data => {
            data.forEach(category => {
                const option = document.createElement("option");
                option.value = category;
                option.text = category;
                categorySelect.add(option);
            });
        })
        .catch(error => console.log(error));
}

newJokeBtn.addEventListener("click", () => {
    const category = categorySelect.value;
    fetchJoke(category);
});

categoryForm.addEventListener("submit", event => {
    event.preventDefault();
    const category = categorySelect.value;
    fetchJoke(category);
});

fetchCategories();
fetchJoke();