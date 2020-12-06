const slides = document.querySelectorAll('.slide')
const nextBtn = document.querySelector('.nextBtn');
const preBtn = document.querySelector('.prevBtn')


slides.forEach((slide, index) => {
    slide.style.left = `${index*100}%`;
});

let counter = 0;

nextBtn.addEventListener('click', () => {
    counter++
    carousel();
})
preBtn.addEventListener('click', () => {
    counter--;
    carousel();
})

function carousel() {
    // working with slides
    // if (counter === slides.length) {
    //     counter = 0;
    // }
    // if (counter < 0) {
    //     counter = slides.length - 1;
    // }

    // working with buttons
    if (counter < slides.length - 1) {
        nextBtn.style.display = "block"
    } else {
        nextBtn.style.display = 'none';
    }
    if (counter > 0) {
        preBtn.style.display = "block"
    } else {
        preBtn.style.display = 'none';
    }

    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${counter*100}%)`;
    })
}

preBtn.style.display = "none";