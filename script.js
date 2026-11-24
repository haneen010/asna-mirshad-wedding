// Wedding date: 26 December 2026, 12:00 noon (India Standard Time)
const weddingDate = new Date("2026-12-26T12:00:00+05:30").getTime();
const fields = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};
function updateCountdown() {
  const distance = weddingDate - Date.now();
  if (distance <= 0) {
    Object.values(fields).forEach(el => el.textContent = "00");
    document.querySelector(".countdown-wrap .eyebrow").textContent = "TODAY IS THE DAY";
    return;
  }
  fields.days.textContent = String(Math.floor(distance / 86400000)).padStart(2, "0");
  fields.hours.textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, "0");
  fields.minutes.textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, "0");
  fields.seconds.textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Envelope opening interaction
document.body.classList.add("locked");
const envelopeScreen = document.getElementById("envelopeScreen");
document.getElementById("openInvite").addEventListener("click", () => {
  envelopeScreen.classList.add("opening");
  window.setTimeout(() => {
    envelopeScreen.classList.add("dismissed");
    document.body.classList.remove("locked");
  }, 1150);
});

// Reveal sections gently as they enter the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// A few subtle drifting petals; disabled for reduced-motion preferences.
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  for (let i = 0; i < 9; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = i % 2 ? "✦" : "❀";
    petal.style.setProperty("--x", `${Math.random() * 100}%`);
    petal.style.setProperty("--duration", `${18 + Math.random() * 16}s`);
    petal.style.setProperty("--delay", `${-Math.random() * 25}s`);
    document.body.appendChild(petal);
  }
}


