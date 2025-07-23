// instant page
import 'instant.page';

// icons
import 'iconify-icon';

// twind
import { install, injectGlobal, autoDarkColor } from '@twind/core';
import presetAutoprefix from '@twind/preset-autoprefix';
import presetTailwind from '@twind/preset-tailwind';
import presetLineclamp from '@twind/preset-line-clamp';
import presetTypography from '@twind/preset-typography';

install({
  presets: [presetAutoprefix(), presetTailwind(), presetLineclamp(), presetTypography()],
  darkMode: 'class',
  darkColor: autoDarkColor,
  hash: false,
  // tailwind config
  theme: {
    extend: {
      colors: ({ theme }) => ({
        primary: theme('colors.rose'),
        accent: theme('colors.yellow'),
        slate: { 950: '#020617' },
        gray: { 950: '#030712' },
        zinc: { 950: '#09090B' },
        neutral: { 950: '#0A0A0A' },
        stone: { 950: '#0C0A09' },
        red: { 950: '#450A0A' },
        orange: { 950: '#431407' },
        amber: { 950: '#451A03' },
        yellow: { 950: '#422006' },
        lime: { 950: '#1A2E05' },
        green: { 950: '#052E16' },
        emerald: { 950: '#022C22' },
        teal: { 950: '#042F2E' },
        cyan: { 950: '#083344' },
        sky: { 950: '#082F49' },
        blue: { 950: '#172554' },
        indigo: { 950: '#1E1B4B' },
        violet: { 950: '#2E1065' },
        purple: { 950: '#3B0764' },
        fuchsia: { 950: '#4A044E' },
        pink: { 950: '#500724' },
        rose: { 950: '#4C0519' },
      }),
      fontSize: {
        '6xl': ['3.75rem', '1.2'],
        '7xl': ['4.5rem', '1.2'],
        '8xl': ['6rem', '1.2'],
        '9xl': ['8rem', '1.2'],
      },
      fontFamily: ({ theme }) => ({
        sans: ['Inter', ...theme('fontFamily.sans')],
      }),
    },
  },
  // custom rules
  rules: [
    ['text-wrap-(unset|wrap|nowrap|balance|pretty)', 'textWrap'],
    ['bg-grid', {'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 6 6\' width=\'6\' height=\'6\' fill=\'currentColor\'><path d=\'m6 5v1h-1v-1zm-4 0v1h-1v-1zm3-1v1h-1v-1zm-2 0v1h-1v-1zm1-1v1h-1v-1zm-1-1v1h-1v-1zm2 0v1h-1v-1zm-3-1v1h-1v-1zm4 0v1h-1v-1zm-5-1v1h-1v-1z\' /></svg>")'}],
    ['bg-tron', {'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 400 400\' fill=\'rgb(255 255 255 / .25)\'><path d=\'M0 400V0h400v400zm57-57H1v56h56zm342 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0H58v56h56zm-57-57H1v56h56zm342 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0H58v56h56zm-57-57H1v56h56zm342 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0H58v56h56zm-57-57H1v56h56zm342 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-114 0h-56v56h56zm57 0h-56v56h56zm-114 0H58v56h56zm-57-57H1v56h56zm342 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0H58v56h56zM57 58H1v56h56zm342 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0H58v56h56zM57 1H1v56h56zm342 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0h-56v56h56zm-57 0H58v56h56z\'/></svg>")'}],
    ['bg-gradient-radial', 'bg-[radial-gradient(var(--gradient-position, closest-side),var(--tw-gradient-stops))]'],
    ['bg-gradient-conic', 'bg-[conic-gradient(from_180deg,var(--tw-gradient-stops))]'],
    ['container-', ({ $$ }) => `mx-auto w-full max-w-${$$}`],
  ],
});

