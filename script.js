document.addEventListener('DOMContentLoaded', function () {
  // ====================
  // SIDEBAR FUNCTIONALITY
  // ====================
  const menuIcon = document.querySelector('.nav__menu-icon');
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');
  const closeIcon = document.querySelector('.sidebar__close');

  if (menuIcon && sidebar && sidebarOverlay && closeIcon) {
    menuIcon.addEventListener('click', () => {
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('open');
    });

    closeIcon.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('open');
    });

    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('open');
    });
  }

  // ====================
  // PETFOOD PAGE LOGIC
  // ====================
  const categoryCards = document.querySelectorAll('.usage-card');
  const itemsWrapper = document.querySelector('.flavour-wrapper');
  const button = document.querySelector('.send-button');
  const popupOverlay = document.querySelector('.popup-overlay');
  const popupForm = document.getElementById('popupForm');
  const selectedCategoryDiv = document.getElementById('selectedCategory');
  const selectedFlavoursDiv = document.getElementById('selectedFlavours');

  let selectedCategory = "";
  let selectedCount = 0;

  // ✅ Category Selection
  const categoryWrapper = document.querySelector('.category-wrapper');
  if (categoryWrapper) {
    categoryWrapper.addEventListener('click', e => {
      const card = e.target.closest('.usage-card');
      if (!card) return;

      categoryCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      selectedCategory = card.getAttribute('data-name') || "";
    });
  }

  // ✅ Flavour Selection (Event Delegation)
  if (itemsWrapper) {
    itemsWrapper.addEventListener('click', e => {
      const item = e.target.closest('.flavour-item');
      if (!item) return;

      if (item.classList.contains('selected')) {
        item.classList.remove('selected');
        selectedCount--;
      } else {
        if (selectedCount < 5) {
          item.classList.add('selected');
          selectedCount++;
        } else {
          alert('You can select up to 5 flavours only.');
        }
      }

      if (button) {
        button.disabled = selectedCount === 0;
        button.classList.toggle('active', selectedCount > 0);
      }
    });
  }

  // ✅ Show Popup on Send
  if (button) {
    button.addEventListener('click', () => {
      if (!selectedCategory) {
        alert("Please select a category first.");
        return;
      }

      if (selectedCategoryDiv) {
        selectedCategoryDiv.innerText = selectedCategory;
      }

      const selectedFlavours = Array.from(document.querySelectorAll('.flavour-item.selected'))
        .map(el => el.textContent.trim());

      if (selectedFlavoursDiv) {
        selectedFlavoursDiv.innerHTML = "";
        const fragment = document.createDocumentFragment();
        selectedFlavours.forEach(flavour => {
          const span = document.createElement('span');
          span.innerText = flavour;
          fragment.appendChild(span);
        });
        selectedFlavoursDiv.appendChild(fragment);
      }

      popupOverlay?.classList.remove('hidden');
    });
  }

  // ✅ Close Popup on Overlay Click
  if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) {
        popupOverlay.classList.add('hidden');
      }
    });
  }

  // ✅ Handle Form Submission
  if (popupForm) {
    popupForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(popupForm);
      formData.append('category', selectedCategory);

      const selectedFlavours = Array.from(document.querySelectorAll('.flavour-item.selected'))
        .map(el => el.textContent.trim())
        .join(', ');
      formData.append('flavours', selectedFlavours);

      fetch('sendmail.php', {
        method: 'POST',
        body: formData
      })
        .then(res => res.ok ? alert('Thank you for your message!') : alert('Submission failed.'))
        .then(() => popupOverlay?.classList.add('hidden'))
        .catch(err => alert('Error: ' + err));
    });
  }

  // ====================
  // BENEFIT CARDS ANIMATION
  // ====================
  const benefitCards = document.querySelectorAll('.benefits__card');
  if (benefitCards.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); // animate once
        }
      });
    }, { threshold: 0.1 });

    benefitCards.forEach(card => observer.observe(card));
  }
});
