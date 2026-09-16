// ==============================
// DOM
// ==============================

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


// ==============================
// Config
// ==============================

const GITHUB_USERNAME = "yhana972";

const GITHUB_API_URL =
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=6`;

const HEADER_SCROLL_THRESHOLD = 60;
const SCROLL_TOP_THRESHOLD = 300;
const TABLET_BREAKPOINT = 768;
const REVEAL_THRESHOLD = 0.2;

const hasFinePointer =
    window.matchMedia(
        "(pointer: fine)"
    ).matches;

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


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
    document.documentElement.dataset.theme =
        theme;

    updateThemeButton(theme);
};


const savedTheme =
    localStorage.getItem("theme");


let currentTheme =
    savedTheme === "dark" ||
    savedTheme === "light"
        ? savedTheme
        : "light";


applyTheme(currentTheme);


themeToggle.addEventListener(
    "click",
    () => {
        currentTheme =
            currentTheme === "light"
                ? "dark"
                : "light";

        applyTheme(currentTheme);

        localStorage.setItem(
            "theme",
            currentTheme
        );
    }
);


// ==============================
// Mobile Navigation
// ==============================

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


// 메뉴 링크 클릭 시 모바일 메뉴 닫기
navLinks.forEach((link) => {
    link.addEventListener(
        "click",
        () => {
            setMenuState(false);
        }
    );
});


// 메뉴 바깥 클릭 시 닫기
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
            siteNav.contains(event.target)
        ) {
            return;
        }

        setMenuState(false);
    }
);


// 태블릿 이상으로 화면이 커지면
// 모바일 메뉴 상태 초기화
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


// ESC 키로 메뉴 닫기
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


// ==============================
// Smooth Scroll
// ==============================

internalLinks.forEach((link) => {
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
});


// ==============================
// Scroll UI
// ==============================

const updateScrollUI = () => {
    // 300px 이상 스크롤 시
    // Scroll Top 버튼 표시
    scrollTopButton.classList.toggle(
        "active",
        window.scrollY >=
            SCROLL_TOP_THRESHOLD
    );

    // 60px 이상 스크롤 시
    // Header 스타일 변경
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


// 페이지 최초 실행 시에도
// 현재 스크롤 상태 반영
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


// ==============================
// Pointer Effect
// ==============================

const updatePointerEffect = (event) => {
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


// 마우스/트랙패드와 같이
// 정밀 포인터가 있는 환경에서만 실행
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
                    .remove("active");
            }
        );
}


// ==============================
// Scroll Reveal
// ==============================

// 애니메이션 감소 설정이 켜져 있거나
// IntersectionObserver를 지원하지 않으면
// 바로 콘텐츠 표시
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

                        // 한 번 등장하면
                        // 더 이상 감시하지 않음
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
            revealObserver.observe(
                element
            );
        }
    );
}


// ==============================
// Contact Form
// ==============================

const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// 에러 표시
const showError = (
    input,
    message
) => {
    input.classList.add("error");

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


// 에러 제거
const clearError = (input) => {
    input.classList.remove("error");

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


// 이름 검증
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


// 이메일 검증
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


// 메시지 검증
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


// Form 전체 검증
const validateForm = () => {
    // 각각 따로 실행해야
    // 모든 필드의 에러를 한 번에 표시할 수 있음
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


// 이름 입력 중
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


// 이메일 입력 중
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


// 메시지 입력 중
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


// Form 제출
contactForm.addEventListener(
    "submit",
    (event) => {
        // 기본 Form 제출 방지
        event.preventDefault();

        const isValid =
            validateForm();

        if (!isValid) {
            formStatus.textContent =
                "";

            // 첫 번째 오류 필드로
            // 포커스 이동
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
        ].forEach(clearError);
    }
);


// ==============================
// GitHub Projects
// ==============================

// GitHub에서 받은 텍스트를
// innerHTML에 안전하게 넣기 위한 처리
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


// Loading
const renderLoading = () => {
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


// Empty
const renderEmpty = () => {
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


// Error
const renderError = (message) => {
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


// Success
const renderProjects = (
    repositories
) => {
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
                // 구조분해 할당
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


// GitHub API 호출
const fetchProjects = async () => {
    renderLoading();

    try {
        const response =
            await fetch(
                GITHUB_API_URL
            );


        // API Rate Limit
        if (
            response.status === 403 ||
            response.status === 429
        ) {
            throw new Error(
                "RATE_LIMIT"
            );
        }


        // 사용자 없음
        if (
            response.status === 404
        ) {
            throw new Error(
                "NOT_FOUND"
            );
        }


        // 기타 HTTP 오류
        if (!response.ok) {
            throw new Error(
                `HTTP_${response.status}`
            );
        }


        const repositories =
            await response.json();


        // 예상하지 못한 데이터 형태
        if (
            !Array.isArray(
                repositories
            )
        ) {
            throw new Error(
                "INVALID_DATA"
            );
        }


        // Empty
        if (
            repositories.length === 0
        ) {
            renderEmpty();

            return;
        }


        // Success
        renderProjects(
            repositories
        );

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


// 동적으로 만들어지는
// 다시 시도 버튼 처리
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


// 최초 GitHub 프로젝트 요청
fetchProjects();