// ==========================================================
// DOM
// ==========================================================

const themeToggle =
    document.querySelector(".theme-toggle");

const siteNav =
    document.querySelector(".site-nav");

const menuToggle =
    document.querySelector(".menu-toggle");

const navList =
    document.querySelector(".nav-list");

const navLinks =
    document.querySelectorAll(".nav-list a");

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]:not([href="#"])'
    );

const scrollTopButton =
    document.querySelector(".scroll-top");

const siteHeader =
    document.querySelector(".site-header");

const pointerEffect =
    document.querySelector(".pointer-effect");

const revealElements =
    document.querySelectorAll("[data-reveal]");

const contactForm =
    document.querySelector(".contact-form");

const nameInput =
    document.querySelector("#name");

const emailInput =
    document.querySelector("#email");

const messageInput =
    document.querySelector("#message");

const formStatus =
    document.querySelector(".form-status");

const projectsList =
    document.querySelector("#projects-list");

const projectFilters =
    document.querySelector("#project-filters");


// ==========================================================
// CONFIG
// ==========================================================

const GITHUB_USERNAME =
    "yhana972";


const GITHUB_API_URL =
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=30`;


const HEADER_SCROLL_THRESHOLD =
    60;


const SCROLL_TOP_THRESHOLD =
    300;


const TABLET_BREAKPOINT =
    768;


const REVEAL_THRESHOLD =
    0.2;


const hasFinePointer =
    window.matchMedia(
        "(pointer: fine)"
    ).matches;


const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


// ==========================================================
// SYSTEM THEME
// ==========================================================

/*
    운영체제 / 브라우저의 테마 설정 확인

    true
    → 시스템 Dark Mode

    false
    → 시스템 Light Mode
*/

const systemThemeQuery =
    window.matchMedia(
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
        themeToggle.textContent =
            "☀";

        themeToggle.setAttribute(
            "aria-label",
            "라이트 모드로 변경"
        );

        return;
    }


    themeToggle.textContent =
        "☾";


    themeToggle.setAttribute(
        "aria-label",
        "다크 모드로 변경"
    );
};


const applyTheme = (theme) => {
    document.documentElement
        .dataset
        .theme =
        theme;


    updateThemeButton(
        theme
    );
};


/*
    이전에 사용자가 직접 선택한 테마 확인
*/

const savedTheme =
    localStorage.getItem(
        "theme"
    );


/*
    localStorage에
    정상적인 테마 값이 있는지 확인
*/

const hasSavedTheme =
    savedTheme === "dark" ||
    savedTheme === "light";


/*
    우선순위

    1. 사용자가 저장한 Theme
    2. 시스템 Theme
*/

let currentTheme =
    hasSavedTheme
        ? savedTheme
        : getSystemTheme();


/*
    사용자가 직접 테마를 선택했는지 여부.

    true가 되면
    시스템 테마가 변경되어도
    사용자 설정을 우선한다.
*/

let hasUserThemePreference =
    hasSavedTheme;


/*
    최초 Theme 적용
*/

applyTheme(
    currentTheme
);


// ==========================================================
// THEME BUTTON
// ==========================================================

themeToggle.addEventListener(
    "click",
    () => {
        currentTheme =
            currentTheme === "light"
                ? "dark"
                : "light";


        /*
            사용자가 직접 Theme를 선택했으므로
            이후에는 시스템 설정보다
            사용자 설정을 우선한다.
        */

        hasUserThemePreference =
            true;


        applyTheme(
            currentTheme
        );


        localStorage.setItem(
            "theme",
            currentTheme
        );
    }
);


// ==========================================================
// SYSTEM THEME CHANGE
// ==========================================================

/*
    사용자가 직접 테마를 고르지 않은 상태에서
    OS Theme가 변경되면 사이트도 함께 변경된다.

    예:
    Mac Light
    ↓
    Mac Dark

    Portfolio도
    Day Pool → Night Pool
*/

systemThemeQuery.addEventListener(
    "change",
    (event) => {
        if (
            hasUserThemePreference
        ) {
            return;
        }


        currentTheme =
            event.matches
                ? "dark"
                : "light";


        applyTheme(
            currentTheme
        );
    }
);


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
            !navList
                .classList
                .contains(
                    "active"
                );


        setMenuState(
            isOpen
        );
    }
);


navLinks.forEach(
    (link) => {
        link.addEventListener(
            "click",
            () => {
                setMenuState(
                    false
                );
            }
        );
    }
);


document.addEventListener(
    "click",
    (event) => {
        if (
            !navList
                .classList
                .contains(
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


        setMenuState(
            false
        );
    }
);


window.addEventListener(
    "resize",
    () => {
        if (
            window.innerWidth >=
            TABLET_BREAKPOINT
        ) {
            setMenuState(
                false
            );
        }
    }
);


document.addEventListener(
    "keydown",
    (event) => {
        if (
            event.key ===
                "Escape" &&

            navList
                .classList
                .contains(
                    "active"
                )
        ) {
            setMenuState(
                false
            );


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
                    link.getAttribute(
                        "href"
                    );


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

                    block:
                        "start",
                });
            }
        );
    }
);


// ==========================================================
// SCROLL UI
// ==========================================================

const updateScrollUI = () => {
    scrollTopButton
        .classList
        .toggle(
            "active",

            window.scrollY >=
                SCROLL_TOP_THRESHOLD
        );


    siteHeader
        .classList
        .toggle(
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

const updatePointerEffect =
    (event) => {

        const x =
            `${event.clientX}px`;


        const y =
            `${event.clientY}px`;


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


        pointerEffect
            .classList
            .add(
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


    document.documentElement
        .addEventListener(
            "mouseleave",
            () => {
                pointerEffect
                    .classList
                    .remove(
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
            element
                .classList
                .add(
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
                            !entry
                                .isIntersecting
                        ) {
                            return;
                        }


                        entry.target
                            .classList
                            .add(
                                "visible"
                            );


                        revealObserver
                            .unobserve(
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
            revealObserver
                .observe(
                    element
                );
        }
    );
}


// ==========================================================
// CONTACT FORM
// ==========================================================

const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const showError = (
    input,
    message
) => {
    input
        .classList
        .add(
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
        formField
            .querySelector(
                ".error-message"
            );


    errorMessage.textContent =
        message;
};


const clearError =
    (input) => {

        input
            .classList
            .remove(
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
            formField
                .querySelector(
                    ".error-message"
                );


        errorMessage.textContent =
            "";
    };


const validateName = () => {
    const value =
        nameInput
            .value
            .trim();


    if (!value) {
        showError(
            nameInput,
            "이름을 입력해주세요."
        );

        return false;
    }


    clearError(
        nameInput
    );


    return true;
};


const validateEmail = () => {
    const value =
        emailInput
            .value
            .trim();


    if (!value) {
        showError(
            emailInput,
            "이메일을 입력해주세요."
        );

        return false;
    }


    if (
        !emailPattern
            .test(
                value
            )
    ) {
        showError(
            emailInput,
            "올바른 이메일 형식을 입력해주세요."
        );

        return false;
    }


    clearError(
        emailInput
    );


    return true;
};


const validateMessage = () => {
    const value =
        messageInput
            .value
            .trim();


    if (!value) {
        showError(
            messageInput,
            "메시지를 입력해주세요."
        );

        return false;
    }


    clearError(
        messageInput
    );


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
    formStatus.textContent =
        "";
};


nameInput.addEventListener(
    "input",
    () => {
        clearFormStatus();


        if (
            nameInput
                .value
                .trim()
        ) {
            clearError(
                nameInput
            );
        }
    }
);


emailInput.addEventListener(
    "input",
    () => {
        clearFormStatus();


        const value =
            emailInput
                .value
                .trim();


        if (
            emailPattern
                .test(
                    value
                )
        ) {
            clearError(
                emailInput
            );
        }
    }
);


messageInput.addEventListener(
    "input",
    () => {
        clearFormStatus();


        if (
            messageInput
                .value
                .trim()
        ) {
            clearError(
                messageInput
            );
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
            formStatus.textContent =
                "";


            const firstInvalidInput =
                contactForm
                    .querySelector(
                        ".error"
                    );


            if (
                firstInvalidInput
            ) {
                firstInvalidInput
                    .focus();
            }


            return;
        }


        formStatus.textContent =
            "메시지가 정상적으로 작성되었습니다.";


        contactForm.reset();


        [
            nameInput,
            emailInput,
            messageInput,
        ].forEach(
            clearError
        );
    }
);


// ==========================================================
// GITHUB PROJECTS
// ==========================================================

let allRepositories =
    [];


let currentProjectFilter =
    "ALL";


// ==========================================================
// ESCAPE HTML
// ==========================================================

const escapeHTML =
    (value) => {

        const entities = {
            "&": "&amp;",

            "<": "&lt;",

            ">": "&gt;",

            "\"": "&quot;",

            "'": "&#039;",
        };


        return String(
            value
        ).replace(
            /[&<>"']/g,

            (character) =>
                entities[
                    character
                ]
        );
    };


// ==========================================================
// PROJECT FILTER
// ==========================================================

const renderProjectFilters =
    (repositories) => {

        /*
            모든 Repository의 language 추출
            ↓
            null 제거
            ↓
            Set으로 중복 제거
            ↓
            다시 Array로 변경
        */

        const languages =
            [
                ...new Set(
                    repositories
                        .map(
                            ({
                                language,
                            }) =>
                                language
                        )
                        .filter(
                            Boolean
                        )
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


        const filters =
            [
                "ALL",
                ...languages,
            ];


        projectFilters
            .innerHTML =
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
                .join(
                    ""
                );


        projectFilters.hidden =
            false;
    };


// ==========================================================
// PROJECT STATES
// ==========================================================

const hideProjectFilters = () => {
    projectFilters.hidden =
        true;


    projectFilters.innerHTML =
        "";
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


const renderError =
    (message) => {

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
                    } =
                        repository;


                    const safeName =
                        escapeHTML(
                            name
                        );


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
            cards.join(
                ""
            );
    };


// ==========================================================
// FILTER PROJECTS
// ==========================================================

const renderFilteredProjects =
    () => {

        /*
            선택 미션 핵심

            ALL이면 전체 사용

            아니면 filter()를 사용해서
            선택된 언어와 같은 Repository만 반환
        */

        const filteredRepositories =
            currentProjectFilter ===
            "ALL"

                ? allRepositories

                : allRepositories
                    .filter(
                        ({
                            language,
                        }) =>
                            language ===
                            currentProjectFilter
                    );


        if (
            filteredRepositories
                .length === 0
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

const fetchProjects =
    async () => {

        renderLoading();


        try {
            const response =
                await fetch(
                    GITHUB_API_URL
                );


            if (
                response.status ===
                    403 ||

                response.status ===
                    429
            ) {
                throw new Error(
                    "RATE_LIMIT"
                );
            }


            if (
                response.status ===
                404
            ) {
                throw new Error(
                    "NOT_FOUND"
                );
            }


            if (
                !response.ok
            ) {
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
                repositories.length ===
                0
            ) {
                allRepositories =
                    [];


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
            console.error(
                error
            );


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
// FILTER BUTTON EVENT
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


        if (
            !filterButton
        ) {
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


        if (
            !retryButton
        ) {
            return;
        }


        fetchProjects();
    }
);


// ==========================================================
// INITIAL PROJECT LOAD
// ==========================================================

fetchProjects();