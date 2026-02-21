# 🕌 Namaz App - সহজ নামাজ শিক্ষা 📖✨

![Namaz App Preview](https://img.shields.io/badge/Status-Active-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

A beautifully designed, easy-to-use, and fully dynamic web application for learning how to perform Salah (Namaz). This app provides step-by-step guidance for all five daily prayers, including Witr, Tahajjud, and Ishraq, complete with Arabic text, Bengali translation, and pronunciation.

Designed with a modern "glassmorphic" UI, smooth animations, and a mobile-first approach, it aims to make learning Namaz accessible and intuitive for Bengali-speaking users.

---

## 🌟 Features

*   **Complete Prayer Guide:** Detailed, step-by-step instructions for Fajr, Dhuhr, Asr, Maghrib, Isha, Witr, Tahajjud, and Ishraq.
*   **Dynamic Rakat Generation:** Automatically generates the correct sequence of steps, Surahs, and Duas based on the selected prayer and its type (Farz, Sunnah, or Nofol).
*   **Rich Surah Library:** Integrates 11 well-known Surahs (Al-Fatiha, Al-Ikhlas, Al-Falaq, An-Nas, Al-Kawthar, Al-Asr, Al-Ma'un, Al-Fil, Quraish, Al-Kafirun, An-Nasr) that rotate dynamically across different Rakats to enhance variety.
*   **Trilingual Support:** Every Dua and Surah is presented in clear **Arabic** script, accurate **Bengali pronunciation**, and detailed **Bengali meaning**.
*   **Interactive UI:**
    *   Clean, minimalist design utilizing **Tailwind CSS**.
    *   Animated "Sticky Status Bar" when scrolling to keep track of the current Rakat and Prayer type.
    *   Smooth horizontal and vertical navigation free of UI layout shifts (glitches).
    *   Expandable "Meaning/Translation" (অর্থ দেখুন) sections to keep the interface uncluttered.
*   **Responsive & Mobile-First:** Carefully crafted padding and responsive typography ensure edge-to-edge readability on smaller screens while looking professional on desktops.
*   **SEO Optimized:** Fully equipped with meta tags, Open Graph (Facebook), and Twitter Cards for optimal search engine visibility and social media sharing. Offline-ready potential.

---

## 🚀 Live Demo

**[Namaz Guide App - Live Preview](https://namaz-guides.vercel.app/)**

---

## 📂 Project Structure

The project relies entirely on client-side technologies (Vanilla JS, HTML, CSS), meaning no backend server is required to run the core features.

```text
namz/
│
├── index.html        # Main entry point containing the UI structure and SEO tags.
├── css/
│   ├── style.css     # Source CSS with Tailwind imports, variable definitions, and custom animations.
│   └── app.css       # The compiled Tailwind stylesheet linked in the HTML.
├── js/
│   ├── app.js        # Core logic for DOM manipulation, navigation (Next/Prev), and smooth scrolling.
│   └── data.js       # Dynamic data structure containing all Prayers, Surahs, Duas, and state logic.
└── img/
    └── favicon.png   # Application icon.
```

---

## 🛠️ Technologies Used

*   **Frontend Framework:** Tailwind CSS v4 (locally compiled for maximum performance and offline support).
*   **Core Logic:** Vanilla JavaScript (ES6+).
*   **Markup & Styling:** HTML5, CSS3.
*   **Typography:** Google Fonts (`Amiri` and `Noto Naskh Arabic` for authentic Arabic rendering; `Hind Siliguri` for beautiful Bengali display).

---

## 💻 Installation & Setup

Since this application's CSS is now fully precompiled locally using Tailwind CSS v4, you can run it offline without needing any extra setup.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/websmartbd/namaz-guide.git
    cd namaz-guide
    ```

2.  **Run Locally (Ready-to-use):**
    You don't need any build tools to view the app. Just open the `index.html` file in your preferred browser, or use **Live Server** in VS Code.

3.  **Development / Editing CSS:**
    If you wish to modify the Tailwind utility classes or edit the CSS:
    ```bash
    npm install
    ```
    Then, to start the Tailwind watcher while you work:
    ```bash
    npm run dev
    ```
    To create a minified production build:
    ```bash
    npm run build
    ```

---

## 💡 How It Works (Behind the Scenes)

*   **State Management:** The app relies on three main variables in `app.js` (`currentPrayer`, `currentType`, `currentPhase`) to quickly swap out the UI elements without reloading the page.
*   **Data Structure (`data.js`):** The `generateSteps()` function acts as the brain of the app. It constructs arrays of objects detailing every single posture (Qiyam, Ruku, Sujud), the associated Duas, and the necessary Surah distribution logic (e.g., ensuring Witr gets Dua Qunut in the 3rd Rakat).
*   **Scroll Calculations:** To prevent awkward jumps when navigating, the app uses safe math calculations (`offsetLeft`, `clientWidth`) to precisely scroll the horizontal tabs into the center of the viewport via `.scrollTo({ behavior: 'smooth' })`.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! If you spot a typo in the Arabic/Bengali transliteration, or have ideas for new features (e.g., Audio Recitations, Qibla Compass, or Dark Mode), feel free to contribute.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---
**Made with ❤️ and dedication for the Ummah.** 🌙
