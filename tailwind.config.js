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
      borderColor: ["checked", "hover", "focus"],
      width: ["hover", "focus", "group-hover"],
      padding: ["hover", "focus", "group-hover"],
      height: ["hover", "focus", "group-hover", "group-focus"],
      borderRadius: ["hover", "focus", "group-hover", "group-focus"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
