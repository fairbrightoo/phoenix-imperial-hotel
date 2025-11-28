import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MapPin, Clock, Send, Check, Building2, Globe, MessageCircle } from 'lucide-react';
import { BRANCHES } from './mockData';
interface ContactPageProps {
  isOpen: boolean;
  onClose: () => void;
  mpid?: string;
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
  return <AnimatePresence data-magicpath-id="0" data-magicpath-path="ContactPage.tsx">
      <SortableContainer dndKitId="5d28dc8d-3a7a-4c0a-aaf6-64895adfcc5b" containerType="regular" prevTag="motion.div" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose} data-magicpath-id="1" data-magicpath-path="ContactPage.tsx">
        <SortableContainer dndKitId="5881126d-9952-44af-97e9-805b4e860a6e" containerType="regular" prevTag="motion.div" initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} exit={{
        scale: 0.9,
        opacity: 0
      }} onClick={e => e.stopPropagation()} className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto relative" data-magicpath-id="2" data-magicpath-path="ContactPage.tsx">
          <SortableContainer dndKitId="8a4b03e7-df91-44df-9fb2-b79dda05ca5b" containerType="regular" prevTag="button" onClick={onClose} className="absolute top-4 right-4 z-10 bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full transition-colors sticky" data-magicpath-id="3" data-magicpath-path="ContactPage.tsx">
            <X size={20} data-magicpath-id="4" data-magicpath-path="ContactPage.tsx" />
          </SortableContainer>

          {/* Header */}
          <SortableContainer dndKitId="97367aeb-af09-4d33-98eb-9223d934f360" containerType="regular" prevTag="div" className="bg-gradient-to-r from-amber-600 to-amber-700 p-8 md:p-12 text-center" data-magicpath-id="5" data-magicpath-path="ContactPage.tsx">
            <motion.h1 data-magicpath-motion-tag="motion.h1" initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} className="text-4xl md:text-5xl font-serif text-white mb-4" data-magicpath-id="6" data-magicpath-path="ContactPage.tsx">
              Get in Touch
            </motion.h1>
            <motion.p data-magicpath-motion-tag="motion.p" initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.2
          }} className="text-amber-100 text-lg" data-magicpath-id="7" data-magicpath-path="ContactPage.tsx">
              We're here to help with any questions about your stay
            </motion.p>
          </SortableContainer>

          <SortableContainer dndKitId="84395de3-718c-42b7-ad48-e36add26be45" containerType="regular" prevTag="div" className="p-8 md:p-12" data-magicpath-id="8" data-magicpath-path="ContactPage.tsx">
            <SortableContainer dndKitId="0a53ec4e-56d4-48c3-99af-07ed23a85484" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-12" data-magicpath-id="9" data-magicpath-path="ContactPage.tsx">
              {/* Contact Form */}
              <SortableContainer dndKitId="4a2148bf-e4e0-42dd-ac3a-77c6860e6846" containerType="regular" prevTag="div" data-magicpath-id="10" data-magicpath-path="ContactPage.tsx">
                <h2 className="text-2xl font-serif text-white mb-6" data-magicpath-id="11" data-magicpath-path="ContactPage.tsx">Send Us a Message</h2>
                
                {submitted ? <SortableContainer dndKitId="3ec8c117-6ff1-410b-941b-4be99150fc61" containerType="regular" prevTag="motion.div" initial={{
                scale: 0.9,
                opacity: 0
              }} animate={{
                scale: 1,
                opacity: 1
              }} className="bg-green-500/10 border border-green-500/30 p-8 rounded-lg text-center" data-magicpath-id="12" data-magicpath-path="ContactPage.tsx">
                    <SortableContainer dndKitId="db8f28b1-474a-4231-baea-d62008340f5f" containerType="regular" prevTag="div" className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4" data-magicpath-id="13" data-magicpath-path="ContactPage.tsx">
                      <Check className="text-green-500" size={32} data-magicpath-id="14" data-magicpath-path="ContactPage.tsx" />
                    </SortableContainer>
                    <h3 className="text-xl font-serif text-white mb-2" data-magicpath-id="15" data-magicpath-path="ContactPage.tsx">Message Sent!</h3>
                    <p className="text-zinc-400" data-magicpath-id="16" data-magicpath-path="ContactPage.tsx">We'll get back to you within 24 hours.</p>
                  </SortableContainer> : <SortableContainer dndKitId="d44ec7a3-e32d-4c29-8c98-a233b3d2986a" containerType="regular" prevTag="form" onSubmit={handleSubmit} className="space-y-6" data-magicpath-id="17" data-magicpath-path="ContactPage.tsx">
                    <SortableContainer dndKitId="cce4526b-5fbf-4187-9996-0d6f2b2bc2d8" containerType="regular" prevTag="div" data-magicpath-id="18" data-magicpath-path="ContactPage.tsx">
                      <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block" data-magicpath-id="19" data-magicpath-path="ContactPage.tsx">
                        Your Name *
                      </label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 transition-colors" placeholder="John Doe" data-magicpath-id="20" data-magicpath-path="ContactPage.tsx" />
                    </SortableContainer>

                    <SortableContainer dndKitId="08ef1db3-aaf6-415a-aa00-12fe9c2fb1ea" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-4" data-magicpath-id="21" data-magicpath-path="ContactPage.tsx">
                      <SortableContainer dndKitId="84a76428-d5d8-428a-8fe3-79682e983519" containerType="regular" prevTag="div" data-magicpath-id="22" data-magicpath-path="ContactPage.tsx">
                        <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block" data-magicpath-id="23" data-magicpath-path="ContactPage.tsx">
                          Email *
                        </label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 transition-colors" placeholder="john@example.com" data-magicpath-id="24" data-magicpath-path="ContactPage.tsx" />
                      </SortableContainer>
                      <SortableContainer dndKitId="02271861-a3a1-4852-9a2b-19c20df96beb" containerType="regular" prevTag="div" data-magicpath-id="25" data-magicpath-path="ContactPage.tsx">
                        <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block" data-magicpath-id="26" data-magicpath-path="ContactPage.tsx">
                          Phone
                        </label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 transition-colors" placeholder="+234 800 000 0000" data-magicpath-id="27" data-magicpath-path="ContactPage.tsx" />
                      </SortableContainer>
                    </SortableContainer>

                    <SortableContainer dndKitId="2ad86842-e08d-4b1f-a835-e27ed6ce7da7" containerType="regular" prevTag="div" data-magicpath-id="28" data-magicpath-path="ContactPage.tsx">
                      <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block" data-magicpath-id="29" data-magicpath-path="ContactPage.tsx">
                        Select Branch
                      </label>
                      <select name="branch" value={formData.branch} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 transition-colors" data-magicpath-id="30" data-magicpath-path="ContactPage.tsx">
                        <option value="" data-magicpath-id="31" data-magicpath-path="ContactPage.tsx">General Inquiry</option>
                        {BRANCHES.map(branch => <option key={branch.id} value={branch.id} data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:unknown" data-magicpath-id="32" data-magicpath-path="ContactPage.tsx">
                            {branch.name}
                          </option>)}
                      </select>
                    </SortableContainer>

                    <SortableContainer dndKitId="bec2cc74-df7b-4b92-af39-bd8faacc343f" containerType="regular" prevTag="div" data-magicpath-id="33" data-magicpath-path="ContactPage.tsx">
                      <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block" data-magicpath-id="34" data-magicpath-path="ContactPage.tsx">
                        Subject *
                      </label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 transition-colors" placeholder="Reservation inquiry" data-magicpath-id="35" data-magicpath-path="ContactPage.tsx" />
                    </SortableContainer>

                    <SortableContainer dndKitId="240d560b-0d13-452e-aa94-87a24dd53f28" containerType="regular" prevTag="div" data-magicpath-id="36" data-magicpath-path="ContactPage.tsx">
                      <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block" data-magicpath-id="37" data-magicpath-path="ContactPage.tsx">
                        Message *
                      </label>
                      <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 transition-colors resize-none" placeholder="Tell us how we can help you..." data-magicpath-id="38" data-magicpath-path="ContactPage.tsx" />
                    </SortableContainer>

                    <SortableContainer dndKitId="b90e79ef-03fe-43d5-845e-cea3797e7177" containerType="regular" prevTag="button" type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-4 rounded font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2" data-magicpath-id="39" data-magicpath-path="ContactPage.tsx">
                      <Send size={18} data-magicpath-id="40" data-magicpath-path="ContactPage.tsx" />
                      Send Message
                    </SortableContainer>
                  </SortableContainer>}
              </SortableContainer>

              {/* Contact Information */}
              <SortableContainer dndKitId="a26774ca-31fa-45ed-98a0-b7750895f1d1" containerType="regular" prevTag="div" className="space-y-8" data-magicpath-id="41" data-magicpath-path="ContactPage.tsx">
                <SortableContainer dndKitId="aaef7129-1b2c-4d1f-ad81-91c0548c342b" containerType="regular" prevTag="div" data-magicpath-id="42" data-magicpath-path="ContactPage.tsx">
                  <h2 className="text-2xl font-serif text-white mb-6" data-magicpath-id="43" data-magicpath-path="ContactPage.tsx">Contact Information</h2>
                  <SortableContainer dndKitId="acb0c40c-3c18-45a6-a70b-66b546f4c40c" containerType="collection" prevTag="div" className="space-y-6" data-magicpath-id="44" data-magicpath-path="ContactPage.tsx">
                    {/* Corporate Office */}
                    <SortableContainer dndKitId="59b0eac1-2183-4929-9b67-fcd0c2b82de7" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="45" data-magicpath-path="ContactPage.tsx">
                      <SortableContainer dndKitId="6d189ecd-0302-4e0f-8ffe-777a03e87011" containerType="regular" prevTag="div" className="flex items-center gap-3 mb-4" data-magicpath-id="46" data-magicpath-path="ContactPage.tsx">
                        <SortableContainer dndKitId="bb24904e-6a81-408f-9612-2b0c78ea0f18" containerType="regular" prevTag="div" className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="47" data-magicpath-path="ContactPage.tsx">
                          <Building2 className="text-amber-500" size={20} data-magicpath-id="48" data-magicpath-path="ContactPage.tsx" />
                        </SortableContainer>
                        <h3 className="text-lg font-serif text-white" data-magicpath-id="49" data-magicpath-path="ContactPage.tsx">Corporate Office</h3>
                      </SortableContainer>
                      <SortableContainer dndKitId="c4faed0e-898e-4466-bd4a-aa21726e585e" containerType="regular" prevTag="div" className="space-y-3 text-sm" data-magicpath-id="50" data-magicpath-path="ContactPage.tsx">
                        <p className="text-zinc-400 flex items-start gap-3" data-magicpath-id="51" data-magicpath-path="ContactPage.tsx">
                          <Phone size={16} className="shrink-0 mt-0.5" data-magicpath-id="52" data-magicpath-path="ContactPage.tsx" />
                          <span data-magicpath-id="53" data-magicpath-path="ContactPage.tsx">+234 809 000 0000</span>
                        </p>
                        <p className="text-zinc-400 flex items-start gap-3" data-magicpath-id="54" data-magicpath-path="ContactPage.tsx">
                          <Mail size={16} className="shrink-0 mt-0.5" data-magicpath-id="55" data-magicpath-path="ContactPage.tsx" />
                          <span data-magicpath-id="56" data-magicpath-path="ContactPage.tsx">info@phoeniximperial.com</span>
                        </p>
                        <p className="text-zinc-400 flex items-start gap-3" data-magicpath-id="57" data-magicpath-path="ContactPage.tsx">
                          <Globe size={16} className="shrink-0 mt-0.5" data-magicpath-id="58" data-magicpath-path="ContactPage.tsx" />
                          <span data-magicpath-id="59" data-magicpath-path="ContactPage.tsx">www.phoeniximperial.com</span>
                        </p>
                      </SortableContainer>
                    </SortableContainer>

                    {/* Branch Details */}
                    {BRANCHES.map((branch, idx) => <motion.div data-magicpath-motion-tag="motion.div" key={branch.id} initial={{
                    opacity: 0,
                    y: 20
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    delay: idx * 0.1
                  }} className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="60" data-magicpath-path="ContactPage.tsx">
                        <div className="flex items-center gap-3 mb-4" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="61" data-magicpath-path="ContactPage.tsx">
                          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="62" data-magicpath-path="ContactPage.tsx">
                            <MapPin className="text-amber-500" size={20} data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="63" data-magicpath-path="ContactPage.tsx" />
                          </div>
                          <h3 className="text-lg font-serif text-white" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="city:unknown" data-magicpath-id="64" data-magicpath-path="ContactPage.tsx">{branch.city} Branch</h3>
                        </div>
                        <div className="space-y-3 text-sm" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="65" data-magicpath-path="ContactPage.tsx">
                          <p className="text-zinc-400 flex items-start gap-3" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="66" data-magicpath-path="ContactPage.tsx">
                            <MapPin size={16} className="shrink-0 mt-0.5" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="67" data-magicpath-path="ContactPage.tsx" />
                            <span data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="address:unknown" data-magicpath-id="68" data-magicpath-path="ContactPage.tsx">{branch.address}</span>
                          </p>
                          <p className="text-zinc-400 flex items-start gap-3" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="69" data-magicpath-path="ContactPage.tsx">
                            <Phone size={16} className="shrink-0 mt-0.5" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="70" data-magicpath-path="ContactPage.tsx" />
                            <span data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="phone:unknown" data-magicpath-id="71" data-magicpath-path="ContactPage.tsx">{branch.phone}</span>
                          </p>
                          <p className="text-zinc-400 flex items-start gap-3" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="72" data-magicpath-path="ContactPage.tsx">
                            <Mail size={16} className="shrink-0 mt-0.5" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="73" data-magicpath-path="ContactPage.tsx" />
                            <span data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="email:unknown" data-magicpath-id="74" data-magicpath-path="ContactPage.tsx">{branch.email}</span>
                          </p>
                        </div>
                      </motion.div>)}
                  </SortableContainer>
                </SortableContainer>

                {/* Business Hours */}
                <SortableContainer dndKitId="803bf127-70e5-4472-9115-95ac1b9665b7" containerType="regular" prevTag="div" className="bg-zinc-950 p-6 rounded-lg border border-zinc-800" data-magicpath-id="75" data-magicpath-path="ContactPage.tsx">
                  <SortableContainer dndKitId="26a274b0-002d-4f3f-88e8-ccf035aa65b6" containerType="regular" prevTag="div" className="flex items-center gap-3 mb-4" data-magicpath-id="76" data-magicpath-path="ContactPage.tsx">
                    <SortableContainer dndKitId="cf836ee2-fb8e-4d42-9b17-63578127f513" containerType="regular" prevTag="div" className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="77" data-magicpath-path="ContactPage.tsx">
                      <Clock className="text-amber-500" size={20} data-magicpath-id="78" data-magicpath-path="ContactPage.tsx" />
                    </SortableContainer>
                    <h3 className="text-lg font-serif text-white" data-magicpath-id="79" data-magicpath-path="ContactPage.tsx">Business Hours</h3>
                  </SortableContainer>
                  <SortableContainer dndKitId="1aa946be-62f9-4ed4-917c-4cc56c52b401" containerType="regular" prevTag="div" className="space-y-2 text-sm" data-magicpath-id="80" data-magicpath-path="ContactPage.tsx">
                    <SortableContainer dndKitId="a6bfd5b8-ad42-4306-abc4-5d0d9be31672" containerType="regular" prevTag="div" className="flex justify-between" data-magicpath-id="81" data-magicpath-path="ContactPage.tsx">
                      <span className="text-zinc-400" data-magicpath-id="82" data-magicpath-path="ContactPage.tsx">Reception</span>
                      <span className="text-white font-medium" data-magicpath-id="83" data-magicpath-path="ContactPage.tsx">24/7</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="e68cd1fc-ca98-4911-9b66-6c2bbc07f659" containerType="regular" prevTag="div" className="flex justify-between" data-magicpath-id="84" data-magicpath-path="ContactPage.tsx">
                      <span className="text-zinc-400" data-magicpath-id="85" data-magicpath-path="ContactPage.tsx">Restaurant</span>
                      <span className="text-white font-medium" data-magicpath-id="86" data-magicpath-path="ContactPage.tsx">6:00 AM - 11:00 PM</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="7009b926-3e74-4a8e-97ee-81fce98f7a20" containerType="regular" prevTag="div" className="flex justify-between" data-magicpath-id="87" data-magicpath-path="ContactPage.tsx">
                      <span className="text-zinc-400" data-magicpath-id="88" data-magicpath-path="ContactPage.tsx">Spa</span>
                      <span className="text-white font-medium" data-magicpath-id="89" data-magicpath-path="ContactPage.tsx">9:00 AM - 9:00 PM</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="e79c7296-78c9-4551-8415-aa7e2ea59017" containerType="regular" prevTag="div" className="flex justify-between" data-magicpath-id="90" data-magicpath-path="ContactPage.tsx">
                      <span className="text-zinc-400" data-magicpath-id="91" data-magicpath-path="ContactPage.tsx">Pool</span>
                      <span className="text-white font-medium" data-magicpath-id="92" data-magicpath-path="ContactPage.tsx">6:00 AM - 10:00 PM</span>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>

                {/* Quick Response */}
                <SortableContainer dndKitId="1b61c486-5486-4034-bc83-90a316af3222" containerType="regular" prevTag="div" className="bg-amber-600/10 border border-amber-600/30 p-6 rounded-lg" data-magicpath-id="93" data-magicpath-path="ContactPage.tsx">
                  <SortableContainer dndKitId="26e0d336-13d7-4559-b83a-fc92fb06fbe3" containerType="regular" prevTag="div" className="flex items-start gap-3" data-magicpath-id="94" data-magicpath-path="ContactPage.tsx">
                    <MessageCircle className="text-amber-500 shrink-0" size={24} data-magicpath-id="95" data-magicpath-path="ContactPage.tsx" />
                    <SortableContainer dndKitId="14b552cf-06a0-464f-bace-4412b6859460" containerType="regular" prevTag="div" data-magicpath-id="96" data-magicpath-path="ContactPage.tsx">
                      <h3 className="text-white font-serif text-lg mb-2" data-magicpath-id="97" data-magicpath-path="ContactPage.tsx">Need Immediate Assistance?</h3>
                      <p className="text-amber-200/80 text-sm mb-3" data-magicpath-id="98" data-magicpath-path="ContactPage.tsx">
                        Our customer service team is available 24/7 to help you with any urgent matters.
                      </p>
                      <a href="tel:+2348090000000" className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded text-sm font-medium transition-colors" data-magicpath-id="99" data-magicpath-path="ContactPage.tsx">
                        Call Now
                      </a>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>
    </AnimatePresence>;
};