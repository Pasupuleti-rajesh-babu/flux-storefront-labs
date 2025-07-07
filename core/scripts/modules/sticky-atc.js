export function initStickyATC() {
  const atcSection = document.querySelector('.sticky.bottom-0');
  if (!atcSection) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      // If the top of the viewport is above the ATC section, make it sticky.
      if (entry.boundingClientRect.y < 0) {
        atcSection.classList.add('is-sticky');
      } else {
        atcSection.classList.remove('is-sticky');
      }
    },
    {
      root: null,
      threshold: 1.0,
    }
  );

  // A dummy element to observe
  const sentinel = document.createElement('div');
  sentinel.style.height = '1px';
  atcSection.parentNode.insertBefore(sentinel, atcSection);

  observer.observe(sentinel);

  // Add some styles for the sticky state
  const style = document.createElement('style');
  style.innerHTML = `
    .is-sticky {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 10;
        padding: 1rem;
        background-color: white;
        border-top: 1px solid #e5e7eb;
        box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    }
  `;
  document.head.appendChild(style);
} 