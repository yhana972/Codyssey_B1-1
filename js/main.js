// ==============================
// DOM
// ==============================

const themeToggle =
    document.querySelector(".theme-toggle");

const menuToggle =
    document.querySelector(".menu-toggle");

const navList =
    document.querySelector(".nav-list");

const navLinks =
    document.querySelectorAll(".nav-list a");

const scrollTopButton =
    document.querySelector(".scroll-top");

const siteHeader =
    document.querySelector(".site-header");


// ==============================
// Theme
// ==============================

const updateThemeButton = (theme) => {
    if (theme === "dark") {
        themeToggle.textContent = "☀";
        themeToggle.setAttribute(
            "aria-label",
            "라이트 모드로 변경"
        );

        return;
    }

    themeToggle.textContent = "☾";
    themeToggle.setAttribute(
        "aria-label",
        "다크 모드로 변경"
    );
};

const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;

    updateThemeButton(theme);
};

const savedTheme = localStorage.getItem("theme");

let currentTheme = savedTheme || "light";

applyTheme(currentTheme);

themeToggle.addEventListener("click", () => {
    if (currentTheme === "light") {
        currentTheme = "dark";
    } else {
        currentTheme = "light";
    }

    applyTheme(currentTheme);

    localStorage.setItem("theme", currentTheme);
});

// ==============================
// Mobile Navigation
// ==============================

menuToggle.addEventListener("click", () => {
    const isOpen =
        navList.classList.toggle("active");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.textContent =
        isOpen ? "×" : "☰";
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navList.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.textContent = "☰";
    });
});


// ==============================
// Scroll
// ==============================

const updateScrollUI = () => {
    scrollTopButton.classList.toggle(
        "active",
        window.scrollY >= 300
    );

    siteHeader.classList.toggle(
        "scrolled",
        window.scrollY >= 60
    );
};

window.addEventListener(
    "scroll",
    updateScrollUI
);

updateScrollUI();

scrollTopButton.addEventListener(
    "click",
    () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
);
