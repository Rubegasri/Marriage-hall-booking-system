document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Reset previous error messages
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach((group) => {
                group.classList.remove('error');
            });

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');

            let hasError = false;

            // Validate name field
            if (!name.trim() || !/^[a-zA-Z\s]+$/.test(name)) {
                setError(contactForm.querySelector('#name'), 'Please enter a valid name (letters only)');
                hasError = true;
            }

            // Validate email field
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError(contactForm.querySelector('#email'), 'Please enter a valid email address');
                hasError = true;
            }

            // Validate phone field
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
                setError(contactForm.querySelector('#phone'), 'Please enter a valid phone number');
                hasError = true;
            }

            // Validate message field
            if (!message.trim()) {
                setError(contactForm.querySelector('#message'), 'Message is required');
                hasError = true;
            }

            // If there are errors, stop form submission
            if (hasError) {
                return;
            }

            // Simulate sending data to server (replace with your actual API call)
            setTimeout(() => {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.classList.remove('hidden');
                contactForm.reset();
            }, 1000);
        });
    }

    function setError(element, message) {
        const formGroup = element.parentElement;
        formGroup?.classList.add('error');

        const errorMessage = formGroup?.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    }
});
