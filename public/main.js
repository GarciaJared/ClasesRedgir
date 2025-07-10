import Router from './router.js';

const routes = [
    {
        path: '/',
        template: document.getElementById('home-template').innerHTML
    },
    {
        path: '/login',
        template: document.getElementById('login-template').innerHTML
    }
];

const router = new Router(routes);

document.querySelectorAll('a[data-link]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const urlSegs = anchor.getAttribute('href').split('/').slice(1);
        router.loadRoute(...urlSegs);
    });
});
