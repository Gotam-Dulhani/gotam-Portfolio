'use client'

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Download } from 'lucide-react';
import Image from 'next/image';
import { ArrowDownRight } from 'lucide-react';


const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeTab, setActiveTab] = useState('experience');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    service: '',
    message: ''
  });

  // Counter animation
  const [counts, setCounts] = useState({
    experience: 0,
    projects: 0,
    technologies: 0,
    commits: 0
  });

  useEffect(() => {
    if (activeSection === 'home') {
      const targets = { experience: 2, projects: 8, technologies: 12, commits: 150 };
      const duration = 2000;
      const steps = 50;
      const increment = duration / steps;

      Object.keys(targets).forEach(key => {
        const target = targets[key];
        const step = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            setCounts(prev => ({ ...prev, [key]: target }));
            clearInterval(timer);
          } else {
            setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
          }
        }, increment);
      });
    }
  }, [activeSection]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
    alert('Message sent successfully!');
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const skills = [
    { name: 'C++', icon: '⚡' },
    { name: 'Python', icon: '🐍' },
    { name: 'JavaScript', icon: '🟨' },
    { name: 'React', icon: '⚛️' },
    { name: 'HTML', icon: '🌐' },
    { name: 'CSS', icon: '🎨' },
    { name: 'SFML', icon: '🎮' },
    { name: 'Bootstrap', icon: '📱' }
  ];

  const Navigation = () => (
    <nav className="fixed top-0 right-0 z-50 p-6">
      <div className="flex items-center gap-8">
        <button
          onClick={() => setActiveSection('home')}
          className={`text-sm font-medium transition-colors ${
            activeSection === 'home' ? 'text-green-400' : 'text-gray-300 hover:text-green-400'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveSection('services')}
          className={`text-sm font-medium transition-colors ${
            activeSection === 'services' ? 'text-green-400' : 'text-gray-300 hover:text-green-400'
          }`}
        >
          Services
        </button>
        <button
          onClick={() => setActiveSection('resume')}
          className={`text-sm font-medium transition-colors ${
            activeSection === 'resume' ? 'text-green-400' : 'text-gray-300 hover:text-green-400'
          }`}
        >
          Resume
        </button>
        <button
          onClick={() => setActiveSection('work')}
          className={`text-sm font-medium transition-colors ${
            activeSection === 'work' ? 'text-green-400' : 'text-gray-300 hover:text-green-400'
          }`}
        >
          Work
        </button>
        <button
          onClick={() => setActiveSection('contact')}
          className={`text-sm font-medium transition-colors ${
            activeSection === 'contact' ? 'text-green-400' : 'text-gray-300 hover:text-green-400'
          }`}
        >
          Contact
        </button>
        <button className="bg-green-400 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-green-500 transition-colors">
          Hire me
        </button>
      </div>
    </nav>
  );

  const HomeSection = () => (
    <div className="min-h-screen flex items-center justify-between px-16 py-20">
      <div className="flex-1 max-w-2xl">
        <h2 className="text-gray-400 text-lg mb-4">Computer Science Student</h2>
        <h1 className="text-6xl font-bold text-white mb-2">
          Hello I'm
        </h1>
        <h1 className="text-6xl font-bold text-green-400 mb-8">
          Gotam Dulhani
        </h1>
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
          Computer Science undergraduate with a solid foundation in programming, web development, and object-oriented design. Passionate about building intelligent systems and immersive user experiences through AI and Game Development.
        </p>
        <div className="flex items-center gap-6 mb-12 flex-wrap">
          <a
            href="Gotam-Dulhani.pdf"
            download
            className="inline-block"
          >
            <button className="bg-green-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-green-500 transition-colors flex items-center gap-2">
              <Download size={20} />
              DOWNLOAD CV
            </button>
          </a>
          <div className="flex gap-4">
            <a
              href="https://github.com/Gotam-Dulhani"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border-2 border-green-400 flex items-center justify-center text-green-400 hover:bg-green-400 hover:text-black transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/gotam-dulhani-47b35b289"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border-2 border-green-400 flex items-center justify-center text-green-400 hover:bg-green-400 hover:text-black transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:ghotamdulhani123@gmail.com"
              className="w-12 h-12 rounded-full border-2 border-green-400 flex items-center justify-center text-green-400 hover:bg-green-400 hover:text-black transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">{counts.experience}</div>
            <div className="text-gray-400 text-sm">Years of<br />experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">{counts.projects}</div>
            <div className="text-gray-400 text-sm">Projects<br />completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">{counts.technologies}</div>
            <div className="text-gray-400 text-sm">Technologies<br />mastered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">{counts.commits}</div>
            <div className="text-gray-400 text-sm">Code<br />commits</div>
          </div>
        </div>
      </div>
     <div className="flex-1 flex justify-center items-center">
      <div className="w-[300px] h-[400px] bg-gray-800 rounded-xl shadow-lg">
        <Image
          src="/gotam.jpg"
          alt="Gotam Dulhani"
          width={300}
          height={400}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
     </div>
        <div className="absolute inset-0 pointer-events-none">
        </div>
      </div>
  );

  const services = [
  {
    id: '01',
    title: 'Web Development',
    description: 'Creating modern, responsive websites using HTML, CSS, JavaScript, and frameworks like React.',
  },
  {
  id: '02',
  title: 'Generative AI',
  description: 'Building intelligent applications using Generative AI and large language models to automate tasks and generate human-like content.',
  },
  {
  id: '03',
  title: 'Graphic Design',
  description: 'Creating visually appealing designs and layouts for digital and print media, including banners, posters, and social media assets.',
  },
  {
  id: '04',
  title: 'Game Development',
  description: 'Designing and building interactive games using C++ and SFML, focusing on engaging mechanics, graphics, and user experience.',
  },
  {
  id: '05',
  title: 'Machine Learning',
  description: 'Implementing data-driven solutions using machine learning algorithms to solve real-world problems and extract insights from data.',
  },
  {
  id: '06',
  title: 'Microsoft Office Skills',
  description: 'Proficient in Microsoft Word, Excel, and PowerPoint with strong skills in document formatting, data analysis, and professional presentations.',
  }
];

const ServicesSection = () => (
  <div className="min-h-screen px-6 md:px-16 py-20 bg-[#0f0f0f]">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
      {services.map((service, index) => (
        <div
          key={index}
          className="group border-b border-gray-800 pb-6 relative flex items-start justify-between cursor-pointer hover:text-green-400 transition-colors"
        >
          <div>
            <span className="text-gray-500 font-bold text-lg">{service.id}</span>
            <h3 className="text-2xl md:text-3xl font-bold mt-2 group-hover:text-green-400 transition-colors">
              {service.title}
            </h3>
            <p className="text-gray-500 mt-2 max-w-md">{service.description}</p>
          </div>
          <div className="absolute right-0 top-0 mt-1">
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-green-400 group-hover:text-black transition-colors">
              <ArrowDownRight size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

  const ResumeSection = () => (
    <div className="min-h-screen px-16 py-20">
      <div className="flex gap-16">
        <div className="w-80">
          <h2 className="text-4xl font-bold text-white mb-8">Why hire me?</h2>
          <p className="text-gray-400 mb-12">
            I bring passion, dedication, and fresh perspectives to every project. With strong academic foundation and hands-on experience in multiple technologies.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => setActiveTab('experience')}
              className={`w-full py-4 px-6 rounded-lg text-left transition-colors ${
                activeTab === 'experience' ? 'bg-green-400 text-black' : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`w-full py-4 px-6 rounded-lg text-left transition-colors ${
                activeTab === 'education' ? 'bg-green-400 text-black' : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Education
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full py-4 px-6 rounded-lg text-left transition-colors ${
                activeTab === 'skills' ? 'bg-green-400 text-black' : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`w-full py-4 px-6 rounded-lg text-left transition-colors ${
                activeTab === 'about' ? 'bg-green-400 text-black' : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              About me
            </button>
          </div>
        </div>

        <div className="flex-1">
          {activeTab === 'experience' && (
            <div>
              <h3 className="text-4xl font-bold text-white mb-8">My experience</h3>
              <p className="text-gray-400 mb-12">
                Academic projects and hands-on experience with various technologies and programming languages.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="border-l-4 border-green-400 pl-6">
                  <div className="text-green-400 text-sm mb-2">2023 - Present</div>
                  <h4 className="text-xl font-bold text-white mb-2">Student Developer</h4>
                  <p className="text-gray-400 mb-4">FAST - NUCES</p>
                  <p className="text-gray-400">
                    Developing various projects using C++, Python, and web technologies. Focus on game development and AI.
                  </p>
                </div>
                <div className="border-l-4 border-green-400 pl-6">
                  <div className="text-green-400 text-sm mb-2">2022 - 2023</div>
                  <h4 className="text-xl font-bold text-white mb-2">Programming Enthusiast</h4>
                  <p className="text-gray-400 mb-4">Self-taught</p>
                  <p className="text-gray-400">
                    Started programming journey with C++ and exploring various programming concepts and technologies.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div>
              <h3 className="text-4xl font-bold text-white mb-8">My education</h3>
              <p className="text-gray-400 mb-12">
                Strong academic foundation in computer science and related fields.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="border-l-4 border-green-400 pl-6">
                  <div className="text-green-400 text-sm mb-2">2011 - 2021</div>
                  <h4 className="text-xl font-bold text-white mb-2">Matric in science</h4>
                  <p className="text-gray-400 mb-4">Mehal Public High School Chundiko</p>
                  <p className="text-gray-400">
                    Completed secondary education with a focus on science subjects including Mathematics, Physics, Biology and Chemistry.
                  </p>
                </div>
                <div className="border-l-4 border-green-400 pl-6">
                  <div className="text-green-400 text-sm mb-2">2021 - 2023</div>
                  <h4 className="text-xl font-bold text-white mb-2">Intermediate in Pre-Engineering</h4>
                  <p className="text-gray-400 mb-4">Board of Intermediate Education</p>
                  <p className="text-gray-400">
                    Completed higher secondary education with focus on Mathematics, Physics, and Chemistry.
                    Currently pursuing BS in Computer Science with focus on Data Structures, OOP, and AI fundamentals.
                  </p>
                </div>
                <div className="border-l-4 border-green-400 pl-6">
                  <div className="text-green-400 text-sm mb-2">2023 - Present</div>
                  <h4 className="text-xl font-bold text-white mb-2">Bachelor of Science in Computer Science</h4>
                  <p className="text-gray-400 mb-4">FAST-NUCES Karachi</p>
                  <p className="text-gray-400">
                    Currently pursuing a degree in Computer Science with a focus on Data Structures, OOP, and AI fundamentals.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <h3 className="text-4xl font-bold text-white mb-8">My skills</h3>
              <p className="text-gray-400 mb-12">
                Proficient in multiple programming languages and development technologies.
              </p>
              <div className="grid grid-cols-4 gap-8">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-gray-800 p-8 rounded-lg text-center hover:bg-gray-700 transition-colors">
                    <div className="text-4xl mb-4">{skill.icon}</div>
                    <h4 className="text-white font-medium">{skill.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div>
              <h3 className="text-4xl font-bold text-white mb-8">About me</h3>
              <p className="text-gray-400 mb-12">
                Passionate Computer Science student with a keen interest in technology and innovation.
              </p>
              <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name</span>
                  <span className="text-white">Gotam Dulhani</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Nationality</span>
                  <span className="text-white">Pakistani</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location</span>
                  <span className="text-white">Karachi, Sindh, Pakistan</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Freelance</span>
                  <span className="text-white">Available</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Education</span>
                  <span className="text-white">BSCS - FAST NUCES KARACHI</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone</span>
                  <span className="text-white">03233036735</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email</span>
                  <span className="text-white">ghotamdulhani123@gmail.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Languages</span>
                  <span className="text-white">English, Urdu, Sindhi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Skills</span>
                  <span className="text-white">Web, AI, Game Dev, C++, JS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">GitHub</span>
                  <a
                    href="https://github.com/Gotam-Dulhani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline"
                  >
                    github.com/Gotam-Dulhani
                  </a>
                </div>
              </div>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

const projects = [
  {
    id: 1,
    title: 'Restaurant Management System',
    description: 'A complete restaurant management system developed in Assembly language, featuring user authentication, table reservations, order processing, and billing. Demonstrates low-level programming concepts and efficient system logic handling for real-world operations.',
    tech: ['Assembly', 'System Programming', 'Database Management'],
    image: '/RMS.webp',
    github: 'https://github.com/Gotam-Dulhani/restaurant-management-system'
  },
  {
    id: 2,
    title: 'Clothing Website',
    description: 'A fully responsive e-commerce website for clothing built with HTML, CSS, Bootstrap, and JavaScript. Includes product listings, category filters, shopping cart functionality, and a clean, user-friendly interface for a seamless shopping experience.',
    tech: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    image: '/cloth.jpeg',
    github: 'https://github.com/Gotam-Dulhani/Clothing-Website'
  },
  {
    id: 3,
    title: 'Centipede Game',
    description: 'A modern recreation of the classic Centipede arcade game using C++ and SFML. Features smooth movement, enemy spawning, collision detection, and score tracking — all built with an object-oriented approach for a retro yet responsive gameplay experience.',
    tech: ['C++', 'SFML', 'Game Development'],
    image: '/centipede.webp',
    github: 'https://github.com/Gotam-Dulhani/Centipede-Game'
  },
  {
    id: 4,
    title: 'Candy Crush Clone',
    description: 'An engaging match-three puzzle game inspired by Candy Crush, built using C++ and OOP principles. Features colorful tile-matching mechanics, score tracking, cascading matches, and a grid-based logic system for interactive gameplay.',
    tech: ['C++', 'Game Logic', 'openGL'],
    image: '/CandyCrush.webp',
    github: 'https://github.com/Gotam-Dulhani/Candy-Crush-Game'
  },
  {
    id: 5,
    title: 'Space Shooter Game',
    description: 'A dynamic space shooter game developed in C++ using Object-Oriented Programming principles. Players control a spaceship to destroy incoming enemies, avoid obstacles, and progress through increasingly challenging levels with smooth graphics and responsive controls powered by the SFML library.',
    tech: ['C++', 'OOP', 'Game Development'],
    image: '/SSG.jpeg',
    github: 'https://github.com/Gotam-Dulhani/space-shooter-game'
  },
  {
    id: 6,
    title: 'Swan Care Website',
    description: 'A responsive and elegant website for Swan Care services, showcasing features, service offerings, and contact forms using HTML, CSS, and JavaScript.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/swancare.jpg',
    github: 'https://github.com/Gotam-Dulhani/Swan-Care'
  },
  {
    id: 7,
    title: 'Expense Tracker',
    description: 'A console-based expense tracker developed in C++ using Object-Oriented Programming and Data Structures concepts. It allows users to add, view, and manage their daily expenses efficiently.',
    tech: ['C++', 'OOP', 'Data Structures'],
    image: '/expense.jpeg',
    github: 'https://github.com/Gotam-Dulhani/Expense-Tracker-Project'
  },
  {
    id: 8,
    title: 'YouTube Video Summarizer',
    description: 'A Generative AI-based web app that summarizes YouTube videos using LLMs. It transcribes video content and delivers concise, readable summaries — built with integrated AI models.',
    tech: ['Gen AI', 'LLMs', 'JavaScript', 'YouTube API', 'HTML', 'CSS'],
    image: '/Summarizer.png',
    github: 'https://github.com/Gotam-Dulhani/youtube-video-summarizer'
  }
];

const WorkSection = () => (
  <div className="min-h-screen px-8 sm:px-16 py-20">
    <div className="grid grid-cols-1 gap-16">
      {projects.map((project, index) => (
        <div key={project.id} className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="text-5xl font-bold text-blue-500 mb-4">
              {String(index + 1).padStart(2, '0')}
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
            <p className="text-gray-400 mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
                >
                  <Github size={20} />
                </a>
              )}
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-gray-800 p-4 rounded-lg">
              <Image
                src={project.image}
                alt={project.title}
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-64"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

  const ContactSection = () => (
    <div className="min-h-screen px-16 py-20">
      <div className="grid grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-bold text-green-400 mb-8">Let's work together</h2>
          <p className="text-gray-400 mb-12">
            I'm always interested in new opportunities and collaborations. Feel free to reach out!
          </p>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                required
              />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              required
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              required
            >
              <option value="">Select a service</option>
              <option value="web-development">Web Development</option>
              <option value="game-development">Game Development</option>
              <option value="ai-development">AI Development</option>
              <option value="system-programming">System Programming</option>
            </select>
            <textarea
              name="message"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              required
            />
            <button
              type="submit"
              className="bg-green-400 text-black px-8 py-3 rounded-lg font-medium hover:bg-green-500 transition-colors"
            >
              Send message
            </button>
          </div>
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              className="w-full bg-green-400 text-black px-8 py-3 rounded-lg font-medium hover:bg-green-500 transition-colors"
            >
              Send message
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center">
              <Phone size={20} className="text-black" />
            </div>
            <div>
              <h4 className="text-white font-medium">Phone</h4>
              <p className="text-gray-400">03233036735</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center">
              <Mail size={20} className="text-black" />
            </div>
            <div>
              <h4 className="text-white font-medium">Email</h4>
              <p className="text-gray-400">ghotamdulhani123@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center">
              <MapPin size={20} className="text-black" />
            </div>
            <div>
              <h4 className="text-white font-medium">Address</h4>
              <p className="text-gray-400">Karachi, Pakistan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="fixed top-6 left-6 z-50">
        <h1 className="text-2xl font-bold">Gotam</h1>
      </div>
      
      <Navigation />
      
      <main>
        {activeSection === 'home' && <HomeSection />}
        {activeSection === 'services' && <ServicesSection />}
        {activeSection === 'resume' && <ResumeSection />}
        {activeSection === 'work' && <WorkSection />}
        {activeSection === 'contact' && <ContactSection />}
      </main>
    </div>
  );
};

export default Portfolio;
