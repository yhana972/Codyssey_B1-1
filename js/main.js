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

const typingText =
    document.querySelector("#typing-text");

const typingCursor =
    document.querySelector(".typing-cursor");

const contactForm =
    document.querySelector("#contact-form");

const submitButton =
    contactForm.querySelector(".submit-button");

const submitLabel =
    submitButton.querySelector(".submit-label");

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

const GITHUB_USERNAME = "yhana972";
//const GITHUB_USERNAME = "this-user-does-not-exist-test";

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

const TYPING_SPEED =
    90;

const TYPING_START_DELAY =
    450;


// ==========================================================
// MEDIA QUERY
// ==========================================================

const hasFinePointer =
    window.matchMedia(
        "(pointer: fine)"
    ).matches;

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

const systemThemeQuery =
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    );


// ==========================================================
// THEME INITIAL VALUE
// ==========================================================

const getSystemTheme = () => {
    return systemThemeQuery.matches
        ? "dark"
        : "light";
};


const savedTheme =
    localStorage.getItem("theme");

const hasSavedTheme =
    savedTheme === "dark" ||
    savedTheme === "light";


// ==========================================================
// APPLICATION STATE
// ==========================================================

/*
    애플리케이션에서 변경되는 상태를
    하나의 STATE 객체에 모아 관리한다.

    기본 흐름:
    사용자 이벤트
    → STATE 변경
    → render / UI 함수 호출
    → 화면 반영
*/

const STATE = {
    theme: {
        // 초기 테마 우선순위:
        // localStorage 사용자 설정 → 시스템 테마 설정
        current:
            hasSavedTheme
                ? savedTheme
                : getSystemTheme(),

        hasUserPreference:
            hasSavedTheme,
    },

    menu: {
        isOpen:
            false,
    },

    projects: {
        repositories:
            [],

        filter:
            "ALL",

        status:
            "idle",
    },

    contact: {
        isSubmitting:
            false,
    },
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


const renderTheme = () => {
    document.documentElement
        .dataset
        .theme =
        STATE.theme.current;

    updateThemeButton(
        STATE.theme.current
    );
};


/*
    Theme Flow

    Theme Button Click
    → STATE.theme.current 변경
    → renderTheme()
    → data-theme 변경
    → 화면 변경
*/

const handleThemeToggle = () => {
    STATE.theme.current =
        STATE.theme.current === "light"
            ? "dark"
            : "light";

    STATE.theme.hasUserPreference =
        true;

    renderTheme();

    localStorage.setItem(
        "theme",
        STATE.theme.current
    );
};


/*
    사용자가 직접 테마를 선택하지 않은 경우에만
    OS 테마 변경을 실시간 반영한다.
*/

const handleSystemThemeChange = (
    event
) => {
    if (
        STATE.theme.hasUserPreference
    ) {
        return;
    }

    STATE.theme.current =
        event.matches
            ? "dark"
            : "light";

    renderTheme();
};


// 초기 Theme Rendering
renderTheme();


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
            typingCursor.hidden =
                true;
        }

        return;
    }

    typingText.textContent =
        "";

    let typingIndex =
        0;

    const typeNextCharacter = () => {
        if (
            typingIndex >=
            characters.length
        ) {
            return;
        }

        typingText.textContent +=
            characters[typingIndex];

        typingIndex +=
            1;

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

const renderMenu = () => {
    navList.classList.toggle(
        "active",
        STATE.menu.isOpen
    );

    menuToggle.setAttribute(
        "aria-expanded",
        String(
            STATE.menu.isOpen
        )
    );

    menuToggle.setAttribute(
        "aria-label",
        STATE.menu.isOpen
            ? "메뉴 닫기"
            : "메뉴 열기"
    );

    menuToggle.textContent =
        STATE.menu.isOpen
            ? "×"
            : "☰";
};


/*
    Menu Flow

    Click
    → STATE.menu.isOpen 변경
    → renderMenu()
    → class / aria 변경
*/

const setMenuState = (
    isOpen
) => {
    STATE.menu.isOpen =
        isOpen;

    renderMenu();
};


const handleMenuToggle = () => {
    setMenuState(
        !STATE.menu.isOpen
    );
};


const handleNavLinkClick = () => {
    setMenuState(false);
};


const handleOutsideMenuClick = (
    event
) => {
    if (
        !STATE.menu.isOpen
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
};


const handleWindowResize = () => {
    if (
        window.innerWidth >=
        TABLET_BREAKPOINT
    ) {
        setMenuState(false);
    }
};


const handleEscapeKey = (
    event
) => {
    if (
        event.key !== "Escape" ||
        !STATE.menu.isOpen
    ) {
        return;
    }

    setMenuState(false);

    menuToggle.focus();
};


// ==========================================================
// SMOOTH SCROLL
// ==========================================================

const handleInternalLinkClick = (
    event
) => {
    const link =
        event.currentTarget;

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

        block:
            "start",
    });
};


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


