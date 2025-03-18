document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");

  // Set up heart launcher
  function launchHeart() {
    // Create a heart element
    const heart = document.createElement("div");
    heart.className = "heart";

    // Randomize starting position slightly along the X-axis
    const offsetX = (Math.random() - 0.5) * 30;
    heart.style.left = `calc(50% + ${offsetX}px)`;
    heart.style.bottom = "0";

    // Add glow pulse and rising/exploding animation
    heart.style.animation =
      "riseAndExplode 3s ease-out forwards, glowPulse 1s infinite";

    // Add heart to container
    container.appendChild(heart);

    // Use the container's center (with a slight randomization) as the explosion point
    setTimeout(() => {
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const centerY = containerRect.top + containerRect.height / 2;
      const randomOffsetX = (Math.random() - 0.5) * 20; // small random offset (-10 to 10px)
      const randomOffsetY = (Math.random() - 0.5) * 20; // small random offset (-10 to 10px)
      const explosionX = centerX + randomOffsetX;
      const explosionY = centerY + randomOffsetY;

      createExplosion(explosionX, explosionY);
      heart.remove();
    }, 2200);
  }

  function createExplosion(x, y) {
    // Create multiple heart particles
    const particleCount = 24;
    const colors = [
      "#ff3366",
      "#ff4d79",
      "#ff668c",
      "#ff809f",
      "#ff99b3",
      "#ff0066",
      "#ff1a75",
      "#ff3385",
      "#ff4d94",
      "#ff66a3"
    ];

    // Create circle of particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "heart-particle";

      // Random size with weighted distribution (more small hearts)
      const size = 4 + Math.pow(Math.random(), 2) * 12;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Set position at explosion center
      particle.style.left = `${x - size / 2}px`;
      particle.style.top = `${y - size / 2}px`;

      // Random color from palette
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.background = color;
      particle.style.filter = `drop-shadow(0 0 ${size / 2}px ${color})`;

      // Calculate even distribution in a circle
      const angle = (i / particleCount) * Math.PI * 2;
      const variance = Math.random() * 0.2 + 0.9; // 90-110% variance for natural look
      const distance = 80 + Math.random() * 120;

      particle.style.setProperty(
        "--tx",
        `${Math.cos(angle) * distance * variance}px`
      );
      particle.style.setProperty(
        "--ty",
        `${Math.sin(angle) * distance * variance}px`
      );
      particle.style.setProperty("--r", `${Math.random() * 360}deg`);

      // Add animation with staggered timing
      const delay = Math.random() * 0.1;
      const duration = 0.8 + Math.random() * 0.6;
      particle.style.animation = `particleFly ${duration}s ease-out ${delay}s forwards`;

      // Add to document
      document.body.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        particle.remove();
      }, (duration + delay) * 1000 + 100);
    }

    // Additional particles for a fuller explosion
    for (let i = 0; i < particleCount / 2; i++) {
      const particle = document.createElement("div");
      particle.className = "heart-particle";

      // Smaller size for secondary particles
      const size = 3 + Math.random() * 6;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Set position at explosion center with small offset
      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 20;
      particle.style.left = `${x + offsetX - size / 2}px`;
      particle.style.top = `${y + offsetY - size / 2}px`;

      // Random color
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.background = color;
      particle.style.filter = `drop-shadow(0 0 ${size / 2}px ${color})`;

      // Random direction
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 80;
      particle.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--ty", `${Math.sin(angle) * distance}px`);
      particle.style.setProperty("--r", `${Math.random() * 360}deg`);

      // Add animation
      const delay = Math.random() * 0.2;
      particle.style.animation = `particleFly ${
        0.6 + Math.random() * 0.4
      }s ease-out ${delay}s forwards`;

      // Add to document
      document.body.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        particle.remove();
      }, 1500);
    }
  }

  // Launch hearts repeatedly
  function startHeartFireworks() {
    launchHeart();
    // Random interval for next launch
    const nextLaunch = 1800 + Math.random() * 1200;
    setTimeout(startHeartFireworks, nextLaunch);
  }

  // Start the fireworks show
  startHeartFireworks();
});