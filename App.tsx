import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Youtube,
  Menu,
  X,
  Wrench,
  ShieldCheck,
  Zap,
  Users,
  BadgeCheck,
  ArrowRight,
  Send
} from 'lucide-react';

import { BUSINESS_INFO, SERVICES, FEATURES, SHOWCASE } from './constants';

// --- Global Navigation Helper ---

const scrollToId = (id: string, offset: number = 80) => {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

// --- Custom Hooks ---

const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
};

// --- Sub-Components ---

const LoadingScreen: React.FC = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
    className="fixed inset-0 z-[2000] bg-black flex flex-col items-center justify-center"
  >
    <motion.div
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0]
      }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-[#E60000] mb-8"
    >
      <Wrench size={64} strokeWidth={2.5} />
    </motion.div>
    <h2 className="text-2xl font-orbitron font-bold tracking-widest text-white uppercase">Mr Biker Garage</h2>
    <div className="mt-4 w-48 h-1 bg-neutral-800 rounded-full overflow-hidden">
      <motion.div 
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="w-full h-full bg-[#E60000]"
      />
    </div>
  </motion.div>
);

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Contact', id: 'contact' },
  ];

  const activeSection = useActiveSection(navLinks.map(l => l.id));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToId(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${isScrolled ? 'bg-black py-4 border-b border-white/10 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO AREA */}
        <a 
          href="#home" 
          onClick={(e) => handleNavLinkClick(e, 'home')} 
          className="flex items-center gap-3 group cursor-pointer no-underline flex-shrink-0"
        >
          <Wrench 
            className="text-[#E60000] group-hover:rotate-45 transition-transform duration-300 flex-shrink-0" 
            size={28} 
          />
          <span 
            className="font-orbitron text-xl font-bold tracking-tighter text-white whitespace-nowrap leading-none"
          >
            MR BIKER <span className="text-[#E60000]">GARAGE</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={`#${link.id}`} 
              onClick={(e) => handleNavLinkClick(e, link.id)}
              className={`font-orbitron text-xs font-medium transition-all tracking-widest uppercase relative pb-1 ${
                activeSection === link.id ? 'text-[#E60000]' : 'text-neutral-300 hover:text-[#E60000]'
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div 
                  layoutId="activeNav" 
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E60000]" 
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
          <a 
            href={`tel:${BUSINESS_INFO.phone}`}
            className="bg-[#E60000] text-white px-6 py-2.5 rounded-full font-orbitron text-xs font-bold tracking-widest hover:bg-[#CC0000] transition-all transform hover:scale-105 active:scale-95 red-glow"
          >
            BOOK NOW
          </a>
        </div>

        {/* Mobile Burger Button */}
        <button 
          className="md:hidden text-white p-2 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[1001] bg-black flex flex-col items-center justify-center gap-10 md:hidden overflow-hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.id} 
                href={`#${link.id}`} 
                onClick={(e) => handleNavLinkClick(e, link.id)}
                className={`font-orbitron text-3xl font-bold uppercase transition-colors ${
                  activeSection === link.id ? 'text-[#E60000]' : 'text-white hover:text-[#E60000]'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="bg-[#E60000] text-white px-10 py-5 rounded-full font-orbitron text-lg font-bold tracking-widest red-glow"
            >
              CALL NOW
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/d/1nbfJ0RRwjg7m5RVTLryKxb1bvteIt2aB" 
          alt="Royal Classic Biker Garage" 
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h1 className="text-5xl md:text-8xl font-orbitron font-black text-white leading-tight mb-8">
              PERFORMANCE.<br />
              <span className="text-[#E60000] red-text-glow">PRECISION.</span><br />
              PASSION.
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl mb-10 max-w-xl font-light tracking-wide leading-relaxed">
              Mr Biker Garage Dindigul is where your machines find their peak soul. From precision servicing to aggressive modifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToId('services')}
                className="bg-[#E60000] text-white px-10 py-5 rounded-md font-orbitron font-bold tracking-widest flex items-center justify-center gap-2 red-glow hover:bg-white hover:text-black transition-all group"
              >
                BOOK SERVICE <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </motion.button>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/20 hover:border-[#E60000] text-white px-10 py-5 rounded-md font-orbitron font-bold tracking-widest flex items-center justify-center gap-2 glass transition-all"
              >
                WHATSAPP NOW <MessageCircle size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#E60000] to-transparent"></div>
        <span className="font-orbitron text-[10px] tracking-[0.3em] text-neutral-500 uppercase text-center">Scroll Down</span>
      </motion.div>
    </section>
  );
};

const MarqueeSection: React.FC = () => {
  const items = [
    "Bike Service", "Engine Repair", "Performance Upgrade", "Custom Exhaust", 
    "Paint & Wrap", "Bike Modification", "Detailing", "Oil Service", "Brake Service"
  ];

  return (
    <div className="bg-[#E60000] py-6 mt-6 overflow-hidden relative border-y border-[#FF4D4D]/20">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-8">
                <span className="text-black font-orbitron font-black text-2xl tracking-tighter uppercase italic">{item}</span>
                <Wrench className="text-white/40" size={24} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#E60000]/10 rounded-full blur-[80px]"></div>
          <img 
            src="https://wallpaper-house.com/data/out/12/wallpaper2you_543334.jpg" 
            alt="Mechanic working" 
            className="rounded-2xl relative z-10 shadow-2xl border border-white/5"
          />
          <div className="absolute bottom-[-20px] right-[-20px] bg-[#E60000] p-8 rounded-xl z-20 red-glow hidden md:block">
            <h4 className="font-orbitron text-4xl font-black text-white mb-1">2+</h4>
            <p className="font-orbitron text-[10px] tracking-widest text-white/80 uppercase font-bold">Years of Racing Excellence</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[#E60000] font-orbitron text-sm font-bold tracking-[0.4em] mb-4 uppercase">Born For the Road</h2>
          <h3 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-8 leading-tight uppercase">
            Fueling Your <br />
            <span className="text-neutral-600">Riding Passion</span>
          </h3>
          <p className="text-neutral-400 text-lg mb-8 font-light leading-relaxed">
            Founded in Dindigul, Mr Biker Garage has become the go-to sanctuary for riders who demand more from their machines. We don't just fix bikes; we elevate them. Whether it's a routine service or a complete radical modification, our technicians treat every bolt with professional respect.
          </p>
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="flex flex-col gap-2">
              <Users className="text-[#E60000] mb-2" size={32} />
              <h5 className="font-orbitron text-white text-sm font-bold tracking-wider uppercase">Skilled Squad</h5>
              <p className="text-neutral-500 text-xs uppercase tracking-widest">Master Technicians</p>
            </div>
            <div className="flex flex-col gap-2">
              <Zap className="text-[#E60000] mb-2" size={32} />
              <h5 className="font-orbitron text-white text-sm font-bold tracking-wider uppercase">Race Ready</h5>
              <p className="text-neutral-500 text-xs uppercase tracking-widest">Quick Turnaround</p>
            </div>
          </div>
          <button 
            onClick={() => scrollToId('services')}
            className="inline-flex items-center gap-3 text-white font-orbitron text-xs font-bold tracking-[0.3em] uppercase hover:text-[#E60000] transition-colors group"
          >
            Explore Services <ChevronRight size={16} className="group-hover:translate-x-2 transition-all" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-neutral-950 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-[#E60000] font-orbitron text-sm font-bold tracking-[0.4em] mb-4 uppercase">What We Do</h2>
          <h3 className="text-4xl md:text-5xl font-orbitron font-black text-white uppercase tracking-tighter">Elite Garage <span className="text-neutral-600 italic">Solutions</span></h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-neutral-900/50 border border-white/5 p-8 rounded-2xl hover:bg-[#E60000]/5 hover:border-[#E60000]/20 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <Wrench size={60} className="text-[#E60000]" />
              </div>
              <div className="mb-6 relative h-48 overflow-hidden rounded-xl">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-xl font-orbitron font-bold text-white mb-4 group-hover:text-[#E60000] transition-colors uppercase">{service.title}</h4>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">{service.description}</p>
              <div className="w-10 h-[2px] bg-neutral-700 group-hover:w-20 group-hover:bg-[#E60000] transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Simplified sub-component for 3D flip cards in Gallery (Image-only)
const ShowcaseCard: React.FC<{ item: typeof SHOWCASE[0], index: number }> = ({ item, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="perspective-1000 h-[500px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="w-full h-full relative preserve-3d"
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-white/5">
          <img src={item.after} alt="Gallery front" className="w-full h-full object-cover" />
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-white/5 rotate-y-180">
          <img src={item.before} alt="Gallery back" className="w-full h-full object-cover" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const ShowcaseSection: React.FC = () => {
  return (
    <section id="gallery" className="py-24 bg-black overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <h2 className="text-[#E60000] font-orbitron text-sm font-bold tracking-[0.4em] mb-4 uppercase">Showcase</h2>
            <h3 className="text-4xl md:text-5xl font-orbitron font-black text-white uppercase">Our <span className="text-[#E60000]">Gallery</span></h3>
          </div>
          <p className="text-neutral-500 max-w-sm mb-2 uppercase text-[10px] tracking-[0.2em]">Witness the surgical precision of our modification workshop. Tap cards to view details.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {SHOWCASE.map((item, i) => (
            <ShowcaseCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 bg-neutral-950 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[#E60000] font-orbitron text-sm font-bold tracking-[0.4em] mb-4 uppercase">The Edge</h2>
            <h3 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-10 leading-tight uppercase">
              Why Real Riders <br />
              <span className="text-[#E60000]">Trust Us</span>
            </h3>
            <div className="grid gap-6">
              {FEATURES.map((f, i) => {
                const Icon = { Users, BadgeCheck, Zap, Clock, ShieldCheck }[f.icon] || ShieldCheck;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 p-6 rounded-xl glass border border-white/5 hover:border-[#E60000]/30 transition-all group"
                  >
                    <div className="text-[#E60000] group-hover:scale-110 transition-transform">
                      <Icon size={32} />
                    </div>
                    <div>
                      <h4 className="text-white font-orbitron font-bold text-lg mb-2 uppercase">{f.title}</h4>
                      <p className="text-neutral-500 text-sm">{f.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-[#E60000]/5 rounded-[2rem] blur-2xl"></div>
            <img 
              src="https://i.pinimg.com/1200x/fe/73/0f/fe730f4f019370554c6c913eccdd1fd1.jpg" 
              alt="Garage interior" 
              className="rounded-3xl relative z-10 border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection: React.FC = () => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=Mr+Biker+Garage+EVR+Road+Ashok+Nagar+Dindigul+Tamil+Nadu`;

  return (
    <section id="contact" className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto bg-neutral-900/40 rounded-[2.5rem] border border-white/5 overflow-hidden glass">
          <div className="grid md:grid-cols-2">
            <div className="p-12 md:p-20 bg-[#E60000]/5 relative flex flex-col justify-between">
              <div>
                <h3 className="text-4xl font-orbitron font-black text-white mb-6 uppercase">Get In <span className="text-[#E60000]">Touch</span></h3>
                <p className="text-neutral-400 mb-12">Whether you need a quick oil change or a full custom build, we're ready to roll.</p>
                
                <div className="space-y-8">
                  {/* Location Block with Google Maps Interaction */}
                  <div className="flex items-start gap-4">
                    <a 
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-[#E60000]/20 text-[#E60000] hover:bg-[#E60000] hover:text-white transition-all duration-300 cursor-pointer shadow-sm"
                    >
                      <MapPin size={24} />
                    </a>
                    <div className="flex flex-col">
                      <h5 className="font-orbitron text-white text-xs font-bold tracking-widest mb-1 uppercase">Location</h5>
                      <a 
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-start cursor-pointer"
                      >
                        <p className="text-neutral-400 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                          {BUSINESS_INFO.address}
                        </p>
                        <span className="inline-flex items-center gap-1.5 mt-2 font-orbitron text-[10px] font-bold text-[#E60000] uppercase tracking-widest transition-all group-hover:text-white group-hover:translate-x-1 underline-offset-4 hover:underline">
                          View on Google Maps <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#E60000]/20 text-[#E60000]">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h5 className="font-orbitron text-white text-xs font-bold tracking-widest mb-1 uppercase">Call Us</h5>
                      <p className="text-neutral-400 text-sm font-bold">{BUSINESS_INFO.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#E60000]/20 text-[#E60000]">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h5 className="font-orbitron text-white text-xs font-bold tracking-widest mb-1 uppercase">Hours</h5>
                      <p className="text-neutral-400 text-sm font-bold uppercase">{BUSINESS_INFO.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-12">
                <a href={`tel:${BUSINESS_INFO.phone}`} className="flex-1 bg-white text-black py-4 rounded-xl font-orbitron font-bold text-center hover:bg-[#E60000] hover:text-white transition-all uppercase">Call Now</a>
                <a href={`https://wa.me/${BUSINESS_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#25D366] text-white py-4 rounded-xl font-orbitron font-bold text-center hover:scale-105 transition-all uppercase">WhatsApp</a>
              </div>
            </div>

            <div className="p-12 md:p-20">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-orbitron text-[10px] text-neutral-500 tracking-widest uppercase">Full Name</label>
                    <input type="text" className="w-full bg-neutral-800/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-[#E60000] transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-orbitron text-[10px] text-neutral-500 tracking-widest uppercase">Phone Number</label>
                    <input type="tel" className="w-full bg-neutral-800/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-[#E60000] transition-colors" placeholder="+91..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-orbitron text-[10px] text-neutral-500 tracking-widest uppercase">Message</label>
                  <textarea rows={4} className="w-full bg-neutral-800/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-[#E60000] transition-colors" placeholder="Tell us about your bike..."></textarea>
                </div>
                <button type="submit" className="w-full bg-[#E60000] text-white py-5 rounded-xl font-orbitron font-black text-lg red-glow hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group uppercase">
                  Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const footerLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Contact', id: 'contact' }
  ];

  const socialLinks = [
    { Icon: Instagram, href: 'https://www.instagram.com/mr_biker_garage/' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/5 relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Wrench className="text-[#E60000]" size={28} />
              <span className="font-orbitron text-2xl font-bold tracking-tighter text-white uppercase">
                MR BIKER <span className="text-[#E60000]">GARAGE</span>
              </span>
            </div>
            <p className="text-neutral-500 max-w-sm mb-8 leading-relaxed italic">"Transforming ordinary rides into extraordinary machines since 2024. Experience the roar of precision."</p>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href }, i) => (
                <a 
                  key={i} 
                  href={href} 
                  target={href !== '#' ? "_blank" : undefined}
                  rel={href !== '#' ? "noopener noreferrer" : undefined}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-500 hover:text-[#E60000] hover:border-[#E60000] transition-all"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-orbitron text-white font-bold mb-6 tracking-widest uppercase">Quick Links</h5>
            <ul className="space-y-4 font-orbitron text-[11px] tracking-widest uppercase">
              {footerLinks.map(link => (
                <li key={link.id}>
                  <a 
                    href={`#${link.id}`} 
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className="text-neutral-500 hover:text-[#E60000] transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-orbitron text-white font-bold mb-6 tracking-widest uppercase">Our Service</h5>
            <ul className="space-y-4 font-orbitron text-[11px] tracking-widest uppercase">
              {['Modifications', 'Engine Tuning', 'Detailing', 'General Service'].map(item => (
                <li key={item} className="text-neutral-500">{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 text-xs font-orbitron tracking-widest uppercase">&copy; {new Date().getFullYear()} MR BIKER GARAGE DINDIGUL. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 text-[10px] font-orbitron tracking-widest text-neutral-600 uppercase">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppFloatingButton: React.FC = () => (
  <motion.a
    href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-6 right-6 z-[200] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center red-glow"
  >
    <MessageCircle size={32} />
  </motion.a>
);

// --- Main App ---

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white selection:bg-[#E60000] selection:text-white relative min-h-screen">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!loading && (
        <div className="flex flex-col relative w-full overflow-x-hidden">
          <Navbar />
          <main className="flex flex-col w-full relative">
            <Hero />
            <MarqueeSection />
            <AboutSection />
            <ServicesSection />
            <ShowcaseSection />
            <WhyChooseUs />
            <ContactSection />
            <Footer />
          </main>
          <WhatsAppFloatingButton />
        </div>
      )}
    </div>
  );
};

export default App;