const handleWindowScroll = () => {
    updateScrollUI();
};


const handleScrollTopClick = () => {
    window.scrollTo({
        top:
            0,

        behavior:
            prefersReducedMotion
                ? "auto"
                : "smooth",
    });
};


updateScrollUI();


// ==========================================================
// POINTER EFFECT
// ==========================================================

const updatePointerEffect = (
    event
) => {
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

    pointerEffect.classList.add(
        "active"
    );
};


const handlePointerMove = (
    event
) => {
    updatePointerEffect(
        event
    );
};


const handlePointerLeave = () => {
    pointerEffect.classList.remove(
        "active"
    );
};


// ==========================================================
// SCROLL REVEAL
// ==========================================================

const showRevealElement = (
    element
) => {
    element.classList.add(
        "visible"
    );
};


const handleRevealEntries = (
    entries,
    observer
) => {
    /*
        forEach:
        IntersectionObserver가 전달한
        각 요소의 상태를 순서대로 확인한다.
    */

    entries.forEach(
        (entry) => {
            if (
                !entry.isIntersecting
            ) {
                return;
            }

            showRevealElement(
                entry.target
            );

            observer.unobserve(
                entry.target
            );
        }
    );
};


const initializeRevealAnimation =
    () => {
        if (
            prefersReducedMotion ||
            !(
                "IntersectionObserver"
                in window
            )
        ) {
            /*
                forEach:
                애니메이션을 사용할 수 없는 환경에서는
                모든 요소를 즉시 표시한다.
            */

            revealElements.forEach(
                showRevealElement
            );

            return;
        }

        const revealObserver =
            new IntersectionObserver(
                handleRevealEntries,
                {
                    threshold:
                        REVEAL_THRESHOLD,
                }
            );

        /*
            forEach:
            data-reveal 요소 각각을
            IntersectionObserver의 감시 대상으로 등록한다.
        */

        revealElements.forEach(
            (element) => {
                revealObserver.observe(
                    element
                );
            }
        );
    };


initializeRevealAnimation();


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


