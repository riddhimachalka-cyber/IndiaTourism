const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (!document.querySelector('.site-search') && document.querySelector('.site-header')) {
  const search = document.createElement('form');
  search.className = 'site-search';
  search.setAttribute('role', 'search');
  search.innerHTML = '<label class="visually-hidden" for="top-destination-input">Search destinations</label><span>⌕</span><input id="top-destination-input" type="search" placeholder="Search destinations">';
  document.querySelector('.site-header .brand').after(search);
}

document.querySelectorAll('.site-search').forEach((search) => search.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = search.querySelector('input').value.trim();
  if (!query) { search.querySelector('input').focus(); return; }
  localStorage.setItem('indiaTourismSearch', query);
  window.location.href = `services.html?destination=${encodeURIComponent(query)}#journeys`;
}));

const slides = [...document.querySelectorAll('.hero-slide')];
const sliderDots = [...document.querySelectorAll('.slider-dot')];
let activeSlide = 0;
function showSlide(index) {
  if (!slides.length) return;
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === activeSlide));
  sliderDots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === activeSlide));
}
sliderDots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
if (slides.length > 1) setInterval(() => showSlide(activeSlide + 1), 5000);

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) menuToggle.textContent = '☰';
}));

document.querySelector('#destination-search')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const destination = document.querySelector('#destination-input').value.trim();
  document.querySelector('#search-feedback').textContent = destination ? `Searching handpicked experiences in ${destination}…` : 'Try Rajasthan, Kerala, Goa, Ladakh, or Varanasi.';
});

document.querySelector('#quick-planner')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const [destination, style] = [...event.currentTarget.querySelectorAll('select')].map((select) => select.value);
  const feedback = document.querySelector('.planner-feedback');
  if (!destination || !style) { feedback.textContent = 'Choose a destination and travel style to begin.'; return; }
  localStorage.setItem('indiaTourismPlan', JSON.stringify({ destination, style, createdAt: new Date().toISOString() }));
  feedback.textContent = `Your ${style.toLowerCase()} journey to ${destination} is saved. We’ll build it next.`;
});

document.querySelectorAll('.filter').forEach((filter) => {
  filter.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((button) => button.classList.remove('active'));
    filter.classList.add('active');
    document.querySelectorAll('.destination-card').forEach((card) => {
      card.classList.toggle('hidden', filter.dataset.filter !== 'all' && card.dataset.category !== filter.dataset.filter);
    });
  });
});

document.querySelectorAll('[data-place]').forEach((button) => {
  button.addEventListener('click', () => {
    const place = button.dataset.place;
    localStorage.setItem('indiaTourismDestination', place);
    document.querySelector('.destination-feedback').textContent = `${place} has been added to your travel ideas.`;
    document.querySelector('#destination-input').value = place;
  });
});

const weatherByCity = {
  Delhi: { temp: '27°', condition: 'Clear skies', tip: 'Perfect for a day of exploring', humidity: '43%', wind: '11 km/h', icon: '☀' },
  Jaipur: { temp: '30°', condition: 'Sunny & warm', tip: 'Pack water for fort-hopping', humidity: '31%', wind: '14 km/h', icon: '☀' },
  Kochi: { temp: '26°', condition: 'Gentle showers', tip: 'A light rain jacket is useful', humidity: '82%', wind: '8 km/h', icon: '☂' },
  Leh: { temp: '14°', condition: 'Crisp & bright', tip: 'Layer up after sunset', humidity: '23%', wind: '18 km/h', icon: '☀' },
  Goa: { temp: '29°', condition: 'Coastal breeze', tip: 'Ideal for a sunset by the sea', humidity: '68%', wind: '16 km/h', icon: '☀' }
};

document.querySelector('#weather-city')?.addEventListener('change', (event) => {
  const forecast = weatherByCity[event.target.value];
  document.querySelector('#weather-temp').textContent = forecast.temp;
  document.querySelector('#weather-condition').textContent = forecast.condition;
  document.querySelector('#weather-tip').textContent = forecast.tip;
  document.querySelector('#weather-humidity').textContent = forecast.humidity;
  document.querySelector('#weather-wind').textContent = forecast.wind;
  document.querySelector('#weather-icon').textContent = forecast.icon;
});

