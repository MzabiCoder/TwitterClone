const input = document.querySelector("#name");
const form = document.querySelector(".new-form");
const loading = document.querySelector(".loading");
const section = document.querySelector('.tweets')
loading.style.display = "none";
const link = "http://localhost:5000/tweets";

loading.style.display = 'block'
setTimeout(() => {
    tweets()
    loading.style.display = 'none'

}, 1000)

function tweets() {
    //section.innerHTML = ''
    fetch('http://localhost:5000/tweets')
        .then(res => res.json())
        .then(created => {
            created.reverse()
            created.forEach(tweet => {
                let div = document.createElement('div')

                let header = document.createElement('h3')
                header.textContent = tweet.name

                let title = document.createElement('p')
                title.textContent = tweet.content

                let date = document.createElement('small')
                date.textContent = new Date(tweet.date)
                div.appendChild(header)
                div.appendChild(title)
                div.appendChild(date)
                section.appendChild(div)
            })
        })

}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const content = formData.get("content");


    const tweet = {
        name,
        content,
    };


    fetch(link, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tweet)
    }).then(res => res.json()).then(created => {
        form.reset()
        console.log(created)
    })



    tweets()
});