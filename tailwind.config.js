module.exports = {
  content: [
    './docs/**/*.html',
    './core/**/*.js',
    './adapters/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}; 