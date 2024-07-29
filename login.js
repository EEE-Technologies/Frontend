document.addEventListener('DOMContentLoaded', () => {
    const signUpBtn = document.getElementById('sign-up-btn');
    const signUpPopup = document.getElementById('sign-up-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');

    signUpBtn.addEventListener('click', () => {
        signUpPopup.classList.remove('hidden');
    });

    closePopupBtn.addEventListener('click', () => {
        signUpPopup.classList.add('hidden');
    });

    // Optional: Add form submission handling here
});
