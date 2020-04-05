const input = document.querySelector('#name')
const form = document.querySelector('.new-form')
const loading = document.querySelector('.loading')
loading.style.display = 'none'
form.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(form)
    const name = formData.get('name')
    const content = formData.get('content')

    const tweet = {
        name,
        content
    }
    loading.style.display = 'block'
    form.style.display = 'none'
})