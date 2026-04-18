// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// FAQ Toggle
const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('i');
        
        content.classList.toggle('hidden');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
        
        // Close other FAQs
        faqToggles.forEach(otherToggle => {
            if (otherToggle !== toggle) {
                const otherContent = otherToggle.nextElementSibling;
                const otherIcon = otherToggle.querySelector('i');
                otherContent.classList.add('hidden');
                otherIcon.classList.remove('fa-chevron-up');
                otherIcon.classList.add('fa-chevron-down');
            }
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// Search Functionality
const searchInput = document.querySelector('input[type="text"]');
const searchBtn = document.querySelector('.fa-search').parentElement;

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Filter designer cards based on search
        const designerCards = document.querySelectorAll('#designers .card-hover');
        let found = false;
        
        designerCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase())) {
                card.style.display = 'block';
                found = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (!found) {
            showNotification('No designers found matching your search. Please try different keywords.');
        }
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Gallery Filter Functionality
const galleryFilters = document.querySelectorAll('.gallery-filter');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        galleryFilters.forEach(f => {
            f.classList.remove('bg-purple-600', 'text-white');
            f.classList.add('bg-white', 'text-gray-600');
        });
        
        // Add active class to clicked filter
        filter.classList.remove('bg-white', 'text-gray-600');
        filter.classList.add('bg-purple-600', 'text-white');
        
        const filterValue = filter.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Add transition styles for gallery items
galleryItems.forEach(item => {
    item.style.transition = 'all 0.3s ease-in-out';
});

// Enhanced Quote Request Functionality
function enhancedQuoteRequest(designerName, designerPhone) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4';
    modalOverlay.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md w-full transform scale-95 opacity-0 transition-all duration-300">
            <div class="text-center mb-6">
                <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-check text-green-600 text-3xl"></i>
                </div>
                <h3 class="text-2xl font-bold mb-2">Quote Request Sent!</h3>
                <p class="text-gray-600">Your request has been sent to ${designerName}</p>
            </div>
            <div class="space-y-3 mb-6">
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm text-gray-600">Designer will contact you at:</p>
                    <p class="font-semibold">${designerPhone}</p>
                </div>
                <div class="bg-purple-50 p-3 rounded-lg">
                    <p class="text-sm text-purple-600">Expected response time:</p>
                    <p class="font-semibold text-purple-700">Within 2-4 hours</p>
                </div>
            </div>
            <div class="flex gap-3">
                <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                    Close
                </button>
                <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                    View More Designers
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    
    // Animate modal in
    setTimeout(() => {
        const modal = modalOverlay.querySelector('div');
        modal.classList.remove('scale-95', 'opacity-0');
        modal.classList.add('scale-100', 'opacity-100');
    }, 10);
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });
}

// Update Get Quote buttons
const quoteButtons = document.querySelectorAll('button:contains("Get Quote")');
quoteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = button.closest('.card-hover');
        const designerName = card.querySelector('h3').textContent;
        const designerPhone = card.querySelector('a[href^="tel"]').textContent;
        enhancedQuoteRequest(designerName, designerPhone);
    });
});

// Service Cards "Learn More" functionality
document.querySelectorAll('button:contains("Learn More")').forEach(button => {
    button.addEventListener('click', () => {
        const serviceCard = button.closest('.card-hover');
        const serviceName = serviceCard.querySelector('h3').textContent;
        showNotification(`Loading more information about ${serviceName}...`);
        
        // Simulate loading and then scroll to designers section
        setTimeout(() => {
            document.getElementById('designers').scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    });
});

// Hero Section Buttons
document.querySelectorAll('button:contains("Home Interiors")').forEach(button => {
    button.addEventListener('click', () => {
        showNotification('Finding home interior specialists...');
        setTimeout(() => {
            document.getElementById('designers').scrollIntoView({ behavior: 'smooth' });
        }, 800);
    });
});

document.querySelectorAll('button:contains("Office/Commercial Interiors")').forEach(button => {
    button.addEventListener('click', () => {
        showNotification('Finding commercial interior experts...');
        setTimeout(() => {
            document.getElementById('designers').scrollIntoView({ behavior: 'smooth' });
        }, 800);
    });
});

// Contact Button
document.querySelectorAll('button:contains("Contact Us")').forEach(button => {
    button.addEventListener('click', () => {
        showContactModal();
    });
});

// Get Started Button
document.querySelectorAll('button:contains("Get Started")').forEach(button => {
    button.addEventListener('click', () => {
        showGetStartedModal();
    });
});

// View More Button
document.querySelectorAll('button:contains("View More")').forEach(button => {
    button.addEventListener('click', () => {
        showNotification('Loading more designers...');
        // Simulate loading more content
        setTimeout(() => {
            showNotification('All available designers are shown above.');
        }, 1500);
    });
});

// FAQ Accordion functionality
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('h3');
    const answer = item.querySelector('p');
    
    question.addEventListener('click', () => {
        const isOpen = answer.style.display === 'block';
        
        // Close all other FAQs
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.querySelector('p').style.display = 'none';
                otherItem.querySelector('h3').classList.remove('text-purple-600');
            }
        });
        
        // Toggle current FAQ
        answer.style.display = isOpen ? 'none' : 'block';
        question.classList.toggle('text-purple-600');
    });
});

