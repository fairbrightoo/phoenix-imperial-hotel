import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Users, Building2, Globe, Heart, Shield, Star, MapPin, Clock } from 'lucide-react';
interface AboutPageProps {
  isOpen: boolean;
  onClose: () => void;
}
export const AboutPage: React.FC<AboutPageProps> = ({
  isOpen,
  onClose
}) => {
  const values = [{
    icon: Heart,
    title: 'Hospitality First',
    description: 'We treat every guest like family, ensuring comfort and care in every interaction.'
  }, {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'Your security and privacy are our top priorities throughout your stay.'
  }, {
    icon: Star,
    title: 'Excellence',
    description: 'We strive for perfection in every detail, from service to amenities.'
  }, {
    icon: Globe,
    title: 'Global Standards',
    description: 'World-class service delivered with local Nigerian warmth and culture.'
  }] as any[];
  const stats = [{
    number: '2+',
    label: 'Branches Across Nigeria'
  }, {
    number: '500+',
    label: 'Luxury Rooms'
  }, {
    number: '50K+',
    label: 'Happy Guests'
  }, {
    number: '98%',
    label: 'Satisfaction Rate'
  }] as any[];
  const timeline = [{
    year: '2020',
    title: 'Phoenix Imperial Founded',
    description: 'Began our journey with a vision to redefine Nigerian hospitality.'
  }, {
    year: '2021',
    title: 'Abuja Branch Opens',
    description: 'Our flagship location in the heart of Nigeria\'s capital.'
  }, {
    year: '2022',
    title: 'Lagos Branch Opens',
    description: 'Expanded to Lagos, bringing luxury to Victoria Island.'
  }, {
    year: '2024',
    title: 'Multitenant Platform',
    description: 'Unified booking system connecting all branches seamlessly.'
  }] as any[];
  if (!isOpen) return null;
  return <AnimatePresence>
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} exit={{
        scale: 0.9,
        opacity: 0
      }} onClick={e => e.stopPropagation()} className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto relative">
          <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full transition-colors sticky">
            <X size={20} />
          </button>

          {/* Hero Section */}
          <div className="relative h-80 bg-zinc-950 overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop)'
          }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-zinc-900" />
            <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
              <motion.h1 initial={{
              y: 30,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.2
            }} className="text-5xl md:text-6xl font-serif text-amber-500 mb-4">
                About Phoenix Imperial
              </motion.h1>
              <motion.p initial={{
              y: 30,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.4
            }} className="text-zinc-300 text-lg max-w-2xl">
                Where Nigerian heritage meets world-class luxury across multiple branches
              </motion.p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-amber-600 py-12">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, idx) => <motion.div key={idx} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: idx * 0.1
              }} className="text-center">
                    <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</p>
                    <p className="text-amber-100 text-sm uppercase tracking-wider">{stat.label}</p>
                  </motion.div>)}
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className="p-8 md:p-16 bg-zinc-900">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 text-center">Our Story</h2>
              <div className="space-y-6 text-zinc-300 leading-relaxed">
                <p>
                  Phoenix Imperial was born from a vision to create a hotel experience that seamlessly combines 
                  international standards with authentic Nigerian hospitality. We started in 2020 with a dream 
                  to build a multitenant hotel network that allows guests to enjoy consistent luxury across different cities.
                </p>
                <p>
                  Today, with branches in Abuja and Lagos, we serve thousands of guests every year—from business 
                  travelers to families on vacation. Our innovative unified booking platform ensures that whether 
                  you're staying in our capital city location or our vibrant Lagos beachfront property, you'll 
                  experience the same exceptional service and attention to detail.
                </p>
                <p>
                  We pride ourselves on being more than just a place to stay. Phoenix Imperial is a home away from 
                  home, where every guest is treated like family, and every stay becomes a cherished memory.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="p-8 md:p-16 bg-zinc-950">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-12 text-center">Our Core Values</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, idx) => <motion.div key={idx} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: idx * 0.1
              }} className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-amber-500 transition-all group">
                    <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-600 transition-colors">
                      <value.icon className="text-amber-500 group-hover:text-white transition-colors" size={24} />
                    </div>
                    <h3 className="text-xl font-serif text-white mb-3 group-hover:text-amber-400 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{value.description}</p>
                  </motion.div>)}
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="p-8 md:p-16 bg-zinc-900">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-12 text-center">Our Journey</h2>
              <div className="space-y-8">
                {timeline.map((item, idx) => <motion.div key={idx} initial={{
                opacity: 0,
                x: -20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: idx * 0.15
              }} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold shrink-0">
                        {item.year.slice(-2)}
                      </div>
                      {idx < timeline.length - 1 && <div className="w-0.5 flex-1 bg-zinc-800 mt-2" />}
                    </div>
                    <div className="pb-8">
                      <p className="text-amber-400 font-bold mb-1">{item.year}</p>
                      <h3 className="text-xl font-serif text-white mb-2">{item.title}</h3>
                      <p className="text-zinc-400">{item.description}</p>
                    </div>
                  </motion.div>)}
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="p-8 md:p-16 bg-zinc-950">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Meet Our Leadership</h2>
              <p className="text-zinc-400 mb-12 max-w-2xl mx-auto">
                Experienced hospitality professionals dedicated to making your stay extraordinary
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {[{
                name: 'Adebayo Ogunlesi',
                role: 'Chief Executive Officer',
                branch: 'Corporate'
              }, {
                name: 'Fatima Abdullahi',
                role: 'General Manager',
                branch: 'Abuja Branch'
              }, {
                name: 'Chinedu Okafor',
                role: 'General Manager',
                branch: 'Lagos Branch'
              }].map((member, idx) => <motion.div key={idx} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: idx * 0.1
              }} className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                    <div className="w-24 h-24 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                      <Users className="text-amber-500" size={32} />
                    </div>
                    <h3 className="text-xl font-serif text-white mb-1">{member.name}</h3>
                    <p className="text-amber-400 text-sm mb-2">{member.role}</p>
                    <p className="text-zinc-500 text-xs flex items-center justify-center gap-1">
                      <MapPin size={12} />
                      {member.branch}
                    </p>
                  </motion.div>)}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="p-8 md:p-16 bg-gradient-to-r from-amber-600 to-amber-700 text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Experience Phoenix Imperial</h2>
            <p className="text-amber-100 mb-8 max-w-xl mx-auto">
              Book your stay today and discover why thousands of guests choose us
            </p>
            <button onClick={onClose} className="bg-white text-amber-700 px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-amber-50 transition-colors">
              Explore Our Rooms
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
};