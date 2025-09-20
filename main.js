// Sample project data - Replace with your actual projects
const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "Developed Spring Boot backend services for authentication, product management, and order processing, designed an optimized MySQL schema with indexing to reduce query response time by 40%, and built/tested REST APIs using JUnit & Postman achieving 85%+ code coverage.",
        category: "web",
        technologies: ["Spring Boot", "MySQL", "JUnit", "Postman"],
        githubUrl: "https://github.com/Rupeswarbhainsa777/Ecommerce-Backend",
        liveUrl: "https://ecommerce-front-end-phi-neon.vercel.app/",
        image: null,
        icon: "🛒"
    },
    {
        id: 2,
        title: "Application Management System",
        description: "Built a full-stack job application management web app with CRUD operations by implementing Spring Boot REST APIs for job details and status tracking, designing a user-friendly React UI integrated with backend services, and managing data persistence with MySQL.",
        category: "web",
        technologies: ["Spring Boot", "React", "MySQL", "JUnit", "Postman"],
        githubUrl: "https://github.com/Rupeswarbhainsa777/Application-Management-Web-Application-Backend",
        liveUrl: "https://application-management-web-applicat.vercel.app/",
        image: null,
        icon: "✅"
    },
    {
        id: 3,
        title: "Weather Mobile App",
        description: "Cross-platform mobile weather application built with React Native. Features location-based weather forecasts and beautiful UI.",
        category: "mobile",
        technologies: ["React Native", "Expo", "OpenWeather API", "AsyncStorage"],
        githubUrl: "https://github.com/yourusername/weather-app",
        liveUrl: null,
        image: null,
        icon: "🌤️"
    },
    {
        id: 4,
        title: "Desktop File Organizer",
        description: "A Python desktop application that automatically organizes files based on type, date, and custom rules. Built with PyQt5.",
        category: "desktop",
        technologies: ["Python", "PyQt5", "SQLite", "Threading"],
        githubUrl: "https://github.com/yourusername/file-organizer",
        liveUrl: null,
        image: null,
        icon: "📁"
    },
    {
        id: 5,
        title: "API Rate Limiter",
        description: "A Node.js middleware for rate limiting API requests. Supports Redis for distributed systems and multiple rate limiting strategies.",
        category: "tools",
        technologies: ["Node.js", "Redis", "Express", "Jest"],
        githubUrl: "https://github.com/yourusername/api-rate-limiter",
        liveUrl: "https://www.npmjs.com/package/your-rate-limiter",
        image: null,
        icon: "⚡"
    },
    {
        id: 6,
        title: "Portfolio Website",
        description: "A responsive portfolio website built with vanilla HTML, CSS, and JavaScript. Features smooth animations and modern design.",
        category: "web",
        technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
        githubUrl: "https://github.com/yourusername/portfolio-website",
        liveUrl: "https://your-portfolio.com",
        image: null,
        icon: "💼"
    },
    {
        id: 7,
        title: "Machine Learning Model",
        description: "A machine learning model for image classification using TensorFlow and Python. Trained on custom dataset with 95% accuracy.",
        category: "tools",
        technologies: ["Python", "TensorFlow", "OpenCV", "NumPy", "Pandas"],
        githubUrl: "https://github.com/yourusername/ml-image-classifier",
        liveUrl: null,
        image: null,
        icon: "🤖"
    },
    {
        id: 8,
        title: "Chat Application",
        description: "Real-time chat application with Socket.io, Express, and React. Features include private messaging, rooms, and file sharing.",
        category: "web",
        technologies: ["React", "Socket.io", "Express", "MongoDB", "Multer"],
        githubUrl: "https://github.com/yourusername/chat-app",
        liveUrl: "https://your-chat-app.herokuapp.com",
        image: null,
        icon: "💬"
    }
];

// DOM elements
const projectsGrid = document.getElementById('projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const totalProjectsEl = document.getElementById('total-projects');
const technologiesEl = document.getElementById('technologies');
const repositoriesEl = document.getElementById('repositories');

// State
let currentFilter = 'all';
let currentSearch = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderProjects();
    updateStats();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update current filter
            currentFilter = this.dataset.filter;
            // Re-render projects
            renderProjects();
        });
    });

    // Search input
    searchInput.addEventListener('input', function() {
        currentSearch = this.value.toLowerCase();
        renderProjects();
    });
}

// Filter and search projects
function getFilteredProjects() {
    return projects.filter(project => {
        const matchesFilter = currentFilter === 'all' || project.category === currentFilter;
        const matchesSearch = currentSearch === '' || 
            project.title.toLowerCase().includes(currentSearch) ||
            project.description.toLowerCase().includes(currentSearch) ||
            project.technologies.some(tech => tech.toLowerCase().includes(currentSearch));
        
        return matchesFilter && matchesSearch;
    });
}

// Render projects
function renderProjects() {
    const filteredProjects = getFilteredProjects();
    
    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No projects found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }

    projectsGrid.innerHTML = filteredProjects.map(project => `
        <div class="project-card" data-category="${project.category}">
            <div class="project-image">
                ${project.image ? 
                    `<img src="${project.image}" alt="${project.title}">` : 
                    `<span style="font-size: 4rem;">${project.icon}</span>`
                }
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.githubUrl ? 
                        `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link primary">
                            <i class="fab fa-github"></i>
                            GitHub
                        </a>` : ''
                    }
                    ${project.liveUrl ? 
                        `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link secondary">
                            <i class="fas fa-external-link-alt"></i>
                            Live Demo
                        </a>` : ''
                    }
                </div>
            </div>
        </div>
    `).join('');
}

// Update statistics
function updateStats() {
    const totalProjects = projects.length;
    const uniqueTechnologies = [...new Set(projects.flatMap(project => project.technologies))].length;
    const repositories = projects.filter(project => project.githubUrl).length;

    // Animate counting up
    animateNumber(totalProjectsEl, totalProjects);
    animateNumber(technologiesEl, uniqueTechnologies);
    animateNumber(repositoriesEl, repositories);
}

// Animate number counting
function animateNumber(element, targetNumber) {
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const startNumber = 0;

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentNumber = Math.floor(startNumber + (targetNumber - startNumber) * easeOutQuart);
        
        element.textContent = currentNumber;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

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

// Add loading animation
function showLoading() {
    projectsGrid.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
}

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards for animation
function observeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Re-observe cards when projects are re-rendered
const originalRenderProjects = renderProjects;
renderProjects = function() {
    originalRenderProjects();
    // Small delay to ensure DOM is updated
    setTimeout(observeProjectCards, 100);
};

// Initialize animations
observeProjectCards();
