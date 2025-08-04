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
      title: 'Vulnerability Scanner',
      description: 'Python-based network vulnerability assessment tool with automated reporting',
      tech: ['Python', 'Nmap', 'SQLite'],
      status: 'Active',
      threat_level: 'High'
    },
    {
      title: 'Network Monitor',
      description: 'Real-time network traffic analysis and intrusion detection system',
      tech: ['C++', 'Wireshark', 'Linux'],
      status: 'Deployed',
      threat_level: 'Medium'
    },
    {
      title: 'Crypto Toolkit',
      description: 'Collection of cryptographic algorithms and hash functions',
      tech: ['C', 'OpenSSL', 'Assembly'],
      status: 'Research',
      threat_level: 'Low'
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
          <span class="glitch" data-text="CYBERSEC_PORTFOLIO">CYBERSEC_PORTFOLIO</span>
        </h1>
        
        <p class="hero-subtitle">
          BTech Computer Science (Cybersecurity) • Penetration Tester • Security Researcher
        </p>
        
        <div class="hero-stats">
          <div class="stat">
            <div class="stat-value">3+</div>
            <div class="stat-label">Years Learning</div>
          </div>
          <div class="stat">
            <div class="stat-value">15+</div>
            <div class="stat-label">Projects</div>
          </div>
          <div class="stat">
            <div class="stat-value">∞</div>
            <div class="stat-label">Curiosity</div>
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
      <p class="widget-content">
        Passionate cybersecurity student pursuing BTech in Computer Science with specialization in Cybersecurity. 
        Focused on ethical hacking, vulnerability assessment, and building secure systems. 
        Always learning and exploring the latest in cyber threats and defense mechanisms.
      </p>
      <div class="contact-links">
        <a href="https://github.com" class="contact-link">
          <span>📁</span>
          GitHub
        </a>
        <a href="https://linkedin.com" class="contact-link">
          <span>💼</span>
          LinkedIn
        </a>
        <a href="mailto:contact@example.com" class="contact-link">
          <span>📧</span>
          Email
        </a>
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
              <div class="project-status status-indicator {project.status.toLowerCase() === 'active' ? 'status-online' : project.status.toLowerCase() === 'deployed' ? 'status-secure' : 'status-warning'}">
                {project.status}
              </div>
            </div>
            <p class="project-description">{project.description}</p>
            <div class="project-tech">
              {#each project.tech as tech}
                <span class="tech-tag">{tech}</span>
              {/each}
            </div>
            <div class="project-footer">
              <span class="threat-level">Threat Level: {project.threat_level}</span>
              <span class="project-link">🔗</span>
            </div>
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
