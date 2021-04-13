document.addEventListener('DOMContentLoaded', function() {
    showCards();
    showGalery();

});

function showCards() {
    document.querySelectorAll('.card img').forEach(el => {
        el.addEventListener('click', function(ev) {
            ev.stopPropagation();
            this.parentNode.classList.add('active');
        })
    });
    document.querySelectorAll('.card').forEach(el => {
        el.addEventListener('click', function(ev) {
            this.classList.remove('active')
        })
    });

}

function showGalery() {
    document.querySelectorAll('.photo-galery img').forEach(el => {
        el.addEventListener('click', function(ev) {
            ev.stopPropagation();
            this.parentNode.classList.add('active');
        })
    });
    document.querySelectorAll('.photo-galery').forEach(el => {
        el.addEventListener('click', function(ev) {
            this.classList.remove('active')
        })
    });

}