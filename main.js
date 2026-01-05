// Project Data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Robust backend system for high-volume transactual processing. Features optimized schemas, secure authentication, and 85% test coverage.",
    category: "web",
    technologies: ["Spring Boot", "MySQL", "JUnit"],
    githubUrl: "https://github.com/Rupeswarbhainsa777/Ecommerce-Backend",
    liveUrl: "https://ecommerce-front-end-phi-neon.vercel.app/",
    image: null,
    icon: "🛒"
  },
  {
    id: 2,
    title: "Application Management",
    description: "Full-stack solution for recruitment workflows. Integrated React UI with Spring Boot REST APIs and persistent MySQL storage.",
    category: "web",
    technologies: ["React", "Spring Boot", "MySQL"],
    githubUrl: "https://github.com/Rupeswarbhainsa777/Application-Management-Web-Application-Backend",
    liveUrl: "https://application-management-web-applicat.vercel.app/",
    image: null,
    icon: "✅"
  },
  {
    id: 3,
    title: "Portfolio Architecture",
    description: "Minimalist portfolio design system. Built with vanilla technologies focusing on performance and semantic structure.",
    category: "web",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/Rupeswarbhainsa777/Personal-Portfolio",
    liveUrl: "https://my-personal-portfolio-jade-nu.vercel.app/",
    image: null,
    icon: "💼"
  },
  {
    id: 4,
    title: "Business Intelligence",
    description: "Power BI dashboard implementation for data visualization. Utilizes DAX for complex calculations and SQL for data extraction.",
    category: "DataAnalytics",
    technologies: ["Power BI", "DAX", "SQL"],
    githubUrl: "https://github.com/Rupeswarbhainsa777/Business-Dashboard",
    image: null,
    icon: "📊"
  },
  {
    id: 5,
    title: "Tic Tac Toe Logic",
    description: "Java-based game logic implementation. Focuses on object-oriented programming principles and console interaction.",
    category: "General",
    technologies: ["Java", "OOP"],
    githubUrl: "https://github.com/Rupeswarbhainsa777/TicTacToe-Game",
    image: null,
    icon: "🎮"
  },
  {
    id: 6,
    title: "Food Delivery System",
    description: "JSP/Servlet based application for order management. Includes authentication and full database integration.",
    category: "web",
    technologies: ["Java", "SQL", "JSP"],
    githubUrl: "https://github.com/Rupeswarbhainsa777/Food-Web-App",
    image: null,
    icon: "🍔"
  },
  {
    id: 8,
    title: "Gym Management",
    description: "Responsive front-end solution for fitness centers. Features schedule management and plan visualization.",
    category: "web",
    technologies: ["HTML", "CSS", "JS"],
    githubUrl: "https://github.com/Rupeswarbhainsa777/Gym_web",
    liveUrl: "https://gym-web-lac.vercel.app/",
    image: null,
    icon: "🏋️"
  },
  {
    id: 9,
    title: "Game Logic: RPS",
    description: "Interactive web-based game implementation. distinct state management and DOM manipulation.",
    category: "web",
    technologies: ["JS", "HTML", "CSS"],
    githubUrl: "https://github.com/Rupeswarbhainsa777/Stone-paper-scissors-game",
    liveUrl: "https://stone-paper-scissors-game-fawn.vercel.app/",
    image: null,
    icon: "🎮"
  }
];

// Configuration
const GITHUB_USERNAME = 'Rupeswarbhainsa777';
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=4`;

// DOM Elements
const projectsGrid = document.getElementById('projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const totalProjectsEl = document.getElementById('total-projects');
const technologiesEl = document.getElementById('technologies');
const repositoriesEl = document.getElementById('repositories');

// State
let currentFilter = 'all';
let currentSearch = '';

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    updateStats();
    setupEventListeners();
    fetchGitHubData();
});

// Event Listeners
function setupEventListeners() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderProjects();
        });
    });

    searchInput.addEventListener('input', function() {
        currentSearch = this.value.toLowerCase();
        renderProjects();
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Logic: Projects
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

function renderProjects() {
    const filteredProjects = getFilteredProjects();
    
    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-muted);">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>No projects match your criteria.</p>
            </div>
        `;
        return;
    }

    projectsGrid.innerHTML = filteredProjects.map(project => `
        <div class="project-card">
            <div class="project-image">
                ${project.image ? 
                    `<img src="${project.image}" alt="${project.title}">` : 
                    `<span>${project.icon}</span>`
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
                        `<a href="${project.githubUrl}" target="_blank" class="project-link">
                            <i class="fab fa-github"></i> Code
                        </a>` : ''
                    }
                    ${project.liveUrl ? 
                        `<a href="${project.liveUrl}" target="_blank" class="project-link">
                            <i class="fas fa-external-link-alt"></i> Live
                        </a>` : ''
                    }
                </div>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    totalProjectsEl.textContent = projects.length;
    technologiesEl.textContent = [...new Set(projects.flatMap(p => p.technologies))].length;
    // repositoriesEl updated by GitHub API
}

// Logic: GitHub API
async function fetchGitHubData() {
    try {
        const [userRes, reposRes] = await Promise.all([
            fetch(API_URL),
            fetch(REPOS_URL)
        ]);
        
        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API limit or error');
        
        const userData = await userRes.json();
        const reposData = await reposRes.json();
        
        updateGitHubUI(userData, reposData);
    } catch (error) {
        console.error('GitHub Fetch Error:', error);
        document.getElementById('gh-name').textContent = 'GitHub Unavailable';
        document.getElementById('gh-bio').textContent = 'Could not fetch data (API Rate Limit likely).';
        document.querySelector('.github-avatar').style.backgroundColor = '#333';
        document.getElementById('gh-repos-list').innerHTML = '<p style="color:white">Repositories unavailable.</p>';
    }
}

function updateGitHubUI(user, repos) {
    // Profile
    const avatarImg = document.getElementById('gh-avatar');
    if (user.avatar_url) {
        avatarImg.src = user.avatar_url;
        avatarImg.parentElement.style.filter = 'grayscale(100%)'; 
    }
    
    document.getElementById('gh-name').textContent = user.name || user.login;
    document.getElementById('gh-bio').textContent = user.bio || 'Open Source Enthusiast';
    
    // Stats
    document.getElementById('gh-repos').textContent = user.public_repos;
    document.getElementById('gh-followers').textContent = user.followers;
    document.getElementById('gh-following').textContent = user.following;
    
    // Note: Also update the hero stat for repositories with real data
    if (repositoriesEl) {
        repositoriesEl.textContent = user.public_repos;
    }

    // Repos List
    const reposList = document.getElementById('gh-repos-list');
    reposList.innerHTML = repos.map(repo => `
        <a href="${repo.html_url}" target="_blank" class="repo-card">
            <div>
                <span class="repo-name">${repo.name}</span>
                <p class="repo-desc">${repo.description ? repo.description : 'No description available'}</p>
            </div>
            <div class="repo-meta">
                <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                <span><i class="fas fa-circle" style="font-size: 0.5rem;"></i> ${repo.language || 'Code'}</span>
            </div>
        </a>
    `).join('');
}
