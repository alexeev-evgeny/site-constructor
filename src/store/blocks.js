export default [
    {
        name: 'header',
        title: 'Заголовок',
        html: '<h1 $attrs$>$blockContent$</h1>',
        styles: '',
        textContent: 'Дефолтный заголовок',
        attributes: [],
    },
    {
        name: 'text',
        title: 'Текст',
        html: '<div $attrs$>$blockContent$</div>',
        styles: 'font-size: 18px; line-height: 24px;',
        textContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        attributes: [],
    },
    {
        name: 'link',
        title: 'Ссылка',
        html: '<a $attrs$>$blockContent$</a>',
        styles: 'font-size: 18px; line-height: 24px;',
        textContent: 'Дефолтный текст ссылки',
        attributes: [
            { name: 'href', value: '#' },
            { name: 'target', value: '_blank' },
        ],
    },
    {
        name: 'image',
        title: 'Картинка',
        html: '<image $attrs$/>',
        styles: 'max-width: 100%; overflow: hidden;',
        textContent: '',
        attributes: [
            { name: 'src', value: 'https://b1.m24.ru/c/1148057.580xp.jpg' },
            { name: 'alt', value: '#' },
        ],
    },
];
