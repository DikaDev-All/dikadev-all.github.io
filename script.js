function toggleMode() {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
}
function goToWhatsApp() {
    const user = document.getElementById("username").value;
    const game = document.getElementById("game").value;
    const jumlah = document.getElementById("jumlah").value;
    const msg = `Halo, saya ingin top-up ${game}\nID: ${user}\nJumlah: ${jumlah}`;
    const url = "https://wa.me/6285189450177?text=" + encodeURIComponent(msg);
    window.open(url, '_blank');
    return false;
}
