/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        accent: "var(--accent)",
        aliceblue: "aliceblue"
      },
     width: {
        '10s': '10vw',
        '20s': '20vw',
        '30s': '30vw',
        '40s': '40vw',
        '50s': '50vw',
        '60s': '60vw',
        '70s': '70vw',
        '80s': '80vw',
        '90s': '90vw',
        '100s': '100vw',
      },
     height: {
        '10s': '10vh',
        '20s': '20vh',
        '30s': '30vh',
        '40s': '40vh',
        '50s': '50vh',
        '60s': '60vh',
        '70s': '70vh',
        '80s': '80vh',
        '90s': '90vh',
        '100s': '100vh',
      }
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
