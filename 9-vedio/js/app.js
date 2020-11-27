const btn = document.querySelector('.switch-btn');
const video = document.querySelector('.video-container');
btn.addEventListener('click', () => {
    // fist approach
    // if (!btn.classList.contains('slide')) {
    //     btn.classList.add('slide');
    //video.pause();
    // } else {
    //     btn.classList.remove('slide');
    //video.play();
    // }

    // second approach
    btn.classList.toggle('slide');
    btn.classList.contains('slide') ? video.pause() : video.play();
})

// preloader 

const preloader = document.querySelector('.preloader');
window.addEventListener('load', () => {
    window.setTimeout(() => {
        preloader.classList.add("hide-preloader");
    }, 500)

})