const clearError = (
    input
) => {
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

    errorMessage.textContent =
        "";
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

    clearError(
        nameInput
    );

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
        !emailPattern.test(
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
        messageInput.value.trim();

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


// ==========================================================
// CONTACT FORM STATUS
// ==========================================================

const clearFormStatus = () => {
    formStatus.textContent =
        "";

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


const renderSubmittingState = () => {
    contactForm.classList.toggle(
        "is-submitting",
        STATE.contact.isSubmitting
    );

    contactForm.setAttribute(
        "aria-busy",
        String(
            STATE.contact.isSubmitting
        )
    );

    /*
        input 자체는 disabled 하지 않는다.
        disabled input은 FormData에서 제외되기 때문이다.

        전송 중에는 중복 Submit만 방지한다.
    */

    submitButton.disabled =
        STATE.contact.isSubmitting;

    submitLabel.textContent =
        STATE.contact.isSubmitting
            ? "Sending..."
            : "Send Message";
};


const setSubmittingState = (
    isSubmitting
) => {
    STATE.contact.isSubmitting =
        isSubmitting;

    renderSubmittingState();
};


// ==========================================================
// CONTACT INPUT EVENTS
// ==========================================================

const handleNameInput = () => {
    clearFormStatus();

    if (
        nameInput.value.trim()
    ) {
        clearError(
            nameInput
        );
    }
};


const handleEmailInput = () => {
    clearFormStatus();

    const value =
        emailInput.value.trim();

    if (
        emailPattern.test(
            value
        )
    ) {
        clearError(
            emailInput
        );
    }
};


const handleMessageInput = () => {
    clearFormStatus();

    if (
        messageInput.value.trim()
    ) {
        clearError(
            messageInput
        );
    }
};


// ==========================================================
// CONTACT FORM SUBMIT
// ==========================================================

/*
    Contact Flow

    Submit
    → Validation
    → FormData 생성
    → STATE.contact.isSubmitting = true
    → fetch()
    → Success / Error
    → STATE.contact.isSubmitting = false
*/

const handleContactSubmit =
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
            FormData는 submit 상태 변경 전에 생성한다.
            입력 데이터가 정상적으로 포함되도록 하기 위함이다.
        */

        const formData =
            new FormData(
                contactForm
            );


        setSubmittingState(
            true
        );


        try {
            const response =
                await fetch(
                    contactForm.action,
                    {
                        method:
                            "POST",

                        body:
                            formData,

                        headers: {
                            Accept:
                                "application/json",
                        },
                    }
                );


            if (
                response.status === 429
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
                        data.errors.length > 0
                    ) {
                        /*
                            map:
                            Formspree의 errors 배열에서
                            사용자에게 보여줄 message만 추출한다.
                        */

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
                        기본 메시지를 그대로 사용한다.
                    */
                }

                throw new Error(
                    message
                );
            }


            contactForm.reset();


            /*
                forEach:
                이름 / 이메일 / 메시지 입력창의
                에러 상태를 동일한 방식으로 초기화한다.
            */

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
            console.error(
                "[Contact Form Error]",
                error
            );


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
            setSubmittingState(
                false
            );
        }
    };


// ==========================================================
// ESCAPE HTML
// ==========================================================

const escapeHTML = (
    value
) => {
    const entities = {
        "&":
            "&amp;",

        "<":
            "&lt;",

        ">":
            "&gt;",

        "\"":
            "&quot;",

        "'":
            "&#039;",
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
    () => {
        /*
            map:
            Repository 배열에서 language만 추출한다.

            filter:
            language가 null인 Repository를 제거한다.

            Set:
            중복 language를 제거한다.
        */

        const languages = [
            ...new Set(
                STATE.projects
                    .repositories
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


        const filters = [
            "ALL",
            ...languages,
        ];


        /*
            map:
            필터 이름 배열을 HTML Button 문자열 배열로 변환한다.
        */

        projectFilters.innerHTML =
            filters
                .map(
                    (filter) => {
                        const isActive =
                            filter ===
                            STATE.projects.filter;

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
    projectFilters.hidden =
        true;

    projectFilters.innerHTML =
        "";
};


const renderLoading = () => {
    STATE.projects.status =
        "loading";

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
    STATE.projects.status =
        "empty";

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


const renderError = (
    message
) => {
    STATE.projects.status =
        "error";

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

const renderProjects = (
    repositories
) => {
    STATE.projects.status =
        "success";

    projectsList.setAttribute(
        "aria-busy",
        "false"
    );


    /*
        map:
        Repository 객체 배열을
        Project Card HTML 문자열 배열로 변환한다.
    */

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
        cards.join("");
};


// ==========================================================
// FILTER PROJECTS
// ==========================================================

const renderFilteredProjects =
    () => {
        /*
            Project Filter Flow

            Filter Button Click
            → STATE.projects.filter 변경
            → filter()
            → renderProjects()
        */

        /*
            filter:
            사용자가 선택한 Language와 일치하는
            Repository만 새 배열로 반환한다.
        */

        const filteredRepositories =
            STATE.projects.filter ===
            "ALL"

                ? STATE.projects
                    .repositories

                : STATE.projects
                    .repositories
                    .filter(
                        ({
                            language,
                        }) =>
                            language ===
                            STATE.projects.filter
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

/*
    GitHub API Flow

    fetchProjects()
    → Loading
    → API Request
    → STATE.projects.repositories 저장
    → Filter Rendering
    → Project Rendering

    실패 시
    → Error State
    → Retry UI
*/

const fetchProjects =
    async () => {
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
                console.error(
                    `[GitHub API] Rate Limit Error (${response.status})`
                );

                throw new Error(
                    "RATE_LIMIT"
                );
            }


            if (
                response.status === 404
            ) {
                console.error(
                    "[GitHub API] User Not Found (404)"
                );

                throw new Error(
                    "NOT_FOUND"
                );
            }


            if (!response.ok) {
                console.error(
                    `[GitHub API] HTTP Error (${response.status})`
                );

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
                console.error(
                    "[GitHub API] Invalid Response Data"
                );

                throw new Error(
                    "INVALID_DATA"
                );
            }


            if (
                repositories.length ===
                0
            ) {
                STATE.projects.repositories =
                    [];

                renderEmpty();

                return;
            }


            /*
                API 결과를 STATE에 저장한다.
                이후 UI는 STATE를 기준으로 렌더링한다.
            */

            STATE.projects.repositories =
                repositories;

            STATE.projects.filter =
                "ALL";


            renderProjectFilters();

            renderFilteredProjects();

        } catch (error) {
            console.error(
                "[GitHub API Error]",
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
// PROJECT EVENTS
// ==========================================================

const handleProjectFilterClick = (
    event
) => {
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


    /*
        1. 이벤트
        2. STATE 변경
        3. 필터 UI 렌더링
        4. 프로젝트 재렌더링
    */

    STATE.projects.filter =
        decodeURIComponent(
            filterButton
                .dataset
                .filter
        );


    renderProjectFilters();

    renderFilteredProjects();
};


const handleProjectsListClick = (
    event
) => {
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
};


// ==========================================================
// EVENT REGISTRATION
// ==========================================================

/*
    이벤트 처리 함수를 별도로 명명해
    각 이벤트의 역할을 쉽게 추적할 수 있도록 구성한다.
*/


// Theme
themeToggle.addEventListener(
    "click",
    handleThemeToggle
);

systemThemeQuery.addEventListener(
    "change",
    handleSystemThemeChange
);


// Navigation
menuToggle.addEventListener(
    "click",
    handleMenuToggle
);

navLinks.forEach(
    (link) => {
        link.addEventListener(
            "click",
            handleNavLinkClick
        );
    }
);

document.addEventListener(
    "click",
    handleOutsideMenuClick
);

document.addEventListener(
    "keydown",
    handleEscapeKey
);

window.addEventListener(
    "resize",
    handleWindowResize
);


// Smooth Scroll
internalLinks.forEach(
    (link) => {
        link.addEventListener(
            "click",
            handleInternalLinkClick
        );
    }
);


// Scroll
window.addEventListener(
    "scroll",
    handleWindowScroll,
    {
        passive:
            true,
    }
);

scrollTopButton.addEventListener(
    "click",
    handleScrollTopClick
);


// Pointer
if (hasFinePointer) {
    window.addEventListener(
        "pointermove",
        handlePointerMove,
        {
            passive:
                true,
        }
    );

    document.documentElement
        .addEventListener(
            "mouseleave",
            handlePointerLeave
        );
}


// Contact
nameInput.addEventListener(
    "input",
    handleNameInput
);

emailInput.addEventListener(
    "input",
    handleEmailInput
);

messageInput.addEventListener(
    "input",
    handleMessageInput
);

contactForm.addEventListener(
    "submit",
    handleContactSubmit
);


// Projects
projectFilters.addEventListener(
    "click",
    handleProjectFilterClick
);

projectsList.addEventListener(
    "click",
    handleProjectsListClick
);


// ==========================================================
// INITIALIZE
// ==========================================================

fetchProjects();