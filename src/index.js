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

function addCommas(num) {
    const arr = num.toString().split('');
    const newarr = [];

    for(let i = arr.length-1; i >= 0; i--) {
        newarr.unshift(arr[i]);
        if ((arr.length-i) % 3 == 0 && i > 0) newarr.unshift(',');
    }
    return newarr.join('');
}

function typeAhead(e) {
    const term = this.value;

    list.innerHTML = term ?
        cities
            .filter(c => c.city.toLowerCase().includes(term.toLowerCase()) || c.state.toLowerCase().includes(term.toLowerCase()))
            .map(c => {
                const text = c.city + ', ' + c.state;
                const reg = new RegExp(`(${term})`, 'gi');
                const newtext = text.replace(reg, `<span class="hl">$1</span>`);

                return `<li><span>${newtext}</span><span class="population">${addCommas(c.population)}</span></li>`
            })
            .join('')
    :
        `
        <li>Filter by City</li>
        <li>or State</li>
        `;
}
