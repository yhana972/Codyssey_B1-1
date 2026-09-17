# NAHYEON // DEV.POOL

> 클라이언트 개발 경험을 기반으로 Web, App, AI 영역까지 확장하고 있는 개발자 포트폴리오

HTML, CSS, JavaScript만을 사용해 제작한 반응형 개인 포트폴리오입니다.

수영장의 레인(Lane)을 개발 경험의 영역에 빗대어  
**Client / XR → Web / App → Service / AI**로 확장되는 개발 경험을 표현했습니다.

Light Mode는 낮의 수영장과 수면의 물결을,  
Dark Mode는 야간 수영장의 조명과 윤슬을 모티브로 디자인했습니다.

---

## 🔗 Demo

- GitHub Repository: `추후 Repository URL 입력`
- GitHub Pages: `배포 후 URL 입력`

---

## 🖼 Preview

### Desktop / Light Mode

<!-- 배포 전 스크린샷 추가 -->
![Desktop Light](images/readme/desktop-light.png)

### Desktop / Dark Mode

<!-- 배포 전 스크린샷 추가 -->
![Desktop Dark](images/readme/desktop-dark.png)

### Mobile

<!-- 배포 전 스크린샷 추가 -->
![Mobile](images/readme/mobile.png)

---

# 주요 기능

## 1. Responsive Portfolio

Mobile First 방식으로 제작했습니다.

주요 Breakpoint는 다음과 같습니다.

| 구분 | 기준 |
| --- | --- |
| Mobile | 768px 미만 |
| Tablet | 768px 이상 |
| Desktop | 1024px 이상 |

Navigation은 Flexbox를 사용하고,  
Project 영역은 CSS Grid의 `auto-fit`, `minmax()`를 사용해 화면 크기에 따라 카드 수가 자동으로 변경됩니다.

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

## 2. Mobile Navigation

768px 미만에서는 Hamburger Menu를 사용할 수 있습니다.

### 지원 기능

- 메뉴 열기 / 닫기
- 메뉴 링크 선택 후 자동 닫기
- 메뉴 바깥 영역 클릭 시 닫기
- `Escape` 키로 닫기
- `aria-expanded` 상태 변경

JavaScript의 `classList`를 이용해 상태를 제어합니다.

```text
Click
↓
Menu State 변경
↓
classList 변경
↓
Navigation UI 변경
```

---

## 3. Smooth Scroll

Navigation 및 Hero의 버튼을 클릭하면 해당 Section으로 부드럽게 이동합니다.

JavaScript의 `scrollIntoView()`를 사용했습니다.

```javascript
target.scrollIntoView({
    behavior: "smooth",
    block: "start",
});
```

사용자가 운영체제에서 **동작 줄이기(Reduced Motion)** 옵션을 설정한 경우에는 애니메이션 없이 이동합니다.

---

## 4. Scroll Interaction

스크롤 위치에 따라 UI가 변경됩니다.

### Header

```text
scrollY >= 60px
```

Header의 Background 및 Shadow가 변경됩니다.

### Scroll To Top

```text
scrollY >= 300px
```

페이지 우측 하단에 Scroll Top 버튼이 나타납니다.

버튼을 클릭하면 페이지 최상단으로 이동합니다.

---

# 🎨 Theme

## Light / Dark Mode

CSS Custom Properties와 `data-theme` 속성을 이용해 Theme를 관리합니다.

```html
<html data-theme="dark">
```

Dark Mode에서는 다음 CSS 변수가 변경됩니다.

```css
[data-theme="dark"] {
    --color-bg: #06111f;
    --color-text: #edf5f5;
}
```

---

## Theme 저장

사용자가 직접 선택한 Theme은 `localStorage`에 저장합니다.

```javascript
localStorage.setItem(
    "theme",
    currentTheme
);
```

페이지를 새로고침해도 선택한 Theme이 유지됩니다.

---

## System Dark Mode

저장된 Theme이 없는 첫 방문 사용자는 운영체제의 Theme 설정을 확인합니다.

```javascript
window.matchMedia(
    "(prefers-color-scheme: dark)"
);
```

우선순위는 다음과 같습니다.

```text
사용자가 직접 선택한 Theme
↓
localStorage
↓
System Theme
```

사용자가 Theme을 직접 선택하지 않은 상태에서는 운영체제 Theme 변경도 실시간 반영합니다.

---

# 🌊 Pointer Interaction

