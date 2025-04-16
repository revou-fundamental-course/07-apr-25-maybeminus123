 // Slider functionality
 const slider = document.querySelector('.banner-slider');
 const dots = document.querySelectorAll('.slider-dot');
 let currentSlide = 0;
 const slideCount = 2;

 function goToSlide(index) {
const slider = document.querySelector('.banner-slider');
slider.style.transform = `translateX(-${index * 100}%)`;

// Update dots
const dots = document.querySelectorAll('.slider-dot');
dots.forEach(dot => dot.classList.remove('active'));
dots[index].classList.add('active');

currentSlide = index;
}

 dots.forEach(dot => {
     dot.addEventListener('click', () => {
         const slideIndex = parseInt(dot.getAttribute('data-slide'));
         goToSlide(slideIndex);
     });
 });

 // Auto slide
 setInterval(() => {
     currentSlide = (currentSlide + 1) % slideCount;
     goToSlide(currentSlide);
 }, 5000);

 // Smooth scrolling for navigation
 document.querySelectorAll('nav a').forEach(anchor => {
     anchor.addEventListener('click', function(e) {
         e.preventDefault();
         const targetId = this.getAttribute('href');
         const targetElement = document.querySelector(targetId);
         if (targetElement) {
             window.scrollTo({
                 top: targetElement.offsetTop - 80,
                 behavior: 'smooth'
             });
         }
     });
 });