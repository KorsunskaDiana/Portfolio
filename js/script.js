console.log("js. is connected");


const today = new Date();

const dateOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
};

document.getElementById("current-date").textContent =
    today.toLocaleDateString("en-GB", dateOptions);



const filterButtons = document.querySelectorAll(".filter-button");
const skillCards = document.querySelectorAll(".skill-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.filter;

        filterButtons.forEach(item => {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        skillCards.forEach(card => {

            const category = card.dataset.category;

            if (selectedCategory === "all" ||
                selectedCategory === category) {

                card.hidden = false;

            } else {

                card.hidden = true;

            }
        });
    });
});



const footerYear = document.getElementById("footer-year");

if (footerYear) {
    footerYear.textContent = today.getFullYear();
}

const backToTop = document.getElementById("back-to-top");

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "instant" : "smooth"
        });

    });
}


const catGallery = document.querySelector(".cat-gallery");

if (catGallery) {

    const catSlides = document.querySelectorAll(".cat-slide");
    const catDots = document.querySelectorAll(".cat-dot");
    const catPrev = document.querySelector(".cat-prev");
    const catNext = document.querySelector(".cat-next");
    const catCounter = document.getElementById("cat-counter");

    let currentCatPhoto = 0;

    function updateCatGallery(index) {

        currentCatPhoto = index;

        catDots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);

            if (i === index) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });

        catCounter.textContent =
            `Photograph ${index + 1} of ${catSlides.length}`;
    }

    function showCatPhoto(index) {

        index = (index + catSlides.length) % catSlides.length;

        updateCatGallery(index);

        catGallery.scrollTo({
            left: index * catGallery.clientWidth,
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "instant" : "smooth"
        });
    }

    catPrev.addEventListener("click", () => {
        showCatPhoto(currentCatPhoto - 1);
    });

    catNext.addEventListener("click", () => {
        showCatPhoto(currentCatPhoto + 1);
    });

    catDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showCatPhoto(index);
        });
    });

    catGallery.addEventListener("scroll", () => {

        const index = Math.round(
            catGallery.scrollLeft / catGallery.clientWidth
        );

        if (index !== currentCatPhoto) {
            updateCatGallery(index);
        }
    });

    catGallery.addEventListener("keydown", event => {

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            showCatPhoto(currentCatPhoto - 1);
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            showCatPhoto(currentCatPhoto + 1);
        }
    });

}

const fishingPond = document.getElementById("fishing-pond");
const fishStart = document.getElementById("fish-start");
const fishMessage = document.getElementById("fish-message");
const fishScore = document.getElementById("fish-score");
const fishTime = document.getElementById("fish-time");
const fishBest = document.getElementById("fish-best");

if (fishingPond && fishStart && fishMessage &&
    fishScore && fishTime && fishBest) {

    let fishList = [];
    let gameRunning = false;

    let score = 0;
    let timeLeft = 30;
    let bestScore = 0;

    let movementInterval;
    let countdownInterval;

    // LOAD PERSONAL BEST

    try {
        bestScore = Number(
            localStorage.getItem("fishingBest")
        ) || 0;
    } catch {
        bestScore = 0;
    }

    fishBest.textContent = bestScore;


    // RANDOM FISH MOVEMENT

    function moveFish(fish) {

        const maxX = Math.max(
            0, fishingPond.clientWidth - fish.offsetWidth
        );

        const maxY = Math.max(
            0, fishingPond.clientHeight - fish.offsetHeight
        );

        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        fish.style.left = x + "px";
        fish.style.top = y + "px";
    }


    // paw

    function fishingPaw(x, y) {

        const paw = document.createElement("img");

        paw.src = "assets/images/paw1.png";
        paw.alt = "";

        paw.classList.add("fishing-paw");

        paw.style.left = x + "px";
        paw.style.top = y + "px";

        fishingPond.appendChild(paw);

        setTimeout(() => {
            paw.remove();
        }, 600);
    }

}
    
