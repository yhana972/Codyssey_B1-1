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