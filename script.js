// Costume ideas grouped by vibe
const costumes = {
  scary: [
    { name: "Vampire", emoji: "🧛", difficulty: 2, tip: "Fake fangs and a cape do most of the work." },
    { name: "Zombie", emoji: "🧟", difficulty: 2, tip: "Ripped old clothes plus some fake blood." },
    { name: "Haunted Doll", emoji: "🪆", difficulty: 3, tip: "Rosy cheeks, stitched smile, unblinking stare." },
    { name: "Skeleton", emoji: "💀", difficulty: 1, tip: "Black clothes and white face paint bones." },
    { name: "Werewolf", emoji: "🐺", difficulty: 4, tip: "Faux fur gloves and a flannel shirt." },
  ],
  funny: [
    { name: "Avocado Toast", emoji: "🥑", difficulty: 3, tip: "Cardboard toast, green felt avocado." },
    { name: "Ghost with Sunglasses", emoji: "😎", difficulty: 1, tip: "A sheet, two eye holes, and shades." },
    { name: "Inflatable T-Rex", emoji: "🦖", difficulty: 2, tip: "Buy one, then dance badly all night." },
    { name: "Error 404: Costume Not Found", emoji: "🤖", difficulty: 1, tip: "Print it on a shirt. Done." },
    { name: "Taco", emoji: "🌮", difficulty: 3, tip: "Yellow foam shell plus felt toppings." },
  ],
  lastMinute: [
    { name: "Classic Ghost", emoji: "👻", difficulty: 1, tip: "Grab a white sheet. Cut holes. Boo." },
    { name: "Black Cat", emoji: "🐈‍⬛", difficulty: 1, tip: "All black, eyeliner whiskers, paper ears." },
    { name: "Witch", emoji: "🧙", difficulty: 1, tip: "Black outfit and a broom from the closet." },
    { name: "Tourist", emoji: "📸", difficulty: 1, tip: "Hawaiian shirt, camera, map, confusion." },
    { name: "Scarecrow", emoji: "🌾", difficulty: 2, tip: "Flannel, jeans, and a straw hat." },
  ],
};

const vibeSelect = document.getElementById("vibe");
const summonButton = document.getElementById("summon");
const result = document.getElementById("result");
const countEl = document.getElementById("count");
let summonCount = 0;
let lastCostume = null;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function getCostumePool(vibe) {
  if (vibe === "any") {
    return Object.values(costumes).flat();
  }
  return costumes[vibe];
}

function summonCostume() {
  const pool = getCostumePool(vibeSelect.value);

  // Avoid showing the same costume twice in a row
  let costume = pickRandom(pool);
  while (pool.length > 1 && costume === lastCostume) {
    costume = pickRandom(pool);
  }
  lastCostume = costume;

  document.getElementById("costume-emoji").textContent = costume.emoji;
  document.getElementById("costume-name").textContent = costume.name;
  document.getElementById("costume-difficulty").textContent =
    "Difficulty: " + "🎃".repeat(costume.difficulty) + "🖤".repeat(5 - costume.difficulty);
  document.getElementById("costume-tip").textContent = costume.tip;

  // Restart the reveal animation each time
  result.classList.add("hidden");
  void result.offsetWidth;
  result.classList.remove("hidden");

  summonCount += 1;
  countEl.textContent = summonCount;
}

// Countdown to the next Halloween (Oct 31, midnight local time)
function updateCountdown() {
  const label = document.getElementById("countdown-label");
  const display = document.getElementById("countdown");
  const now = new Date();
  const year = now.getFullYear();

  if (now.getMonth() === 9 && now.getDate() === 31) {
    label.textContent = "It's Halloween! Time left tonight";
    const midnight = new Date(year, 10, 1);
    display.textContent = formatDuration(midnight - now);
    return;
  }

  let halloween = new Date(year, 9, 31);
  if (now > halloween) {
    halloween = new Date(year + 1, 9, 31);
  }
  label.textContent = "Time until Halloween";
  display.textContent = formatDuration(halloween - now);
}

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

summonButton.addEventListener("click", summonCostume);
updateCountdown();
setInterval(updateCountdown, 1000);
