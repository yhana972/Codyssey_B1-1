# NAHYEON // DEV.POOL

> Client / XR 경험을 기반으로 Web / App / Service / AI까지 확장하는 개발자 포트폴리오

HTML, CSS, Vanilla JavaScript로 제작한 반응형 포트폴리오입니다.  
수영장의 Lane을 개발 경험의 영역에 빗대어 **Client / XR → Web / App → Service / AI** 흐름을 표현했습니다.

- Repository: https://github.com/yhana972/Codyssey_B1-1
- GitHub Pages: https://yhana972.github.io/Codyssey_B1-1/

---

## Preview

### Desktop / Light
![Desktop Light](images/readme/desktop-light.png)

### Desktop / Dark
![Desktop Dark](images/readme/desktop-dark.png)

### Mobile / 375px
![Mobile](images/readme/mobile.png)

---

# 1. Responsive Design

Mobile First 방식으로 제작했습니다.

| 구분 | 기준 | 주요 변화 |
| --- | ---: | --- |
| Mobile | 768px 미만 | Hamburger Navigation, 1열 중심 |
| Tablet | 768px 이상 | 가로 Navigation, Skills 2열 |
| Desktop | 1024px 이상 | 3-Lane 구조, Skills 3열 |

Project 영역은 `auto-fit + minmax()`를 사용합니다.

```css
.projects-grid {
    display: grid;
    grid-template-columns:
        repeat(
            auto-fit,
            minmax(
                min(100%, 300px),
                1fr
            )
        );
}
```

## Breakpoint Style Snapshot

### Mobile

```css
.skills-grid {
    grid-template-columns:
        minmax(0, 1fr);
}

.nav-list {
    display: none;
}
```

### Tablet — 768px

```css
@media (min-width: 768px) {
    .nav-list,
    .nav-list.active {
        display: flex;
        flex-direction: row;
    }

    .menu-toggle {
        display: none;
    }

    .skills-grid {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
    }
}
```

### Desktop — 1024px

```css
@media (min-width: 1024px) {
    .skills-grid {
        grid-template-columns:
            repeat(3, minmax(0, 1fr));
    }

    .lane-line:nth-child(2) {
        left: 33.333333%;
    }

    .lane-line:nth-child(3) {
        left: 66.666666%;
    }
}
```

## Responsive Verification

| Viewport | 확인 항목 | 결과 |
| ---: | --- | --- |
| 375px | Hamburger, 1열, 가로 Overflow 없음 | ✅ |
| 768px | Navigation 전환, Skills 2열 | ✅ |
| 1024px | 3-Lane, Skills 3열 | ✅ |
| 1440px | Desktop 정렬 / 여백 정상 | ✅ |

### 375px
![Responsive 375](images/readme/mobile.png)

### 768px
![Responsive 768](images/readme/responsive-768.png)

### 1024px
![Responsive 1024](images/readme/responsive-1024.png)

### 1440px
![Responsive 1440](images/readme/desktop-light.png)

---

# 2. Layout 선택 이유

## Navigation — Flexbox

Navigation은 로고, 메뉴, 버튼을 한 방향으로 배치하는 **1차원 구조**이므로 Flexbox를 사용했습니다.

- 장점: 정렬과 간격 제어가 단순하고 Mobile/Desktop 전환이 쉬움
- 단점: 행·열을 동시에 다루는 카드 Layout에는 Grid보다 불편함

## Projects — CSS Grid

Project Card는 여러 카드를 행과 열로 배치하는 **2차원 구조**이므로 Grid를 사용했습니다.

- 장점: `auto-fit + minmax()`로 열 개수를 자동 계산할 수 있음
- 단점: 단순 일렬 메뉴에는 Flexbox보다 설정이 많음

---

# 3. Application State

변경 가능한 UI 상태는 하나의 `STATE` 객체에서 관리합니다.

```javascript
const STATE = {
    theme: {
        current: "light",
        hasUserPreference: false,
    },

    menu: {
        isOpen: false,
    },

    projects: {
        repositories: [],
        filter: "ALL",
        status: "idle",
    },

    contact: {
        isSubmitting: false,
    },
};
```

기본 흐름:

```text
Event
↓
STATE 변경
↓
Render 함수
↓
UI 반영
```

## State 불변성 확장 전략

현재 프로젝트는 상태 규모가 작아 필요한 속성만 직접 갱신합니다.

```javascript
STATE.projects.filter =
    "JavaScript";
```

