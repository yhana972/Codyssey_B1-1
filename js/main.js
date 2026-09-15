const themeToggle = document.querySelector(".theme-toggle");

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