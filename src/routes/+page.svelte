<script lang="ts">
  import { onMount } from 'svelte';
  
  let currentTime = new Date();
  let terminalText = '';
  
  const terminalCommands = [
    '$ whoami',
    'cybersec_student',
    '$ cat skills.txt',
    'Penetration Testing, Network Security, Malware Analysis',
    'Cryptography, Incident Response, Digital Forensics',
    '$ ls projects/',
    'vulnerability_scanner.py  network_monitor.sh  crypto_tool.c',
    '$ echo "Welcome to my portfolio"',
    'Welcome to my portfolio',
    '$ _'
  ];
  
  onMount(() => {
    const interval = setInterval(() => {
      currentTime = new Date();
    }, 1000);
    
    // Terminal typing animation
    let commandIndex = 0;
    let charIndex = 0;
    
    const typeTerminal = () => {
      if (commandIndex < terminalCommands.length) {
        if (charIndex < terminalCommands[commandIndex].length) {
          terminalText += terminalCommands[commandIndex][charIndex];
          charIndex++;
          setTimeout(typeTerminal, 50);
        } else {
          terminalText += '\n';
          commandIndex++;
          charIndex = 0;
          setTimeout(typeTerminal, 500);
        }
      }
    };
    
    setTimeout(typeTerminal, 1000);
    
    return () => clearInterval(interval);
  });
  
  const skills = [
    { name: 'Penetration Testing', level: 85, icon: '🛡️' },
    { name: 'Network Security', level: 90, icon: '🌐' },
    { name: 'Malware Analysis', level: 75, icon: '🔍' },
    { name: 'Cryptography', level: 80, icon: '🔐' },
    { name: 'Python/C++', level: 95, icon: '💻' },
    { name: 'Digital Forensics', level: 70, icon: '🔬' }
  ];
  
  const projects = [
    {
      title: 'Fezla-Crypter',
      description: 'Advanced crypter application for file encryption and security',
      tech: ['TypeScript', 'Cryptography', 'Security'],
      threat_level: 'HIGH',
      link: 'https://github.com/Mhmd-Aslam/Fezla-Crypter'
    },
    {
      title: 'ShieldX-Antivirus',
      description: 'Python-based antivirus solution for malware detection',
      tech: ['Python', 'Security', 'Malware'],
      threat_level: 'HIGH',
      link: 'https://github.com/Mhmd-Aslam/ShieldX-Antivirus'
    },
    {
      title: 'Cryptography',
      description: 'Java-based cryptographic tools and algorithms implementation',
      tech: ['Java', 'Algorithms', 'Encryption'],
      threat_level: 'MEDIUM',
      link: 'https://github.com/Mhmd-Aslam/Cryptography'
    },
    {
      title: 'Anubis4D',
      description: '4D game engine development project',
      tech: ['Game Dev', 'Engine', 'Creative'],
      threat_level: 'LOW',
      link: 'https://github.com/Mhmd-Aslam/Anubis4D'
    },
    {
      title: 'Excuse-Generator',
      description: 'Creative Python application for generating excuses',
      tech: ['Python', 'Creative', 'Fun'],
      threat_level: 'LOW',
      link: 'https://github.com/Mhmd-Aslam/Excuse-Generator'
    },
    {
      title: 'Love-app',
      description: 'Python application with creative functionality',
      tech: ['Python', 'Creative', 'App'],
      threat_level: 'LOW',
      link: 'https://github.com/Mhmd-Aslam/Love-app'
    }
  ];
</script>

<svelte:head>
  <title>CyberSec Portfolio - BTech Computer Science</title>
  <meta name="description" content="Cybersecurity portfolio of a BTech Computer Science student specializing in penetration testing, network security, and digital forensics." />
</svelte:head>

