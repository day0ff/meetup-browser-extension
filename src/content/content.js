import * as config from '../../config.json';
import { fetch } from '../api/fetch.js';

const person = window.location.pathname.split('/').pop();

fetch(`${config.url}/character/${person}`)
    .then(response => response.json())
    .then(character => {
        console.log(replacePerson(character));
    })
    .catch(error => console.log(error));

function replacePerson(character) {
    const [firstName, lastName] = window.location.pathname.split('/').pop().split('_');
    const body = document.body;

    body.innerHTML = body.innerHTML.replace(new RegExp(firstName, 'ig'), character.first_name);
    body.innerHTML = body.innerHTML.replace(new RegExp(lastName, 'ig'), character.last_name);

    const images = body.querySelectorAll('img');

    images.forEach(img => {
        if (img.src.includes(character.first_name) || img.src.includes(character.last_name)) {
            img.src = character.url;
            const size = Math.max(img.width, img.height);
            img.style.width = size + 'px';
            img.style.height = size + 'px';
        }
    });

    return character.first_name + ' ' + character.last_name;
}

