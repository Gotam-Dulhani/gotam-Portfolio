'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Download, Menu, X } from 'lucide-react';
import { ArrowDownRight } from 'lucide-react';

// Custom hook for scroll animations
const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

// Move Navigation component outside with mobile menu
const Navigation = ({ activeSection, setActiveSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  // Auto-detect active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'resume', 'work', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 right-0 z-50 p-6 hidden lg:block">
        <div className="flex items-center gap-8 bg-black/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/10">
          {['home', 'services', 'resume', 'work', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
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
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-gradient-to-r from-emerald-400 to-teal-500 text-black px-6 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-emerald-400/25 transition-all duration-300 transform hover:scale-105"
          >
            Hire me
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="fixed top-4 right-4 z-50 w-12 h-12 bg-black/20 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center text-white hover:text-emerald-400 transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-md">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {['home', 'services', 'resume', 'work', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-2xl font-medium transition-all duration-300 ${
                    activeSection === section ? 'text-emerald-400' : 'text-white hover:text-emerald-400'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-emerald-400 to-teal-500 text-black px-8 py-3 rounded-xl text-lg font-medium hover:shadow-lg hover:shadow-emerald-400/25 transition-all duration-300"
              >
                Hire me
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const HomeSection = ({ isLoaded, mousePosition, counts }) => {
  const [ref, isVisible] = useScrollAnimation(0.3);

  return (
    <div 
      id="home"
      ref={ref}
      className={`min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 sm:px-8 lg:px-16 py-20 lg:py-20 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            top: '10%',
            left: '60%'
          }}
        />
        <div 
          className="absolute w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            bottom: '20%',
            left: '20%'
          }}
        />
      </div>

      <div className={`flex-1 max-w-2xl mb-12 lg:mb-0 transform transition-all duration-1000 delay-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 text-center lg:text-left">
          Hello I'm
        </h1>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-8 text-center lg:text-left">
          Gotam Dulhani
        </h1>
        <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed text-center lg:text-left">
          Computer Science undergraduate with a solid foundation in programming, web development, and object-oriented design. Passionate about building intelligent systems and immersive user experiences through AI and Game Development.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-12">
          <a href="Gotam-CV.pdf" download className="inline-block">
            <button className="bg-gradient-to-r from-emerald-400 to-teal-500 text-black px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-400/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group">
              <Download size={20} className="group-hover:animate-bounce" />
              DOWNLOAD CV
            </button>
          </a>
          
          <div className="flex gap-4">
            {[
              { icon: Github, href: "https://github.com/Gotam-Dulhani" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/gotam-dulhani-47b35b289" },
              { icon: Mail, href: "mailto:ghotamdulhani123@gmail.com" }
            ].map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target={href.startsWith('http') ? '_blank' : '_self'}
                rel={href.startsWith('http') ? 'noopener noreferrer' : ''}
                className="w-12 h-12 rounded-xl border-2 border-emerald-400/50 flex items-center justify-center text-emerald-400 hover:bg-emerald-400 hover:text-black transition-all duration-300 transform hover:scale-110 hover:rotate-6 backdrop-blur-sm"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 text-center">
          {[
            { key: 'experience', label: 'Years of\nexperience' },
            { key: 'projects', label: 'Projects\ncompleted' },
            { key: 'technologies', label: 'Technologies\nmastered' },
            { key: 'commits', label: 'Code\ncommits' }
          ].map(({ key, label }, index) => (
            <div key={key} className="group">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2 transform transition-all duration-300 group-hover:scale-110 group-hover:text-emerald-400">
                {counts[key]}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm whitespace-pre-line">{label}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={`flex-1 flex justify-center items-center transform transition-all duration-1000 delay-500 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
      }`}>
        <div className="relative group">
          <div className="w-[250px] sm:w-[300px] h-[333px] sm:h-[400px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl relative overflow-hidden border border-white/10 transform transition-all duration-500 group-hover:scale-105">
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
};

const ServicesSection = ({ setActiveSection }) => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const [titleRef, isTitleVisible] = useScrollAnimation(0.3);

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div id="services" className="min-h-screen px-6 sm:px-8 lg:px-16 py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl top-10 right-10 animate-pulse" />
        <div className="absolute w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl bottom-20 left-10 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div 
        ref={titleRef}
        className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${
          isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
          My Services
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-4">
          Transforming ideas into digital reality with cutting-edge technologies and creative solutions
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mt-8 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl p-6 lg:p-8 rounded-2xl border border-white/10 hover:border-emerald-400/30 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 overflow-hidden min-h-[300px] sm:min-h-[320px] flex flex-col ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              <div className="mb-6 relative z-10">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-400/10 to-teal-500/10 flex items-center justify-center border border-emerald-400/20 group-hover:border-emerald-400/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold text-sm">{service.id}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-all duration-300 leading-tight">
                {service.title}
              </h3>

              <p className="text-gray-400 text-sm sm:text-base mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 flex-grow">
                {service.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <button className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors duration-300 group-hover:translate-x-1 text-sm sm:text-base">
                  Learn More
                </button>
                <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:bg-emerald-400 group-hover:text-black transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-45 border border-white/10 flex-shrink-0">
                  <ArrowDownRight size={16} />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 group-hover:w-full transition-all duration-500 rounded-full" />
              <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400/30 rounded-full group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300" />
            </div>
          ))}
        </div>

        <div className={`text-center mt-16 sm:mt-20 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Ready to bring your ideas to life?
            </h3>
            <p className="text-gray-400 mb-6 text-sm sm:text-base">
              Let's collaborate and create something amazing together
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-emerald-400 to-teal-500 text-black px-6 sm:px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-400/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResumeSection = ({ activeTab, setActiveTab }) => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const [sidebarRef, isSidebarVisible] = useScrollAnimation(0.3);
  const [contentRef, isContentVisible] = useScrollAnimation(0.3);

  const skills = [
    { name: 'C++', icon: '⚡' },
    { name: 'Python', icon: '🐍' },
    { name: 'JavaScript', icon: '🟨' },
    { name: 'React', icon: '⚛️' },
    { name: 'HTML', icon: '🌍' },
    { name: 'CSS', icon: '🎨' },
    { name: 'SFML', icon: '🎮' },
    { name: 'Bootstrap', icon: '📱' }
  ];

  return (
    <div id="resume" ref={ref} className="min-h-screen px-6 sm:px-8 lg:px-16 py-20 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div 
          ref={sidebarRef}
          className={`w-full lg:w-80 transition-all duration-1000 ${
            isSidebarVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 text-center lg:text-left">Why hire me?</h2>
          <p className="text-gray-400 mb-8 sm:mb-12 text-center lg:text-left text-sm sm:text-base">
            I bring passion, dedication, and fresh perspectives to every project. With strong academic foundation and hands-on experience in multiple technologies.
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {['experience', 'education', 'skills', 'about'].map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-black shadow-lg shadow-emerald-400/25' 
                    : 'bg-gray-800/50 backdrop-blur-sm text-white hover:bg-gray-700/50 border border-white/10'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div 
          ref={contentRef}
          className={`flex-1 transition-all duration-1000 delay-300 ${
            isContentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}
        >
          {activeTab === 'experience' && (
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">My experience</h3>
              <p className="text-gray-400 mb-8 sm:mb-12 text-sm sm:text-base">
                Academic projects and hands-on experience with various technologies and programming languages.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  {
                    period: '2023 - Present',
                    title: 'Student Developer',
                    company: 'FAST - NUCES',
                    description: 'Developing various projects using C++, Python, and web technologies. Focus on game development and AI.'
                  },
                  {
                    period: '2022 - 2023',
                    title: 'Programming Enthusiast',
                    company: 'Self-taught',
                    description: 'Started programming journey with C++ and exploring various programming concepts and technologies.'
                  }
                ].map((exp, index) => (
                  <div key={index} className="border-l-4 border-emerald-400 pl-6 group">
                    <div className="text-emerald-400 text-sm mb-2 group-hover:text-emerald-300 transition-colors">
                      {exp.period}
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {exp.title}
                    </h4>
                    <p className="text-gray-400 mb-4 font-medium text-sm sm:text-base">{exp.company}</p>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm sm:text-base">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">My education</h3>
              <p className="text-gray-400 mb-8 sm:mb-12 text-sm sm:text-base">
                Strong academic foundation in computer science and related fields.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  <div key={index} className="border-l-4 border-emerald-400 pl-6 group">
                    <div className="text-emerald-400 text-sm mb-2 group-hover:text-emerald-300 transition-colors">
                      {edu.period}
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {edu.title}
                    </h4>
                    <p className="text-gray-400 mb-4 font-medium text-sm sm:text-base">{edu.school}</p>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm sm:text-base">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">My skills</h3>
              <p className="text-gray-400 mb-8 sm:mb-12 text-sm sm:text-base">
                Proficient in multiple programming languages and development technologies.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl text-center hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border border-white/10 group"
                  >
                    <div className="text-2xl sm:text-4xl mb-3 sm:mb-4 group-hover:animate-bounce">{skill.icon}</div>
                    <h4 className="text-white font-medium group-hover:text-emerald-400 transition-colors text-sm sm:text-base">
                      {skill.name}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">About me</h3>
              <p className="text-gray-400 mb-8 sm:mb-12 text-sm sm:text-base">
                Passionate Computer Science student with a keen interest in technology and innovation.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-4 sm:space-y-6">
                  {[
                    { label: 'Name', value: 'Gotam Dulhani' },
                    { label: 'Nationality', value: 'Pakistani' },
                    { label: 'Location', value: 'Karachi, Sindh, Pakistan' },
                    { label: 'Freelance', value: 'Available' },
                    { label: 'Education', value: 'BSCS - FAST NUCES KARACHI' }
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:justify-between group">
                      <span className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm sm:text-base mb-1 sm:mb-0">{item.label}</span>
                      <span className="text-white group-hover:text-emerald-400 transition-colors text-sm sm:text-base">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 sm:space-y-6">
                  {[
                    { label: 'Phone', value: '03233036735' },
                    { label: 'Email', value: 'ghotamdulhani123@gmail.com' },
                    { label: 'Languages', value: 'English, Urdu, Sindhi' },
                    { label: 'Skills', value: 'Web, AI, Game Dev, C++, JS' }
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:justify-between group">
                      <span className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm sm:text-base mb-1 sm:mb-0">{item.label}</span>
                      <span className="text-white group-hover:text-emerald-400 transition-colors text-sm sm:text-base">{item.value}</span>
                    </div>
                  ))}
                  <div className="flex flex-col sm:flex-row sm:justify-between group">
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm sm:text-base mb-1 sm:mb-0">GitHub</span>
                    <a
                      href="https://github.com/Gotam-Dulhani"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 hover:underline transition-all transform hover:scale-105 text-sm sm:text-base break-all sm:break-normal"
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
};

const WorkSection = () => {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const [titleRef, isTitleVisible] = useScrollAnimation(0.2);

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

  return (
    <div id="work" className="min-h-screen px-6 sm:px-8 lg:px-16 py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Section Title */}
      <div 
        ref={titleRef}
        className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${
          isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
          My Work
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-4">
          A collection of projects showcasing my skills in web development, game development, AI, and more
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mt-8 rounded-full" />
      </div>

      {/* Projects Grid */}
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-12 sm:gap-16 lg:gap-20">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 group transition-all duration-1000 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              } ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              <div className="flex-1 text-center lg:text-left">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-6 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-gradient-to-r from-emerald-600/80 to-teal-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs sm:text-sm border border-white/20 hover:scale-105 transition-transform duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 justify-center lg:justify-start">
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
              <div className="flex-1 w-full">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-3 sm:p-4 rounded-2xl border border-white/10 group-hover:border-emerald-400/30 transition-all duration-500 transform group-hover:scale-105">
                  <div className="relative overflow-hidden rounded-xl">
                    {/* Placeholder for missing images */}
                    <div className="w-full h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-xl"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg font-medium hidden">
                        {project.title}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

// Enhanced Contact Section with EmailJS integration
const ContactSection = ({ setActiveSection }) => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const [formRef, isFormVisible] = useScrollAnimation(0.3);
  const [contactRef, isContactVisible] = useScrollAnimation(0.3);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Initialize EmailJS with your public key
      if (typeof window !== 'undefined' && window.emailjs) {
        window.emailjs.init('L7z1jG6fb3MqQp55d');
        
        // Send email using EmailJS
        const result = await window.emailjs.send(
          'service_yp94s7j',
          'template_jdey9q8',
          {
            from_name: `${formData.firstName} ${formData.lastName}`,
            from_email: formData.phone, // Using phone as contact since no email field
            phone: formData.phone,
            service: formData.service,
            message: formData.message,
            to_name: 'Gotam Dulhani',
          }
        );

        console.log('Email sent successfully:', result);
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error('EmailJS not loaded');
      }
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    <div id="contact" ref={ref} className="min-h-screen px-6 sm:px-8 lg:px-16 py-20 bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Section Title */}
      <div className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
          Get In Touch
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-4">
          Ready to bring your ideas to life? Let's collaborate and create something amazing together
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mt-8 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div 
          ref={formRef}
          className={`order-2 lg:order-1 transition-all duration-1000 ${
            isFormVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}
        >
          <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6 sm:mb-8 text-center lg:text-left">
            Let's work together
          </h3>
          <p className="text-gray-400 mb-8 sm:mb-12 text-center lg:text-left text-sm sm:text-base">
            I'm always interested in new opportunities and collaborations. Feel free to reach out!
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-gray-800/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-gray-800/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                required
              />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-gray-800/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              required
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400 focus:bg-gray-800/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              required
            >
              <option value="">Select a service</option>
              <option value="web-development">Web Development</option>
              <option value="Generative AI">Generative AI</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="game-development">Game Development</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Microsoft Office Skills">Microsoft Office Skills</option>
            </select>
            <textarea
              name="message"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={handleInputChange}
              disabled={isSubmitting}
              rows={5}
              className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-gray-800/70 transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              required
            />

            {/* Submit Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-emerald-400/10 border border-emerald-400/20 rounded-xl text-emerald-400 text-center text-sm sm:text-base">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-400/10 border border-red-400/20 rounded-xl text-red-400 text-center text-sm sm:text-base">
                Failed to send message. Please try again or contact me directly.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-400/25 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 relative overflow-hidden text-sm sm:text-base"
            >
              <span className="relative z-10">
                {isSubmitting ? 'Sending...' : 'Send message'}
              </span>
              {isSubmitting && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </form>
        </div>
        
        <div 
          ref={contactRef}
          className={`flex flex-col justify-center space-y-6 sm:space-y-8 order-1 lg:order-2 transition-all duration-1000 delay-300 ${
            isContactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}
        >
          {[
            { icon: Phone, title: 'Phone', value: '03233036735' },
            { icon: Mail, title: 'Email', value: 'ghotamdulhani123@gmail.com' },
            { icon: MapPin, title: 'Address', value: 'Karachi, Pakistan' }
          ].map(({ icon: Icon, title, value }, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-4 group justify-center lg:justify-start transition-all duration-700 ${
                isContactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: isContactVisible ? `${(index + 3) * 200}ms` : '0ms'
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 flex-shrink-0">
                <Icon size={20} className="text-black" />
              </div>
              <div className="text-center lg:text-left">
                <h4 className="text-white font-medium group-hover:text-emerald-400 transition-colors duration-300 text-sm sm:text-base">
                  {title}
                </h4>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm sm:text-base break-all sm:break-normal">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeTab, setActiveTab] = useState('experience');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Load EmailJS script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize EmailJS after script loads
      if (window.emailjs) {
        window.emailjs.init('L7z1jG6fb3MqQp55d');
      }
    };
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen relative overflow-x-hidden">
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
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @media (max-width: 1024px) {
          .animate-fade-in-left,
          .animate-fade-in-right {
            animation: fade-in-up 0.8s ease-out forwards;
          }
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
      
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
      
      <div className="fixed top-4 sm:top-6 left-4 sm:left-6 z-40">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Computer Science Student
        </h1>
      </div>
      
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main>
        <HomeSection isLoaded={isLoaded} mousePosition={mousePosition} counts={counts} />
        <ServicesSection setActiveSection={setActiveSection} />
        <ResumeSection activeTab={activeTab} setActiveTab={setActiveTab} />
        <WorkSection />
        <ContactSection setActiveSection={setActiveSection} />
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-md border-t border-white/10 py-6 px-6 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm text-center sm:text-left">
            © 2025 Gotam Dulhani. Crafted with precision and passion.
          </div>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/gotam-dulhani-47b35b289"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110 border border-white/10"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/Gotam-Dulhani"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110 border border-white/10"
            >
              <Github size={18} />
            </a>
            <a
              href="mailto:ghotamdulhani123@gmail.com"
              className="w-10 h-10 rounded-lg bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110 border border-white/10"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
