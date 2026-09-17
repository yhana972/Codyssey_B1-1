// ==========================================================
// DOM
// ==========================================================

const themeToggle = document.querySelector(".theme-toggle");
const siteNav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-list a");

const internalLinks = document.querySelectorAll(
    'a[href^="#"]:not([href="#"])'
);

const scrollTopButton = document.querySelector(".scroll-top");
const siteHeader = document.querySelector(".site-header");
const pointerEffect = document.querySelector(".pointer-effect");
const revealElements = document.querySelectorAll("[data-reveal]");

const typingText = document.querySelector("#typing-text");
const typingCursor = document.querySelector(".typing-cursor");

const contactForm = document.querySelector("#contact-form");
const submitButton = contactForm.querySelector(".submit-button");
const submitLabel = submitButton.querySelector(".submit-label");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const formStatus = document.querySelector(".form-status");

const projectsList = document.querySelector("#projects-list");
const projectFilters = document.querySelector("#project-filters");


// ==========================================================
// CONFIG
// ==========================================================

const GITHUB_USERNAME = "yhana972";

const GITHUB_API_URL =
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=30`;

const HEADER_SCROLL_THRESHOLD = 60;
const SCROLL_TOP_THRESHOLD = 300;
const TABLET_BREAKPOINT = 768;
const REVEAL_THRESHOLD = 0.2;

const TYPING_SPEED = 90;
const TYPING_START_DELAY = 450;

const hasFinePointer = window.matchMedia(
    "(pointer: fine)"
).matches;

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


// ==========================================================
// SYSTEM THEME
// ==========================================================

const systemThemeQuery = window.matchMedia(
    "(prefers-color-scheme: dark)"
);

const getSystemTheme = () => {
    return systemThemeQuery.matches
        ? "dark"
        : "light";
};


// ==========================================================
// THEME
// ==========================================================

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

const hasSavedTheme =
    savedTheme === "dark" ||
    savedTheme === "light";

let currentTheme = hasSavedTheme
    ? savedTheme
    : getSystemTheme();

let hasUserThemePreference = hasSavedTheme;

applyTheme(currentTheme);


themeToggle.addEventListener(
    "click",
    () => {
        currentTheme =
            currentTheme === "light"
                ? "dark"
                : "light";

        hasUserThemePreference = true;

        applyTheme(currentTheme);

        localStorage.setItem(
            "theme",
            currentTheme
        );
    }
);


systemThemeQuery.addEventListener(
    "change",
    (event) => {
        if (hasUserThemePreference) {
            return;
        }

        currentTheme = event.matches
            ? "dark"
            : "light";

        applyTheme(currentTheme);
    }
);


// ==========================================================
// HERO TYPING
// ==========================================================

const runHeroTyping = () => {
    if (!typingText) {
        return;
    }

    const fullText =
        typingText.dataset.text || "";

    const characters =
        Array.from(fullText);

    if (prefersReducedMotion) {
        typingText.textContent =
            fullText;

        if (typingCursor) {
            typingCursor.hidden = true;
        }

        return;
    }

    typingText.textContent = "";

    let typingIndex = 0;

    const typeNextCharacter = () => {
        if (
            typingIndex >=
            characters.length
        ) {
            return;
        }

        typingText.textContent +=
            characters[typingIndex];

        typingIndex += 1;

        window.setTimeout(
            typeNextCharacter,
            TYPING_SPEED
        );
    };

    window.setTimeout(
        typeNextCharacter,
        TYPING_START_DELAY
    );
};


runHeroTyping();


// ==========================================================
// MOBILE NAVIGATION
// ==========================================================

const setMenuState = (isOpen) => {
    navList.classList.toggle(
        "active",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "메뉴 닫기"
            : "메뉴 열기"
    );

    menuToggle.textContent =
        isOpen
            ? "×"
            : "☰";
};


menuToggle.addEventListener(
    "click",
    () => {
        const isOpen =
            !navList.classList.contains(
                "active"
            );

        setMenuState(isOpen);
    }
);


navLinks.forEach(
    (link) => {
        link.addEventListener(
            "click",
            () => {
                setMenuState(false);
            }
        );
    }
);


document.addEventListener(
    "click",
    (event) => {
        if (
            !navList.classList.contains(
                "active"
            )
        ) {
            return;
        }

        if (
            siteNav.contains(
                event.target
            )
        ) {
            return;
        }

        setMenuState(false);
    }
);


window.addEventListener(
    "resize",
    () => {
        if (
            window.innerWidth >=
            TABLET_BREAKPOINT
        ) {
            setMenuState(false);
        }
    }
);


document.addEventListener(
    "keydown",
    (event) => {
        if (
            event.key === "Escape" &&
            navList.classList.contains(
                "active"
            )
        ) {
            setMenuState(false);

            menuToggle.focus();
        }
    }
);


// ==========================================================
// SMOOTH SCROLL
// ==========================================================

internalLinks.forEach(
    (link) => {
        link.addEventListener(
            "click",
            (event) => {
                const targetId =
                    link.getAttribute("href");

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth",

                    block: "start",
                });
            }
        );
    }
);


// ==========================================================
// SCROLL UI
// ==========================================================

const updateScrollUI = () => {
    scrollTopButton.classList.toggle(
        "active",
        window.scrollY >=
            SCROLL_TOP_THRESHOLD
    );

    siteHeader.classList.toggle(
        "scrolled",
        window.scrollY >=
            HEADER_SCROLL_THRESHOLD
    );
};


window.addEventListener(
    "scroll",
    updateScrollUI,
    {
        passive: true,
    }
);


updateScrollUI();


scrollTopButton.addEventListener(
    "click",
    () => {
        window.scrollTo({
            top: 0,

            behavior:
                prefersReducedMotion
                    ? "auto"
                    : "smooth",
        });
    }
);


// ==========================================================
// POINTER EFFECT
// ==========================================================

const updatePointerEffect = (event) => {
    const x = `${event.clientX}px`;
    const y = `${event.clientY}px`;

    document.documentElement
        .style
        .setProperty(
            "--pointer-x",
            x
        );

    document.documentElement
        .style
        .setProperty(
            "--pointer-y",
            y
        );

    pointerEffect.classList.add(
        "active"
    );
};


if (hasFinePointer) {
    window.addEventListener(
        "pointermove",
        updatePointerEffect,
        {
            passive: true,
        }
    );

    document.documentElement.addEventListener(
        "mouseleave",
        () => {
            pointerEffect.classList.remove(
                "active"
            );
        }
    );
}


// ==========================================================
// SCROLL REVEAL
// ==========================================================

if (
    prefersReducedMotion ||
    !(
        "IntersectionObserver"
        in window
    )
) {
    revealElements.forEach(
        (element) => {
            element.classList.add(
                "visible"
            );
        }
    );
} else {
    const revealObserver =
        new IntersectionObserver(
            (entries) => {
                entries.forEach(
                    (entry) => {
                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target
                            .classList
                            .add(
                                "visible"
                            );

                        revealObserver.unobserve(
                            entry.target
                        );
                    }
                );
            },
            {
                threshold:
                    REVEAL_THRESHOLD,
            }
        );

    revealElements.forEach(
        (element) => {
            revealObserver.observe(
                element
            );
        }
    );
}


// ==========================================================
// CONTACT FORM VALIDATION
// ==========================================================

const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const showError = (
    input,
    message
) => {
    input.classList.add(
        "error"
    );

    input.setAttribute(
        "aria-invalid",
        "true"
    );

    const formField =
        input.closest(
            ".form-field"
        );

    const errorMessage =
        formField.querySelector(
            ".error-message"
        );

    errorMessage.textContent =
        message;
};


const clearError = (input) => {
    input.classList.remove(
        "error"
    );

    input.removeAttribute(
        "aria-invalid"
    );

    const formField =
        input.closest(
            ".form-field"
        );

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

    if (
        !emailPattern.test(value)
    ) {
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


// ==========================================================
// CONTACT FORM STATUS
// ==========================================================

const clearFormStatus = () => {
    formStatus.textContent = "";

    formStatus.classList.remove(
        "success",
        "error"
    );
};


const setFormStatus = (
    message,
    type = ""
) => {
    formStatus.textContent =
        message;

    formStatus.classList.remove(
        "success",
        "error"
    );

    if (type) {
        formStatus.classList.add(
            type
        );
    }
};


// ==========================================================
// SUBMITTING STATE
// ==========================================================

const setSubmittingState = (
    isSubmitting
) => {
    contactForm.classList.toggle(
        "is-submitting",
        isSubmitting
    );

    contactForm.setAttribute(
        "aria-busy",
        String(isSubmitting)
    );

    /*
        중요:
        input을 disabled 하면
        FormData에 포함되지 않는다.

        따라서 전송 중에는
        submit 버튼만 비활성화한다.
    */

    submitButton.disabled =
        isSubmitting;

    submitLabel.textContent =
        isSubmitting
            ? "Sending..."
            : "Send Message";
};


// ==========================================================
// FORM INPUT EVENTS
// ==========================================================

nameInput.addEventListener(
    "input",
    () => {
        clearFormStatus();

        if (
            nameInput.value.trim()
        ) {
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

        if (
            emailPattern.test(value)
        ) {
            clearError(emailInput);
        }
    }
);


messageInput.addEventListener(
    "input",
    () => {
        clearFormStatus();

        if (
            messageInput.value.trim()
        ) {
            clearError(
                messageInput
            );
        }
    }
);


// ==========================================================
// FORM SUBMIT
// ==========================================================

contactForm.addEventListener(
    "submit",
    async (event) => {
        event.preventDefault();

        clearFormStatus();

        const isValid =
            validateForm();

        if (!isValid) {
            const firstInvalidInput =
                contactForm.querySelector(
                    ".error"
                );

            if (
                firstInvalidInput
            ) {
                firstInvalidInput.focus();
            }

            return;
        }


        if (
            contactForm.action.includes(
                "YOUR_FORM_ID"
            )
        ) {
            setFormStatus(
                "Formspree Form ID를 먼저 설정해주세요.",
                "error"
            );

            return;
        }


        /*
            먼저 FormData를 생성한다.

            현재 input들은 모두 활성 상태이므로
            name / email / message가 정상적으로 들어간다.
        */

        const formData =
            new FormData(
                contactForm
            );


        /*
            중복 클릭 방지를 위해
            FormData 생성 후 버튼을 비활성화한다.
        */

        setSubmittingState(true);


        try {
            const response =
                await fetch(
                    contactForm.action,
                    {
                        method: "POST",

                        body: formData,

                        headers: {
                            Accept:
                                "application/json",
                        },
                    }
                );


            if (
                response.status ===
                429
            ) {
                throw new Error(
                    "RATE_LIMIT"
                );
            }


            if (!response.ok) {
                let message =
                    "메시지를 전송하지 못했습니다.";

                try {
                    const data =
                        await response.json();

                    if (
                        Array.isArray(
                            data.errors
                        ) &&
                        data.errors.length >
                            0
                    ) {
                        message =
                            data.errors
                                .map(
                                    ({
                                        message:
                                            errorMessage,
                                    }) =>
                                        errorMessage
                                )
                                .join(" ");
                    }
                } catch {
                    /*
                        JSON 응답이 아닌 경우
                        기본 메시지 사용
                    */
                }

                throw new Error(
                    message
                );
            }


            contactForm.reset();


            [
                nameInput,
                emailInput,
                messageInput,
            ].forEach(
                clearError
            );


            setFormStatus(
                "메시지가 전송되었습니다. 감사합니다!",
                "success"
            );

        } catch (error) {
            console.error(error);

            if (
                error.message ===
                "RATE_LIMIT"
            ) {
                setFormStatus(
                    "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
                    "error"
                );

                return;
            }

            setFormStatus(
                error.message ||
                "메시지를 전송하지 못했습니다. 잠시 후 다시 시도해주세요.",
                "error"
            );

        } finally {
            setSubmittingState(false);
        }
    }
);


// ==========================================================
// GITHUB PROJECTS
// ==========================================================

let allRepositories = [];
let currentProjectFilter = "ALL";


// ==========================================================
// ESCAPE HTML
// ==========================================================

const escapeHTML = (value) => {
    const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#039;",
    };

    return String(value).replace(
        /[&<>"']/g,
        (character) =>
            entities[character]
    );
};


// ==========================================================
// PROJECT FILTER
// ==========================================================

const renderProjectFilters =
    (repositories) => {

        const languages = [
            ...new Set(
                repositories
                    .map(
                        ({
                            language,
                        }) =>
                            language
                    )
                    .filter(Boolean)
            ),
        ].sort(
            (
                first,
                second
            ) =>
                first.localeCompare(
                    second
                )
        );


        const filters = [
            "ALL",
            ...languages,
        ];


        projectFilters.innerHTML =
            filters
                .map(
                    (filter) => {
                        const isActive =
                            filter ===
                            currentProjectFilter;

                        const label =
                            filter === "ALL"
                                ? "All"
                                : escapeHTML(
                                    filter
                                );

                        const encodedFilter =
                            encodeURIComponent(
                                filter
                            );

                        return `
                            <button
                                type="button"
                                class="project-filter${isActive ? " active" : ""}"
                                data-filter="${encodedFilter}"
                                aria-pressed="${isActive}"
                            >
                                ${label}
                            </button>
                        `;
                    }
                )
                .join("");


        projectFilters.hidden =
            false;
    };


// ==========================================================
// PROJECT STATES
// ==========================================================

const hideProjectFilters = () => {
    projectFilters.hidden = true;

    projectFilters.innerHTML = "";
};


const renderLoading = () => {
    hideProjectFilters();

    projectsList.setAttribute(
        "aria-busy",
        "true"
    );

    projectsList.innerHTML = `
        <p class="projects-status">
            프로젝트를 불러오는 중...
        </p>
    `;
};


const renderEmpty = () => {
    hideProjectFilters();

    projectsList.setAttribute(
        "aria-busy",
        "false"
    );

    projectsList.innerHTML = `
        <p class="projects-status">
            표시할 프로젝트가 없습니다.
        </p>
    `;
};


const renderFilteredEmpty = () => {
    projectsList.setAttribute(
        "aria-busy",
        "false"
    );

    projectsList.innerHTML = `
        <p class="projects-status">
            해당 언어의 프로젝트가 없습니다.
        </p>
    `;
};


const renderError = (message) => {
    hideProjectFilters();

    projectsList.setAttribute(
        "aria-busy",
        "false"
    );

    projectsList.innerHTML = `
        <div class="projects-status">

            <p>
                ${escapeHTML(message)}
            </p>

            <button
                type="button"
                class="retry-projects"
            >
                다시 시도
            </button>

        </div>
    `;
};


// ==========================================================
// PROJECT CARDS
// ==========================================================

const renderProjects =
    (repositories) => {

        projectsList.setAttribute(
            "aria-busy",
            "false"
        );


        const cards =
            repositories.map(
                (
                    repository,
                    index
                ) => {

                    const {
                        name,
                        description,
                        html_url,
                        language,
                        stargazers_count,
                        forks_count,
                    } = repository;


                    const safeName =
                        escapeHTML(name);

                    const safeDescription =
                        escapeHTML(
                            description ||
                            "프로젝트 설명이 없습니다."
                        );

                    const safeLanguage =
                        escapeHTML(
                            language ||
                            "Unknown"
                        );

                    const safeUrl =
                        escapeHTML(
                            html_url
                        );


                    return `
                        <article class="project-card">

                            <div class="project-card-top">

                                <span class="project-depth">
                                    DEPTH ${String(index + 1).padStart(2, "0")}
                                </span>

                                <span class="project-language">
                                    ${safeLanguage}
                                </span>

                            </div>


                            <h3>
                                ${safeName}
                            </h3>


                            <p>
                                ${safeDescription}
                            </p>


                            <div class="project-meta">

                                <span>
                                    ★ ${stargazers_count}
                                </span>

                                <span>
                                    Fork ${forks_count}
                                </span>

                                <a
                                    href="${safeUrl}"
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


