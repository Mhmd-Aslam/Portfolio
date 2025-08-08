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
    // Cybersecurity
    { name: 'Penetration Testing', level: 85, icon: '🛡️' },
    { name: 'Ethical Hacking', level: 90, icon: '🕵️‍♂️' },
    { name: 'Network Security', level: 90, icon: '🌐' },
    { name: 'Malware Analysis', level: 75, icon: '🔍' },
    { name: 'Cryptography', level: 80, icon: '🔐' },
    { name: 'Digital Forensics', level: 70, icon: '🔬' },
    // Computer Science / Core CS
    { name: 'Data Structures', level: 85, icon: '🗂️' },
    { name: 'Algorithms', level: 85, icon: '📈' },
    { name: 'Operating Systems', level: 80, icon: '🖥️' },
    { name: 'Databases (SQL/NoSQL)', level: 80, icon: '🗄️' },
    { name: 'OOP', level: 85, icon: '📦' },
    { name: 'Computer Networks', level: 85, icon: '🛰️' },
    // Development
    { name: 'Python', level: 90, icon: '🐍' },
    { name: 'C/C++', level: 85, icon: '💻' },
    { name: 'Java', level: 80, icon: '☕' },
    { name: 'JavaScript/TypeScript', level: 85, icon: '🧩' },
    { name: 'Web Development', level: 80, icon: '🌐' },
    { name: 'Git & GitHub', level: 85, icon: '🔧' },
    { name: 'Linux', level: 85, icon: '🐧' }
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

  const education = [
    {
      degree: 'Bachelor of Technology in Computer Science and Engineering (Cyber Security)',
      institution: 'St. Joseph’s College of Engineering and Technology, Palai',
      university: 'APJ Abdul Kalam Technological University, Kerala, India',
      location: 'Kerala, India',
      period: '2022 - 2026',
      status: 'In Progress',
      coursework: [
        'Network Security',
        'Cryptography',
        'Ethical Hacking',
        'Digital Forensics',
        'Malware Analysis',
        'Incident Response'
      ]
    }
  ];

  const certifications = [
    {
      name: 'Internet of Things',
      issuer: 'NPTEL (IIT Kharagpur)',
      status: 'Top 5% Topper',
      date: 'Oct 2024',
      url: 'https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs115/Course/NPTEL24CS115S75990019303945964.pdf',
      description: 'NPTEL (IIT Kharagpur) — Internet of Things'
    },
    {
      name: 'Privacy and Security in Online Social Media',
      issuer: 'NPTEL (IIIT Hyderabad)',
      status: '',
      date: 'Apr 2024',
      url: 'https://archive.nptel.ac.in/content/noc/NOC24/SEM1/Ecertificates/106/noc24-cs04/Course/NPTEL24CS04S116010009630419719.pdf',
      description: 'NPTEL (IIIT Hyderabad) — Privacy and Security in Online Social Media'
    },
    {
      name: 'Cyber Security and Privacy',
      issuer: 'NPTEL (IIT Madras)',
      status: 'Top 5% Topper',
      date: 'Oct 2023',
      url: 'https://archive.nptel.ac.in/content/noc/NOC23/SEM2/Ecertificates/106/noc23-cs127/Course/NPTEL23CS127S64010070520111471.pdf',
      description: 'NPTEL (IIT Madras) — Cyber Security and Privacy'
    }
  ];

  const tools = [
    { category: 'Security Tools', items: ['Nmap', 'Wireshark', 'Metasploit', 'Burp Suite', 'OWASP ZAP', 'Nessus'] },
    { category: 'Operating Systems', items: ['Kali Linux', 'Ubuntu', 'Windows', 'Parrot OS'] },
    { category: 'Programming', items: ['Python', 'Java', 'JavaScript', 'C', 'Bash', 'PowerShell', 'LaTeX'] },
    { category: 'Frameworks', items: ['React', 'Node.js', 'Django', 'Flask', 'Qt', 'SvelteKit'] },
    { category: 'Forensics', items: ['Autopsy', 'Volatility', 'Sleuth Kit', 'FTK Imager', 'HashCalc'] },
    { category: 'Cloud Security', items: ['AWS Security', 'Azure Security', 'Docker', 'Kubernetes'] }
  ];

  const achievements = [
    {
      title: 'Auto Quiz — SAEINDIA',
      rank: '1st Place',
      date: '02 Nov 2023',
      description: 'Won first position in Auto Quiz at Spectra 2.0, organized by SAEINDIA Collegiate Club of SJCET.'
    }
  ];

  // Experiences (replaces timeline)
  const experiences = [
    {
      role: 'Cybersecurity Intern',
      company: 'Redynox',
      period: 'Aug 6, 2025 — (In Progress) • 1 month • Remote',
      highlights: [
        'Selected for 1‑month Cybersecurity Internship Program (offer dated 5 Aug 2025).',
        'Hands‑on exposure: network security, vulnerability assessment, penetration testing, incident response.',
        'Working with the cybersecurity team on real‑world projects.'
      ]
    },
    {
      role: 'Django Intern',
      company: 'Perpex',
      period: 'Aug 7, 2025 — (In Progress) • 3 months • Remote',
      highlights: [
        'Internship focused on real‑world project experience and structured learning.',
        'Hands‑on exposure: web development, Django framework, project management.',
        'Working with the Django team on real‑world projects.'
      ]
    }
  ];

  // Contact form state
  let contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  let formSubmitted = false;
  let formLoading = false;

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    formLoading = true;
    
    // Simulate form submission
    setTimeout(() => {
      formLoading = false;
      formSubmitted = true;
      contactForm = { name: '', email: '', subject: '', message: '' };
      
      setTimeout(() => {
        formSubmitted = false;
      }, 3000);
    }, 1500);
  };

  // Svelte action for tracking mouse and updating gradient
  function gradientFollow(node) {
    function setGradient(e) {
      const rect = node.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      node.style.setProperty('--gradient-x', `${x}%`);
      node.style.setProperty('--gradient-y', `${y}%`);
    }
    function enableGradient() {
      node.classList.add('gradient-active');
    }
    function disableGradient() {
      node.classList.remove('gradient-active');
      node.style.setProperty('--gradient-x', `50%`);
      node.style.setProperty('--gradient-y', `50%`);
    }
    node.addEventListener('mousemove', setGradient);
    node.addEventListener('mouseenter', enableGradient);
    node.addEventListener('mouseleave', disableGradient);
    return {
      destroy() {
        node.removeEventListener('mousemove', setGradient);
        node.removeEventListener('mouseenter', enableGradient);
        node.removeEventListener('mouseleave', disableGradient);
      }
    };
  }
