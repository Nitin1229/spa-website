// SPA Router
class SPARouter {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.init();
    }

    init() {
        // Handle initial load
        window.addEventListener('load', () => {
            this.handleRoute();
        });

        // Handle hash changes
        window.addEventListener('hashchange', () => {
            this.handleRoute();
        });

        // Handle navigation clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const hash = link.getAttribute('href');
                window.location.hash = hash;
            });
        });
    }

    handleRoute() {
        const hash = window.location.hash.slice(1) || 'home';
        this.navigate(hash);
    }

    navigate(route) {
        // Hide all sections
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(route);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentRoute = route;
        } else {
            // Default to home if route not found
            document.getElementById('home').classList.add('active');
            this.currentRoute = 'home';
        }

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${route}`) {
                link.classList.add('active');
            }
        });
    }
}

// Form Handler
class FormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.previewBtn = document.getElementById('previewBtn');
        this.saveBtn = document.getElementById('saveBtn');
        this.previewDiv = document.getElementById('formPreview');
        this.messageDiv = document.getElementById('formMessage');
        this.init();
    }

    init() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Preview button
        this.previewBtn.addEventListener('click', () => {
            this.showPreview();
        });

        // Save draft button
        this.saveBtn.addEventListener('click', () => {
            this.saveDraft();
        });

        // Load draft on page load
        this.loadDraft();
    }

    getFormData() {
        return {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
    }

    handleSubmit() {
        const formData = this.getFormData();
        
        // Validate form
        if (!this.validateForm(formData)) {
            this.showMessage('Please fill in all fields correctly.', 'error');
            return;
        }

        // Simulate form submission
        this.showMessage('Form submitted successfully! (This is a demo)', 'success');
        
        // Clear form after successful submission
        setTimeout(() => {
            this.form.reset();
            this.clearDraft();
            this.hidePreview();
        }, 2000);

        // In a real application, you would send the data to a server here
        console.log('Form Data:', formData);
    }

    validateForm(data) {
        return data.name.trim() !== '' &&
               data.email.trim() !== '' &&
               data.email.includes('@') &&
               data.subject.trim() !== '' &&
               data.message.trim() !== '';
    }

    showPreview() {
        const formData = this.getFormData();
        
        if (!this.validateForm(formData)) {
            this.showMessage('Please fill in all fields before previewing.', 'error');
            return;
        }

        this.previewDiv.innerHTML = `
            <h3>Form Preview</h3>
            <p><strong>Name:</strong> ${this.escapeHtml(formData.name)}</p>
            <p><strong>Email:</strong> ${this.escapeHtml(formData.email)}</p>
            <p><strong>Subject:</strong> ${this.escapeHtml(formData.subject)}</p>
            <p><strong>Message:</strong></p>
            <p>${this.escapeHtml(formData.message)}</p>
        `;
        this.previewDiv.classList.remove('hidden');
        this.hideMessage();
    }

    hidePreview() {
        this.previewDiv.classList.add('hidden');
    }

    saveDraft() {
        const formData = this.getFormData();
        localStorage.setItem('contactFormDraft', JSON.stringify(formData));
        this.showMessage('Draft saved successfully!', 'success');
        setTimeout(() => {
            this.hideMessage();
        }, 2000);
    }

    loadDraft() {
        const draft = localStorage.getItem('contactFormDraft');
        if (draft) {
            try {
                const formData = JSON.parse(draft);
                document.getElementById('name').value = formData.name || '';
                document.getElementById('email').value = formData.email || '';
                document.getElementById('subject').value = formData.subject || '';
                document.getElementById('message').value = formData.message || '';
            } catch (e) {
                console.error('Error loading draft:', e);
            }
        }
    }

    clearDraft() {
        localStorage.removeItem('contactFormDraft');
    }

    showMessage(message, type) {
        this.messageDiv.textContent = message;
        this.messageDiv.className = `form-message ${type}`;
        this.messageDiv.classList.remove('hidden');
    }

    hideMessage() {
        this.messageDiv.classList.add('hidden');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize SPA Router
    const router = new SPARouter();
    
    // Initialize Form Handler
    const formHandler = new FormHandler();
    
    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

