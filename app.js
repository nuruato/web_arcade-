let allGames = [];

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("games.json");
    allGames = await res.json();
    renderGames(allGames);
    setupFilters();
  } catch (err) {
    console.error("Error loading games:", err);
  }
});

function renderGames(games) {
  const grid = document.getElementById("games-grid");
  grid.innerHTML = "";

  games.forEach(game => {
    const isLive = game.status === "playable";
    const card = document.createElement("div");
    card.className = "game-card";

    card.innerHTML = `
      <div class="game-card-thumb">
        <span class="thumb-badge ${isLive ? 'badge-live' : 'badge-soon'}">
          ${isLive ? 'PLAYABLE' : 'COMING SOON'}
        </span>
        <div class="thumb-icon">${game.icon}</div>
      </div>
      <div class="game-card-body">
        <div class="game-card-genre">${game.genre}</div>
        <h3 class="game-card-title">${game.title}</h3>
        <p class="game-card-desc">${game.description}</p>
        <button class="card-btn ${isLive ? 'playable' : 'disabled'}" 
                ${isLive ? `onclick="launchGame('${game.id}')"` : 'disabled'}>
          ${isLive ? '▶ LAUNCH GAME' : 'COMING SOON'}
        </button>
      </div>
    `;

    grid.appendChild(card);
  });
}

function setupFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");
      if (category === "all") {
        renderGames(allGames);
      } else {
        const filtered = allGames.filter(g => g.category === category);
        renderGames(filtered);
      }
    });
  });
}

function launchGame(gameId) {
  const game = allGames.find(g => g.id === gameId);
  if (!game || !game.url) return;

  const modal = document.getElementById("game-modal");
  const title = document.getElementById("modal-game-title");
  const iframe = document.getElementById("game-iframe");
  const placeholder = document.getElementById("game-placeholder");

  title.textContent = game.title;
  modal.classList.remove("hidden");

  // Scroll to player smoothly
  modal.scrollIntoView({ behavior: "smooth", block: "center" });

  // Test if index.html exists
  fetch(game.url, { method: "HEAD" })
    .then(response => {
      if (response.ok) {
        iframe.src = game.url;
        iframe.classList.remove("hidden");
        placeholder.classList.add("hidden");
      } else {
        showBuildPendingNotice();
      }
    })
    .catch(() => {
      showBuildPendingNotice();
    });
}

function showBuildPendingNotice() {
  const iframe = document.getElementById("game-iframe");
  const placeholder = document.getElementById("game-placeholder");
  iframe.classList.add("hidden");
  placeholder.classList.remove("hidden");
  document.getElementById("placeholder-notice").innerHTML = 
    `Game build folder is ready at <code>web_arcade/games/zombie-fps/</code>.<br><br>` +
    `To populate it: In Unity Editor, click <strong>FPS Zombie Game &gt; Build WebGL (For Web and Upload)</strong>.`;
}

function closeGameModal() {
  const modal = document.getElementById("game-modal");
  const iframe = document.getElementById("game-iframe");
  modal.classList.add("hidden");
  iframe.src = "";
}

function toggleFullscreen() {
  const container = document.getElementById("game-frame-container");
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(err => {
      alert(`Error attempting to enable full-screen mode: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}