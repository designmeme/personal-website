/** @type {import('tailwindcss').Config} */
// https://github.com/tailwindlabs/tailwindcss-typography/blob/main/src/styles.js

module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          // https://github.com/tailwindlabs/tailwindcss-typography#adding-custom-color-themes
          '--tw-prose-counters': 'inherit',
          '--tw-prose-bullets': 'inherit',
          '--tw-prose-invert-counters': 'inherit',
          '--tw-prose-invert-bullets': 'inherit',
          '--tw-prose-invert-headings': 'var(--color-gray-100)',
          css: {
            a: {
              fontWeight: '400',
            },
            strong: {
              fontWeight: '500',
            },
            // 'ol > li': {
            //   paddingInlineStart: '0em'
            // },
            // 'ul > li': {
            //   paddingInlineStart: '0em'
            // },
            blockquote: {
              fontWeight: '400',
              fontStyle: 'normal',
            },
            'blockquote p:first-of-type::before': {
              content: '',
            },
            'blockquote p:last-of-type::after': {
              content: '',
            },
            h1: {
              fontWeight: '700',
            },
            h2: {
              fontWeight: '500',
            },
            h3: {
              fontWeight: '500',
            },
            h4: {
              fontWeight: '500',
            },
            figcaption: {
              textAlign: 'center',
            }
          },
        },
      },
    },
  },
}
