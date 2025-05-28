document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');

    if (hamburger && mobileNav && mobileNavOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            mobileNavOverlay.style.display = mobileNav.classList.contains('active') ? 'block' : 'none';
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
        });

        mobileNavOverlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            mobileNavOverlay.style.display = 'none';
            document.body.style.overflow = '';
            hamburger.setAttribute('aria-expanded', 'false');
        });

        // Close mobile nav when a link is clicked
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNav.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    mobileNav.classList.remove('active');
                    mobileNavOverlay.style.display = 'none';
                    document.body.style.overflow = '';
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Scroll-triggered fade-in for About section
    const fadeElements = document.querySelectorAll('.scroll-fade-in');
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeInObserver.observe(el));

    // Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentImageIndex = 0;
    const images = Array.from(galleryItems);

    function openLightbox(index) {
        currentImageIndex = index;
        const imgSrc = images[currentImageIndex].src;
        const imgCaption = images[currentImageIndex].dataset.caption || images[currentImageIndex].alt;

        lightboxImage.src = imgSrc;
        lightboxImage.alt = imgCaption;
        lightboxCaption.textContent = imgCaption;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        trapFocusInLightbox();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore background scroll
        // Return focus to the image that opened the lightbox
        if (images[currentImageIndex]) {
            images[currentImageIndex].focus();
        }
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        openLightbox(currentImageIndex);
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        openLightbox(currentImageIndex);
    }

    galleryItems.forEach((item, index) => {
        item.parentElement.setAttribute('role', 'button'); // Make parent div focusable and announce as button
        item.parentElement.setAttribute('tabindex', '0');    // Make parent div focusable
        item.parentElement.addEventListener('click', () => openLightbox(index));
        item.parentElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });

    // Trap focus in lightbox
    function trapFocusInLightbox() {
        const focusableElementsString = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusableElements = lightbox.querySelectorAll(focusableElementsString);
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        if (firstFocusableElement) firstFocusableElement.focus();

        lightbox.addEventListener('keydown', function (e) {
            const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
            if (!isTabPressed) return;

            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        });
    }


    // Contact Form Validation
    const bookingForm = document.getElementById('booking-form');
    const formThankYou = document.getElementById('form-thank-you');
    const submitButton = bookingForm ? bookingForm.querySelector('button[type="submit"]') : null;
    let hasAttemptedSubmit = false; // Flag to track if submit has been attempted

    const formFields = {
        name: { required: true, validation: (value) => value.trim() !== '', message: 'Name is required.' },
        email: {
            required: true,
            validation: (value) => /^\S+@\S+\.\S+$/.test(value),
            message: 'Valid email is required.'
        },
        phone: {
            required: false,
            validation: (value) => {
                if (value.trim() === '') return true; // Optional field is valid if empty
                const digits = value.replace(/\D/g, ''); // Remove all non-digits
                return digits.length === 10;
            },
            message: 'Phone number must be 10 digits.'
        },
        date: { required: true, validation: (value) => value !== '', message: 'Preferred date is required.' },
        time: { required: true, validation: (value) => value !== '', message: 'Preferred time is required.' }
    };

    function formatPhoneNumber(value) {
        if (!value) return value;
        const phoneNumber = value.replace(/\D/g, ''); // Remove all non-digits
        const phoneNumberLength = phoneNumber.length;

        if (phoneNumberLength < 4) return `(${phoneNumber}`;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) - ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) - ${phoneNumber.slice(3, 6)} - ${phoneNumber.slice(6, 10)}`;
    }


    function validateField(input) {
        const fieldName = input.name;
        const value = input.value;
        const fieldConfig = formFields[fieldName];
        const errorMessageElement = input.nextElementSibling; // Assuming error span is next sibling

        if (!fieldConfig) return true; // No validation config for this field

        let isValid = true;
        let message = '';

        // Check required first
        if (fieldConfig.required && value.trim() === '') {
            isValid = false;
            message = fieldConfig.message; // Use specific message for required
        }
        // Then check validation format if there's a value
        else if (value.trim() !== '' && !fieldConfig.validation(value)) {
            isValid = false;
            message = fieldConfig.message; // Use specific message for format
        } else if (!fieldConfig.required && value.trim() === '' && fieldConfig.validation(value.trim())) { // Ensure validation passes for empty optional field
            // Handles optional fields that are empty but still valid (e.g. phone if validation allows empty)
            isValid = true;
        }


        if (errorMessageElement) {
            input.setAttribute('aria-invalid', !isValid);
            if (!isValid) {
                input.classList.add('invalid');
                // Only display the error message if a submission has been attempted
                if (hasAttemptedSubmit) {
                    errorMessageElement.textContent = message;
                    errorMessageElement.style.display = 'block';
                } else {
                    // On initial load or before first submit attempt, keep errors hidden
                    // but ensure the field is marked invalid if it is (for styling or ARIA)
                    errorMessageElement.textContent = ''; // Clear any stale message
                    errorMessageElement.style.display = 'none';
                }
            } else {
                input.classList.remove('invalid');
                errorMessageElement.textContent = '';
                errorMessageElement.style.display = 'none';
            }
        }
        return isValid;
    }

    function validateForm() {
        if (!bookingForm) return false;
        let isFormValid = true;
        for (const fieldName in formFields) {
            const input = bookingForm.elements[fieldName];
            if (input) {
                // When validateForm is called (e.g., on input/blur, or by submit handler),
                // validateField will respect the hasAttemptedSubmit flag for displaying messages.
                if (!validateField(input)) {
                    isFormValid = false;
                }
            }
        }
        if (submitButton) {
            submitButton.disabled = !isFormValid;
        }
        return isFormValid;
    }

    if (bookingForm) {
        // Initial validation to set button state but not show errors
        // hasAttemptedSubmit is false here, so validateField will not show messages
        validateForm();

        const phoneInput = bookingForm.elements['phone'];
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                const originalValue = e.target.value;
                const digits = originalValue.replace(/\D/g, '');

                // Limit to 10 digits
                const limitedDigits = digits.substring(0, 10);

                const formattedValue = formatPhoneNumber(limitedDigits);
                e.target.value = formattedValue;

                // After formatting, re-validate this field and the form
                validateField(e.target);
                validateForm();
            });
        }

        // Add event listeners for real-time validation for other fields
        Object.keys(formFields).forEach(fieldName => {
            const input = bookingForm.elements[fieldName];
            if (input && fieldName !== 'phone') { // Phone is handled separately for formatting
                input.addEventListener('input', () => {
                    validateField(input);
                    validateForm();
                });
                input.addEventListener('blur', () => {
                    validateField(input);
                    validateForm();
                });
            } else if (input && fieldName === 'phone') {
                // For phone, blur might be good to ensure final validation check
                // as input event already handles most of it.
                input.addEventListener('blur', () => {
                    validateField(input);
                    validateForm();
                });
            }
        });

        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            hasAttemptedSubmit = true; // Set flag: user has now attempted to submit

            const generalErrorElement = document.getElementById('form-general-error');
            if (generalErrorElement) generalErrorElement.style.display = 'none'; // Hide general server error on new attempt


            if (validateForm()) { // This will now show errors for invalid fields due to hasAttemptedSubmit = true
                const formData = new FormData(bookingForm);
                const data = Object.fromEntries(formData.entries());

                if (submitButton) submitButton.disabled = true;
                if (submitButton) submitButton.textContent = 'Submitting...';


                try {
                    const response = await fetch('/api/submit-booking', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });

                    const result = await response.json();

                    if (response.ok && result.success) {
                        console.log('Form submitted successfully via backend!');
                        bookingForm.style.display = 'none';
                        if (formThankYou) {
                            formThankYou.querySelector('h3').textContent = 'Thank You!';
                            formThankYou.querySelector('p').textContent = result.message || "We've received your request and will contact you shortly to confirm your booking.";
                            formThankYou.style.display = 'block';
                        }
                        bookingForm.reset(); // Clear form fields on successful submission
                        hasAttemptedSubmit = false; // Reset flag
                        validateForm(); // Re-validate to disable submit button for the (now empty and hidden) form
                    } else {
                        console.error('Backend submission failed:', result.message);
                        if (generalErrorElement) {
                            generalErrorElement.textContent = result.message || 'Submission failed. Please try again.';
                            generalErrorElement.style.display = 'block';
                        }
                        // Optionally, display specific field errors if your backend sends them
                        if (result.errors) {
                            for (const fieldName in result.errors) {
                                const input = bookingForm.elements[fieldName];
                                const errorMessageElement = input ? input.nextElementSibling : null;
                                if (input && errorMessageElement) {
                                    input.classList.add('invalid');
                                    errorMessageElement.textContent = result.errors[fieldName];
                                    errorMessageElement.style.display = 'block'; // Show server error
                                }
                            }
                        }
                        if (submitButton) submitButton.disabled = false; // Re-enable on server error
                        if (submitButton) submitButton.textContent = 'Submit Request';
                    }
                } catch (error) {
                    console.error('Error submitting form:', error);
                    if (generalErrorElement) {
                        generalErrorElement.textContent = 'An unexpected error occurred. Please try again.';
                        generalErrorElement.style.display = 'block';
                    }
                    if (submitButton) submitButton.disabled = false;
                    if (submitButton) submitButton.textContent = 'Submit Request';
                }

            } else {
                console.log('Front-end validation failed after submit attempt.');
                // Errors are already shown by validateForm -> validateField because hasAttemptedSubmit is true.
                // Optionally, focus the first invalid field.
                for (const fieldName in formFields) {
                    const input = bookingForm.elements[fieldName];
                    if (input && input.classList.contains('invalid')) {
                        input.focus();
                        break;
                    }
                }
            }
        });
    }

    // Down arrow pulse stop on click (if it was JS controlled, currently CSS)
    // The pulse is CSS only, but if we wanted to stop it on click:
    const downArrow = document.querySelector('#hero .down-arrow');
    if (downArrow) {
        downArrow.addEventListener('click', () => {
            // If animation was JS controlled, stop it here.
            // For CSS animation, it will continue unless class is removed or style changed.
            // The smooth scroll is handled by the generic anchor handler already.
        });
    }
});

// Ensure all interactive elements in the lightbox are correctly identified for focus trapping.
// Added role="button" and tabindex="0" to gallery item parent for better accessibility.
// Ensured error messages in form have appropriate display toggling.
// Make sure to add an element in your HTML for general form errors, e.g., before the submit button:
// <div id="form-general-error" class="error-message" style="display: none; margin-bottom: 1rem;"></div>

// Scroll-triggered animations
