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

const pointerEffect =
    document.querySelector(".pointer-effect");

const hasFinePointer =
    window.matchMedia("(pointer: fine)").matches;

const revealElements =
    document.querySelectorAll("[data-reveal]");

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

const contactForm = 
    document.querySelector(".contact-form");

const nameInput = 
    document.querySelector("#name");

const emailInput =
    document.querySelector("#email");

const messageInput =
    document.querySelector("#message");

const formStatus = 
    document.querySelector(".form-status")

const GITHUB_USERNAME = "yhana972";

const projectsList =
    document.querySelector("#projects-list")

const GITHUB_API_URL =
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;

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

// ==============================
// Pointer Effect
// ==============================
const updatePointerEffect = (event) => {
    const x = `${event.clientX}px`;
    const y = `${event.clientY}px`;

    document.documentElement.style.setProperty(
        "--pointer-x",
        x
    );

    document.documentElement.style.setProperty(
        "--pointer-y",
        y
    );

    pointerEffect.classList.add("active");
};

if (hasFinePointer) {
    window.addEventListener(
        "pointermove",
        updatePointerEffect
    );

    document.documentElement.addEventListener(
        "mouseleave",
        () => {
            pointerEffect.classList.remove("active");
        }
    );
}

// ==============================
// Scroll Reveal
// ==============================
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);
        });
    },
    {
        threshold: 0.2,
    }
);

if (prefersReducedMotion) {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
} else {
    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}

// ==============================
// Contact Form
// ==============================

const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const showError = (input, message) => {
    input.classList.add("error");

    const formField =
        input.closest(".form-field");

    const errorMessage =
        formField.querySelector(
            ".error-message"
        );

    errorMessage.textContent = message;
};

const clearError = (input) => {
    input.classList.remove("error");

    const formField =
        input.closest(".form-field");

    const errorMessage =
        formField.querySelector(
            ".error-message"
        );

    errorMessage.textContent = "";
};

const validateName = () => {
    const value =
        nameInput.value.trim();

    if (!value) {
        showError(
            nameInput,
            "이름을 입력해주세요."
        );

        return false;
    }

    clearError(nameInput);

    return true;
};

const validateEmail = () => {
    const value =
        emailInput.value.trim();

    if (!value) {
        showError(
            emailInput,
            "이메일을 입력해주세요."
        );

        return false;
    }

    if (!emailPattern.test(value)) {
        showError(
            emailInput,
            "올바른 이메일 형식을 입력해주세요."
        );

        return false;
    }

    clearError(emailInput);

    return true;
};

const validateMessage = () => {
    const value =
        messageInput.value.trim();

    if (!value) {
        showError(
            messageInput,
            "메시지를 입력해주세요."
        );

        return false;
    }

    clearError(messageInput);

    return true;
};

const validateForm = () => {
    const isNameValid =
        validateName();

    const isEmailValid =
        validateEmail();

    const isMessageValid =
        validateMessage();

    return (
        isNameValid &&
        isEmailValid &&
        isMessageValid
    );
};

const clearFormStatus = () => {
    formStatus.textContent = "";
};

nameInput.addEventListener(
    "input",
    () => {
        clearFormStatus();

        if (nameInput.value.trim()) {
            clearError(nameInput);
        }
    }
);

emailInput.addEventListener(
    "input",
    () => {
        clearFormStatus();

        const value =
            emailInput.value.trim();

        if (emailPattern.test(value)) {
            clearError(emailInput);
        }
    }
);

messageInput.addEventListener(
    "input",
    () => {
        clearFormStatus();

        if (messageInput.value.trim()) {
            clearError(messageInput);
        }
    }
);

contactForm.addEventListener(
    "submit",
    (event) => {
        event.preventDefault();

        const isValid =
            validateForm();

        if (!isValid) {
            formStatus.textContent = "";

            return;
        }

        formStatus.textContent =
            "메시지가 정상적으로 작성되었습니다.";

        contactForm.reset();
    }
);

// ==============================
// GitHub Projects
// ==============================
const renderLoading = () => {
    projectsList.innerHTML = `
        <p class="projects-status">
            프로젝트를 불러오는 중...
        </p>
    `;
};

const renderEmpty = () => {
    projectsList.innerHTML = `
        <p class="projects-status">
            표시할 프로젝트가 없습니다.
        </p>
    `;
};

const renderError = (message) => {
    projectsList.innerHTML = `
        <div class="projects-status">
            <p>${message}</p>

            <button
                type="button"
                class="retry-projects"
            >
                다시 시도
            </button>
        </div>
    `;
};

const renderProjects = (repositories) => {
    const cards = repositories.map(
        (repository, index) => {
            const {
                name,
                description,
                html_url,
                language,
                stargazers_count,
                forks_count,
            } = repository;

            return `
                <article class="project-card">

                    <div class="project-card-top">
                        <span class="project-depth">
                            DEPTH ${String(index + 1).padStart(2, "0")}
                        </span>

                        <span class="project-language">
                            ${language || "Unknown"}
                        </span>
                    </div>

                    <h3>${name}</h3>

                    <p>
                        ${description || "프로젝트 설명이 없습니다."}
                    </p>

                    <div class="project-meta">
                        <span>
                            ★ ${stargazers_count}
                        </span>

                        <span>
                            Fork ${forks_count}
                        </span>

                        <a
                            href="${html_url}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub ↗
                        </a>
                    </div>

                </article>
            `;
        }
    );

    projectsList.innerHTML =
        cards.join("");
};

const fetchProjects = async () => {
    renderLoading();

    try {
        const response =
            await fetch(GITHUB_API_URL);

        if (response.status === 403) {
            throw new Error("RATE_LIMIT");
        }

        if (!response.ok) {
            throw new Error(
                `HTTP_${response.status}`
            );
        }

        const repositories =
            await response.json();

        if (repositories.length === 0) {
            renderEmpty();

            return;
        }

        renderProjects(repositories);

    } catch (error) {
        console.error(error);

        if (error.message === "RATE_LIMIT") {
            renderError(
                "GitHub API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요."
            );

            return;
        }

        renderError(
            "프로젝트를 불러올 수 없습니다."
        );
    }
};

projectsList.addEventListener(
    "click",
    (event) => {
        const retryButton =
            event.target.closest(
                ".retry-projects"
            );

        if (!retryButton) {
            return;
        }

        fetchProjects();
    }
);

fetchProjects();