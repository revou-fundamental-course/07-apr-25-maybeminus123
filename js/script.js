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

 document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('messageForm');
    const responseCard = document.getElementById('responseCard');
    
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
            el.textContent = '';
        });
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const instagram = document.getElementById('instagram').value.trim();
        const birthdate = document.getElementById('birthdate').value;
        const gender = document.querySelector('input[name="gender"]:checked');
        const message = document.getElementById('userMessage').value.trim();
        
        let isValid = true;
    
        // Validate name
        if (!name) {
            document.getElementById('nameError').textContent = 'Nama lengkap harus diisi';
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        }
        
        // Validate Instagram
        if (!instagram) {
            document.getElementById('instagramError').textContent = 'Instagram harus diisi';
            document.getElementById('instagramError').style.display = 'block';
            isValid = false;
        } else if (!instagram.startsWith('@')) {
            document.getElementById('instagramError').textContent = 'Instagram harus dimulai dengan @';
            document.getElementById('instagramError').style.display = 'block';
            isValid = false;
        }
        
        // Validate birthdate
        if (!birthdate) {
            document.getElementById('birthdateError').textContent = 'Tanggal lahir harus diisi';
            document.getElementById('birthdateError').style.display = 'block';
            isValid = false;
        }
        
        // Validate gender
        if (!gender) {
            document.getElementById('genderError').textContent = 'Jenis kelamin harus dipilih';
            document.getElementById('genderError').style.display = 'block';
            isValid = false;
        }
        
        // Validate message
        if (!message) {
            document.getElementById('messageError').textContent = 'Pesan harus diisi';
            document.getElementById('messageError').style.display = 'block';
            isValid = false;
        } else if (message.length < 10) {
            document.getElementById('messageError').textContent = 'Pesan terlalu pendek (minimal 10 karakter)';
            document.getElementById('messageError').style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // Format birthdate
            const formattedDate = formatDate(birthdate);
            
            // Create response
            const responseHTML = `
                <h4>${name}</h4>
                <p><strong>Instagram:</strong> ${instagram}</p>
                <p><strong>Tanggal Lahir:</strong> ${formattedDate}</p>
                <p><strong>Jenis Kelamin:</strong> ${gender.value}</p>
                <p><strong>Pesan:</strong> ${message}</p>
                <div class="reply-box">
                    <strong>Balasan Kami:</strong> 
                    <p>Terima kasih ${name} atas pesan Anda! Kami akan segera menghubungi Anda melalui Instagram (${instagram}) dalam waktu 1x24 jam.</p>
                </div>
                <p class="timestamp"><em>Dikirim pada: ${new Date().toLocaleString('id-ID')}</em></p>
            `;
            
            responseCard.innerHTML = responseHTML;
            responseCard.style.display = 'block';
            
            // Reset form
            messageForm.reset();
            
            // Scroll to response
            responseCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
    
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    }
});

function updateDisplayName() {
    const nameInput = document.getElementById('name');
    const displayName = document.getElementById('displayName');
    
    // Update teks dengan nilai input atau 'Guest' jika kosong
    displayName.textContent = nameInput.value || 'Guest';
    
    // Simpan nama di localStorage agar tetap ada saat refresh
    if(nameInput.value) {
        localStorage.setItem('userName', nameInput.value);
    }
}

// Saat halaman dimuat, cek apakah ada nama di localStorage
window.onload = function() {
    const savedName = localStorage.getItem('userName');
    if(savedName) {
        document.getElementById('name').value = savedName;
        document.getElementById('displayName').textContent = savedName;
    }
};