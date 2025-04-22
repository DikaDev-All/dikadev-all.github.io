
function selectGame(name) {
  document.getElementById('game').value = name;
}

document.getElementById('topupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const game = document.getElementById('game').value;
  const id = document.getElementById('id').value;
  const nick = document.getElementById('nickname').value;
  const nominal = document.getElementById('nominal').value;
  const msg = `Halo, saya ingin top-up ${game}%0AID: ${id}%0ANama: ${nick}%0ANominal: ${nominal} Diamonds`;
  window.open(`https://wa.me/6285189450177?text=${msg}`, '_blank');
});
