/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
// const defaultTheme = require("tailwindcss/defaultTheme");
// const colors = require("tailwindcss/colors");
// import { flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";
// Plugin to add Tailwind colors as global CSS variables
function addVariablesForColors({ addBase, theme }: { addBase: Function; theme: (arg: string) => Record<string, string | Record<string, string>> }) {
  const colors = theme("colors");
  const newVars = Object.entries(colors).reduce<Record<string, string>>((acc, [colorKey, colorValue]) => {
    if (typeof colorValue === "string") {
      acc[`--${colorKey}`] = colorValue;
    } else {
      Object.entries(colorValue).forEach(([shade, value]) => {
        acc[`--${colorKey}-${shade}`] = value;
      });
    }
    return acc;
  }, {});

  addBase({
    ":root": newVars,
  });
}
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#DD1438",
        secondaryColor: "#212529",
      },
    },
  },
  plugins: [tailwindcssAnimate, addVariablesForColors],
};

export default config;