규모가 커질 경우에는 Spread Syntax를 이용한 Immutable Update Pattern을 적용할 수 있습니다.

```javascript
const nextState = {
    ...STATE,

    projects: {
        ...STATE.projects,
        filter: "JavaScript",
    },
};
```

---

# 4. Theme

초기 Theme 우선순위:

```text
localStorage 사용자 설정
↓
저장값이 없으면
↓
prefers-color-scheme
```

사용자가 Theme Button을 누르면 이후에는 시스템 설정보다 사용자 선택을 우선합니다.

## Theme 전환 시 이미지 / 외부 자원

현재 Theme 변경은 CSS Custom Properties와 `data-theme`만 변경합니다.

- Light / Dark에서 동일한 Profile Image 사용
- Theme 전환 시 이미지 재요청 없음
- 별도 외부 Theme Image 없음
- Pointer / Surface 효과는 CSS 변수와 Gradient로 변경
- Theme 변경으로 추가 Network Request가 발생하지 않음

향후 Theme별 이미지를 사용할 경우 Preload 또는 Fade Transition을 적용할 수 있습니다.

---

# 5. Scroll Interaction

## Scroll Reveal

`IntersectionObserver`의 Threshold는 `0.2`입니다.

```javascript
new IntersectionObserver(
    handleRevealEntries,
    {
        threshold: 0.2,
    }
);
```

동작:

```text
Viewport 진입
↓
isIntersecting
↓
visible Class 추가
↓
Animation
↓
unobserve()
```

### 성능 고려

- 표시 완료 후 `unobserve()`
- `scroll` Event에 `passive: true`
- Scroll 중 DOM 재생성 없이 Class만 변경
- `prefers-reduced-motion`에서 Animation 생략
- Fine Pointer 환경에서만 Pointer Effect 활성화

별도의 FPS Benchmark는 수행하지 않았으며, 실제로 측정하지 않은 수치는 문서에 기재하지 않았습니다.

![Scroll Reveal](images/readme/scroll-reveal.png)

---

# 6. GitHub API

GitHub REST API를 `fetch + async/await + try/catch`로 처리합니다.

지원 상태:

- Loading
- Success
- Empty
- 403
- 404
- 429
- 일반 HTTP Error
- Retry

## API 오류 검증

### 404

예상 Console:

```text
[GitHub API] User Not Found (404)
[GitHub API Error] Error: NOT_FOUND
```

예상 UI:

```text
GitHub 사용자를 찾을 수 없습니다.
[다시 시도]
```

![GitHub API 404 Error Test](images/readme/api-error-404.png)

### 403 / 429

Rate Limit 상황에서는 자동 재시도를 반복하지 않습니다.

```text
API 실패
↓
Error UI
↓
Retry Button
↓
사용자 명시적 재시도
```

## Timeout / Retry 확장 전략

현재는 사용자 주도 Retry만 사용합니다.

향후에는:

```text
fetch()
↓
AbortController
↓
Timeout 시 요청 취소
↓
Network Error에 한해 제한된 자동 재시도
↓
403 / 429는 자동 반복 제외
```

방식으로 확장할 수 있습니다.

---

# 7. Project Filter / 대량 데이터 전략

Repository의 `language`를 기준으로 `map()`, `filter()`, `Set`을 사용해 Filter Button을 생성합니다.

- `map()` : Repository → Language / Card HTML 변환
- `filter()` : null 제거 / 선택 Language 추출
- `forEach()` : 여러 DOM 요소에 같은 처리 적용

현재 API는 `per_page=30`으로 제한되어 있어 전체 Rendering 방식을 사용합니다.

대량 데이터에서는 다음을 고려할 수 있습니다.

```text
API Pagination
↓
페이지 단위 요청
↓
Lazy Rendering
↓
Infinite Scroll
↓
필요 시 Virtual List
```

현재 규모에서는 단순한 전체 Render가 가독성과 학습 목적에 적합합니다.

---

# 8. Contact Form Validation

검증 규칙:

| 필드 | 규칙 |
| --- | --- |
| 이름 | 필수, 2~30자 |
| 이메일 | 필수, 이메일 형식, 최대 100자 |
| 메시지 | 필수, 10~1000자 |

HTML의 `minlength`, `maxlength`와 JavaScript Custom Validation 기준을 동일하게 유지합니다.

Validation 실패 시:

```text
error class
aria-invalid="true"
aria-live="polite"
```

를 적용합니다.

실제 전송은 Formspree를 사용합니다.

