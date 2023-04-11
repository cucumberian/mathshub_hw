// Написать динамический рендер меню    
//

'use strict';


console.log("start script");

// объект для меню навигации в хэдере
const header_nav_data = [
    {url: "#", content: "Home"},
    {url: "#about_me", content: "About me"},
    {url: "#skills", content: "Skills"},
    {url: "#portfolio", content: "Portfolio"},
    {url: "#contacts", content: "Contacts"},
];

class NavItem {
    constructor(url, content, parent) {
        this.url = url;
        this.content = content;
        this.parent = parent;
    }

    render() {
        const element = document.createElement('a');
        element.href = this.url;
        element.innerHTML = this.content;
        this.parent.appendChild(element);
    }
}

class NavMenu {
    constructor(data, parent) {
        this.data = data;
        this.parent = parent;
    }
    render() {
        const nav = document.createElement(`nav`);
        this.data.forEach(item => {
            const link = new NavItem(item['url'], item['content'], nav);
            link.render();
        });
        this.parent.appendChild(nav);
    }
}


const nav_menu = new NavMenu(header_nav_data, document.querySelector("body header"));
nav_menu.render();

// объект с данными для создания скилов
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

class Skill {
    self_class = `skill`;
    skills_mark_class = `skills_mark`;
    max_stars = 5;

    constructor (img_src, img_alt, img_caption, p_html, skill_level, parent) {
        this.img_src = img_src;
        this.img_alt = img_alt;
        this.img_caption = img_caption;
        this.p_html = p_html;
        this.skill_level = skill_level;
        this.parent = parent;
    }

    render() {
        const element = document.createElement('div');
        element.classList.add(this.self_class);
        
        element.innerHTML = `
            <img src="${this.img_src}" alt="${this.img_alt}" caption="${this.img_caption}">
            <p>${this.p_html}</p>
        `;
        
        this.set_stars(element);
        this.parent.append(element);
    }

    set_stars(element_container) {
        const skills_mark = document.createElement(`div`);
        skills_mark.classList.add(this.skills_mark_class);
        for (let i = 0; i < this.max_stars; i++) {
            // звезда навыка, если она по счету не превосхоит уровени навыка, то активная
            const skill_star = new Star(i < this.skill_level, skills_mark); 
            skill_star.render(); // добавляем звезду навыка
        }
        element_container.append(skills_mark);
    }
}

class Star {
    active_class = `star_filled`;
    passive_class = `star_empty`;
    
    constructor (is_active, parent) {
        this.is_active = is_active;
        this.parent = parent;
    }

    render () {
        const star = document.createElement(`div`);
        star.classList.add(`star`);
        star.classList.add(this.is_active ? this.active_class : this.passive_class);
        this.parent.append(star);
    }
}

// вставляем скилы владения программами в родительский элемент
const skills_parent = document.querySelector(`div.my_skills`);
skills_data.forEach((data) => {
    const skill = new Skill(
        data.img_src, 
        data.img_alt, 
        data.img_caption, 
        data.p_html,
        data.skill_level,
        skills_parent,
    );
    skill.render();
});



// надо переписать функцию клика по скилам через объекты

// можно прокликивать элементы с навыкам и будет изменяться количество звезд
// можно нажимать на звезды напрямую

// function renew_skills(list) {
//     skills.forEach((element, index) => {
//         const skills_mark = element.querySelector(`div.skills_mark`);
//         skills_mark.addEventListener('click', printCurrentStars, index);

//         const stars = element.querySelectorAll(`div.star`);
        
//         stars.forEach((star, ind) => {
//             star.classList = "star";
//             if (ind < list[index]["skill_level"]) {
//                 star.classList.add("star_filled");
//             }
//             else {
//                 star.classList.add("star_empty");
//             }
//         });
//     });
// }

// function printCurrentStars(event) {
//     if (event.target != event.currentTarget) {
//         let class_name = "star_filled";
//         for (let i = 0; i < this.children.length; i++) {
//             this.children[i].classList = 'star';
//             this.children[i].classList.add(class_name);
//             if (this.children[i] === event.target) {
//                 class_name = "star_empty"
//             }
//         }
        
//     }
// }

//renew_skills(skills_data);



// по нажатии на кнопку отправки сообщения открывается модально окно с формой обратной связи
const modal = document.querySelector(`div.modal_bg`);
const modal_close = document.querySelector(`.modal .modal__close`);
const send_button = document.querySelector(`.contacts_section button`);
const text_area = document.querySelector(`.modal textarea`);


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
    form_send_button.removeEventListener('click', sendForm);  // отключаем клик по кнопке
    form_send_button.addEventListener('click', prevent); // отключаем поведение кнопки отправки

    event.preventDefault();
    event.stopPropagation();
    const form = document.forms[0];
    const form_input = form[0];
    const input_string = form_input.value;
    if (input_string.length === 0)
        return;
    
    // const formData = new FormData(form);
    
    const object = {
        'user_question': input_string,
    }
    
    // fetch API
    text_area.innerText = `Пишу Денису. Пожалуйста подождите.`;
    fetch(server_url, {
        'method': 'POST',
        'headers': {
            'Content-type': 'application/json; charset=utf-8',
        },
        'body': JSON.stringify(object),
    })
    .catch(error => {
        console.error(`Error: `, error)
    })
    .then(request => {
        text_area.innerText = `Получен ответ. Расшифровываю.`;
        return request.json();
    })
    .catch(error => {
        const ans = `Ошибка: не удалось расшифровать ответ от Дениса.`;
        text_area.innerText = ans;
        console.log(error);
    })
    .then(json => {
        const ans = `${json['answer']}`;
        console.log(`Denis Novik: "${ans}"`);
        text_area.innerText = ans;
    })
    .finally(() => {
        // размораживаем кнопку формы
        form_send_button.addEventListener('click', sendForm);
        form_send_button.removeEventListener('click', prevent);
    });

}

function prevent(event) {
    event.preventDefault();
    event.stopPropagation();
}