Portfolio의 Pool Concept을 강화하기 위해 Pointer Interaction을 구현했습니다.

## Light Mode

마우스가 움직이는 위치에 따라 물 위를 건드리는 것처럼

- 수면 밝기 변화
- Ripple
- Refraction 느낌

을 표현합니다.

## Dark Mode

마우스 위치에 따라 야간 수영장의 조명이 수면을 비추는 것처럼

- Warm Light
- Aqua Reflection

효과가 나타납니다.

Fine Pointer가 존재하는 환경에서만 활성화됩니다.

```css
@media (pointer: fine) {
    .pointer-effect {
        display: block;
    }
}
```

---

# ✨ Scroll Reveal Animation

Section이 Viewport에 들어올 때 자연스럽게 나타나는 Animation을 구현했습니다.

`IntersectionObserver`를 사용했습니다.

```javascript
const observer =
    new IntersectionObserver(
        callback,
        {
            threshold: 0.2,
        }
    );
```

Threshold:

```text
0.2
```

요소의 약 20%가 화면에 들어오면 Animation이 실행됩니다.

한 번 나타난 요소는 `unobserve()`하여 불필요한 감시를 종료합니다.

---

# ⌨️ Hero Typing Animation

Hero Section의 문구를 JavaScript로 한 글자씩 출력합니다.

```text
서비스의 흐름을 설계합니다.
```

동작 과정:

```text
문자열
↓
Array.from()
↓
한 글자씩 출력
↓
setTimeout()
↓
완성
```

`prefers-reduced-motion` 사용자는 Animation 없이 완성된 문장이 바로 출력됩니다.

스크린리더에는 Animation과 관계없이 완성된 문장을 제공하도록 구성했습니다.

---

# 🏊 Skills

개발 경험을 세 개의 Lane으로 나누었습니다.

## LANE 01 — CLIENT / XR

- Unity
- C#
- AR / VR / XR
- Android

## LANE 02 — WEB / APP

- HTML
- CSS
- JavaScript
- React
- Flutter

## LANE 03 — SERVICE / AI

- Python
- FastAPI
- PostgreSQL
- AI / LLM API
- Docker

---

# 🐙 GitHub API

GitHub REST API를 사용하여 Repository 정보를 동적으로 가져옵니다.

```text
https://api.github.com/users/{username}/repos
```

현재 GitHub 사용자:

```text
yhana972
```

API 호출에는 다음 문법을 사용했습니다.

```javascript
fetch()
async / await
try / catch
```

---

## API State

GitHub API 상태를 각각 다른 UI로 처리합니다.

```text
Loading
↓
Success

또는

Error
Empty
Rate Limit
```

지원 상태:

- Loading
- Success
- Empty
- Error
- 404
- 403
- 429
- Retry

에러 발생 시 `다시 시도` 버튼을 제공합니다.

---

# 🔎 Project Filter

GitHub API에서 받아온 Repository의 Language를 기준으로 Filter Button을 자동 생성합니다.

예:

```text
All
HTML
JavaScript
Python
...
```

Language는 GitHub Repository 데이터에서 자동으로 추출합니다.

```javascript
repositories
    .map(({ language }) => language)
    .filter(Boolean);
```

중복 Language는 `Set`을 이용해 제거합니다.

```javascript
[
    ...new Set(languages)
]
```

사용자가 Language Button을 선택하면 `filter()`를 이용해 Repository를 필터링합니다.

```javascript
allRepositories.filter(
    ({ language }) =>
        language === currentProjectFilter
);
```

---

# 📮 Contact Form

Contact Form은 다음 필드로 구성됩니다.

- 이름
- 이메일
- 메시지

JavaScript를 이용해 Custom Validation을 구현했습니다.

---

## Validation

다음 조건을 검사합니다.

### 이름

빈 값인지 확인합니다.

### 이메일

빈 값 및 이메일 형식을 확인합니다.

