// Efek ketikan pada tagline
const tagline = document.querySelector(".tagline");
const texts = ["Tempat semua link pentingku!", "Jangan lupa follow ya!", "Ayo cek semua link di bawah! 🚀"];
let index = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    let currentText = texts[index];
    if (isDeleting) {
        tagline.textContent = currentText.substring(0, charIndex--);
    } else {
        tagline.textContent = currentText.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Tunggu sebelum hapus
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % texts.length;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

// Mulai efek mengetik
typeEffect();
