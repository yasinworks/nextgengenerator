const length = document.getElementById('n-length')
const genButton = document.getElementById('n-generate')
const removeBtn = document.getElementById('n-remove')
const resultSpan = document.getElementById('n-result')
const copy = document.getElementById('copy')
const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const vowels = 'aeiou'
const consonants = 'bcdfghjklmnpqrstvwxz'
let result = ''
let consCount = 0

window.onload = () => {
    showFromLocal()
}

genButton.addEventListener('click', () => {
    generate()
})

removeBtn.addEventListener('click', () => {
    removeFromLocal()
    showFromLocal()
})

copy.addEventListener('click', () => {
    copyToClipboard()
})

const generateLetter = (string) => {
    const letter = string.charAt(Math.floor(Math.random() * string.length))
    return checkLetter(letter)
}

const generate = () => {
    result = ''
    for (let i = 0; i < length.value; i++) {
        result += generateLetter(alphabet)
    }
    resultSpan.textContent = result
    copy.style.display = 'inherit'
    addToLocalStorage(result)
    showFromLocal()
}

const checkLetter = (letter) => {
    let resultLetter = letter
    if (consonants.indexOf(letter) >= 0) {
        consCount++
        if (consCount >= 2) {
            consCount = 0
            resultLetter = generateLetter(vowels)
        }
    }
    return resultLetter
}

const addToLocalStorage = (element) => {
    let previous = null
    if (localStorage.getItem('generated')) {
        previous = localStorage.getItem('generated')
        localStorage.setItem('generated', `${previous},${element}`)
    } else {
        localStorage.setItem('generated', element)
    }
}

const removeFromLocal = () => {
    const allList = document.querySelector('.list')
    allList.innerHTML = ''
    localStorage.removeItem('generated')
}

const showFromLocal = () => {
    const allList = document.querySelector('.list')
    const data = localStorage.getItem('generated')

    if (data) {
        allList.innerHTML = ''
        const elements = data.split(',')
        elements.forEach(el => {
            const listItem = document.createElement('li')
            listItem.className = 'list-item'
            listItem.textContent = el
            allList.prepend(listItem)
        })
    }
}

const copyToClipboard = () => {
    let copyText = document.getElementById("n-result");
    let textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    alert('Copied!')
}