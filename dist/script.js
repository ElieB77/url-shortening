alert ('hello');
// Nav
const hamburger = document.querySelector('.hamburger-btn');
const navMenu = document.querySelector('.navbar-mobile');
const navMenuModal = document.querySelector('.navbar-mobile__modal');

hamburger.addEventListener('click', toggleHamburger);

function toggleHamburger(){
    if(navMenu.style.transform === 'translateY(0) translateX(0)' || navMenu.style.opacity === '1' || navMenuModal.style.visibility === 'visible'){
        navMenu.style.transform = 'translateY(-100vh) translateX(100vh)';
        navMenu.style.opacity = '0';
        navMenuModal.style.visibility = 'hidden';
    }else{
        navMenu.style.transform = 'translateY(0) translateX(0)';
        navMenu.style.opacity = '1';
        navMenuModal.style.visibility = 'visible';
    }
};

navMenuModal.addEventListener('click', (e) => {
    if(e.target.classList.contains('navbar-mobile__modal') || e.target.classList.contains('header')){
        navMenu.style.transform = 'translateY(-100vh) translateX(100vw)';
        navMenu.style.opacity = '0';
        navMenuModal.style.visibility = 'hidden';
    }
})

// Form
const linkInput = document.getElementById('link-input');
const submitBtn = document.getElementById('submit-btn');
const form = document.getElementById('link-form');
const errorMessage = document.querySelector('.error-message');
const cardLinkBg = document.querySelector('.shorten-link');
const cardLink = document.querySelector('.shorten-link-overlap');
const loading = document.querySelector('.loading-modal');
const resultContainer = document.querySelector('.link-result-container');

resultContainer.addEventListener('click', copyOnClick);

let linksArray = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInput();
});

function checkInput() {
    inputValue = linkInput.value;

    if (inputValue === "") {
        errorMessage.style.display = 'block';
        linkInput.style.border = 'solid 3px rgb(244, 99, 99)';
        linkInput.classList.add('error');
    }else{
        loading.style.display ='flex';
        fetch(`https://api.shrtco.de/v2/shorten?url=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            let linkObject = {
                originalLink: data.result.original_link,
                shortenedLink: data.result.full_short_link2
            }
            linksArray.unshift(linkObject);
            resultContainer.innerHTML = '';
            errorMessage.style.display = 'none';
            linkInput.style.border = 'none';
            linkInput.classList.remove('error');
            loading.style.display = 'none';
            resultContainer.style.display = 'flex';

            linksArray.forEach(link => {
                let letResultContainer = `
                <div class="link-result">
                    <p class="link-result__original">${link.originalLink}</p>
                    <hr class="link-result__hr">
                    <input class="link-result__new" type="text" value="${link.shortenedLink}">
                    <button class="link-result__copy">Copy</button>
                </div>
                `

                resultContainer.innerHTML += letResultContainer;
            })
        })
    }
    linkInput.value = '';
}

// Copy btn
function copyOnClick(e) {

    if(e.target.classList.contains('link-result__copy')) {

        e.target.parentElement.children[2].select();
        e.target.parentElement.children[2].setSelectionRange(0, 99999); 
        document.execCommand("copy");
        e.target.innerHTML = 'Copied!';
        e.target.style.backgroundColor = 'rgb(58, 48, 84)';
    }
}

