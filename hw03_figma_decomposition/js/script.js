'use strict';


console.log("start script");
// можно прокликивать элементы с навыкам и будет изменяться количество звезд
// можно нажимать на звезды напрямую

let stars = [4, 3, 4, 4];

const skills = document.querySelectorAll('div.skill');

function renew_skills(list) {
    skills.forEach((element, index) => {
        const skills_mark = element.querySelector(`div.skills_mark`);
        skills_mark.addEventListener('click', printCurrentStars, index);

        const stars = element.querySelectorAll(`div.star`);
        
        stars.forEach((star, ind) => {
            star.classList = "star";
            if (ind < list[index]) {
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

renew_skills(stars);



// по нажатии на кнопку отправки сообщения открывается модально окно с формой обратной связи
const modal = document.querySelector(`div.modal_bg`);
const modal_close = document.querySelector(`#modal .modal__close`);
const send_button = document.querySelector(`#contacts button`);

send_button.addEventListener('click', (e) => {
    modal.classList.remove('hidden');
});

// закрытие модального окна

modal_close.addEventListener('click', (e) => {
    console.log(`modal close`);
    modal.classList.add('hidden');
});