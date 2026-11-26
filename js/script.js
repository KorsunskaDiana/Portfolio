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


    // paw

const pawToggle = document.getElementById("paw-toggle");
const pawClear = document.getElementById("paw-clear");
const pawLabel = document.getElementById("paw-label");
const pawCounter = document.getElementById("paw-counter");

if (pawToggle && pawClear && pawLabel && pawCounter) {

    let pawActive = false;
    let pawCount = 0;

    function setPawMode(active) {

        pawActive = active;

        document.body.classList.toggle("paw-active", pawActive);

        pawToggle.setAttribute("aria-pressed", String(pawActive));

        pawLabel.textContent = pawActive
            ? "Deactivate paw"
            : "Activate paw";
    }

    pawToggle.addEventListener("click", () => {
        setPawMode(!pawActive);
    });

    document.addEventListener("click", event => {

        if (!pawActive) return;

        if (event.target.closest(
            "button, a, input, textarea, select, summary, label"
        )) return;

        const paw = document.createElement("img");

        paw.src = "assets/images/paw1.png";
        paw.alt = "";

        paw.classList.add("paw-print");

        const size = 35 + Math.random() * 20;
        const rotation = Math.random() * 80 - 40;

        paw.style.width = size + "px";
        paw.style.left = event.pageX + "px";
        paw.style.top = event.pageY + "px";

        paw.style.transform =
            `translate(-50%, -50%) rotate(${rotation}deg)`;

        document.body.appendChild(paw);

        pawCount++;

        pawCounter.textContent = `Paw prints: ${pawCount}`;
    });

    pawClear.addEventListener("click", () => {

        document.querySelectorAll(".paw-print").forEach(paw => {
            paw.remove();
        });

        pawCount = 0;

        pawCounter.textContent = "Paw prints: 0";
    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            setPawMode(false);
        }
    });
}