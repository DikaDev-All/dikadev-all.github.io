// script.js

function goToWhatsApp() {
  // Ambil data input
  const username = document.getElementById("username") ? document.getElementById("username").value : '';
  const gameAndroid = document.getElementById("game-android") ? document.getElementById("game-android").value : '';
  const gamePC = document.getElementById("game-pc") ? document.getElementById("game-pc").value : '';
  const aplikasiPremium = document.getElementById("aplikasi-premium") ? document.getElementById("aplikasi-premium").value : '';
  const pulsaPaket = document.getElementById("pulsa-paket") ? document.getElementById("pulsa-paket").value : '';
  const hostingPanel = document.getElementById("hosting-panel") ? document.getElementById("hosting-panel").value : '';
  const nomorHP = document.getElementById("nomor-hp") ? document.getElementById("nomor-hp").value : '';
  const jumlah = document.getElementById("jumlah") ? document.getElementById("jumlah").value : '';

  // Pilih produk mana yang diisi
  let produk = gameAndroid || gamePC || aplikasiPremium || pulsaPaket || hostingPanel || 'Lainnya';

  // Buat isi pesan
  let pesan = `Halo Admin DikaTopUp,%0ASaya ingin top-up:%0AProduk: ${produk}%0AUsername/Nomor: ${username || nomorHP}%0AJumlah: ${jumlah}`;

  // Link ke Grup WhatsApp
  let link = `https://chat.whatsapp.com/FHqDeHKpuhGH91IbLcFbR4`;

  // Redirect ke Grup
  window.open(link, "_blank");

  // (Optional) kalau mau langsung kirim chat ke admin personal, bukan grup:
  // window.open(`https://wa.me/6285189450177?text=${pesan}`, "_blank");

  return false; // Biar form tidak reload halaman
}

function toggleMode() {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
}