<div class="portfolio-container">
  <!-- Header Section -->
  <section class="hero-section">
    <div class="widget hero-widget">
      <div class="hero-content">
        <div class="status-bar">
          <div class="status-indicator status-online">
            <div class="pulse-dot"></div>
            ONLINE
          </div>
          <div class="status-indicator status-secure">
            <span>🔒</span>
            SECURE
          </div>
          <div class="mono">{currentTime.toLocaleTimeString()}</div>
        </div>
        
        <h1 class="hero-title">
          <span class="glitch" data-text="MUHAMMAD ASLAM A">MUHAMMAD ASLAM A</span>
        </h1>
        
        <p class="hero-subtitle">
          Cyber Security Student • Creative Developer • BTech Computer Science
        </p>
        
        <p class="hero-location">
          📍 Kottayam, Kerala, India
        </p>
        
        <div class="hero-stats">
          <div class="stat">
            <div class="stat-value">8</div>
            <div class="stat-label">Public Repos</div>
          </div>
          <div class="stat">
            <div class="stat-value">4</div>
            <div class="stat-label">Languages</div>
          </div>
          <div class="stat">
            <div class="stat-value">∞</div>
            <div class="stat-label">Creativity</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Main Content Grid -->
  <div class="grid grid-2 main-grid">
    <!-- Terminal Widget -->
    <div class="widget terminal-widget">
      <div class="widget-header">
        <span class="widget-icon">💻</span>
        <span class="widget-title">Terminal</span>
        <div class="terminal-dots">
          <div class="terminal-dot red"></div>
          <div class="terminal-dot yellow"></div>
          <div class="terminal-dot green"></div>
        </div>
      </div>
      <div class="terminal">
        <pre class="mono">{terminalText}</pre>
      </div>
    </div>

    <!-- About Widget -->
    <div class="widget">
      <div class="widget-header">
        <span class="widget-icon">🛡️</span>
        <span class="widget-title">About</span>
      </div>
      <div class="widget-content">
        <div class="about-grid">
          <div class="about-avatar">
            <img src="https://avatars.githubusercontent.com/u/169330774?v=4" alt="Muhammad Aslam A" class="avatar-image" />
            <div class="status-indicator online"></div>
          </div>
          
          <div class="about-info">
            <h3>Cyber Security Student & Creative Developer</h3>
            <p>
              Passionate cybersecurity student and creative developer from Kottayam, Kerala. 
              Currently pursuing BTech in Computer Science with a specialization in cybersecurity. 
              I love exploring new technologies, building creative solutions, and diving deep into 
              security research and development.
            </p>
            
            <div class="contact-links">
              <a href="https://github.com/Mhmd-Aslam" class="contact-link" target="_blank">
                🔗 GitHub
              </a>
              <a href="https://linkedin.com/in/muhammad-aslam-a" class="contact-link" target="_blank">
                💼 LinkedIn
              </a>
              <a href="mailto:mhmd.aslam.dev@gmail.com" class="contact-link">
                📧 Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Skills Section -->
  <section class="skills-section">
    <div class="widget">
      <div class="widget-header">
        <span class="widget-icon">💻</span>
        <span class="widget-title">Security Skills</span>
      </div>
      <div class="skills-grid">
        {#each skills as skill}
          <div class="skill-item">
            <div class="skill-header">
              <span class="skill-icon">{skill.icon}</span>
              <span class="skill-name">{skill.name}</span>
              <span class="skill-percentage">{skill.level}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-progress" style="width: {skill.level}%"></div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section class="projects-section">
    <div class="widget">
      <div class="widget-header">
        <span class="widget-icon">⚡</span>
        <span class="widget-title">Security Projects</span>
      </div>
      <div class="grid grid-3">
        {#each projects as project}
          <div class="project-card">
            <div class="project-header">
              <h3 class="project-title">{project.title}</h3>
              <span class="threat-level {project.threat_level.toLowerCase()}">{project.threat_level}</span>
            </div>
            <p class="project-description">{project.description}</p>
            <div class="project-tech">
              {#each project.tech as tech}
                <span class="tech-tag">{tech}</span>
              {/each}
            </div>
            <a href="{project.link}" target="_blank" class="project-link">🔗 View Code</a>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="widget footer-widget">
      <div class="footer-content">
        <p class="mono">© 2024 • Built with SvelteKit • Deployed on Vercel</p>
        <div class="footer-status">
          <div class="status-indicator status-secure">
            <span>🔒</span>
            ENCRYPTED
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>

<style>
  .portfolio-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .hero-section {
    margin-bottom: 1rem;
  }

  .hero-widget {
    background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-tertiary) 100%);
    border: 2px solid var(--accent-primary);
    box-shadow: var(--shadow-glow);
  }

  .hero-content {
    text-align: center;
  }

  .status-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    font-family: 'JetBrains Mono', monospace;
  }

  .hero-subtitle {
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }

  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
  }

  .stat {
    text-align: center;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--accent-primary);
    font-family: 'JetBrains Mono', monospace;
  }

  .stat-label {
    font-size: 0.9rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .main-grid {
    margin-bottom: 1rem;
  }

  .terminal-widget {
    position: relative;
  }

  .terminal-dots {
    display: flex;
    gap: 0.5rem;
    margin-left: auto;
  }

  .widget-content {
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .contact-links {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-secondary);
    border-radius: 8px;
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 0.9rem;
  }

  .contact-link:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
    transform: translateY(-1px);
  }

  .skills-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .skill-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .skill-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .skill-name {
    flex: 1;
    font-weight: 500;
  }

  .skill-percentage {
    font-family: 'JetBrains Mono', monospace;
    color: var(--accent-primary);
    font-size: 0.9rem;
  }

  .skill-icon {
    color: var(--accent-primary);
  }

  .skill-bar {
    height: 6px;
    background: var(--bg-secondary);
    border-radius: 3px;
    overflow: hidden;
  }

  .skill-progress {
    height: 100%;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-info));
    border-radius: 3px;
    transition: width 1s ease;
  }

  .project-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-secondary);
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }

  .project-card:hover {
    border-color: var(--accent-primary);
    transform: translateY(-2px);
  }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    gap: 1rem;
  }

  .project-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .project-description {
    color: var(--text-secondary);
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tech-tag {
    padding: 0.25rem 0.75rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: 12px;
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .project-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .threat-level {
    font-size: 0.8rem;
    color: var(--text-muted);
    font-family: 'JetBrains Mono', monospace;
  }

  .project-link {
    color: var(--accent-primary);
    cursor: pointer;
  }

  .footer {
    margin-top: 2rem;
  }

  .footer-widget {
    background: var(--bg-secondary);
    border: 1px solid var(--border-secondary);
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 2rem;
    }
    
    .hero-stats {
      gap: 2rem;
    }
    
    .status-bar {
      gap: 0.5rem;
    }
    
    .footer-content {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
