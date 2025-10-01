/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F1F4F9",
        border: "#EAF0FA",
        text: {
          primary: "#122945",
          secondary: "#5E7793",
          header: "#899CB1",
        },
        blue: {
          primary: "#005FF8",
        },
        icon: "#ADBFDF",
        status: {
          excellent: {
            bg: "#DBF8EF",
            border: "#28A879",
            text: "#00A775",
          },
          good: {
            bg: "#D8E4FB",
            border: "#ADBFDF",
            text: "#122945",
          },
          bad: {
            bg: "#FEE9EF",
            border: "#EA1A4F",
            text: "#EA1A4F",
          },
        },
        call: {
          incoming: "#005FF8",
          outgoing: "#28A879",
          missed: "#EA1A4F",
        },
      },
      fontFamily: {
        "sf-pro": ["SF Pro Display", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