```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

### 메시지

빈 값인지 확인합니다.

Validation 실패 시 각 입력 필드 근처에 Error Message를 표시합니다.

---

## Formspree

Formspree를 이용해 실제 이메일 전송 기능을 구현했습니다.

동작 흐름:

```text
Submit
↓
preventDefault()
↓
Validation
↓
FormData 생성
↓
fetch()
↓
Formspree
↓
Success / Error
```

전송 중에는 중복 요청 방지를 위해 Submit Button을 비활성화합니다.

```text
Send Message
↓
Sending...
↓
전송 완료
```

성공 시:

```text
메시지가 전송되었습니다. 감사합니다!
```

메시지를 표시하고 Form을 초기화합니다.

---

# 🔄 State → Render

이번 프로젝트에서는 사용자 이벤트와 상태를 분리해서 UI에 반영하는 흐름을 여러 곳에 적용했습니다.

### Theme

```text
Theme Button
↓
currentTheme
↓
data-theme
↓
UI 변경
```

### Mobile Navigation

```text
Menu Click
↓
Menu State
↓
classList
↓
Navigation 표시
```

### GitHub API

```text
API Request
↓
Loading
↓
Success / Error / Empty
↓
Project UI
```

### Project Filter

```text
Filter Click
↓
currentProjectFilter
↓
filter()
↓
Project Rendering
```

### Contact Form

```text
Submit
↓
Validation
↓
Sending
↓
Success / Error
```

---

# 🧩 ES6+ 문법

프로젝트에서 사용한 주요 JavaScript 문법입니다.

### `const` / `let`

```javascript
const name = "NaHyeon";
let currentTheme = "light";
```

`var`는 사용하지 않았습니다.

### Arrow Function

```javascript
const validateForm = () => {
    // ...
};
```

### Template Literal

```javascript
const url =
    `https://api.github.com/users/${username}/repos`;
```

### Destructuring

```javascript
const {
    name,
    description,
    language,
} = repository;
```

### Array Methods

```text
map()
filter()
forEach()
```

### Spread Syntax

```javascript
[
    ...new Set(languages)
]
```

### async / await

```javascript
const response =
    await fetch(url);
```

---

# ♿ Accessibility

기본적인 웹 접근성을 함께 고려했습니다.

- Semantic HTML
- `alt`
- `label`
- `aria-label`
- `aria-describedby`
- `aria-expanded`
- `aria-pressed`
- `aria-invalid`
- `aria-live`
- `aria-busy`
- Keyboard Escape 지원
- Focus Visible
- Reduced Motion 대응
- Screen Reader용 Hero Text

---

# 🛠 Tech Stack

## Frontend

- HTML5
- CSS3
- Vanilla JavaScript

## API

- GitHub REST API
- Formspree

## Deployment

- GitHub Pages

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
    │
    └── readme/
        ├── desktop-light.png
        ├── desktop-dark.png
        └── mobile.png
```

---

# 🚀 실행 방법

Repository를 Clone합니다.

```bash
git clone YOUR_REPOSITORY_URL
```

프로젝트 폴더로 이동합니다.

```bash
cd YOUR_REPOSITORY_NAME
```

VS Code에서 프로젝트를 열고 Live Server 등을 이용해 `index.html`을 실행합니다.

별도의 Package 설치나 Build 과정은 필요하지 않습니다.

---

# 📱 Responsive Test

개발 과정에서 다음 Viewport를 기준으로 확인했습니다.

```text
375px
768px
1024px
1440px
```

확인 항목:

- Navigation
- Typography
- Skill Card
- Project Grid
- Contact Form
- Pool Lane
- Light / Dark Mode
- Overflow

---

# ✅ 구현 현황

## 필수 미션

- [x] Semantic HTML
- [x] Hero / About / Skills / Projects / Contact / Footer
- [x] Mobile First
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

## 선택 미션

- [x] GitHub Project Language Filter
- [x] Hero Typing Animation
- [x] System Dark Mode
- [x] 실제 Contact Form 전송

---

# 📝 주요 학습 내용

이번 프로젝트를 통해 단순히 HTML/CSS로 화면을 구성하는 것을 넘어  
사용자의 행동과 애플리케이션 상태에 따라 UI가 변경되는 흐름을 구현했습니다.

특히 다음 내용을 직접 적용했습니다.

```text
DOM Selection
Event Handling
State Management
Form Validation
Responsive Layout
Web Accessibility
REST API
Async / Await
Error Handling
Local Storage
Intersection Observer
External Form API
```

프레임워크 없이 Vanilla JavaScript만 사용하면서  
브라우저에서 UI가 어떻게 동작하고 상태가 어떻게 화면에 반영되는지 이해하는 데 중점을 두었습니다.

---

# 👩‍💻 Developer

**NaHyeon Kim**

Client Developer

GitHub  
https://github.com/yhana972

---

© 2026 NaHyeon Kim. All rights reserved.