injectGlobal`
  /* layers: defaults, base, components, shortcuts, utilities, overrides */
  @layer base {
    .btn {
      @apply
        px-5
        h-10
        text-sm
        font-medium
        shrink-0
        inline-flex
        items-center
        justify-center
        gap-2
        relative
        rounded-full
        [text-shadow:0_1px_3px_rgba(0,0,0,.5)]
        transition
        hover:(scale-105)
        [&>.icon]:(font-normal opacity-70)
        [&.btn-default]:(bg-white/10 text-stone-300 hover:(text-white bg-stone-500/50))
        [&.btn-primary]:(bg-primary-600 text-primary-50 font-semibold before:via-white hover:bg-primary-500)
        [&.btn-square]:(px-0 w-11 h-11 before:hidden)
        [&.btn-sm]:(px-2.5 h-7 text-xs)
        [&.btn-lg]:(px-7 h-12 text-lg);
      background-image:
        radial-gradient(100% 100% at 50% -50%, rgb(255 255 255 / .25), transparent),
        linear-gradient(180deg, rgb(255 255 255 / .2) 0%, rgb(0 0 0 / .2) 75%);
      box-shadow:
        0 0 0 1px rgb(255 255 255 / .075) inset,
        1px 1px 0 rgb(255 255 255 / .3) inset,
        0 0 8px 1px black,
        0 1px 0 rgb(255 255 255 / .1),
        0 0 0 3px rgb(0 0 0 / 1),
        0 0 0 4px rgb(255 255 255 / .25),
        0 0 0 5px rgb(0 0 0 / .5);
    }
    .divider {
      @apply
        bg-(gradient-to-r clip-text)
        from-accent-600 to-accent-300
        text-(transparent sm)
        tracking-wide
        flex
        items-center
        justify-center
        gap-3
        [&::before,&::after]:(w-full max-w-[2rem] h-0.5 from-accent-300 to-accent-500/20 opacity-50 content-[''])
        before:(bg-gradient-to-l)
        after:(bg-gradient-to-r)
        relative;
    }
    [x-cloak] { @apply hidden; }
    .tippy-box[data-state="hidden"] { @apply opacity-0 translate-y-1; }
    [data-tippy-root] { @apply max-w-[calc(100vw-10px)]; }
    .tippy-box { @apply bg-black text-(white/80 xs) font-semibold relative outline-0 opacity-100 rounded translate-y-0 motion-safe:(transition duration-75); }
    .tippy-box[data-placement^="top"] > .tippy-arrow { @apply bottom-0 before:(bottom-[-7px] left-0 border-(t-[8px] r-[8px] b-0 l-[8px] t-[initial])) origin-top; }
    .tippy-box[data-placement^="bottom"] > .tippy-arrow { @apply top-0 before:(top-[-7px] left-0 border-(t-0 r-[8px] b-[8px] l-[8px] b-[initial])) origin-bottom; }
    .tippy-box[data-placement^="left"] > .tippy-arrow {@apply right-0 before:(right-[-7px] border-(t-[8px] r-0 b-[8px] l-[8px] l-[initial])) origin-left; }
    .tippy-box[data-placement^="right"] > .tippy-arrow { @apply left-0 before:(left-[-7px] border-(t-[8px] r-[8px] b-[8px] l-0 r-[initial]) origin-right); }
    .tippy-arrow { @apply w-4 h-4 text-black absolute before:(content-[''] absolute border-(transparent solid)); }
    .tippy-content { @apply py-1.5 px-3 relative z-[1]; }
  }
`

// alpinejs
import Alpine from 'alpinejs';
import anchor from '@alpinejs/anchor';
import collapse from '@alpinejs/collapse';
import focus from '@alpinejs/focus';
import tippy from 'tippy.js';

document.addEventListener('alpine:init', () => {
  // tooltip
  // magic: @focus="$tooltip('some tooltip')"
  Alpine.magic('tooltip', el => message => {
    let instance = tippy(el, {
      content: message,
      trigger: 'manual',
    });

    const onEscape = (e) => {
      if (e.key === 'Escape') cleanup();
    };

    const cleanup = () => {
      instance.hide();
      setTimeout(() => instance.destroy(), 0);
      document.removeEventListener('keydown', onEscape);
      el.removeEventListener('mouseleave', cleanup);
      el.removeEventListener('blur', cleanup);
    };

    document.addEventListener('keydown', onEscape);
    el.addEventListener('mouseleave', cleanup);
    el.addEventListener('blur', cleanup);

    instance.show();

    setTimeout(cleanup, 2000);
  });

  Alpine.directive('tooltip', (el, { expression }, { evaluate }) => {
    const instance = tippy(el, {
      content: evaluate(expression),
    });

    const onEscape = (e) => {
      if (e.key === 'Escape') {
        instance.hide();
      }
    };

    document.addEventListener('keydown', onEscape);

    el._tippyCleanup = () => {
      document.removeEventListener('keydown', onEscape);
      instance.destroy();
    };
  });

  document.addEventListener('alpine:clean', (e) => {
    const el = e.target;
    if (el._tippyCleanup) {
      el._tippyCleanup();
      delete el._tippyCleanup;
    }
  });
});

Alpine.plugin([anchor, collapse, focus]);
window.Alpine = Alpine;
Alpine.start();
