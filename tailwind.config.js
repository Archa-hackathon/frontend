/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#FF4C00",
          "secondary": "#b8ff00",
          "accent": "#FF4C00",
          "neutral": "#fefefe",
          "base-100": "#0e0e0e",
          "info": "#0000ff",
          "success": "#37d115",
          "warning": "#eab308",
          "error": "#ff0000",
          "--rounded-box": "0rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "0rem", // border radius rounded-badge utility class, used in badges and similar
        },
      },
    ],
  },
  plugins: [
    daisyui,
  ],
}

