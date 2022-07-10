const plugin = require('tailwindcss/plugin');

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = theme => ({
  corePlugins: {
    // ...
    textOpacity: false,
    backgroundOpacity: false,
  },
  content: [
    './src/**/*.tsx',
    '../../ui/ng/components/**/*.tsx',
    '../../ui/products/components/**/*.tsx',
    '../../ui/teasers/components/**/*.tsx',
    '../../ui/shared/headwind/**/*.tsx',
    '../../ui/epg/components/**/*.tsx',
    '../../ui/icons/components/**/*.tsx',
    '../../ui/promotion/components/**/*.tsx',
    '../../ui/velour/components/**/*.tsx',
  ],
  theme,
  plugins: [
    plugin(({ addUtilities }) => {
      const typos = {
        '.typo-heading-3xl': {
          fontSize: theme.fontSize['3XL'],
          lineHeight: theme.lineHeight.largeHeadings,
        },
        '.typo-heading-2xl': {
          fontSize: theme.fontSize['2XL'],
          lineHeight: theme.lineHeight.largeHeadings,
        },
        '.typo-heading-xl': {
          fontSize: theme.fontSize.XL,
          lineHeight: theme.lineHeight.largeHeadings,
        },
        '.typo-heading-l': {
          fontSize: theme.fontSize.L,
          lineHeight: theme.lineHeight.smallHeadings,
        },
        '.typo-heading-m': {
          fontSize: theme.fontSize.M,
          lineHeight: theme.lineHeight.smallHeadings,
        },
        '.typo-heading-s': {
          fontSize: theme.fontSize.S,
          lineHeight: theme.lineHeight.smallHeadings,
        },
        '.typo-heading-xs': {
          fontSize: theme.fontSize.XS,
          lineHeight: theme.lineHeight.smallHeadings,
        },
        '.typo-body-m': {
          fontSize: theme.fontSize.M,
          lineHeight: theme.lineHeight.body,
        },
        '.typo-body-s': {
          fontSize: theme.fontSize.S,
          lineHeight: theme.lineHeight.body,
        },
        '.typo-body-xs': {
          fontSize: theme.fontSize.XS,
          lineHeight: theme.lineHeight.body,
        },
        '.typo-body-2xs': {
          fontSize: theme.fontSize['2XS'],
          lineHeight: theme.lineHeight.body,
        },
        '.typo-caption-s': {
          fontSize: theme.fontSize.S,
          lineHeight: theme.lineHeight.caption,
        },
        '.typo-caption-xs': {
          fontSize: theme.fontSize.XS,
          lineHeight: theme.lineHeight.caption,
        },
        '.typo-caption-2xs': {
          fontSize: theme.fontSize['2XS'],
          lineHeight: theme.lineHeight.caption,
        },
        '.typo-search': {
          fontSize: theme.fontSize.XL,
          lineHeight: theme.lineHeight.largeHeadings,
        },
        '.typo-button-text': {
          fontSize: theme.fontSize.M,
          lineHeight: theme.lineHeight.smallHeadings,
        },
        '.typo-navigation': {
          fontSize: theme.fontSize.XS,
          lineHeight: theme.lineHeight.body,
        },
        '.text-shadow-s': {
          textShadow: theme.textShadow.S,
        },
        '.border-radius-main': {
          borderRadius: '8px',
        },
        '.border-top-radius-main': {
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        },
      };
      addUtilities(
        {
          '.scale': {
            transform: 'scale3d(1.03,1.03,1)',
          },
          '.scale-s': {
            transform: 'scale3d(1.03,1.03,1)',
          },
          '.scale-m': {
            transform: 'scale3d(1.06,1.06,1)',
          },
          '.scale-l': {
            transform: 'scale3d(1.1,1.1,1)',
          },
          '.scaling': {
            transform: 'scale3d(1,1,1)',
            transition: 'all 300ms',
            transitionTimingFunction: 'cubic-bezier(0,.62,.25,1)',
            WebkitFontSmoothing: 'antialiased',
            transformOrigin: 'center',
            cursor: 'pointer',
          },
        },
        ['hover']
      );
      addUtilities({
        '.teaserWidth': {
          width: 'calc(100%/var(--teaser-grid-series-count))',
        },
      });
      addUtilities(typos, ['responsive']);
    }),
  ],
});
