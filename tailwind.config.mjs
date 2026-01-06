/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Claude Light Theme - 使用slate-050作为主背景
        paper: 'hsl(48, 33.3%, 97.1%)',  // --slate-050: 非常浅的暖灰色
        ink: 'hsl(49, 6.9%, 5.5%)',      // --text-000: 主要文本色
        night: '#1C1C1E',                 // 深色模式背景
        moon: '#E0E0E0',                  // 深色模式文本
        accent: 'hsl(15, 63.1%, 59.6%)', // --clay: Claude品牌色
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Noto Sans SC', 'Helvetica Neue', 'Arial', 'sans-serif'],
        reading: ['Noto Serif SC', 'Source Han Serif SC', 'Songti SC', 'SimSun', 'Georgia', 'serif'],
      },
      fontSize: {
        'reading': ['1.125rem', { lineHeight: '1.8' }],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