// Contact Modal
function showContactModal() {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4';
    modalOverlay.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md w-full transform scale-95 opacity-0 transition-all duration-300">
            <h3 class="text-2xl font-bold mb-6">Contact Us</h3>
            <form class="space-y-4">
                <input type="text" placeholder="Your Name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                <input type="email" placeholder="Your Email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                <input type="tel" placeholder="Your Phone" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                <textarea placeholder="Your Message" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"></textarea>
                <button type="submit" class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                    Send Message
                </button>
            </form>
            <button onclick="this.closest('.fixed').remove()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <i class="fas fa-times text-xl"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    
    // Animate modal in
    setTimeout(() => {
        const modal = modalOverlay.querySelector('div');
        modal.classList.remove('scale-95', 'opacity-0');
        modal.classList.add('scale-100', 'opacity-100');
    }, 10);
    
    // Handle form submission
    modalOverlay.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Message sent successfully! We will contact you soon.');
        modalOverlay.remove();
    });
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });
}

// Get Started Modal
function showGetStartedModal() {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4';
    modalOverlay.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md w-full transform scale-95 opacity-0 transition-all duration-300">
            <h3 class="text-2xl font-bold mb-6">Get Started</h3>
            <form class="space-y-4">
                <input type="text" placeholder="Your Name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                <input type="email" placeholder="Your Email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                <input type="tel" placeholder="Your Phone" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                    <option value="">Select Service Type</option>
                    <option value="home">Home Interiors</option>
                    <option value="office">Office/Commercial</option>
                    <option value="kitchen">Kitchen Design</option>
                    <option value="bedroom">Bedroom Design</option>
                    <option value="other">Other</option>
                </select>
                <textarea placeholder="Describe your project" rows="3" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"></textarea>
                <button type="submit" class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                    Submit Request
                </button>
            </form>
            <button onclick="this.closest('.fixed').remove()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <i class="fas fa-times text-xl"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    
    // Animate modal in
    setTimeout(() => {
        const modal = modalOverlay.querySelector('div');
        modal.classList.remove('scale-95', 'opacity-0');
        modal.classList.add('scale-100', 'opacity-100');
    }, 10);
    
    // Handle form submission
    modalOverlay.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Request submitted! Our team will contact you within 24 hours.');
        modalOverlay.remove();
    });
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });
}

// Gallery Item Click Handler
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        
        // Create lightbox modal
        const lightbox = document.createElement('div');
        lightbox.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4';
        lightbox.innerHTML = `
            <div class="relative max-w-4xl w-full">
                <button onclick="this.closest('.fixed').remove()" class="absolute -top-12 right-0 text-white hover:text-gray-300 transition">
                    <i class="fas fa-times text-2xl"></i>
                </button>
                <img src="${item.querySelector('img').src}" alt="${title}" class="w-full h-auto rounded-lg">
                <div class="text-center mt-6">
                    <h3 class="text-2xl font-bold text-white mb-2">${title}</h3>
                    <p class="text-gray-300">${description}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
            }
        });
    });
});

// Enhanced Search with Live Results
const searchInput = document.querySelector('input[type="text"]');
const searchBtn = document.querySelector('.fa-search').parentElement;

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    
    if (searchTerm.length > 2) {
        const designerCards = document.querySelectorAll('#designers .card-hover');
        let matchCount = 0;
        
        designerCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.bg-purple-100')).map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          tags.some(tag => tag.includes(searchTerm));
            
            if (matches) {
                card.style.display = 'block';
                card.style.opacity = '1';
                matchCount++;
            } else {
                card.style.opacity = '0.3';
            }
        });
        
        // Show search results count
        if (searchTerm.length > 2) {
            showSearchResults(matchCount, searchTerm);
        }
    } else {
        // Reset all cards if search is cleared
        document.querySelectorAll('#designers .card-hover').forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
        });
        hideSearchResults();
    }
});

function showSearchResults(count, term) {
    let resultsDiv = document.getElementById('searchResults');
    if (!resultsDiv) {
        resultsDiv = document.createElement('div');
        resultsDiv.id = 'searchResults';
        resultsDiv.className = 'fixed top-20 right-4 bg-white rounded-lg shadow-xl p-4 z-40 max-w-xs';
        document.body.appendChild(resultsDiv);
    }
    
    resultsDiv.innerHTML = `
        <div class="flex items-center justify-between mb-2">
            <h4 class="font-semibold">Search Results</h4>
            <button onclick="document.getElementById('searchResults').remove()" class="text-gray-400 hover:text-gray-600">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <p class="text-sm text-gray-600">Found ${count} designers matching "${term}"</p>
    `;
}

function hideSearchResults() {
    const resultsDiv = document.getElementById('searchResults');
    if (resultsDiv) {
        resultsDiv.remove();
    }
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        const heroImage = heroSection.querySelector('img');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Add CSS for loaded images
const imageStyles = document.createElement('style');
imageStyles.textContent = `
    img {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    img.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(imageStyles);

// Notification System
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Call Us Button
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const phoneNumber = link.textContent.replace(/[^0-9]/g, '');
        showNotification(`Calling ${phoneNumber}...`);
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'fixed bottom-4 left-4 bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg z-40 opacity-0 transition-opacity duration-300 hover:bg-purple-700';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove('opacity-0');
        scrollToTopBtn.classList.add('opacity-100');
    } else {
        scrollToTopBtn.classList.remove('opacity-100');
        scrollToTopBtn.classList.add('opacity-0');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Validation (for future contact forms)
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.phone || !isValidPhone(formData.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
}

// Lazy Loading for Images (if added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.card-hover, section').forEach(el => {
        animationObserver.observe(el);
    });
    
    // Initialize lazy loading
    lazyLoadImages();
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-fade-in {
        animation: fadeIn 0.6s ease-out;
    }
`;
document.head.appendChild(style);

// Service Worker Registration (for future PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics and Performance Monitoring
function trackUserInteraction(action, element) {
    // This would integrate with Google Analytics or similar
    console.log(`User interaction: ${action} on ${element}`);
}

// Track button clicks
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        trackUserInteraction('click', button.textContent);
    });
});

// Track navigation
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        trackUserInteraction('navigation', link.getAttribute('href'));
    });
});
