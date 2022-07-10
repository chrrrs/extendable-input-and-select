const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  f2: 'var(--spacing-fluid-1)',
  f3: 'var(--spacing-fluid-2)',
  f5: 'var(--spacing-fluid-3)',
  f8: 'var(--spacing-fluid-4)',
  f13: 'var(--spacing-fluid-5)',
  f21: 'var(--spacing-fluid-6)',
};
module.exports = {
  screens: {
    xs: '360px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1440px',
    '3xl': '1920px',
  },
  spacing,
  colors: {
    current: 'currentColor',

    /* tv2 play */
    'play-blue': '#009ceb',
    rose: '#ffb5b5',
    purple: '#302c77',
    'blue-black': '#121317',

    /* tv2 free */
    'tv2-red': '#d21e1e',
    'tv2-charlie': '#ff5a19',
    tvtid: '#fb9527',
    'tv2-vejret': '#3aa16f',
    'tv2-fri': '#009678',
    'tv2-sport-x': '#0069fa',
    'tv2-sport': '#0069fa',
    'tv2-underholdning': '#673c93',
    'tv2-livsstil': '#fd2b68',
    'tv2-zulu': '#ff00ff',
    'tv2-tv': '#a4a4a4',

    /* Greyscale */
    black: '#000000',
    white: '#ffffff',
    'grey-100': '#f0f0f0',
    'grey-200': '#e5e5e5',
    'grey-300': '#dcdcdc',
    'grey-400': '#c2c2c2',
    'grey-500': '#aaaaaa',
    'grey-600': '#8a8a8a',
    'grey-700': '#666666',
    'grey-800': '#4d4d4d',
    'grey-900': '#323232',

    'progress-background': '#FFFFFF4D',

    /* Interaction */
    'link-blue': '#147ac2',
    'focus-blue': '#5ba2d4',
    'cta-green': '#3BA800',
    transparent: 'transparent',

    /* Alerts */
    green: '#308700',
    yellow: '#ffd001',
    red: '#cd473e',

    /* Hover */
    'grey-900-hover': '#2d2d2d',
    'white-hover': '#e6e6e6',
    'cta-green-hover': '#359700',
    'play-blue-hover': '#008cd4',
    'link-blue-hover': '#126eaf',
    'tv2-sport-hover': '#025ede',
    'tv2-vejret-hover': '#349164',
    'tvtid-hover': '#e28623',
  },
  fontFamily: {
    alright: ['AlrightSansLT', 'Arial', 'Helvetica', 'sans-serif'],
  },
  fontWeight: {
    black: '900',
    bold: '700',
    medium: '500',
    regular: '400',
    light: '300',
  },
  fontSize: {
    '3XL': 'var(--type-scale-3xl, 34px)',
    '2XL': 'var(--type-scale-2xl, 28px)',
    XL: 'var(--type-scale-xl, 24px)',
    L: 'var(--type-scale-l, 20px)',
    M: 'var(--type-scale-m, 17px)',
    S: 'var(--type-scale-s, 15px)',
    XS: 'var(--type-scale-xs, 13px)',
    '2XS': 'var(--type-scale-2xs, 11px)',
  },
  textShadow: {
    S: '0 0 1px #323232;',
  },
  lineHeight: {
    largeHeadings: 'var(--line-height-large-headings)',
    smallHeadings: 'var(--line-height-small-headings)',
    subheaders: 'var(--line-height-subheaders)',
    body: 'var(--line-height-body-texts)',
    caption: 'var(--line-height-caption-texts)',
  },
  extend: {
    maxWidth: {
      text: '620px',
    },
    zIndex: {
      page: 1,
      header: 2,
      modal: 3,
    },
  },
};
