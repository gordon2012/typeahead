require('file-loader?name=[name].[ext]!../index.html');
require('./style.css');

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
const list = document.querySelector('.suggestions');

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));

document.querySelector('.search-form').addEventListener('submit', e => e.preventDefault());
document.querySelector('.search').addEventListener('keyup', typeAhead);

function typeAhead(e) {
    const term = this.value;

    list.innerHTML = term ?
        cities
            .filter(c => c.city.toLowerCase().includes(term.toLowerCase()) || c.state.toLowerCase().includes(term.toLowerCase()))
            .map(c => {
                const text = c.city + ', ' + c.state;
                const reg = new RegExp(`(${term})`, 'gi');
                const newtext = text.replace(reg, `<span class="hl">$1</span>`);

                return `<li>${newtext}: ${c.population}</li>`
            })
            .join('')
    :
        `
        <li>filter by city</li>
        <li>or state</li>
        `;
}
