# NAHYEON // DEV.POOL

> 클라이언트 개발 경험을 기반으로 Web, App, AI 영역까지 확장하고 있는 개발자 포트폴리오

HTML, CSS, JavaScript만으로 제작한 반응형 개인 포트폴리오입니다.  
수영장의 레인(Lane)을 개발 경험의 영역에 빗대어 **Client / XR → Web / App → Service / AI**로 확장되는 흐름을 표현했습니다.

Light Mode는 낮의 수영장과 수면의 물결을, Dark Mode는 야간 수영장의 조명과 윤슬을 모티브로 디자인했습니다.

---

## 🔗 Demo

- GitHub Repository: [repository](https://github.com/yhana972/Codyssey_B1-1)
- GitHub Pages: [배포페이지](https://yhana972.github.io/Codyssey_B1-1/)

---

# 🖼 Preview

## Desktop / Light Mode

![Desktop Light](images/readme/desktop-light.png)

## Desktop / Dark Mode

![Desktop Dark](images/readme/desktop-dark.png)

## Mobile

![Mobile](images/readme/mobile.png)

---

# 📱 Responsive Design

Mobile First 방식으로 제작했습니다.

| 구분 | 기준 | 주요 변화 |
| --- | ---: | --- |
| Mobile | 768px 미만 | 햄버거 메뉴, 1열 중심 레이아웃 |
| Tablet | 768px 이상 | 가로 Navigation, Skills 2열 |
| Desktop | 1024px 이상 | 3개 Pool Lane, Skills 3열 |

Project 영역은 CSS Grid의 `auto-fit`, `minmax()`를 사용해 화면 폭에 따라 카드 수가 자동으로 변경됩니다.

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

---

# ✅ Responsive Verification

대표 Viewport에서 실제 레이아웃을 확인했습니다.

| Viewport | 확인 항목 | 결과 |
| ---: | --- | --- |
| 375px | 햄버거 메뉴, 1열 카드, 가로 스크롤 없음 | ✅ |
| 768px | Navigation 전환, Skills 2열, 레이아웃 깨짐 없음 | ✅ |
| 1024px | 3-Lane 구조, Skills 3열, Project Grid 정상 | ✅ |
| 1440px | Desktop 최대 너비, 카드 정렬, 여백 정상 | ✅ |

## 검증 스크린샷

### 375px
Chrome DevTools에서 Viewport Width를 `375px`로 설정해 확인했습니다.
![Responsive 375](images/readme/mobile.png)

### 768px
![Responsive 768](images/readme/responsive-768.png)

### 1024px
![Responsive 1024](images/readme/responsive-1024.png)

### 1440px
![Responsive 1440](images/readme/responsive-1440.png)

### 반응형 체크리스트

- [x] 가로 스크롤이 발생하지 않음
- [x] 768px 미만에서 햄버거 메뉴 표시
- [x] 768px 이상에서 가로 Navigation 표시
- [x] Skills 카드가 Mobile 1열 → Tablet 2열 → Desktop 3열로 변경
- [x] Project Grid가 `auto-fit + minmax()`로 자동 재배치
- [x] Contact Form이 화면 폭을 넘지 않음
- [x] 이미지 및 카드가 Container 밖으로 넘치지 않음
- [x] Light / Dark Mode 모두 동일한 반응형 구조 유지

---

# 🧭 Layout 선택 이유

## Navigation — Flexbox

Navigation은 로고, 메뉴, 버튼처럼 **한 방향으로 정렬되는 1차원 구조**이기 때문에 Flexbox를 사용했습니다.  
`align-items`, `justify-content`, `gap`을 이용해 정렬과 간격 조절이 단순하고, Mobile에서 메뉴 방향을 변경하기에도 적합합니다.

## Projects — CSS Grid

Project Card는 여러 개의 카드를 **행과 열 형태로 배치하는 2차원 구조**이므로 CSS Grid를 사용했습니다.  
`auto-fit`과 `minmax()`를 조합해 별도의 카드 개수 계산 없이 Viewport 폭에 따라 열 개수가 자동으로 변경되도록 구성했습니다.

---

# 🧠 Application State

애플리케이션에서 변경되는 상태는 하나의 `STATE` 객체로 관리합니다.

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

기본 흐름은 다음과 같습니다.

```text
사용자 이벤트
↓
STATE 변경
↓
render 함수 호출
↓
화면 반영
```

---

# 🎨 Theme

## Theme 초기화 우선순위

```text
localStorage 사용자 설정
↓
저장된 값이 없으면
↓
prefers-color-scheme 시스템 설정
```

코드에도 동일한 흐름을 주석으로 명시했습니다.

```javascript
// 초기 테마 우선순위:
// localStorage 사용자 설정 → 시스템 테마 설정
```

사용자가 Theme 버튼을 직접 누르면 해당 값을 `localStorage`에 저장하고, 이후에는 시스템 설정보다 사용자 선택을 우선합니다.

---

# ✨ Scroll Reveal Animation

`IntersectionObserver`를 사용하며 Threshold는 `0.2`입니다.

```javascript
const revealObserver =
    new IntersectionObserver(
        handleRevealEntries,
        {
            threshold: 0.2,
        }
    );
```

동작 흐름:

```text
Viewport 진입
↓
IntersectionObserver
↓
isIntersecting 확인
↓
visible Class 추가
↓
Opacity / Translate Animation
↓
unobserve()
```

## Scroll Reveal 검증

- [x] 페이지 최초 진입 시 화면 밖 요소는 숨김 상태
- [x] 요소가 Viewport에 진입하면 자연스럽게 표시
- [x] 한 번 표시된 요소는 `unobserve()` 처리
- [x] `prefers-reduced-motion` 환경에서는 즉시 표시
- [x] Threshold `0.2` 적용 확인

![Scroll Reveal](images/readme/scroll-reveal.png)

---

# 🐙 GitHub API

GitHub REST API를 사용해 Repository를 동적으로 가져옵니다.

```text
https://api.github.com/users/{username}/repos
```

현재 사용자:

```text
yhana972
```

사용 문법:

```text
fetch()
async / await
try / catch
```

## API 상태 처리

- Loading
- Success
- Empty
- 403
- 404
- 429
- 일반 HTTP Error
- Retry

---

# 🧪 GitHub API Error Test

## 404 — User Not Found

### 재현 방법

테스트 시 GitHub Username을 존재하지 않는 값으로 임시 변경합니다.

```javascript
const GITHUB_USERNAME =
    "this-user-does-not-exist-test";
```

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

테스트 후 실제 Username으로 복구합니다.

![GitHub API 404 Error Test](images/readme/api-error-404.png)

## 403 — Rate Limit

예상 Console:

```text
[GitHub API] Rate Limit Error (403)
[GitHub API Error] Error: RATE_LIMIT
```

예상 UI:

```text
GitHub API 요청 한도를 초과했습니다.
잠시 후 다시 시도해주세요.
```

## 429 — Too Many Requests

예상 Console:

```text
[GitHub API] Rate Limit Error (429)
[GitHub API Error] Error: RATE_LIMIT
```

예상 UI:

```text
GitHub API 요청 한도를 초과했습니다.
잠시 후 다시 시도해주세요.
```

## Empty

Repository 배열이 비어 있는 경우:

```text
표시할 프로젝트가 없습니다.
```

상태 UI를 표시합니다.

---

# 🔁 API Retry Policy

API 실패 시 자동 반복 요청은 수행하지 않습니다.

특히 `403`, `429`와 같은 Rate Limit 상황에서는 자동 재시도가 제한을 악화시킬 수 있으므로 다음 정책을 사용합니다.

```text
API 실패
↓
Error UI 표시
↓
사용자에게 상태 안내
↓
Retry 버튼 제공
↓
사용자가 명시적으로 다시 시도
```

현재 프로젝트는 **사용자 주도 수동 재시도 정책**을 사용합니다.  
향후 중요도가 높은 API에서는 Exponential Backoff 기반 자동 재시도를 추가할 수 있습니다.

---

# 🔎 Project Filter

Repository의 `language` 값을 기준으로 Filter Button을 자동 생성합니다.

## Array Method 사용 목적

### `map()`

Repository에서 Language만 추출하거나 Project Card HTML로 변환할 때 사용합니다.

### `filter()`

`null` Language를 제거하거나 사용자가 선택한 Language와 일치하는 Repository만 추출할 때 사용합니다.

### `forEach()`

각 DOM 요소에 동일한 동작을 적용할 때 사용합니다.

```javascript
[
    nameInput,
    emailInput,
    messageInput,
].forEach(
    clearError
);
```

---

# 📮 Contact Form

Form 구성:

- 이름
- 이메일
- 메시지

Custom Validation을 JavaScript로 구현했습니다.

검증 실패 시 해당 Input에:

```text
error class
aria-invalid="true"
```

를 적용하고, 각 필드 아래의 `aria-live="polite"` 영역에 Error Message를 출력합니다.

실제 전송은 Formspree를 사용합니다.

```text
Submit
↓
preventDefault()
↓
Validation
↓
FormData 생성
↓
STATE.contact.isSubmitting = true
↓
fetch()
↓
Formspree
↓
Success / Error
```

---

# ♿ Accessibility Verification

접근성 관련 항목을 수동으로 검증했습니다.

| 항목 | 검증 내용 | 결과 |
| --- | --- | --- |
| Semantic HTML | `header`, `nav`, `main`, `section`, `article`, `footer` 사용 | ✅ |
| Landmark 구분 | 메인 Navigation과 Footer Social Navigation에 각각 `aria-label` 적용 | ✅ |
| Image | Profile Image에 `alt` 적용 | ✅ |
| Form Label | 모든 Input에 `label for` ↔ `id` 연결 | ✅ |
| Error 안내 | Error 영역에 `aria-live="polite"` 적용 | ✅ |
| Invalid 상태 | 검증 실패 시 `aria-invalid="true"` 적용 | ✅ |
| Menu 상태 | Hamburger Button의 `aria-expanded` 값 변경 | ✅ |
| Filter 상태 | Project Filter에 `aria-pressed` 적용 | ✅ |
| Loading 상태 | `aria-busy` 사용 | ✅ |
| Keyboard | Tab 이동 가능 | ✅ |
| Escape | 열린 Mobile Menu를 `Escape`로 닫을 수 있음 | ✅ |
| Focus | `:focus-visible` 표시 | ✅ |
| Reduced Motion | `prefers-reduced-motion` 대응 | ✅ |
| Hero Typing | Screen Reader에는 완성 문장만 제공 | ✅ |

## 접근성 테스트 절차

1. `Tab` 키로 Navigation, Button, Form 요소 이동
2. Focus Ring 표시 확인
3. Mobile Menu를 열고 `Escape`로 닫기
4. Contact Form을 빈 상태로 제출
5. Error Message 및 `aria-invalid` 변경 확인
6. Browser Accessibility Tree에서 `aria-live`, `aria-expanded`, `aria-pressed` 확인
7. OS의 Reduce Motion 설정을 켜고 Animation 감소 확인

> 별도의 상용 Screen Reader 전문 테스트까지 수행한 것은 아니며, 브라우저 Accessibility Tree와 Keyboard 중심의 기본 검증을 수행했습니다.

---

# ♿ Landmark 설계

```text
Header
└── nav aria-label="메인 내비게이션"

Main
├── Hero     → aria-labelledby="hero-title"
├── About    → aria-labelledby="about-title"
├── Skills   → aria-labelledby="skills-title"
├── Projects → aria-labelledby="projects-title"
└── Contact  → aria-labelledby="contact-title"

Footer
└── nav aria-label="소셜 링크"
```

---

# 🎨 CSS Variable Structure

CSS 변수는 역할별로 그룹화했습니다.

```text
1. Theme Colors
2. Pool Lane Colors
3. Background / Surface
4. Shadow / Focus Effects
5. Layout
6. Spacing
7. Border Radius
8. Motion
9. Pointer Position
```

Dark Mode에서는 Layout과 Spacing은 유지하고 색상과 Surface 관련 변수만 Override합니다.

---

# 🔄 State → Render

## Theme

```text
Theme Button
↓
STATE.theme.current
↓
renderTheme()
↓
data-theme 변경
```

## Navigation

```text
Menu Click
↓
STATE.menu.isOpen
↓
renderMenu()
↓
class / aria 변경
```

## Projects

```text
API Response
↓
STATE.projects.repositories
↓
renderProjectFilters()
↓
renderFilteredProjects()
```

## Project Filter

```text
Filter Click
↓
STATE.projects.filter
↓
filter()
↓
renderProjects()
```

## Contact

```text
Submit
↓
Validation
↓
STATE.contact.isSubmitting
↓
fetch()
↓
Success / Error
```

---

# 🧩 ES6+ 문법

프로젝트에서 사용한 주요 JavaScript 문법:

- `const`
- `let`
- Arrow Function
- Template Literal
- Destructuring
- `map()`
- `filter()`
- `forEach()`
- Spread Syntax
- `async / await`
- `try / catch`
- `Set`
- `Array.from()`

`var`와 인라인 Event Handler는 사용하지 않았습니다.

---

# 🛠 Tech Stack

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

# 🚀 Deployment

GitHub Pages를 이용해 정적 웹사이트로 배포했습니다.

사용 설정:

```text
Source:
Deploy from a branch

Branch:
main

Folder:
/ (root)
```

배포 흐름:

```text
Local 변경
↓
git add .
↓
git commit
↓
git push
↓
GitHub main Branch
↓
GitHub Pages 자동 반영
```

별도의 Build Tool이나 Bundler는 사용하지 않습니다.

---

# 📂 Project Structure

```text
portfolio/
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
        ├── responsive-375.png
        ├── responsive-768.png
        ├── responsive-1024.png
        ├── responsive-1440.png
        └── scroll-reveal.png
```

---

# ✅ 구현 현황

## 필수 미션

- [x] Semantic HTML
- [x] Hero / About / Skills / Projects / Contact / Footer
- [x] Mobile First
- [x] 768px / 1024px Breakpoint
- [x] Responsive Web
- [x] Flexbox Navigation
- [x] CSS Grid
- [x] `auto-fit`
- [x] `minmax()`
- [x] Hamburger Menu
- [x] Smooth Scroll
- [x] Scroll Header
- [x] Scroll Top Button
- [x] Light / Dark Theme
- [x] localStorage
- [x] IntersectionObserver
- [x] Form Validation
- [x] GitHub API
- [x] Loading / Success / Error / Empty
- [x] ES6+ 문법
- [x] State → Render 구조
- [x] 단일 `STATE` 객체
- [x] 명명 Event Handler
- [x] Accessibility 기본 대응

## 선택 미션

- [x] GitHub Project Language Filter
- [x] Hero Typing Animation
- [x] System Dark Mode
- [x] 실제 Contact Form 전송

---

# 🧪 Final QA Checklist

## UI

- [x] 375px
- [x] 768px
- [x] 1024px
- [x] 1440px
- [x] Light Mode
- [x] Dark Mode
- [x] Horizontal Overflow 없음

## Interaction

- [x] Hamburger
- [x] Escape
- [x] Smooth Scroll
- [x] Scroll Top
- [x] Header Scroll State
- [x] Scroll Reveal
- [x] Hero Typing
- [x] Theme Toggle
- [x] System Theme
- [x] Project Filter

## API / Form

- [x] GitHub Success
- [x] GitHub Empty UI
- [x] GitHub Error UI
- [x] GitHub Retry
- [x] Contact Validation
- [x] Formspree 실제 전송

## Accessibility

- [x] Keyboard Tab
- [x] Focus Visible
- [x] aria-expanded
- [x] aria-pressed
- [x] aria-invalid
- [x] aria-live
- [x] aria-busy
- [x] Reduced Motion

---

# 👩‍💻 Developer

**NaHyeon Kim**

Client Developer

GitHub  
https://github.com/yhana972

---

© 2026 NaHyeon Kim. All rights reserved.
