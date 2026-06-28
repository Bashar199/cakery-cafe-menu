document.addEventListener('DOMContentLoaded', () => {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const menuItems = document.querySelectorAll('.menu-item');
            const sectionHeaders = document.querySelectorAll('.section-header');
            
            menuItems.forEach(item => {
                const title = item.querySelector('.menu-title').textContent.toLowerCase();
                const desc = item.querySelector('.menu-desc')?.textContent.toLowerCase() || '';
                
                if (title.includes(query) || desc.includes(query)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });

            // Hide empty sections
            sectionHeaders.forEach(header => {
                const targetId = header.id;
                let hasVisibleItems = false;
                
                // Find items belonging to this section (they follow the header until the next header)
                let nextSibling = header.nextElementSibling;
                while(nextSibling && !nextSibling.classList.contains('section-header')) {
                    if(nextSibling.classList.contains('menu-item') && nextSibling.style.display !== 'none') {
                        hasVisibleItems = true;
                        break;
                    }
                    nextSibling = nextSibling.nextElementSibling;
                }
                
                header.style.display = hasVisibleItems || query === '' ? 'block' : 'none';
            });
        });
    }

    // Category navigation click to scroll
    const catItems = document.querySelectorAll('.cat-item');
    catItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove active from all
            catItems.forEach(c => c.classList.remove('active'));
            // Add active to clicked
            item.classList.add('active');

            const targetId = item.getAttribute('data-target');
            if (targetId) {
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    const offset = 160; // account for fixed navbar and sticky categories
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = targetEl.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else if (targetId === 'all') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Update active category on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.section-header');
        let currentSectionId = 'all';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // 170 to account for navbars
            if (scrollY >= sectionTop - 170) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (scrollY < 200) currentSectionId = 'all';

        catItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === currentSectionId) {
                item.classList.add('active');
                
                // Scroll the sticky nav so the active item is visible
                const navWrapper = document.querySelector('.category-nav');
                if (navWrapper) {
                    const itemLeft = item.offsetLeft;
                    const itemWidth = item.offsetWidth;
                    const wrapperWidth = navWrapper.offsetWidth;
                    const scrollTarget = itemLeft - (wrapperWidth / 2) + (itemWidth / 2);
                    navWrapper.scrollTo({ left: scrollTarget, behavior: 'smooth' });
                }
            }
        });
    });
});
