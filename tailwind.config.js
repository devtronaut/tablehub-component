import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    prefix: 'tw-',
    corePlugins: {
        preflight: false,
    },
    content: ['./src/**/*.tsx'],
    theme: {
        extend: {
            colors: {
                'th-black': 'rgba(0,0,0,1.0)',
                'th-gray': 'rgba(51,51,51,1.0)',
                'th-gray-light': 'rgba(122,122,122,1.0)',
                'th-red': 'rgba(255,0,0,1.0)',
                'th-white': 'rgba(255,255,255,1.0)',
                'th-slate-200': 'rgba(226, 232, 240, 1.0)',
                'th-slate-100': 'rgba(226, 232, 240, 1.0)',
                'th-slate-50': 'rgba(248, 250, 252, 1.0)',
                'th-red-100': 'rgba(254, 226, 226, 1.0)',
                'th-red-200': 'rgba(254, 202, 202, 1.0)',
                'th-neutral-600': 'rgba(82 82 82,1.0)',
            },
            boxShadow: {
                'th-roundedTabRightActive': '0 10px 0 0 rgba(51,51,51,1.0)',
                'th-roundedTabRightPassive': '0 10px 0 0 rgba(122,122,122,1.0)',
                'th-roundedTabLeftActive': '0 10px 0 0 rgba(51,51,51,1.0)',
                'th-roundedTabLeftPassive': '0 10px 0 0 rgba(122,122,122,1.0)',
            },
            containers: {
                xs: '18.75rem', // 300px
                sm: '25rem', // 400px
                md: '32.5rem', // 520px
                lg: '40rem', // 640px
                xl: '50rem', // 800px
            },
        },
    },
    plugins: [containerQueries],
}
