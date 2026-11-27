import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "360px",
      sm: "640px",
      md: "760px", // specified in design brief
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4k": "2560px",
      "ultra-4k": "3840px",
    },
    extend: {
      colors: {
        primaryText: "#0D0B1A",
        secondaryText: "#4A4568",
        mainBg: "#E7E3FB",
        lightBg: "#E4E0FA",
        accent: "#5B3BD1",
        darkSection: "#3A1F8C",
        highlight: "#CFC6F6",
        pureWhite: "#FFFFFF",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.2, 0.8, 0.15, 1)",
      },
      animation: {
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "rotate-slow": "rotateSlow 24s linear infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(3deg)" },
        },
        rotateSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "0.85", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.03)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
