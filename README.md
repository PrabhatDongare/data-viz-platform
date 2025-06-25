# DATA-VIZ-PLATFORM

---

## Setup Instructions

Follow the steps below to set up and run the project locally:

### 1. Expected Package Versions

```bash
Node.js v22.14.0
npm v10.9.2
```

### 2. Clone the Repository

```bash
git clone https://github.com/PrabhatDongare/data-viz-platform.git
cd data-viz-platform
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Once running, open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Preview the Production Build

```bash
npm run preview
```

### 6. Build for Production

```bash
npm run build
```

---

## Features

- Clean and maintainable code structure
- Scalable, component-based architecture
- Smooth and intuitive interactions
- Firebase-based authentication with Google OAuth
- Form handling with \`react-hook-form\` and validation using \`zod\`
- Responsive design
- Edge cases handled
- Well-commented code

---

## Technical Decisions and Trade-offs

- Used **Firebase Authentication** with Google OAuth for simplicity and ease of integration.
- Forms are built using **React Hook Form** with **Zod** for schema validation.
- Ensured the UI closely matches the Figma design using a unified form layout.
- Implemented **smooth transitions** throughout the app to enhance user experience.
- Used **Chart.js** for rendering the line chart with custom styling. With more time, further customization (e.g., glow, better hover UX) could be enhanced.
- For demonstration purposes, only the **CO₂ distribution** chart shows a panel on 1.5-second hover delay, and multi-variable selection is supported.

---

## Known Limitations

- While I initially expected to use Redux Toolkit as I do in most of my projects, the scope of this assignment didn’t really require global state management.
- **Chart.js**, while powerful, can be limiting when creating highly customized chart interactions or visuals.

---

## Time Spent

It took me a little more than one and a half days to complete the core functionality, and a few additional hours to implement and polish the graph section.  
**Overall, around two days and a few hours** is a fair estimate of the total time spent.