</script>

<svelte:head>
  <title>CyberSec Portfolio - BTech Computer Science</title>
  <meta name="description" content="CyberSecurity portfolio of a BTech Computer Science student specializing in penetration testing, network security, and digital forensics." />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="portfolio-container">
  <!-- Header Section -->
  <section class="hero-section">
    <div class="widget hero-widget" use:gradientFollow>
      <!-- Status Header -->
      <div class="hero-header">
        <div class="status-bar">
          <div class="status-group">
            <div class="status-indicator status-online">
              <div class="pulse-dot"></div>
              ONLINE
            </div>
            <div class="status-indicator status-secure">
              <span>🔒</span>
              SECURE
            </div>
          </div>
          <div class="time-display mono">{currentTime.toLocaleTimeString()}</div>
        </div>
      </div>
      
      <div class="hero-content">
        <div class="hero-main">
          <!-- Avatar Section -->
          <div class="hero-avatar-section">
            <div class="hero-avatar">
              <img src="./images/dp.png" alt="Muhammad Aslam A" class="avatar-image" />
            </div>
            <div class="avatar-info">
              <div class="typing-indicator">
                <span class="mono">$ whoami</span>
              </div>
            </div>
          </div>
          
          <!-- Info Section -->
          <div class="hero-info">
            <div class="hero-text">
              <h1 class="hero-title">
                <span>MUHAMMAD ASLAM A</span>
              </h1>
              
              <div class="hero-roles">
                <span class="role-tag primary">🛡️ CyberSecurity Student</span>
                <span class="role-tag secondary">💻 Creative Developer</span>
                <span class="role-tag tertiary">🎓 BTech Computer Science</span>
              </div>
              
              <p class="hero-location">
                <span class="location-icon">📍</span>
                <span>Kottayam, Kerala, India</span>
              </p>
              
              <div class="hero-description">
                <p>Passionate about CyberSecurity, Ethical Hacking, and building innovative security solutions. Specialized in Penetration Testing, Malware Analysis, and Digital Forensics.</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Stats Section -->
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
          <div class="stat">
            <div class="stat-value">24/7</div>
            <div class="stat-label">Learning</div>
          </div>
          <!-- Resume CTA as a highlighted stat card -->
          <div class="stat stat-resume" aria-label="Resume">
            <a
              class="stat-resume-link"
              href="/pdf/Muhammad_Aslam_A_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="stat-value" aria-hidden="true">📄</div>
              <div class="stat-label">Resume</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Main Content Grid -->
  <div class="grid grid-2 main-grid">
    <!-- About Widget -->
    <div class="widget" use:gradientFollow>
      <div class="widget-header">
        <span class="widget-icon">🛡️</span>
        <span class="widget-title">About</span>
      </div>
      <div class="widget-content">
        <div class="about-grid">
          <div class="about-info">
            <h3>Cyber Security Student & Creative Developer</h3>
            <p>
              Passionate CyberSecurity student and creative developer from Kottayam, Kerala, India. 
              Currently pursuing BTech in Computer Science and Engineering with a specialization in CyberSecurity. 
              I love exploring new technologies, building creative solutions, and diving deep into 
              security research and development.
            </p>
            
            <div class="contact-links">
              <a href="https://github.com/Mhmd-Aslam" title="github.com/Mhmd-Aslam" class="contact-link" target="_blank">
                🔗 GitHub
              </a>
              <a href="https://linkedin.com/in/muhammad-aslam-a-a8710221a" title="linkedin.com/in/muhammad-aslam-a-a8710221a" class="contact-link" target="_blank">
                💼 LinkedIn
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=aslamaass108@gmail.com"
                title="aslamaass108@gmail.com"
                class="contact-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                📧 Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Terminal Widget -->
    <div class="widget terminal-widget" use:gradientFollow>
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
  </div>

  <!-- Skills Section -->
  <section class="skills-section">
    <div class="widget" use:gradientFollow>
      <div class="widget-header">
        <span class="widget-icon">💻</span>
        <span class="widget-title">Technical Skills</span>
      </div>
      <div class="skills-grid">
        {#each skills as skill}
          <span class="skill-badge">
            <span class="skill-badge-icon">{skill.icon}</span>
            <span class="skill-badge-name">{skill.name}</span>
          </span>
        {/each}
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section class="projects-section">
    <div class="widget" use:gradientFollow>
      <div class="widget-header">
        <span class="widget-icon">⚡</span>
        <span class="widget-title">Projects</span>
      </div>
      <div class="grid grid-3">
        {#each projects as project}
          <div class="project-card" use:gradientFollow>
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

  <!-- Education Section -->
  <section class="education-section">
    <div class="widget" use:gradientFollow>
      <div class="widget-header">
        <span class="widget-icon">📚</span>
        <span class="widget-title">Education</span>
      </div>
      <div class="education-grid">
        {#each education as edu}
          <div class="education-item">
            <div class="education-header">
              <span class="education-icon">🎓</span>
              <div class="education-line">{edu.degree}</div>
              <div class="education-line">{edu.institution}</div>
              {#if edu.university}
                <div class="education-line">{edu.university}</div>
              {/if}
              {#if edu.period && edu.status}
                <div class="education-line">{edu.period} ({edu.status})</div>
              {:else if edu.period}
                <div class="education-line">{edu.period}</div>
              {:else if edu.status}
                <div class="education-line">({edu.status})</div>
              {/if}
              <div class="education-line"></div>
            </div>
            <div class="education-coursework">
              {#each edu.coursework as course, i}
                <span class="course-tag">{course}</span>{#if i < edu.coursework.length - 1}&nbsp;{/if}
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Certifications Section -->
  <section class="certifications-section">
    <div class="widget" use:gradientFollow>
      <div class="widget-header">
        <span class="widget-icon">📜</span>
        <span class="widget-title">Certifications</span>
      </div>
      <div class="certifications-grid">
        {#each certifications as cert}
          <div class="certification-item">
            <div class="certification-header">
              <span class="certification-icon">📜</span>
              <span class="certification-name">
                <a href={cert.url} target="_blank" rel="noopener noreferrer">{cert.name} ↗</a>
              </span>
            </div>
            <div class="certification-meta">
              <span class="cert-badge issuer">{cert.issuer}</span>
              <span class="cert-badge date">{cert.date}</span>
              {#if cert.status}
                <span class="cert-badge status">{cert.status}</span>
              {/if}
            </div>
            <p class="certification-description">{cert.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Tools Section -->
  <section class="tools-section">
    <div class="widget" use:gradientFollow>
      <div class="widget-header">
        <span class="widget-icon">🛠️</span>
        <span class="widget-title">Tools</span>
      </div>
      <div class="tools-grid">
        {#each tools as tool}
          <div class="tool-item">
            <div class="tool-header">
              <span class="tool-icon">🛠️</span>
              <span class="tool-name">{tool.category}</span>
            </div>
            <div class="tool-items">
              {#each tool.items as item}
                <span class="tool-tag">{item}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Achievements Section -->
  <section class="achievements-section">
    <div class="widget" use:gradientFollow>
      <div class="widget-header">
        <span class="widget-icon">🏆</span>
        <span class="widget-title">Achievements</span>
      </div>
      <div class="achievements-grid">
        {#each achievements as achievement}
          <div class="achievement-item">
            <div class="achievement-header">
              <span class="achievement-icon">🏆</span>
              <span class="achievement-title">{achievement.title}</span>
              <span class="achievement-rank">{achievement.rank}</span>
            </div>
            <p class="achievement-description">{achievement.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>
  <!-- Experiences Section (replacing Timeline) -->
  <section class="experiences-section">
    <div class="widget" use:gradientFollow>
      <div class="widget-header">
        <span class="widget-icon">💼</span>
        <span class="widget-title">Experiences</span>
      </div>
      <div class="experiences-grid">
        {#each experiences as exp}
          <article class="experience-card" aria-label={`${exp.role} at ${exp.company}`}>
            <header class="experience-header">
              <span class="experience-icon" aria-hidden="true">💼</span>
              <h3 class="experience-title">{exp.role} • {exp.company}</h3>
            </header>
            <ul class="experience-list">
              {#each exp.highlights as h}
                <li>{h}</li>
              {/each}
            </ul>
            <footer class="experience-footer">
              <span class="experience-period mono">{exp.period}</span>
            </footer>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="contact-section">
    <div class="widget" use:gradientFollow>
      <div class="widget-header">
        <span class="widget-icon">📲</span>
        <span class="widget-title">Contact</span>
      </div>
      <div class="contact-grid">
        <form on:submit={handleContactSubmit}>
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" value={contactForm.name} />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value={contactForm.email} />
          </div>
          <div class="form-group">
            <label for="subject">Subject:</label>
            <input type="text" id="subject" name="subject" value={contactForm.subject} />
          </div>
          <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" name="message" value={contactForm.message} />
          </div>
          <button
            type="submit"
            class="btn-send"
            disabled={formLoading}
            aria-busy={formLoading}
          >
            {#if formLoading}
              <span class="spinner" aria-hidden="true"></span>
              <span>Sending…</span>
            {:else}
              <span>Send</span>
              <span class="btn-arrow">➜</span>
            {/if}
          </button>
          {#if formSubmitted}
            <p class="success-message">Message sent successfully!</p>
          {/if}
        </form>
        <aside class="contact-side">
          <div class="qr-card">
            <h4 class="qr-title">Scan to follow on Instagram</h4>
            <a
              class="qr-box"
              href="https://www.instagram.com/mhmd__aslam__/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Instagram profile in a new tab"
            >
              <img
                class="qr-image"
                src="/images/ig_qr.png"
                alt="QR code to Instagram profile @mhmd__aslam__"
                width="180"
                height="180"
                decoding="async"
              />
            </a>
            <p class="qr-caption mono">@mhmd__aslam__</p>
            <a class="qr-btn" href="https://www.instagram.com/mhmd__aslam__/" target="_blank" rel="noopener noreferrer">Open Profile</a>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="widget footer-widget" use:gradientFollow>
      <div class="footer-content">
        <p class="mono"><span class="copyright-symbol">©</span> • 2025 • MHMD ASLAM • All Rights Reserved</p>
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
    background: rgba(20, 20, 30, 0.7);
    border: 1px solid var(--border-primary);
    border-radius: 12px;
    padding: 1.5rem;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px 0 rgba(0,0,0,0.45), 0 1.5px 8px 0 rgba(66,12,107,0.25), 0 1.5px 8px 0 rgba(0,94,0,0.18);
  }

  .hero-content {
    text-align: center;
  }

  .hero-main {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .hero-avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }

  .hero-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-title {
    font-size: clamp(1.25rem, 0.9rem + 2.4vw, 3rem);
    font-weight: 700;
    margin-bottom: 1rem;
    font-family: 'JetBrains Mono', monospace;
    line-height: clamp(1.1, 1 + 0.4vw, 1.3);
    letter-spacing: clamp(0.5px, 0.25vw, 2px);
    word-break: normal; /* don't break inside words */
    overflow-wrap: normal; /* keep words intact */
    hyphens: none;
    max-width: 100%;
  }
  .hero-title span { font-size: inherit; }

  .hero-subtitle {
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }

  .hero-stats {
    display: flex;
    justify-content: center;
    gap: clamp(1rem, 1vw + 1rem, 3rem);
    flex-wrap: wrap;
  }

  .stat {
    text-align: center;
  }

  .stat-value {
    font-size: clamp(1.25rem, 0.8rem + 1.8vw, 2rem);
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

  /* Resume CTA stat card (same structure as stats, unique border/glow) */
  .stat-resume {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    border: 3px solid rgba(0,255,136,0.45);
    border-radius: 12px;
    background: radial-gradient(1200px 1200px at var(--gradient-x, 50%) var(--gradient-y, 50%), rgba(0,255,136,0.12), transparent 50%),
                linear-gradient(135deg, rgba(98,0,234,0.12), rgba(0,0,0,0.1));
    box-shadow: 0 10px 28px rgba(0,255,136,0.12), inset 0 0 0 1px rgba(0,255,136,0.15);
    position: relative;
    overflow: hidden;
  }
  .stat-resume::after {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 14px;
    background: conic-gradient(from 0deg, rgba(0,255,136,0.0), rgba(0,255,136,0.35), rgba(98,0,234,0.35), rgba(0,255,136,0.0));
    filter: blur(18px);
    opacity: 0.35;
    pointer-events: none;
    animation: resumeGlow 4s linear infinite;
  }
  @keyframes resumeGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .stat-resume-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: var(--text-primary);
  }
  .stat-resume:hover {
    transform: translateY(-2px);
    border-color: var(--accent-primary);
    box-shadow: 0 12px 30px rgba(0,255,136,0.18), inset 0 0 0 1px rgba(0,255,136,0.2);
  }
  /* Make Resume label more noticeable */
  .stat-resume .stat-label {
    color: var(--accent-primary);
    font-weight: 700;
    text-shadow: 0 0 8px rgba(0,255,136,0.35);
  }
  .stat-resume-link:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 3px;
    border-radius: 10px;
  }

  .main-grid {
    margin-bottom: 1rem;
  }

  /* Experiences sub-cards */
  .experiences-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  .experience-card {
    background: rgba(20, 20, 30, 0.6);
    border: 1px solid var(--border-primary);
    border-radius: 12px;
    padding: 1rem;
    backdrop-filter: blur(8px);
    transition: transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    box-shadow: 0 6px 22px rgba(0,0,0,0.35);
    display: flex;
    flex-direction: column;
  }
  .experience-card:hover {
    transform: translateY(-2px);
    border-color: var(--accent-primary);
    box-shadow: 0 10px 28px rgba(0,255,136,0.12);
  }
  .experience-header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.6rem 0.75rem;
    margin-bottom: 0.5rem;
  }
  .experience-icon {
    font-size: 1.1rem;
  }
  .experience-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary);
  }
  .experience-period {
    font-size: 0.85rem;
    color: var(--accent-primary);
    padding: 0.2rem 0.5rem;
    border: 1px solid rgba(0,255,136,0.4);
    border-radius: 8px;
    background: linear-gradient(135deg, rgba(0,255,136,0.08), rgba(98,0,234,0.06));
  }
  .experience-list {
    margin: 0.25rem 0 0;
    padding-left: 1.1rem;
    color: var(--text-secondary);
    flex: 1 1 auto;
  }
  .experience-list li {
    margin: 0.25rem 0;
    position: relative;
  }
  .experience-list li::marker {
    color: var(--accent-primary);
  }
  .experience-footer {
    margin-top: 0.75rem;
    padding-top: 0.5rem;
    border-top: 1px dashed var(--border-secondary);
    display: flex;
    justify-content: flex-end;
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

  /* Contact form inputs */
  .contact-grid textarea {
    resize: none; /* prevent manual resize */
    overflow: auto; /* allow scrolling for long messages */
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: #ffffff var(--bg-secondary); /* Firefox: white thumb on dark track */
  }
  /* WebKit scrollbars */
  .contact-grid textarea::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  .contact-grid textarea::-webkit-scrollbar-track {
    background: var(--bg-secondary);
    border-radius: 8px;
  }
  .contact-grid textarea::-webkit-scrollbar-thumb {
    background: #ffffff; /* white thumb */
    border: 1px solid var(--border-secondary);
    border-radius: 8px;
  }
  .contact-grid textarea::-webkit-scrollbar-thumb:hover {
    background: #ffffffcc; /* slightly transparent on hover */
  }
  /* Scrollbar arrows/buttons (WebKit-based browsers) */
  .contact-grid textarea::-webkit-scrollbar-button {
    background: #ffffff; /* white buttons/arrows */
    width: 10px;
    height: 10px;
  }
  .contact-grid textarea::-webkit-scrollbar-corner {
    background: var(--bg-secondary);
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 0.9rem;
    border-radius: 10px;
    border: 1px solid var(--border-secondary);
    background: var(--bg-tertiary);
    color: var(--text-primary);
    text-decoration: none;
    transition: transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }
  .contact-link:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
    transform: translateY(-1px);
  }

  /* Right-side QR panel */
  .contact-side {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .qr-card {
    width: 100%;
    max-width: 420px;
    padding: 1.25rem;
    border: 1px solid var(--border-secondary);
    border-radius: 12px;
    background: linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.2)), var(--bg-tertiary);
    box-shadow: 0 6px 24px rgba(0,0,0,0.25);
    text-align: center;
  }
  .qr-title {
    margin: 0 0 0.75rem 0;
    font-size: 0.95rem;
    color: var(--text-secondary);
  }
  .qr-box {
    display: inline-block;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid var(--border-secondary);
    background: radial-gradient(120px 120px at var(--gradient-x,50%) var(--gradient-y,50%), rgba(0,255,136,0.12), transparent 60%);
    transition: transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }
  .qr-box:hover {
    transform: translateY(-2px);
    border-color: var(--accent-primary);
    box-shadow: 0 10px 28px rgba(0,255,136,0.12);
  }
  .qr-image {
    display: block;
    width: min(60vw, 300px);
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4));
  }
  .qr-caption {
    margin: 0.6rem 0 0.8rem 0;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
  .qr-btn {
    display: inline-block;
    padding: 0.5rem 0.9rem;
    border-radius: 10px;
    border: 1px solid var(--border-secondary);
    background: linear-gradient(135deg, rgba(0,255,136,0.12), rgba(98,0,234,0.12)), var(--bg-tertiary);
    color: var(--text-primary);
    text-decoration: none;
    transition: transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }
  .qr-btn:hover {
    transform: translateY(-1px);
    border-color: var(--accent-primary);
    box-shadow: 0 6px 20px rgba(0,255,136,0.12);
  }

  /* Responsive sizing for the QR panel */
  @media (max-width: 1024px) {
    .qr-card {
      max-width: 380px;
    }
    .qr-image { width: min(70vw, 220px); height: auto; }
  }
  @media (max-width: 640px) {
    .contact-side {
      margin-top: 1rem;
    }
    .qr-card {
      max-width: 100%;
    }
    .qr-image { width: min(80vw, 200px); height: auto; }
  }

  /* Improved Send button */
  .btn-send {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.65rem 1rem;
    border-radius: 10px;
    border: 2px solid var(--border-secondary);
    /* Cyber gradient using theme accents for a more attractive look */
    background:
      linear-gradient(135deg, rgba(0,255,136,0.16), rgba(98,0,234,0.16)),
      var(--bg-tertiary);
    box-shadow: inset 0 0 0 1px rgba(0,255,136,0.15);
    color: var(--text-primary);
    font-weight: 800;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }
  .btn-send:hover:not([disabled]) {
    transform: translateY(-1px);
    border-color: var(--accent-primary);
    color: var(--text-primary);
    background:
      linear-gradient(135deg, rgba(0,255,136,0.22), rgba(98,0,234,0.22)),
      var(--bg-tertiary);
    box-shadow: 0 6px 20px rgba(0, 255, 136, 0.15), 0 0 0 1px rgba(0,255,136,0.25) inset;
  }
  .btn-send:active:not([disabled]) {
    transform: translateY(0);
  }
  .btn-send[disabled] {
    opacity: 0.75;
    cursor: not-allowed;
    box-shadow: none;
  }
  .btn-send:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }
  .btn-arrow {
    transition: transform 0.15s ease;
  }
  .btn-send:hover .btn-arrow {
    transform: translateX(2px);
  }
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top-color: var(--accent-primary);
    border-right-color: var(--accent-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
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

  /* New badge styles (no levels) */
  .skill-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-secondary);
    border-radius: 999px;
    color: var(--text-secondary);
    font-size: 0.9rem;
    transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }
  .skill-badge:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
    transform: translateY(-1px);
  }
  .skill-badge-icon {
    color: var(--accent-primary);
  }
  .skill-badge-name {
    white-space: nowrap;
  }

  .project-card {
    background: radial-gradient(
      800px circle at var(--gradient-x, 50%) var(--gradient-y, 50%),
      rgba(66,12,107,0.25) 0%,
      rgba(0,94,0,0.15) 40%,
      rgba(20,20,30,0.7) 100%
    );
    border: 1px solid var(--border-secondary);
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
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
    margin-top: auto; /* push link to bottom of card */
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    align-self: flex-start; /* keep link width to content */
  }

  /* Certifications: improved layout and badges */
  .certifications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
  }

  .certification-item {
    border: 1px solid var(--border-secondary);
    border-radius: 8px;
    padding: 1rem;
    transition: border-color 0.2s ease, transform 0.2s ease;
  }
  .certification-item:hover {
    border-color: var(--accent-primary);
    transform: translateY(-2px);
  }

  .certification-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .certification-name a {
    color: var(--text-primary);
    text-decoration: none;
  }
  .certification-name a:hover {
    color: var(--accent-primary);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .certification-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .cert-badge {
    padding: 0.2rem 0.6rem;
    border: 1px solid var(--border-secondary);
    border-radius: 999px;
    font-size: 0.75rem;
    color: var(--text-secondary);
    background: var(--bg-tertiary);
  }
  /* issuer badge inherits default .cert-badge styles */
  .cert-badge.date { color: var(--text-muted); }
  .cert-badge.status { color: var(--accent-primary); border-color: var(--accent-primary); }

  /* Education: ensure coursework tags wrap and never overflow */
  .education-item { max-width: 100%; overflow: hidden; }
  .education-header { min-width: 0; }
  .education-coursework {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    max-width: 100%;
  }
  .education-coursework .course-tag {
    display: inline-block;
    max-width: 100%;
    white-space: normal; /* allow wrapping within long course names */
    word-break: keep-all;
    overflow-wrap: anywhere; /* break extremely long tokens if needed */
  }

  /* Achievements: prevent overflow on small screens */
  .achievements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }
  .achievement-item {
    border: 1px solid var(--border-secondary);
    border-radius: 8px;
    padding: 1rem;
    box-sizing: border-box;
    max-width: 100%;
    overflow: hidden; /* prevent tiny overflows on narrow viewports */
  }
  .achievement-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    min-width: 0; /* enable flex children to shrink */
  }
  .achievement-title {
    flex: 1 1 auto;
    min-width: 0;
    overflow-wrap: anywhere; /* allow long words to wrap safely */
  }
  .achievement-description { overflow-wrap: anywhere; }

  @media (max-width: 420px) {
    .achievements-grid { grid-template-columns: 1fr; }
  }

  .footer {
    margin-top: 2rem;
  }

  .footer-widget {
    background: radial-gradient(
      800px circle at var(--gradient-x, 50%) var(--gradient-y, 50%),
      rgba(66,12,107,0.25) 0%,
      rgba(0,94,0,0.15) 40%,
      rgba(20,20,30,0.7) 100%
    );
    border: 1px solid var(--border-secondary);
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  /* Larger copyright symbol aligned with text */
  .copyright-symbol {
    font-size: 1.9em;
    line-height: 1;
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.25rem;
  }

  .widget,
  .project-card,
  .footer-widget,
  .hero-widget {
    background: radial-gradient(
      800px circle at var(--gradient-x, 50%) var(--gradient-y, 50%),
      rgba(66,12,107,0.25) 0%,
      rgba(0,94,0,0.15) 40%,
      rgba(20,20,30,0.7) 100%
    );
    /* Existing transparency, border, shadow, etc. remain unchanged */
  }

  .gradient-active {
    background: radial-gradient(
      800px circle at var(--gradient-x, 50%) var(--gradient-y, 50%),
      rgba(66,12,107,0.25) 0%,
      rgba(0,94,0,0.15) 40%,
      rgba(20,20,30,0.7) 100%
    );
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 2rem;
    }
    
    .hero-stats {
      gap: 2rem;
    }
    
    .hero-main {
      flex-direction: column;
      align-items: center;
    }
    
    .footer-content {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
