document.addEventListener('DOMContentLoaded', function () {
  // ====================
  // SIDEBAR FUNCTIONALITY
  // ====================
  const menuIcon = document.querySelector('.nav__menu-icon');
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');
  const closeIcon = document.querySelector('.sidebar__close');

  if (menuIcon && sidebar && sidebarOverlay && closeIcon) {
    // Open Sidebar
    menuIcon.addEventListener('click', function () {
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('open');
    });

    // Close Sidebar
    closeIcon.addEventListener('click', function () {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('open');
    });

    // Close when clicking overlay
    sidebarOverlay.addEventListener('click', function () {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('open');
    });
  }

  // ====================
  // PETFOOD PAGE LOGIC
  // ====================

  const categoryCards = document.querySelectorAll('.usage-card');
  const items = document.querySelectorAll('.flavour-item');
  const button = document.querySelector('.send-button');
  const popupOverlay = document.querySelector('.popup-overlay');
  const popupForm = document.getElementById('popupForm');
  const selectedCategoryDiv = document.getElementById('selectedCategory');
  const selectedFlavoursDiv = document.getElementById('selectedFlavours');

  let selectedCategory = "";
  let selectedCount = 0;

  // ✅ Kategori seçimi
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      categoryCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      selectedCategory = card.getAttribute('data-name') || "";
      console.log("Selected category updated:", selectedCategory);
    });
  });

  // ✅ Aroma seçimi
  items.forEach(item => {
    item.addEventListener('click', () => {
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
  });

  // ✅ Send button click → popup açılır
  if (button) {
    button.addEventListener('click', () => {
      if (!selectedCategory || selectedCategory === "") {
        alert("Please select a category first.");
        return;
      }

      if (selectedCategoryDiv) {
        selectedCategoryDiv.innerText = selectedCategory;
      }

      const selectedFlavours = Array.from(document.querySelectorAll('.flavour-item.selected'))
                                    .map(el => el.textContent);

      if (selectedFlavoursDiv) {
        selectedFlavoursDiv.innerHTML = "";
        selectedFlavours.forEach(flavour => {
          const span = document.createElement('span');
          span.innerText = flavour;
          selectedFlavoursDiv.appendChild(span);
        });
      }

      popupOverlay?.classList.remove('hidden');
    });
  }

  // ✅ Popup dışında tıklayınca kapat
  if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) {
        popupOverlay.classList.add('hidden');
      }
    });
  }

  // ✅ PETFOOD Form submission
  if (popupForm) {
    popupForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(popupForm);
      formData.append('category', selectedCategory);

      const selectedFlavours = Array.from(document.querySelectorAll('.flavour-item.selected'))
                                    .map(el => el.textContent)
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
});

// script.js — Intersection Observer for benefit cards

