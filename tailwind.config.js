module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        width: "width",
        padding: "padding",
      },
      width: {
        "w-25": "9rem",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      width: ["hover", "focus", "group-hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