---

# 9. Accessibility

## Landmark 목적

```text
Header
└── nav aria-label="메인 내비게이션"
    → 페이지 내부 이동

Main
├── Hero
├── About
├── Skills
├── Projects
└── Contact
    → 핵심 콘텐츠

Footer
└── nav aria-label="소셜 링크"
    → 외부 개발자 프로필 이동
```

## 수동 검증 결과

| 항목 | 결과 |
| --- | --- |
| Semantic HTML | ✅ |
| `alt` / `label` | ✅ |
| `aria-expanded` | ✅ |
| `aria-pressed` | ✅ |
| `aria-invalid` | ✅ |
| `aria-live` | ✅ |
| `aria-busy` | ✅ |
| Keyboard Tab | ✅ |
| Escape Menu Close | ✅ |
| Focus Visible | ✅ |
| Reduced Motion | ✅ |

테스트 경로:

```text
Tab
↓
Navigation
↓
Theme Button
↓
Hero Action
↓
Project Filter
↓
Contact Form
↓
Submit
```

실제로 수행하지 않은 전문 VoiceOver/NVDA 전체 시나리오 및 Lighthouse 결과는 완료 항목으로 표시하지 않았습니다.

---

# 10. CSS Variable Structure

전역 변수는 역할별로 분리했습니다.

```text
1. Theme Colors
2. Pool Lane Colors
3. Background / Surface
4. Shadow / Focus
5. Typography
6. Layout
7. Spacing
8. Border Radius
9. Motion
10. Pointer Position
```

## Typography Scale

```css
--font-size-xs: 0.8rem;
--font-size-sm: 0.9rem;
--font-size-base: 1rem;
--font-size-md: 1.3rem;

--font-size-lg:
    clamp(1.8rem, 5vw, 2.8rem);

--font-size-hero:
    clamp(2.2rem, 8vw, 4.5rem);

--font-weight-normal: 400;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

Font Size / Weight / Family / Line Height를 변수화해 유지보수 범위를 줄였습니다.

---

# 11. JavaScript 모듈화 계획

현재는 Vanilla JavaScript의 전체 흐름을 한 파일에서 학습하기 위해 `main.js`를 단일 Entry Point로 유지합니다.

현재:

```text
js/
└── main.js
```

확장 시:

```text
js/
├── state.js
├── theme.js
├── navigation.js
├── scroll.js
├── projects.js
├── contact.js
└── main.js
```

| 파일 | 역할 |
| --- | --- |
| `state.js` | 상태 관리 |
| `theme.js` | Theme / Storage |
| `navigation.js` | Hamburger / Navigation |
| `scroll.js` | Scroll / Reveal |
| `projects.js` | GitHub API / Filter |
| `contact.js` | Validation / Formspree |
| `main.js` | 초기화 |

---

# 12. Tech Stack

## Frontend

- HTML5
- CSS3
- Vanilla JavaScript

## API / Service

- GitHub REST API
- Formspree

## Deployment

- GitHub Pages

---

# 13. Deployment

GitHub Pages 설정:

```text
Source:
Deploy from a branch

Branch:
main

Folder:
/ (root)
```

별도의 Build Tool이나 Bundler는 사용하지 않습니다.

---

# 14. Project Structure

```text
Codyssey_B1-1/
│
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   └── main.js
│
└── images/
    ├── profile.jpeg
    └── readme/
        ├── desktop-light.png
        ├── desktop-dark.png
        ├── mobile.png
        ├── responsive-768.png
        ├── responsive-1024.png
        ├── scroll-reveal.png
        └── api-error-404.png
```

---

# 15. 구현 현황

## 필수 미션

- [x] Semantic HTML
- [x] Responsive / Mobile First
- [x] Flexbox / Grid
- [x] `auto-fit` / `minmax()`
- [x] Hamburger Menu
- [x] Smooth Scroll
- [x] Scroll Top
- [x] Theme / localStorage
- [x] IntersectionObserver
- [x] Form Validation
- [x] GitHub API
- [x] API State UI
- [x] ES6+
- [x] 단일 `STATE`
- [x] 명명 Event Handler
- [x] Accessibility 기본 대응

## 선택 미션

- [x] GitHub Language Filter
- [x] Hero Typing
- [x] System Dark Mode
- [x] Formspree 실제 전송

---

# Developer

**NaHyeon Kim**  
Client Developer

GitHub  
https://github.com/yhana972

---

© 2026 NaHyeon Kim. All rights reserved.