const bookingOptions = {
  package: [
    ['Popular', 'Royal Rajasthan', '8 days · Jaipur, Jodhpur & Udaipur', '₹42,500'],
    ['Relaxed', 'Kerala Unhurried', '7 days · Kochi, Munnar & Alleppey', '₹36,800'],
    ['Adventure', 'Ladakh Beyond', '9 days · Leh, Nubra & Pangong', '₹51,200']
  ],
  stay: [
    ['Heritage', 'Haveli stay, Jaipur', '2 nights · Breakfast included', '₹8,400'],
    ['Backwater', 'Houseboat, Alleppey', '1 night · Private cruise', '₹12,600'],
    ['Mountain', 'Boutique lodge, Leh', '3 nights · Airport transfer', '₹17,900']
  ],
  transport: [
    ['Scenic', 'Palace on Wheels', '7 nights · Rajasthan circuit', '₹58,000'],
    ['Flexible', 'Private cab with driver', 'Daily · Fuel and driver included', '₹4,900'],
    ['Adventure', 'Himalayan bike rental', 'Daily · Helmet and roadside support', '₹1,800']
  ]
};

const optionContainer = document.querySelector('#booking-options');
function renderBookingOptions(type) {
  optionContainer.innerHTML = bookingOptions[type].map(([tag, title, details, price], index) => `
    <article class="booking-option ${index === 2 ? 'featured' : ''}"><span class="option-tag">${tag}</span><h3>${title}</h3><p>${details}</p><strong>${price} <small>${type === 'transport' ? 'starting from' : 'per guest'}</small></strong><button class="reserve-button" data-item="${title}">Reserve ${type === 'stay' ? 'stay' : type} <span>→</span></button></article>`).join('');
}

document.querySelectorAll('.booking-tab').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.booking-tab').forEach((button) => button.classList.remove('active'));
  tab.classList.add('active');
  renderBookingOptions(tab.dataset.booking);
}));

function renderSavedBookings() {
  const saved = JSON.parse(localStorage.getItem('indiaTourismBookings') || '[]');
  const target = document.querySelector('#saved-bookings');
  target.innerHTML = saved.length ? `Saved booking: <strong>${saved[saved.length - 1]}</strong><button id="clear-bookings">Clear</button>` : '';
  document.querySelector('#clear-bookings')?.addEventListener('click', () => { localStorage.removeItem('indiaTourismBookings'); renderSavedBookings(); });
}

optionContainer?.addEventListener('click', (event) => {
  const reserve = event.target.closest('.reserve-button');
  if (!reserve) return;
  const saved = JSON.parse(localStorage.getItem('indiaTourismBookings') || '[]');
  saved.push(reserve.dataset.item);
  localStorage.setItem('indiaTourismBookings', JSON.stringify(saved));
  document.querySelector('.booking-feedback').textContent = `${reserve.dataset.item} is saved to your booking list.`;
  renderSavedBookings();
});
renderSavedBookings();

document.querySelectorAll('.gallery-item').forEach((item) => item.addEventListener('click', () => {
  const lightbox = document.querySelector('#lightbox');
  const image = item.querySelector('img');
  document.querySelector('#lightbox-image').src = image.src;
  document.querySelector('#lightbox-image').alt = image.alt;
  document.querySelector('#lightbox-caption').textContent = item.dataset.caption;
  lightbox.showModal();
}));
document.querySelector('.lightbox-close')?.addEventListener('click', () => document.querySelector('#lightbox').close());

document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const feedback = form.querySelector('.form-feedback');
  if (!form.checkValidity()) { feedback.textContent = 'Please complete each field with valid details.'; form.reportValidity(); return; }
  const enquiry = Object.fromEntries(new FormData(form));
  const stored = JSON.parse(localStorage.getItem('indiaTourismEnquiries') || '[]');
  stored.push({ ...enquiry, sentAt: new Date().toISOString() });
  localStorage.setItem('indiaTourismEnquiries', JSON.stringify(stored));
  form.reset();
  feedback.textContent = 'Thank you — your enquiry has been saved. Our travel team will be in touch soon.';
});
