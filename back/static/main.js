function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
    document.getElementById('authors').addEventListener('click', e => {
        window.location.href = 'authors.html';
    });
    document.getElementById('campaigns').addEventListener('click', e => {
        window.location.href = 'campaigns.html';
    });
    document.getElementById('groups').addEventListener('click', e => {
        window.location.href = 'groups.html';
    });
    document.getElementById('players').addEventListener('click', e => {
        window.location.href = 'players.html';
    });
    document.getElementById('characters').addEventListener('click', e => {
        window.location.href = 'characters.html';
    });
}