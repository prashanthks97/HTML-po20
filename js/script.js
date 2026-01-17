const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("open");
    document.body.style.overflow = mobileMenu.classList.contains("open")
      ? "hidden"
      : "";
  });
  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}
const images = ["assets/data-1.png", "assets/data-2.png", "assets/data-3.png"];

let currentIndex = 0;
const mainImage = document.getElementById("mainImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
function updateGallery(index) {
  if (!mainImage || index < 0 || index >= images.length) return;
  mainImage.style.opacity = "0";

  setTimeout(() => {
    currentIndex = index;
    mainImage.src = images[index];
    mainImage.style.opacity = "1";
    syncGalleryUI(index);
  }, 150);
}
function syncGalleryUI(index) {
  document.querySelectorAll(".dots span").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
  document.querySelectorAll(".thumbnails img").forEach((thumb) => {
    const thumbIndex = Number(thumb.dataset.index);
    thumb.classList.toggle("active", thumbIndex === index);
  });
  document.querySelectorAll(".fragrance-option").forEach((option) => {
    const optionIndex = Number(option.dataset.index);
    option.classList.toggle("active", optionIndex === index);

    if (optionIndex === index) {
      const radio = option.querySelector("input[type='radio']");
      if (radio) radio.checked = true;
    }
  });
}
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery(newIndex);
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % images.length;
    updateGallery(newIndex);
  });
}

document.querySelectorAll(".dots span").forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.index);
    updateGallery(index);
  });
});

document.querySelectorAll(".thumbnails img").forEach((img) => {
  img.addEventListener("click", () => {
    const index = Number(img.dataset.index);
    updateGallery(index);
  });
});

document.querySelectorAll(".fragrance-option").forEach((option) => {
  option.addEventListener("click", () => {
    const index = Number(option.dataset.index);
    updateGallery(index);
    const radio = option.querySelector("input[type='radio']");
    if (radio) radio.checked = true;
    updateCart();
  });
});

const addToCart = document.getElementById("addToCart");
const subscriptionDetails = document.getElementById("subscriptionDetails");
function updateCart() {
  const fragrance =
    document.querySelector("input[name='fragrance']:checked")?.value ||
    "original";
  const purchase =
    document.querySelector("input[name='purchase']:checked")?.value || "single";
  const singleExtras = document.getElementById("singleSubscriptionExtras");

  if (addToCart) {
    addToCart.href = `https://shop.gtgperfumes.com/checkout?product=${fragrance}&type=${purchase}`;
  }
  if (!subscriptionDetails) return;

  if (purchase === "single") {
    if (singleExtras) singleExtras.style.display = "block";
    subscriptionDetails.innerHTML = "";
  } else if (purchase === "double") {
    if (singleExtras) singleExtras.style.display = "none";
    subscriptionDetails.innerHTML = `
      <div class="fragrances">
        <h4>Choose Fragrance 1</h4>
        <label class="fragrance-option active" data-fragrance="1" data-index="0">
          <input type="radio" name="fragrance1" value="original" checked />
          <img src="assets/data-1.png" alt="Original" />
          <span>Original</span>
        </label>
        <label class="fragrance-option" data-fragrance="1" data-index="1">
          <input type="radio" name="fragrance1" value="lily" />
          <img src="assets/data-2.png" alt="Lily" />
          <span>Lily</span>
        </label>
        <label class="fragrance-option" data-fragrance="1" data-index="2">
          <input type="radio" name="fragrance1" value="rose" />
          <img src="assets/data-3.png" alt="Rose" />
          <span>Rose</span>
        </label>
      </div>

      <div class="fragrances">
        <h4>Choose Fragrance 2</h4>
        <label class="fragrance-option active" data-fragrance="2" data-index="0">
          <input type="radio" name="fragrance2" value="original" checked />
          <img src="assets/data-1.png" alt="Original" />
          <span>Original</span>
        </label>
        <label class="fragrance-option" data-fragrance="2" data-index="1">
          <input type="radio" name="fragrance2" value="lily" />
          <img src="assets/data-2.png" alt="Lily" />
          <span>Lily</span>
        </label>
        <label class="fragrance-option" data-fragrance="2" data-index="2">
          <input type="radio" name="fragrance2" value="rose" />
          <img src="assets/data-3.png" alt="Rose" />
          <span>Rose</span>
        </label>
      </div>

      <div class="included-box">
        <h4>What's Included:</h4>
        <p>✔ 2 Bottles Shipped Monthly</p>
        <p>✔ Free Sampler for Original, Lily & Rose</p>
        <p>✔ 50% OFF Shipping</p>
        <p>✔ Pause or Cancel Anytime</p>
        <p>✔ 28 Day Money Back Guarantee</p>
      </div>
    `;

    attachFragranceListeners();
    updateDoubleSubscriptionCart();
  }
}

