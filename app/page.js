'use client'

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Download } from 'lucide-react';
import { ArrowDownRight } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeTab, setActiveTab] = useState('experience');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    service: '',
    message: ''
  });

  // Mouse tracking for subtle parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
      <div className="flex items-center gap-8 bg-black/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/10">
        {['home', 'services', 'resume', 'work', 'contact'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`text-sm font-medium transition-all duration-300 relative group ${
              activeSection === section ? 'text-emerald-400' : 'text-gray-300 hover:text-emerald-400'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 transform origin-left transition-transform duration-300 ${
              activeSection === section ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`} />
          </button>
        ))}
        <button className="bg-gradient-to-r from-emerald-400 to-teal-500 text-black px-6 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-emerald-400/25 transition-all duration-300 transform hover:scale-105">
          Hire me
        </button>
      </div>
    </nav>
  );

  const HomeSection = () => (
    <div className="min-h-screen flex items-center justify-between px-16 py-20 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            top: '10%',
            left: '60%'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            bottom: '20%',
            left: '20%'
          }}
        />
      </div>

      <div className={`flex-1 max-w-2xl transform transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <h1 className="text-6xl font-bold text-white mb-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Hello I'm
        </h1>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-8 animate-fade-in-up" 
            style={{ animationDelay: '0.6s' }}>
          Gotam Dulhani
        </h1>
        <p className="text-gray-300 text-lg mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          Computer Science undergraduate with a solid foundation in programming, web development, and object-oriented design. Passionate about building intelligent systems and immersive user experiences through AI and Game Development.
        </p>
        
        <div className="flex items-center gap-6 mb-12 flex-wrap animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <a href="Gotam-Dulhani.pdf" download className="inline-block">
            <button className="bg-gradient-to-r from-emerald-400 to-teal-500 text-black px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-400/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group">
              <Download size={20} className="group-hover:animate-bounce" />
              DOWNLOAD CV
            </button>
          </a>
          
          <div className="flex gap-4">
            {[
              { icon: Github, href: "https://github.com/Gotam-Dulhani", delay: '1.2s' },
              { icon: Linkedin, href: "https://www.linkedin.com/in/gotam-dulhani-47b35b289", delay: '1.4s' },
              { icon: Mail, href: "mailto:ghotamdulhani123@gmail.com", delay: '1.6s' }
            ].map(({ icon: Icon, href, delay }, index) => (
              <a
                key={index}
                href={href}
                target={href.startsWith('http') ? '_blank' : '_self'}
                rel={href.startsWith('http') ? 'noopener noreferrer' : ''}
                className="w-12 h-12 rounded-xl border-2 border-emerald-400/50 flex items-center justify-center text-emerald-400 hover:bg-emerald-400 hover:text-black transition-all duration-300 transform hover:scale-110 hover:rotate-6 animate-fade-in-up backdrop-blur-sm"
                style={{ animationDelay: delay }}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-8 animate-fade-in-up" style={{ animationDelay: '1.8s' }}>
          {[
            { key: 'experience', label: 'Years of\nexperience' },
            { key: 'projects', label: 'Projects\ncompleted' },
            { key: 'technologies', label: 'Technologies\nmastered' },
            { key: 'commits', label: 'Code\ncommits' }
          ].map(({ key, label }, index) => (
            <div key={key} className="text-center group">
              <div className="text-4xl font-bold text-white mb-2 transform transition-all duration-300 group-hover:scale-110 group-hover:text-emerald-400">
                {counts[key]}
              </div>
              <div className="text-gray-400 text-sm whitespace-pre-line">{label}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={`flex-1 flex justify-center items-center transform transition-all duration-1000 ${
        isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
      }`} style={{ transitionDelay: '0.5s' }}>
        <div className="relative group">
          <div className="w-[300px] h-[400px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl relative overflow-hidden border border-white/10 transform transition-all duration-500 group-hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src="/gotam.jpg"
              alt="Gotam Dulhani"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </div>
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
    <div className="min-h-screen px-6 md:px-16 py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl top-10 right-10 animate-pulse" />
        <div className="absolute w-[300px] h-[300px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl bottom-20 left-10 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header Section */}
      <div className="text-center mb-20 animate-fade-in-up">
        <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
          My Services
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Transforming ideas into digital reality with cutting-edge technologies and creative solutions
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mt-8 rounded-full" />
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl p-6 lg:p-8 rounded-2xl border border-white/10 hover:border-emerald-400/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up overflow-hidden min-h-[320px] flex flex-col"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              {/* Icon area with ID */}
              <div className="mb-6 relative z-10">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-400/10 to-teal-500/10 flex items-center justify-center border border-emerald-400/20 group-hover:border-emerald-400/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold text-sm">{service.id}</span>
                  </div>
                </div>
              </div>

              {/* Service title */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-all duration-300 leading-tight">
                {service.title}
              </h3>

              {/* Service description */}
              <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 flex-grow">
                {service.description}
              </p>

              {/* Action button */}
              <div className="flex items-center justify-between mt-auto">
                <button className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors duration-300 group-hover:translate-x-1">
                  Learn More
                </button>
                <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:bg-emerald-400 group-hover:text-black transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-45 border border-white/10 flex-shrink-0">
                  <ArrowDownRight size={16} />
                </div>
              </div>

              {/* Hover effect line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 group-hover:w-full transition-all duration-500 rounded-full" />
              
              {/* Corner decoration */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400/30 rounded-full group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Call to action section */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-8 rounded-2xl border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to bring your ideas to life?
            </h3>
            <p className="text-gray-400 mb-6">
              Let's collaborate and create something amazing together
            </p>
            <button
              onClick={() => setActiveSection('contact')}
              className="bg-gradient-to-r from-emerald-400 to-teal-500 text-black px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-400/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  const ResumeSection = () => (
    <div className="min-h-screen px-16 py-20 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="flex gap-16">
        <div className="w-80 animate-fade-in-left">
          <h2 className="text-4xl font-bold text-white mb-8">Why hire me?</h2>
          <p className="text-gray-400 mb-12">
            I bring passion, dedication, and fresh perspectives to every project. With strong academic foundation and hands-on experience in multiple technologies.
          </p>
          
          <div className="space-y-4">
            {['experience', 'education', 'skills', 'about'].map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full py-4 px-6 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-up ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-black shadow-lg shadow-emerald-400/25' 
                    : 'bg-gray-800/50 backdrop-blur-sm text-white hover:bg-gray-700/50 border border-white/10'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 animate-fade-in-right">
          {activeTab === 'experience' && (
            <div className="animate-fade-in">
              <h3 className="text-4xl font-bold text-white mb-8">My experience</h3>
              <p className="text-gray-400 mb-12">
                Academic projects and hands-on experience with various technologies and programming languages.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {[
                  {
                    period: '2023 - Present',
                    title: 'Student Developer',
                    company: 'FAST - NUCES',
                    description: 'Developing various projects using C++, Python, and web technologies. Focus on game development and AI.',
                    delay: '0s'
                  },
                  {
                    period: '2022 - 2023',
                    title: 'Programming Enthusiast',
                    company: 'Self-taught',
                    description: 'Started programming journey with C++ and exploring various programming concepts and technologies.',
                    delay: '0.2s'
                  }
                ].map((exp, index) => (
                  <div key={index} className="border-l-4 border-emerald-400 pl-6 group animate-fade-in-up" style={{ animationDelay: exp.delay }}>
                    <div className="text-emerald-400 text-sm mb-2 group-hover:text-emerald-300 transition-colors">
                      {exp.period}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {exp.title}
                    </h4>
                    <p className="text-gray-400 mb-4 font-medium">{exp.company}</p>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="animate-fade-in">
              <h3 className="text-4xl font-bold text-white mb-8">My education</h3>
              <p className="text-gray-400 mb-12">
                Strong academic foundation in computer science and related fields.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {[
                  {
                    period: '2011 - 2021',
                    title: 'Matric in science',
                    school: 'Mehal Public High School Chundiko',
                    description: 'Completed secondary education with a focus on science subjects including Mathematics, Physics, Biology and Chemistry.'
                  },
                  {
                    period: '2021 - 2023',
                    title: 'Intermediate in Pre-Engineering',
                    school: 'Board of Intermediate Education',
                    description: 'Completed higher secondary education with focus on Mathematics, Physics, and Chemistry.'
                  },
                  {
                    period: '2023 - Present',
                    title: 'Bachelor of Science in Computer Science',
                    school: 'FAST-NUCES Karachi',
                    description: 'Currently pursuing a degree in Computer Science with a focus on Data Structures, OOP, and AI fundamentals.'
                  }
                ].map((edu, index) => (
                  <div key={index} className="border-l-4 border-emerald-400 pl-6 group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="text-emerald-400 text-sm mb-2 group-hover:text-emerald-300 transition-colors">
                      {edu.period}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {edu.title}
                    </h4>
                    <p className="text-gray-400 mb-4 font-medium">{edu.school}</p>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="animate-fade-in">
              <h3 className="text-4xl font-bold text-white mb-8">My skills</h3>
              <p className="text-gray-400 mb-12">
                Proficient in multiple programming languages and development technologies.
              </p>
              <div className="grid grid-cols-4 gap-6">
                {skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl text-center hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border border-white/10 group animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-4xl mb-4 group-hover:animate-bounce">{skill.icon}</div>
                    <h4 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                      {skill.name}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="animate-fade-in">
              <h3 className="text-4xl font-bold text-white mb-8">About me</h3>
              <p className="text-gray-400 mb-12">
                Passionate Computer Science student with a keen interest in technology and innovation.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  {[
                    { label: 'Name', value: 'Gotam Dulhani' },
                    { label: 'Nationality', value: 'Pakistani' },
                    { label: 'Location', value: 'Karachi, Sindh, Pakistan' },
                    { label: 'Freelance', value: 'Available' },
                    { label: 'Education', value: 'BSCS - FAST NUCES KARACHI' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <span className="text-gray-400 group-hover:text-gray-300 transition-colors">{item.label}</span>
                      <span className="text-white group-hover:text-emerald-400 transition-colors">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                  {[
                    { label: 'Phone', value: '03233036735' },
                    { label: 'Email', value: 'ghotamdulhani123@gmail.com' },
                    { label: 'Languages', value: 'English, Urdu, Sindhi' },
                    { label: 'Skills', value: 'Web, AI, Game Dev, C++, JS' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between group animate-fade-in-up" style={{ animationDelay: `${(index + 5) * 0.1}s` }}>
                      <span className="text-gray-400 group-hover:text-gray-300 transition-colors">{item.label}</span>
                      <span className="text-white group-hover:text-emerald-400 transition-colors">{item.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between group animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">GitHub</span>
                    <a
                      href="https://github.com/Gotam-Dulhani"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 hover:underline transition-all transform hover:scale-105"
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
    <div className="min-h-screen px-8 sm:px-16 py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="grid grid-cols-1 gap-20">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className={`flex flex-col lg:flex-row items-center gap-12 group animate-fade-in-up ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex-1">
              <div className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-gradient-to-r from-emerald-600/80 to-teal-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-white/20 hover:scale-105 transition-transform duration-200"
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
                    className="w-12 h-12 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-emerald-400 hover:text-black transition-all duration-300 transform hover:scale-110 hover:rotate-6 border border-white/20"
                  >
                    <Github size={20} />
                  </a>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-4 rounded-2xl border border-white/10 group-hover:border-emerald-400/30 transition-all duration-500 transform group-hover:scale-105">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="rounded-xl object-cover w-full h-64 transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Fixed Contact Section Component
const ContactSection = () => {
  // Move form handling inside the component to prevent re-renders
  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen px-16 py-20 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="grid grid-cols-2 gap-16">
        <div className="animate-fade-in-left">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-8">
            Let's work together
          </h2>
          <p className="text-gray-400 mb-12">
            I'm always interested in new opportunities and collaborations. Feel free to reach out!
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-gray-800/70 transition-all duration-300"
                required
                key="firstName" // Add key to prevent React reconciliation issues
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-gray-800/70 transition-all duration-300"
                required
                key="lastName" // Add key to prevent React reconciliation issues
              />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-gray-800/70 transition-all duration-300"
              required
              key="phone"
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400 focus:bg-gray-800/70 transition-all duration-300"
              required
              key="service"
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
              className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-gray-800/70 transition-all duration-300 resize-none"
              required
              key="message"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-black px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-400/25 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1"
            >
              Send message
            </button>
          </form>
        </div>
        
        <div className="flex flex-col justify-center space-y-8 animate-fade-in-right">
          {[
            { icon: Phone, title: 'Phone', value: '03233036735', delay: '0s' },
            { icon: Mail, title: 'Email', value: 'ghotamdulhani123@gmail.com', delay: '0.2s' },
            { icon: MapPin, title: 'Address', value: 'Karachi, Pakistan', delay: '0.4s' }
          ].map(({ icon: Icon, title, value, delay }, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 group animate-fade-in-up"
              style={{ animationDelay: delay }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Icon size={20} className="text-black" />
              </div>
              <div>
                <h4 className="text-white font-medium group-hover:text-emerald-400 transition-colors duration-300">
                  {title}
                </h4>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen relative overflow-x-hidden">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      
      {/* Animated background grid */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>
      
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
      
      <div className="fixed top-6 left-6 z-50 animate-fade-in-left">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Computer Science Student
        </h1>
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
