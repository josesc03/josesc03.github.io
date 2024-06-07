document.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;

    console.log(scrollPosition);

    if (scrollPosition > 0) {
        document.querySelector('header').style.backgroundColor = 'rgb(0, 0, 0, .2)';
        document.querySelector('header').style.backdropFilter = 'blur(2px)';
        document.querySelector('header').style.height = '50px';
        document.querySelector('header').style.fontSize = '2vw';
    } else {
        document.querySelector('header').style.backgroundColor = '';
        document.querySelector('header').style.backdropFilter = '';
        document.querySelector('header').style.height = '';
        document.querySelector('header').style.fontSize = '';
    }
});