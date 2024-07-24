window.addEventListener("DOMContentLoaded", () => {
    const carouselleftarrow = document.getElementById('leftarrow');
    const carouselrightarrow = document.getElementById('rightarrow');
    const slides = document.querySelectorAll('slide');

    var active = document.querySelector('.active');

    slides.forEach(element => {
        console.log(element);
    });

    var currentIndex = 0;

    carouselleftarrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            slides[currentIndex].classList.toggle('active');
            currentIndex--;
            slides[currentIndex].classList.toggle('active');
            active = document.querySelector('.active');
            slides.forEach(element => {
                element.style.translate = 'calc(-'+currentIndex+'00%'+')';
        });
        }
    });

    carouselrightarrow.addEventListener('click', () => {
        if (currentIndex < slides.length -1) {
            slides[currentIndex].classList.toggle('active');
            currentIndex++;
            slides[currentIndex].classList.toggle('active');
            active = document.querySelector('.active');
            slides.forEach(element => {
                element.style.translate = 'calc(-'+currentIndex+'00%'+')';
        });
        }
    });

    setInterval( () => {
        active.addEventListener('click', () => {
            window.location.href = active.getAttribute('href');
        })
    }, 200);

});