const sections = document.querySelectorAll('section');
const helpTooltip = document.getElementById('helpTooltip');
const toggleBtn = document.getElementById('google_translate_toggle');
const translateBox = document.getElementById('google_translate_element');

toggleBtn.addEventListener('click', () => {
  const isVisible = translateBox.style.display === 'block';
  translateBox.style.display = isVisible ? 'none' : 'block';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const index = Array.from(sections).indexOf(entry.target);
      updateTooltip(index);
    }
  });
}, { threshold: 0.6 });

sections.forEach(section => observer.observe(section));

function updateTooltip(index) {
  helpTooltip.innerHTML = `Slide ${index + 1} of ${sections.length} &mdash; Use <strong>→</strong> or <strong>Space</strong> to go forward, <strong>←</strong> to go back.`;
}

function getCurrentIndex() {
  const index = [...sections].findIndex(s => {
    const rect = s.getBoundingClientRect();
    return rect.top >= 0 && rect.top < window.innerHeight * 0.5;
  });
  return index >= 0 ? index : 0;
}

document.addEventListener('keydown', (e) => {
  const currentIndex = getCurrentIndex();

  if (e.key === ' ' || e.key === 'ArrowRight') {
    e.preventDefault();
    const next = currentIndex + 1;
    if (sections[next]) {
      sections[next].scrollIntoView({ behavior: 'smooth' });
      updateTooltip(next);
    }
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    const prev = currentIndex - 1;
    if (sections[prev]) {
      sections[prev].scrollIntoView({ behavior: 'smooth' });
      updateTooltip(prev);
    }
  }
});

window.addEventListener('load', () => {
  updateTooltip(getCurrentIndex());
});


// Animate outline items
const outlineItems = document.querySelectorAll('.outline-item');

const outlineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.3,
});

outlineItems.forEach(item => outlineObserver.observe(item));


// Check visibility on load for outline items already in viewport
window.addEventListener('load', () => {
  outlineItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      item.classList.add('visible');
    }
  });
});



document.querySelectorAll('.outline-item h3 a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // evita el salto inmediato

    const targetId = this.getAttribute('href').substring(1); // quita el #
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const bubbles = document.querySelectorAll('.fail-bubble');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, {
    threshold: 0.5,
  });

  bubbles.forEach(bubble => observer.observe(bubble));
});


