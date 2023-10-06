/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...colors,
      'background':'#141414',
      'primary':'#6D6D6E',
      'secondary':'#F8F9FD',
      'black-third':'#231D1D',
      'black-primary':'#202020',
      purple:{
        400:"#6252DF"
      },
      dimgray: {
        "100": "#737373",
        "200": "#6d6d6e",
        "300": "#595959",
        "400": "#565657",
        "500": "#545454",
        "600": "#535353",
        "700": "#4f4e57",
        "800": "#4c4c4c",
      },
      gray: {
        "100": "#939393",
        "200": "#8c8989",
        "300": "#837f7f",
        "400": "#7e7d87",
        "500": "#2c2c2c",
        "600": "#222127",
        "700": "#222",
        "800": "#2D2D2D",
        "900": "#231d1d",
        "1000": "#1f1f1f",
        "1100": "#191919",
        "1200": "#141414",
        "1300": "rgba(0, 0, 0, 0.03)",
        "1400": "rgba(0, 0, 0, 0.1)",
        "1500": "rgba(255, 255, 255, 0.65)",
        "1600": "rgba(255, 255, 255, 0.67)",
        "1700": "rgba(255, 255, 255, 0.79)",
        "1800": "rgba(0, 0, 0, 0.05)",
      },
      darkslategray: {
        "100": "#454545",
        "200": "#383838",
        "300": "#343434",
        "400": "#323232",
      },
      plum: "#beb9f9",
      lavender: "#d5d6fd",
      forestgreen: "#259f47",
      mediumseagreen: "rgba(74, 196, 108, 0.15)",
      whitesmoke: {
        "100": "#f9f9f9",
        "200": "#f7f8fa",
        "300": "#ebebeb",
        "400": "#eaeaec",
      },
      "neutral-300": "#d0d5dd",
      "neutral-900": "#101828",
      "neutral-500": "#667085",
      black: "#000",
      darkorchid: "#bb00c8",
      "neutral-600": "#475467",
      midnightblue: "#3a1a5f",
      slategray: "#726e84",
      lavenderblush: "#fef0ff",
      darkviolet: "#bb01ce",
      gainsboro: "#e5e5e5",
      ghostwhite: "#f8f9fd",
      silver: "#bbbabf",
    },
    extend: {
      boxShadow:{
        '5xl':'0px 4px 250px rgba(0, 0, 0, 0.1)',
        'custom':'0px 1.2499998807907104px 2.499999761581421px 0px #1018280F'
      },
      fontFamily:{
        inter:['Inter']
      },
      borderRadius: {
        "3xs": "11px",
        "99981xl": "100000px",
        xl: "20px",
        ssm:'2px'
      },
      fontSize: {
        xxs:"13px",
        mini: "15px",
        base: "16px",
        mid: "17px",
        xl: "20px",
        lg: "18px",
        xlg: "19px",
        "3xl": "22px",
      },
    },
  },
  plugins: [],
}
