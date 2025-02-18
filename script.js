// Efek Scroll
window.addEventListener('scroll', function() {
    let navbar = document.querySelector('header');
    navbar.style.background = window.scrollY > 50 ? '#000' : '#222';
});
