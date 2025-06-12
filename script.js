// Sample project data
const projects = [
    {
        id: 1,
        title: "Online Voting System",
        description: "Complete online voting solution with high security integration",
        image: "fas fa-shopping-cart",
        price: "₹899 = (<s>₹1199</s> after 25% discount)",
       
        technologies: ["HTML", "CSS", "JavaScript", "Flask", "Postgresql"],
        features: [
            "Responsive design for all devices",
            "Ballot creation and management",
            "Secure vote casting and encryption",
            "Admin dashboard",
            "Candidate and election management system",
            "User authentication (with OTP)",
            "Real-time result tracking and analytics",
            "Email notifications"
        ],
        orderLink: "https://docs.google.com/forms/d/e/1FAIpQLSd7QLOxH7y-Odu115muGiarA8kcBEjqgE8oI3CvtN4erLy8qA/viewform?usp=dialog"
    },
];

// DOM elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const projectsGrid = document.getElementById('projectsGrid');
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    initializeNavigation();
    initializeModal();
    initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
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
}

// Load and display projects
function loadProjects() {
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in-up';
    card.innerHTML = `
        <div class="project-image">
            <i class="${project.image}"></i>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-price">${project.price}</div>
            <div class="project-actions">
                <button class="btn btn-primary btn-small" onclick="viewProject(${project.id})">View Details</button>
                <a href="${project.orderLink}" target="_blank" class="btn btn-secondary btn-small">Order Now</a>
            </div>
        </div>
    `;
    
    return card;
}

// View project details in modal
function viewProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>${project.title}</h2>
            <p>${project.description}</p>
        </div>
        <div class="modal-body">
            <div class="modal-image">
                <i class="${project.image}"></i>
            </div>
            <div class="modal-details">
                <div class="modal-info">
                    <h4>Technologies Used</h4>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="modal-features">
                        <h4>Features Included</h4>
                        <ul>
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="modal-order">
                    <h4>Ready to Order?</h4>
                    <div class="project-price">${project.price}</div>
                    <p>Click below to fill out our order form. We'll verify your details and contact you on Instagram within 24 hours.</p>
                    <a href="${project.orderLink}" target="_blank" class="btn btn-primary">Order This Project</a>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Initialize modal functionality
function initializeModal() {
    // Close modal when clicking the X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.project-card, .service-card, .feature').forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

function hideLoading(element, content) {
    element.innerHTML = content;
}

// Contact form handling (if you add a contact form later)
function handleContactForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Here you would typically send the form data to your server
    // For now, we'll just show a success message
    alert('Thank you for your message! We\'ll get back to you soon.');
    event.target.reset();
}

// Social media links
function openInstagram() {
    window.open('https://instagram.com/cybvarsco', '_blank');
}

function openLinkedIn() {
    window.open('https://linkedin.com/company/cybvarsco', '_blank');
}

function openGitHub() {
    window.open('https://github.com/cybvarsco', '_blank');
}

// Search functionality (if you want to add search later)
function searchProjects(query) {
    const filteredProjects = projects.filter(project => 
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query.toLowerCase()))
    );
    
    displayFilteredProjects(filteredProjects);
}

function displayFilteredProjects(filteredProjects) {
    projectsGrid.innerHTML = '';
    
    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = '<p>No projects found matching your search.</p>';
        return;
    }
    
    filteredProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Filter projects by technology
function filterByTechnology(tech) {
    const filteredProjects = projects.filter(project => 
        project.technologies.includes(tech)
    );
    displayFilteredProjects(filteredProjects);
}

// Reset filters
function resetFilters() {
    loadProjects();
}

// Make functions globally available
window.viewProject = viewProject;
window.openInstagram = openInstagram;
window.openLinkedIn = openLinkedIn;
window.openGitHub = openGitHub;
window.searchProjects = searchProjects;
window.filterByTechnology = filterByTechnology;
window.resetFilters = resetFilters;