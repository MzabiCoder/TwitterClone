const input = document.querySelector("#name");
const form = document.querySelector(".new-form");
const loading = document.querySelector(".loading");
const loading2 = document.querySelector("#loading2");
const section = document.querySelector('.tweets')
loading.style.display = "none";
const link = "http://localhost:5000/tweets";

loading.style.display = 'block'
setTimeout(() => {
    tweets()
    loading.style.display = 'none'

}, 1000)

let skip = 0
let limit = 5
let load = false

function tweets() {
    load = true
    fetch(`http://localhost:5000/v2/tweets?limit=${limit}&skip=${skip}`)
        .then(res => res.json())
        .then(result => {
            result.tweets.forEach(tweet => {
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


            result.meta.has_available ? document.querySelector('#loading2').style.opacity = 1 : document.querySelector('#loading2').style.opacity = 0
            load = false
        })


}
document.addEventListener('scroll', moreLoad)

function moreLoad() {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement
    if (scrollTop + scrollHeight >= clientHeight - 3) {
        console.log('hellow')
        skip += limit
        console.log(limit)
        tweets()
    }

    // const rect = loading2.getBoundingClientRect()
    // if (rect.top < window.innerHeight) {
    //     tweets()
    // }

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