const benefitCards = document.querySelectorAll('.benefits__card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.1 });

benefitCards.forEach(card => {
  observer.observe(card);
});



// document.addEventListener('DOMContentLoaded', function () {
//   const menuIcon = document.querySelector('.nav__menu-icon');
//   const sidebar = document.querySelector('.sidebar');
//   const sidebarOverlay = document.querySelector('.sidebar-overlay');
//   const closeIcon = document.querySelector('.sidebar__close');

//   // Open Sidebar
//   menuIcon.addEventListener('click', function () {
//     sidebar.classList.add('open');
//     sidebarOverlay.classList.add('open');
//   });

//   // Close Sidebar
//   closeIcon.addEventListener('click', function () {
//     sidebar.classList.remove('open');
//     sidebarOverlay.classList.remove('open');
//   });

//   // Close when clicking overlay
//   sidebarOverlay.addEventListener('click', function () {
//     sidebar.classList.remove('open');
//     sidebarOverlay.classList.remove('open');
//   });
// });

// // script.js

// const cards = document.querySelectorAll('.benefits__card');

// const observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     if(entry.isIntersecting){
//       entry.target.classList.add('in-view');
//     }
//   });
// }, { threshold: 0.1 });

// cards.forEach(card => {
//   observer.observe(card);
// });

// // PETFOOD PAGE

// document.addEventListener('DOMContentLoaded', () => {

//   // ✅ Kategori ve aroma seçimleri için global değişkenler
//   const cards = document.querySelectorAll('.usage-card');
//   const items = document.querySelectorAll('.flavour-item');
//   const button = document.querySelector('.send-button');
//   const popupOverlay = document.querySelector('.popup-overlay');
//   const popupForm = document.getElementById('popupForm');
//   const selectedCategoryDiv = document.getElementById('selectedCategory');
//   const selectedFlavoursDiv = document.getElementById('selectedFlavours');

//   let selectedCategory = ""; // Global olarak tanımlı
//   let selectedCount = 0;

//   // ✅ Kategori seçimi
//   cards.forEach(card => {
//     card.addEventListener('click', () => {
//       cards.forEach(c => c.classList.remove('selected'));
//       card.classList.add('selected');

//         // 🛠️ Seçili kategori değerini güncelle (span yerine data-name kullan)
//       selectedCategory = card.getAttribute('data-name') || "";
//       console.log("Selected category updated:", selectedCategory);
//     });
//   });

//   // ✅ Aroma seçimi
// items.forEach(item => {
//   item.addEventListener('click', () => {
//     if (item.classList.contains('selected')) {
//       item.classList.remove('selected');
//       selectedCount--;
//     } else {
//       if (selectedCount < 5) {
//         item.classList.add('selected');
//         selectedCount++;
//       } else {
//         alert('You can select up to 5 flavours only.');
//       }
//     }
//     button.disabled = selectedCount === 0;
//     button.classList.toggle('active', selectedCount > 0);
//   });
// });

// // ✅ Send button click → popup açılır
// button.addEventListener('click', () => {

//   // 🛑 Kategori seçili mi kontrol et
//   if (!selectedCategory || selectedCategory === "") {
//     alert("Please select a category first.");
//     return;
//   }

//   // ✅ Popup kategori alanını doldur
//   if (selectedCategoryDiv) {
//     selectedCategoryDiv.innerText = selectedCategory;
//   }

//   // ✅ Seçili aromaları popup içine ekle
//   const selectedFlavours = Array.from(document.querySelectorAll('.flavour-item.selected'))
//                                 .map(el => el.textContent);

//   if (selectedFlavoursDiv) {
//     selectedFlavoursDiv.innerHTML = ""; // Clear previous
//     selectedFlavours.forEach(flavour => {
//       const span = document.createElement('span');
//       span.innerText = flavour;
//       selectedFlavoursDiv.appendChild(span);
//     });
//   }

//   // ✅ Popup'ı göster
//   popupOverlay.classList.remove('hidden');
// });

// // ✅ Popup dışında tıklayınca kapat
// popupOverlay.addEventListener('click', (e) => {
//   if (e.target === popupOverlay) {
//     popupOverlay.classList.add('hidden');
//   }
// });

// // ✅ Form submission
// popupForm.addEventListener('submit', function(e) {
//   e.preventDefault();

//   const formData = new FormData(popupForm);

//   // ✅ Kategori ve aromaları ekle
//   formData.append('category', selectedCategory);
//   const selectedFlavours = Array.from(document.querySelectorAll('.flavour-item.selected'))
//                                 .map(el => el.textContent)
//                                 .join(', ');
//   formData.append('flavours', selectedFlavours);

//   // ✅ Mail gönderimi
//   fetch('sendmail.php', {
//     method: 'POST',
//     body: formData
//   })
//   .then(res => res.ok ? alert('Thank you for your message!') : alert('Submission failed.'))
//   .then(() => popupOverlay.classList.add('hidden'))
//   .catch(err => alert('Error: ' + err));
// });

// });