// ==========================================================
// FILTER PROJECTS
// ==========================================================

const renderFilteredProjects = () => {
    const filteredRepositories =
        currentProjectFilter === "ALL"
            ? allRepositories
            : allRepositories.filter(
                ({
                    language,
                }) =>
                    language ===
                    currentProjectFilter
            );


    if (
        filteredRepositories.length ===
        0
    ) {
        renderFilteredEmpty();

        return;
    }


    renderProjects(
        filteredRepositories
    );
};


// ==========================================================
// FETCH PROJECTS
// ==========================================================

const fetchProjects = async () => {
    renderLoading();


    try {
        const response =
            await fetch(
                GITHUB_API_URL
            );


        if (
            response.status === 403 ||
            response.status === 429
        ) {
            throw new Error(
                "RATE_LIMIT"
            );
        }


        if (
            response.status === 404
        ) {
            throw new Error(
                "NOT_FOUND"
            );
        }


        if (!response.ok) {
            throw new Error(
                `HTTP_${response.status}`
            );
        }


        const repositories =
            await response.json();


        if (
            !Array.isArray(
                repositories
            )
        ) {
            throw new Error(
                "INVALID_DATA"
            );
        }


        if (
            repositories.length === 0
        ) {
            allRepositories = [];

            renderEmpty();

            return;
        }


        allRepositories =
            repositories;

        currentProjectFilter =
            "ALL";


        renderProjectFilters(
            allRepositories
        );


        renderFilteredProjects();

    } catch (error) {
        console.error(error);


        if (
            error.message ===
            "RATE_LIMIT"
        ) {
            renderError(
                "GitHub API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요."
            );

            return;
        }


        if (
            error.message ===
            "NOT_FOUND"
        ) {
            renderError(
                "GitHub 사용자를 찾을 수 없습니다."
            );

            return;
        }


        renderError(
            "프로젝트를 불러올 수 없습니다."
        );
    }
};


// ==========================================================
// FILTER EVENT
// ==========================================================

projectFilters.addEventListener(
    "click",
    (event) => {

        if (
            !(
                event.target
                instanceof Element
            )
        ) {
            return;
        }


        const filterButton =
            event.target.closest(
                ".project-filter"
            );


        if (!filterButton) {
            return;
        }


        currentProjectFilter =
            decodeURIComponent(
                filterButton
                    .dataset
                    .filter
            );


        renderProjectFilters(
            allRepositories
        );


        renderFilteredProjects();
    }
);


// ==========================================================
// RETRY EVENT
// ==========================================================

projectsList.addEventListener(
    "click",
    (event) => {

        if (
            !(
                event.target
                instanceof Element
            )
        ) {
            return;
        }


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


// ==========================================================
// INITIAL PROJECT LOAD
// ==========================================================

fetchProjects();