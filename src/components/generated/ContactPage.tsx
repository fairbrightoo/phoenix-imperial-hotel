import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MapPin, Clock, Send, Check, Building2, Globe, MessageCircle } from 'lucide-react';
import { BRANCHES } from './mockData';
interface ContactPageProps {
  isOpen: boolean;
  onClose: () => void;
}
export const ContactPage: React.FC<ContactPageProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        branch: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
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

          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-8 md:p-12 text-center">
            <motion.h1 initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} className="text-4xl md:text-5xl font-serif text-white mb-4">
              Get in Touch
            </motion.h1>
            <motion.p initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.2
          }} className="text-amber-100 text-lg">
              We're here to help with any questions about your stay
            </motion.p>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-serif text-white mb-6">Send Us a Message</h2>
                
                {submitted ? <motion.div initial={{
                scale: 0.9,
                opacity: 0
              }} animate={{
                scale: 1,
                opacity: 1
              }} className="bg-green-500/10 border border-green-500/30 p-8 rounded-lg text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                      <Check className="text-green-500" size={32} />
                    </div>
                    <h3 className="text-xl font-serif text-white mb-2">Message Sent!</h3>
                    <p className="text-zinc-400">We'll get back to you within 24 hours.</p>
                  </motion.div> : <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block">
                        Your Name *
                      </label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 transition-colors" placeholder="John Doe" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block">
                          Email *
                        </label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 transition-colors" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block">
                          Phone
                        </label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 transition-colors" placeholder="+234 800 000 0000" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block">
                        Select Branch
                      </label>
                      <select name="branch" value={formData.branch} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 transition-colors">
                        <option value="">General Inquiry</option>
                        {BRANCHES.map(branch => <option key={branch.id} value={branch.id}>
                            {branch.name}
                          </option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block">
                        Subject *
                      </label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 transition-colors" placeholder="Reservation inquiry" />
                    </div>

                    <div>
                      <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block">
                        Message *
                      </label>
                      <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 transition-colors resize-none" placeholder="Tell us how we can help you..." />
                    </div>

                    <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-4 rounded font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
                      <Send size={18} />
                      Send Message
                    </button>
                  </form>}
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-serif text-white mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    {/* Corporate Office */}
                    <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <Building2 className="text-amber-500" size={20} />
                        </div>
                        <h3 className="text-lg font-serif text-white">Corporate Office</h3>
                      </div>
                      <div className="space-y-3 text-sm">
                        <p className="text-zinc-400 flex items-start gap-3">
                          <Phone size={16} className="shrink-0 mt-0.5" />
                          <span>+234 809 000 0000</span>
                        </p>
                        <p className="text-zinc-400 flex items-start gap-3">
                          <Mail size={16} className="shrink-0 mt-0.5" />
                          <span>info@phoeniximperial.com</span>
                        </p>
                        <p className="text-zinc-400 flex items-start gap-3">
                          <Globe size={16} className="shrink-0 mt-0.5" />
                          <span>www.phoeniximperial.com</span>
                        </p>
                      </div>
                    </div>

                    {/* Branch Details */}
                    {BRANCHES.map((branch, idx) => <motion.div key={branch.id} initial={{
                    opacity: 0,
                    y: 20
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    delay: idx * 0.1
                  }} className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                            <MapPin className="text-amber-500" size={20} />
                          </div>
                          <h3 className="text-lg font-serif text-white">{branch.city} Branch</h3>
                        </div>
                        <div className="space-y-3 text-sm">
                          <p className="text-zinc-400 flex items-start gap-3">
                            <MapPin size={16} className="shrink-0 mt-0.5" />
                            <span>{branch.address}</span>
                          </p>
                          <p className="text-zinc-400 flex items-start gap-3">
                            <Phone size={16} className="shrink-0 mt-0.5" />
                            <span>{branch.phone}</span>
                          </p>
                          <p className="text-zinc-400 flex items-start gap-3">
                            <Mail size={16} className="shrink-0 mt-0.5" />
                            <span>{branch.email}</span>
                          </p>
                        </div>
                      </motion.div>)}
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-zinc-950 p-6 rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Clock className="text-amber-500" size={20} />
                    </div>
                    <h3 className="text-lg font-serif text-white">Business Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Reception</span>
                      <span className="text-white font-medium">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Restaurant</span>
                      <span className="text-white font-medium">6:00 AM - 11:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Spa</span>
                      <span className="text-white font-medium">9:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Pool</span>
                      <span className="text-white font-medium">6:00 AM - 10:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Quick Response */}
                <div className="bg-amber-600/10 border border-amber-600/30 p-6 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="text-amber-500 shrink-0" size={24} />
                    <div>
                      <h3 className="text-white font-serif text-lg mb-2">Need Immediate Assistance?</h3>
                      <p className="text-amber-200/80 text-sm mb-3">
                        Our customer service team is available 24/7 to help you with any urgent matters.
                      </p>
                      <a href="tel:+2348090000000" className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded text-sm font-medium transition-colors">
                        Call Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
};