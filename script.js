
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile navigation
const menu = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');

menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});

nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  })
);

// Discourse community — connect when ready
const discourseUrl = '';

if (discourseUrl) {
  const link = document.getElementById('discourse-link');
  link.href = discourseUrl;
  link.removeAttribute('aria-disabled');
  link.textContent = 'Join the conversation ↗';
}

// Bigger Worlds guest submissions — Formspree
const guestForm = document.getElementById('guest-form');
const formStatus = document.getElementById('form-status');
const submitButton = guestForm.querySelector('button[type="submit"]');

guestForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!guestForm.reportValidity()) return;

  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  formStatus.textContent = 'Sending your story...';

  try {
    const response = await fetch(guestForm.action, {
      method: 'POST',
      body: new FormData(guestForm),
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Formspree submission failed');
    }

    guestForm.reset();
    formStatus.textContent =
      'Thank you! Your story has been submitted successfully.';
  } catch (error) {
    formStatus.textContent =
      'Your story could not be sent. Please try again.';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Send my story ↗';
  }
});