function attachFragranceListeners() {
  document
    .querySelectorAll("#subscriptionDetails .fragrance-option")
    .forEach((option) => {
      option.addEventListener("click", function () {
        const fragranceGroup = this.dataset.fragrance;
        const radio = this.querySelector("input[type='radio']");
        if (radio) radio.checked = true;
        const selector = `#subscriptionDetails .fragrance-option[data-fragrance="${fragranceGroup}"]`;
        document.querySelectorAll(selector).forEach((opt) => {
          opt.classList.remove("active");
        });
        this.classList.add("active");
        updateDoubleSubscriptionCart();
      });
    });
  document
    .querySelectorAll("#subscriptionDetails input[type='radio']")
    .forEach((radio) => {
      radio.addEventListener("change", updateDoubleSubscriptionCart);
    });
}
function updateDoubleSubscriptionCart() {
  const fragrance1 =
    document.querySelector("input[name='fragrance1']:checked")?.value ||
    "original";
  const fragrance2 =
    document.querySelector("input[name='fragrance2']:checked")?.value ||
    "original";
  if (addToCart) {
    addToCart.href = `https://shop.gtgperfumes.com/checkout?product=${fragrance1}_${fragrance2}&type=double`;
  }
}
document
  .querySelectorAll(
    "input[type='radio'][name='purchase'], input[type='radio'][name='fragrance']",
  )
  .forEach((radio) => {
    radio.addEventListener("change", updateCart);
  });

document.querySelectorAll(".accordion-header").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".accordion-item");
    const icon = button.querySelector(".icon");
    const isActive = item.classList.contains("active");
    document.querySelectorAll(".accordion-item").forEach((i) => {
      if (i !== item) {
        i.classList.remove("active");
        i.querySelector(".icon").textContent = "+";
      }
    });
    if (isActive) {
      item.classList.remove("active");
      icon.textContent = "+";
    } else {
      item.classList.add("active");
      icon.textContent = "−";
    }
  });
});
const statsSection = document.getElementById("stats-strip");
const statNumbers = document.querySelectorAll(".stat-number");
let statsAnimated = false;
const statsObserver = new IntersectionObserver(
  (entries) => {
    if (!entries[0].isIntersecting || statsAnimated) return;
    statsAnimated = true;
    statNumbers.forEach((stat) => {
      const target = Number(stat.dataset.target);
      let count = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      const counter = setInterval(() => {
        count += increment;
        if (count >= target) {
          stat.textContent = target;
          clearInterval(counter);
        } else {
          stat.textContent = Math.floor(count);
        }
      }, 16);
    });
  },
  { threshold: 0.5 },
);

if (statsSection) {
  statsObserver.observe(statsSection);
}

const newsletterForm = document.querySelector(".newsletter-form");
const newsletterButton = newsletterForm?.querySelector("button");
const newsletterInput = newsletterForm?.querySelector("input");
if (newsletterButton) {
  newsletterButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = newsletterInput?.value.trim();
    if (!email) {
      alert("Please enter your email address");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }
    alert(`Thank you for subscribing with ${email}!`);
    if (newsletterInput) newsletterInput.value = "";
  });
}
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href !== "") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && mobileMenu) {
    hamburger?.classList.remove("active");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  updateGallery(0);
  syncGalleryUI(0);
  updateCart();

  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});
