'use strict';


console.log("start script");
// можно прокликивать элементы с навыкам и будет изменяться количество звезд
// можно нажимать на звезды напрямую



const skills_data = [
    {
        "img_src" : "./img/photoshop.png",
        "img_alt": "photoshop icon",
        "img_caption": "Adobe Photoshop logo",
        "p_html": "Adobe <br>Phtotoshop",
        "skill_level": 4
    },
    {
        "img_src" : "./img/illustrator.png",
        "img_alt": "illustrator icon",
        "img_caption": "Adobe Illsutrator logo",
        "p_html": "Adobe <br>Illustrator",
        "skill_level": 3
    },
    {
        "img_src" : "./img/ae.png",
        "img_alt": "after effects icon",
        "img_caption": "Adobe After Effects logo",
        "p_html": "Adobe <br>After Effects",
        "skill_level": 4
    },
    {
        "img_src" : "./img/figma.png",
        "img_alt": "figma icon",
        "img_caption": "Figma logo",
        "p_html": "Figma",
        "skill_level": 4
    },
];

let stars = [];

function render_skills(data) {
    const parent = document.querySelector(`div.my_skills`);
    data.forEach((skill_data) => {
        const skill = document.createElement('div');
        skill.classList.add('skill');
        skill.innerHTML = `
        <img src="${skill_data["img_src"]}" alt="${skill_data["img_alt"]}" caption="${skill_data["img_caption"]}">
        <p>${skill_data["p_html"]}</p>
        `;
        add_stars(5, skill_data["skill_level"], skill);
        parent.append(skill);
    });
}

function add_stars(max_stars, count, parent) {
    // рисует несколько звездочек навыков
    const skills_mark = document.createElement('div');
    skills_mark.classList.add('skills_mark');
    for (let i = 0; i < max_stars; i++) {
        const skill_star = document.createElement('div');
        skill_star.classList.add("star");
        if (i < count) {
            skill_star.classList.add("star_filled");
        }
        else {
            skill_star.classList.add('star_empty');
        }
        skills_mark.append(skill_star);
    }
    parent.append(skills_mark);
}

render_skills(skills_data);
const skills = document.querySelectorAll('div.skill');

function renew_skills(list) {
    skills.forEach((element, index) => {
        const skills_mark = element.querySelector(`div.skills_mark`);
        skills_mark.addEventListener('click', printCurrentStars, index);

        const stars = element.querySelectorAll(`div.star`);
        
        stars.forEach((star, ind) => {
            star.classList = "star";
            if (ind < list[index]["skill_level"]) {
                star.classList.add("star_filled");
            }
            else {
                star.classList.add("star_empty");
            }
        });
    });
}

function printCurrentStars(event) {
    if (event.target != event.currentTarget) {
        let class_name = "star_filled";
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].classList = 'star';
            this.children[i].classList.add(class_name);
            if (this.children[i] === event.target) {
                class_name = "star_empty"
            }
        }
        
    }
}

//renew_skills(skills_data);



// по нажатии на кнопку отправки сообщения открывается модально окно с формой обратной связи
const modal = document.querySelector(`div.modal_bg`);
const modal_close = document.querySelector(`#modal .modal__close`);
const send_button = document.querySelector(`#contacts button`);
const text_area = document.querySelector(`#modal textarea`);


send_button.addEventListener('click', (e) => {
    modal.classList.remove('hidden');
});

// закрытие модального окна

modal_close.addEventListener('click', (e) => {
    hideElement(modal);
});

function hideElement(element) {
    element.classList.add('hidden');
}

// закрытие модельного окна при нажатии ESC

document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('hidden') && event.keyCode === 27) {
        hideElement(modal);
    }
});


// собирвем данные из формы 
const server_url = "http://188.225.34.229:22841/denis_chat/"
const form_send_button = document.querySelector(`form button[type="submit"]`);
form_send_button.addEventListener('click', sendForm);
function sendForm(event) {
    form_send_button.removeEventListener('click', sendForm);
    form_send_button.addEventListener('click', prevent);

    event.preventDefault();
    event.stopPropagation();
    const form = document.forms[0];
    const form_input = form[0];
    const input_string = form_input.value;
    if (input_string.length === 0)
        return;
    
    const request = new XMLHttpRequest();
    request.open("POST", server_url);

    const formData = new FormData(form);
    // console.log(formData, form);
    // request.send(formData);

    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    const object = {
        'user_question': input_string,
    }
    
    request.send(JSON.stringify(object));

    request.addEventListener('load', process_response);
    text_area.innerText = `Пишу Денису. Пожалуйста подождите.`
}

function prevent(event) {
    event.preventDefault();
    event.stopPropagation();
}

function process_response(event) {
    form_send_button.addEventListener('click', sendForm);
    form_send_button.removeEventListener('click', prevent);
    // console.log(event);
    // console.log(event.response);
    let denis_text = "";
    if (event.currentTarget.status === 200 && event.currentTarget.response) {
        const data = JSON.parse(event.currentTarget.response);
        denis_text = data["answer"]
    }
    else {
        denis_text = "Ой, что-то пошло не так и я не могу вам ответить."
    }
    console.log(`Denis Novik: ${denis_text}`);

    text_area.innerText = `${denis_text}`
}
