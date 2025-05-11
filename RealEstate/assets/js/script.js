const navbar = document.querySelector('[data-navbar]')
const navToggler = document.querySelector('[data-nav-toggler]')
navToggler.addEventListener('click', ()=>{
  navbar.classList.toggle('active')
})

// Header scroll state  . 

const header = document.querySelector('[data-header]')

window.addEventListener('scroll' ,(e)=>{
  header.classList[window.scrollY > 50 ? 'add' : 'remove'] ('active')
})

// add to favorites button toggle . 

const toggleBtns = document.querySelectorAll('[data-toggle-btn]')
toggleBtns.forEach(toggleBtn => {
  toggleBtn.addEventListener('click', ()=>{
    toggleBtn.classList.toggle('active')
  })
})