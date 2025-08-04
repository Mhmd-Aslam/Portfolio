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

  const education = [
    {
      degree: 'BTech Computer Science (Cybersecurity)',
      institution: 'University Name',
      location: 'Kottayam, Kerala',
      period: '2021 - 2025',
      status: 'In Progress',
      gpa: '8.5/10',
      coursework: ['Network Security', 'Cryptography', 'Ethical Hacking', 'Digital Forensics', 'Malware Analysis', 'Incident Response']
    }
  ];

  const certifications = [
    { name: 'CompTIA Security+', status: 'Planned', date: '2024' },
    { name: 'Certified Ethical Hacker (CEH)', status: 'In Progress', date: '2024' },
    { name: 'Google Cybersecurity Certificate', status: 'Completed', date: '2023' }
  ];

  const experience = [
    {
      title: 'Cybersecurity Research Intern',
      company: 'Local Security Firm',
      period: 'Jun 2023 - Aug 2023',
      type: 'Internship',
      description: 'Conducted vulnerability assessments and penetration testing on client systems',
      achievements: ['Identified 15+ security vulnerabilities', 'Developed automated scanning scripts', 'Presented findings to senior management']
    },
    {
      title: 'CTF Team Member',
      company: 'University Cybersecurity Club',
      period: '2022 - Present',
      type: 'Competition',
      description: 'Active participant in Capture The Flag competitions and cybersecurity challenges',
      achievements: ['Top 10 finish in 3 national CTF competitions', 'Specialized in web exploitation and cryptography', 'Mentored junior team members']
    },
    {
      title: 'Bug Bounty Hunter',
      company: 'Various Platforms',
      period: '2023 - Present',
      type: 'Freelance',
      description: 'Ethical hacking and vulnerability disclosure on bug bounty platforms',
      achievements: ['Reported 8+ valid security vulnerabilities', 'Earned recognition from 3 companies', 'Specialized in web application security']
    }
  ];

  const tools = [
    { category: 'Security Tools', items: ['Nmap', 'Wireshark', 'Metasploit', 'Burp Suite', 'OWASP ZAP', 'Nessus'] },
    { category: 'Operating Systems', items: ['Kali Linux', 'Ubuntu', 'Windows', 'Parrot OS'] },
    { category: 'Programming', items: ['Python', 'Java', 'JavaScript', 'C++', 'Bash', 'PowerShell'] },
    { category: 'Frameworks', items: ['Django', 'Flask', 'React', 'Node.js', 'SvelteKit'] },
    { category: 'Forensics', items: ['Autopsy', 'Volatility', 'Sleuth Kit', 'FTK Imager'] },
    { category: 'Cloud Security', items: ['AWS Security', 'Azure Security', 'Docker', 'Kubernetes'] }
  ];

  const achievements = [
    {
      title: 'National Cybersecurity Championship',
      rank: '3rd Place',
      date: '2023',
      description: 'Secured 3rd position in national level cybersecurity competition with 500+ participants'
    },
    {
      title: 'Academic Excellence Award',
      rank: 'Top 5%',
      date: '2023',
      description: 'Recognized for outstanding academic performance in cybersecurity coursework'
    },
    {
      title: 'Bug Bounty Recognition',
      rank: 'Hall of Fame',
      date: '2023',
      description: 'Featured in security hall of fame for responsible vulnerability disclosure'
    },
    {
      title: 'Open Source Contribution',
      rank: 'Contributor',
      date: '2023',
      description: 'Active contributor to cybersecurity open source projects and tools'
    }
  ];

  const articles = [
    {
      title: 'Understanding Buffer Overflow Attacks',
      type: 'Technical Article',
      date: '2023-12-15',
      description: 'Deep dive into buffer overflow vulnerabilities and exploitation techniques',
      readTime: '8 min read',
      tags: ['Security', 'Exploitation', 'Memory']
    },
    {
      title: 'Web Application Security Testing Guide',
      type: 'Tutorial',
      date: '2023-11-20',
      description: 'Comprehensive guide to testing web applications for security vulnerabilities',
      readTime: '12 min read',
      tags: ['Web Security', 'Testing', 'OWASP']
    },
    {
      title: 'CTF Writeup: CryptoChallenge 2023',
      type: 'CTF Writeup',
      date: '2023-10-10',
      description: 'Detailed solution walkthrough for cryptography challenges',
      readTime: '6 min read',
      tags: ['CTF', 'Cryptography', 'Writeup']
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Cybersecurity Professor',
      company: 'University',
      text: 'Muhammad demonstrates exceptional analytical skills and a deep understanding of cybersecurity principles. His innovative approach to problem-solving sets him apart.',
      image: '👩‍🏫'
    },
    {
      name: 'Alex Chen',
      role: 'Senior Security Analyst',
      company: 'TechCorp',
      text: 'Working with Muhammad during his internship was a pleasure. His technical skills and eagerness to learn made him a valuable team member.',
      image: '👨‍💼'
    },
    {
      name: 'Maria Rodriguez',
      role: 'CTF Team Captain',
      company: 'CyberWarriors',
      text: 'Muhammad\'s expertise in cryptography and web exploitation has been instrumental in our team\'s success in multiple competitions.',
      image: '👩‍💻'
    }
  ];

  const timeline = [
    {
      year: '2021',
      title: 'Started BTech Journey',
      description: 'Began Computer Science degree with specialization in Cybersecurity',
      type: 'education'
    },
    {
      year: '2022',
      title: 'First CTF Competition',
      description: 'Participated in first Capture The Flag competition, discovered passion for ethical hacking',
      type: 'achievement'
    },
    {
      year: '2023',
      title: 'Security Internship',
      description: 'Completed cybersecurity internship, gained real-world experience in penetration testing',
      type: 'experience'
    },
    {
      year: '2023',
      title: 'Bug Bounty Success',
      description: 'Started bug bounty hunting, reported first critical vulnerability',
      type: 'achievement'
    },
    {
      year: '2024',
      title: 'Advanced Projects',
      description: 'Developed advanced security tools including Fezla-Crypter and ShieldX-Antivirus',
      type: 'project'
    },
    {
      year: '2024',
      title: 'Portfolio Launch',
      description: 'Created comprehensive cybersecurity portfolio showcasing skills and projects',
      type: 'milestone'
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
</script>

<svelte:head>
  <title>CyberSec Portfolio - BTech Computer Science</title>
  <meta name="description" content="Cybersecurity portfolio of a BTech Computer Science student specializing in penetration testing, network security, and digital forensics." />
</svelte:head>

<div class="portfolio-container">
  <!-- Header Section -->
  <section class="hero-section">
    <div class="widget hero-widget">
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
              <div class="avatar-ring"></div>
              <img src="https://avatars.githubusercontent.com/u/169330774?v=4" alt="Muhammad Aslam A" class="avatar-image" />
              <div class="avatar-status">
                <div class="pulse-dot"></div>
              </div>
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
                <span class="role-tag primary">🛡️ Cybersecurity Student</span>
                <span class="role-tag secondary">💻 Creative Developer</span>
                <span class="role-tag tertiary">🎓 BTech Computer Science</span>
              </div>
              
              <p class="hero-location">
                <span class="location-icon">📍</span>
                <span>Kottayam, Kerala, India</span>
              </p>
              
              <div class="hero-description">
                <p>Passionate about cybersecurity, ethical hacking, and building innovative security solutions. Specialized in penetration testing, malware analysis, and digital forensics.</p>
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
        </div>
      </div>
    </div>
  </section>

  <!-- Main Content Grid -->
  <div class="grid grid-2 main-grid">
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

  <!-- Education Section -->
  <section class="education-section">
    <div class="widget">
      <div class="widget-header">
        <span class="widget-icon">📚</span>
        <span class="widget-title">Education</span>
      </div>
      <div class="education-grid">
        {#each education as edu}
          <div class="education-item">
            <div class="education-header">
              <span class="education-icon">🎓</span>
              <span class="education-name">{edu.degree}</span>
              <span class="education-institution">{edu.institution}</span>
            </div>
            <p class="education-description">{edu.description}</p>
            <div class="education-coursework">
              {#each edu.coursework as course}
                <span class="course-tag">{course}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Certifications Section -->
  <section class="certifications-section">
    <div class="widget">
      <div class="widget-header">
        <span class="widget-icon">📜</span>
        <span class="widget-title">Certifications</span>
      </div>
      <div class="certifications-grid">
        {#each certifications as cert}
          <div class="certification-item">
            <div class="certification-header">
              <span class="certification-icon">📜</span>
              <span class="certification-name">{cert.name}</span>
              <span class="certification-status">{cert.status}</span>
            </div>
            <p class="certification-description">{cert.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Experience Section -->
  <section class="experience-section">
    <div class="widget">
      <div class="widget-header">
        <span class="widget-icon">💼</span>
        <span class="widget-title">Experience</span>
      </div>
      <div class="experience-grid">
        {#each experience as exp}
          <div class="experience-item">
            <div class="experience-header">
              <span class="experience-icon">💼</span>
              <span class="experience-title">{exp.title}</span>
              <span class="experience-company">{exp.company}</span>
            </div>
            <p class="experience-description">{exp.description}</p>
            <div class="experience-achievements">
              {#each exp.achievements as achievement}
                <span class="achievement-tag">{achievement}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Tools Section -->
  <section class="tools-section">
    <div class="widget">
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
    <div class="widget">
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

  <!-- Articles Section -->
  <section class="articles-section">
    <div class="widget">
      <div class="widget-header">
        <span class="widget-icon">📄</span>
        <span class="widget-title">Articles</span>
      </div>
      <div class="articles-grid">
        {#each articles as article}
          <div class="article-item">
            <div class="article-header">
              <span class="article-icon">📄</span>
              <span class="article-title">{article.title}</span>
              <span class="article-type">{article.type}</span>
            </div>
            <p class="article-description">{article.description}</p>
            <div class="article-tags">
              {#each article.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="testimonials-section">
    <div class="widget">
      <div class="widget-header">
        <span class="widget-icon">💬</span>
        <span class="widget-title">Testimonials</span>
      </div>
      <div class="testimonials-grid">
        {#each testimonials as testimonial}
          <div class="testimonial-item">
            <div class="testimonial-header">
              <span class="testimonial-icon">{testimonial.image}</span>
              <span class="testimonial-name">{testimonial.name}</span>
              <span class="testimonial-role">{testimonial.role}</span>
            </div>
            <p class="testimonial-text">{testimonial.text}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Timeline Section -->
  <section class="timeline-section">
    <div class="widget">
      <div class="widget-header">
        <span class="widget-icon">🕰️</span>
        <span class="widget-title">Timeline</span>
      </div>
      <div class="timeline-grid">
        {#each timeline as event}
          <div class="timeline-item">
            <div class="timeline-header">
              <span class="timeline-icon">🕰️</span>
              <span class="timeline-year">{event.year}</span>
              <span class="timeline-title">{event.title}</span>
            </div>
            <p class="timeline-description">{event.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="contact-section">
    <div class="widget">
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
          <button type="submit" disabled={formLoading}>
            {formLoading ? 'Sending...' : 'Send'}
          </button>
          {#if formSubmitted}
            <p class="success-message">Message sent successfully!</p>
          {/if}
        </form>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="widget footer-widget">
      <div class="footer-content">
        <p class="mono"> 2025 • Built with SvelteKit • Deployed on Vercel</p>
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
