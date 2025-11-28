import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Users, Building2, Globe, Heart, Shield, Star, MapPin, Clock } from 'lucide-react';
interface AboutPageProps {
  isOpen: boolean;
  onClose: () => void;
  mpid?: string;
}
export const AboutPage: React.FC<AboutPageProps> = ({
  isOpen,
  onClose
}) => {
  const values = [{
    icon: Heart,
    title: 'Hospitality First',
    description: 'We treat every guest like family, ensuring comfort and care in every interaction.',
    mpid: "f90b2ab2-1818-43fd-b19f-7552944cfc09"
  }, {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'Your security and privacy are our top priorities throughout your stay.',
    mpid: "9033520b-df10-44c5-a934-3277097d6bf9"
  }, {
    icon: Star,
    title: 'Excellence',
    description: 'We strive for perfection in every detail, from service to amenities.',
    mpid: "a5bb0996-492f-4a0d-a806-87ae3706f2a9"
  }, {
    icon: Globe,
    title: 'Global Standards',
    description: 'World-class service delivered with local Nigerian warmth and culture.',
    mpid: "a0213be3-d158-420f-9492-1f70390e2aa2"
  }] as any[];
  const stats = [{
    number: '2+',
    label: 'Branches Across Nigeria',
    mpid: "511a416e-6cf3-4170-8a40-c1f7fe42eaa6"
  }, {
    number: '500+',
    label: 'Luxury Rooms',
    mpid: "198fe8c2-9503-4102-a5ef-75556b913c1c"
  }, {
    number: '50K+',
    label: 'Happy Guests',
    mpid: "c885734c-0b51-4bcb-8f0d-a2d602ac155b"
  }, {
    number: '98%',
    label: 'Satisfaction Rate',
    mpid: "9b08d233-b82a-41ef-980e-da8ecce1c174"
  }] as any[];
  const timeline = [{
    year: '2020',
    title: 'Phoenix Imperial Founded',
    description: 'Began our journey with a vision to redefine Nigerian hospitality.',
    mpid: "a80053b8-09dd-4bfb-a405-709735906194"
  }, {
    year: '2021',
    title: 'Abuja Branch Opens',
    description: 'Our flagship location in the heart of Nigeria\'s capital.',
    mpid: "189836bb-a4b5-4ffa-b7c6-55740dab2813"
  }, {
    year: '2022',
    title: 'Lagos Branch Opens',
    description: 'Expanded to Lagos, bringing luxury to Victoria Island.',
    mpid: "f57f91be-54db-432d-a32a-4b794dfe0804"
  }, {
    year: '2024',
    title: 'Multitenant Platform',
    description: 'Unified booking system connecting all branches seamlessly.',
    mpid: "8e6fade9-167c-451f-9cb1-6348833ae3d5"
  }] as any[];
  if (!isOpen) return null;
  return <AnimatePresence data-magicpath-id="0" data-magicpath-path="AboutPage.tsx">
      <SortableContainer dndKitId="9c9bf89d-5d42-4b47-9b2c-4b036c79ad34" containerType="regular" prevTag="motion.div" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose} data-magicpath-id="1" data-magicpath-path="AboutPage.tsx">
        <SortableContainer dndKitId="fb9e5ca1-688f-4273-bd36-ec62180e7560" containerType="regular" prevTag="motion.div" initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} exit={{
        scale: 0.9,
        opacity: 0
      }} onClick={e => e.stopPropagation()} className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto relative" data-magicpath-id="2" data-magicpath-path="AboutPage.tsx">
          <SortableContainer dndKitId="c5d2277a-966b-43e8-8dd0-2831f487dc98" containerType="regular" prevTag="button" onClick={onClose} className="absolute top-4 right-4 z-10 bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full transition-colors sticky" data-magicpath-id="3" data-magicpath-path="AboutPage.tsx">
            <X size={20} data-magicpath-id="4" data-magicpath-path="AboutPage.tsx" />
          </SortableContainer>

          {/* Hero Section */}
          <SortableContainer dndKitId="68c1ea12-0f97-4fd3-8cbc-05a20a176e98" containerType="regular" prevTag="div" className="relative h-80 bg-zinc-950 overflow-hidden" data-magicpath-id="5" data-magicpath-path="AboutPage.tsx">
            <div className="absolute inset-0 bg-cover bg-center" style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop)'
          }} data-magicpath-id="6" data-magicpath-path="AboutPage.tsx" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-zinc-900" data-magicpath-id="7" data-magicpath-path="AboutPage.tsx" />
            <SortableContainer dndKitId="b127d992-b896-4c5f-91f3-0f71bc2bfce4" containerType="regular" prevTag="div" className="relative h-full flex flex-col items-center justify-center text-center px-6" data-magicpath-id="8" data-magicpath-path="AboutPage.tsx">
              <motion.h1 data-magicpath-motion-tag="motion.h1" initial={{
              y: 30,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.2
            }} className="text-5xl md:text-6xl font-serif text-amber-500 mb-4" data-magicpath-id="9" data-magicpath-path="AboutPage.tsx">
                About Phoenix Imperial
              </motion.h1>
              <motion.p data-magicpath-motion-tag="motion.p" initial={{
              y: 30,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.4
            }} className="text-zinc-300 text-lg max-w-2xl" data-magicpath-id="10" data-magicpath-path="AboutPage.tsx">
                Where Nigerian heritage meets world-class luxury across multiple branches
              </motion.p>
            </SortableContainer>
          </SortableContainer>

          {/* Stats Section */}
          <SortableContainer dndKitId="78bbd3ee-6595-46a4-a680-3121f4d5bda2" containerType="regular" prevTag="div" className="bg-amber-600 py-12" data-magicpath-id="11" data-magicpath-path="AboutPage.tsx">
            <SortableContainer dndKitId="b4d8b3da-2897-4c0c-9c64-b318d43a772c" containerType="regular" prevTag="div" className="max-w-6xl mx-auto px-6" data-magicpath-id="12" data-magicpath-path="AboutPage.tsx">
              <SortableContainer dndKitId="8b169583-8d09-4495-a36b-c81276c3c6a6" containerType="collection" prevTag="div" className="grid grid-cols-2 md:grid-cols-4 gap-8" data-magicpath-id="13" data-magicpath-path="AboutPage.tsx">
                {stats.map((stat, idx) => <motion.div data-magicpath-motion-tag="motion.div" key={idx} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: idx * 0.1
              }} className="text-center" data-magicpath-uuid={(stat as any)["mpid"] ?? "unsafe"} data-magicpath-id="14" data-magicpath-path="AboutPage.tsx">
                    <p className="text-4xl md:text-5xl font-bold text-white mb-2" data-magicpath-uuid={(stat as any)["mpid"] ?? "unsafe"} data-magicpath-field="number:string" data-magicpath-id="15" data-magicpath-path="AboutPage.tsx">{stat.number}</p>
                    <p className="text-amber-100 text-sm uppercase tracking-wider" data-magicpath-uuid={(stat as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:string" data-magicpath-id="16" data-magicpath-path="AboutPage.tsx">{stat.label}</p>
                  </motion.div>)}
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>

          {/* Story Section */}
          <SortableContainer dndKitId="6784c5ce-16d2-43cd-93d9-6f25d6ec9828" containerType="regular" prevTag="div" className="p-8 md:p-16 bg-zinc-900" data-magicpath-id="17" data-magicpath-path="AboutPage.tsx">
            <SortableContainer dndKitId="6e6dc49d-5923-4e2b-bd98-035c7d7e3331" containerType="regular" prevTag="div" className="max-w-4xl mx-auto" data-magicpath-id="18" data-magicpath-path="AboutPage.tsx">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 text-center" data-magicpath-id="19" data-magicpath-path="AboutPage.tsx">Our Story</h2>
              <SortableContainer dndKitId="47281d20-0d6a-4a59-8394-1b3557f9c90a" containerType="regular" prevTag="div" className="space-y-6 text-zinc-300 leading-relaxed" data-magicpath-id="20" data-magicpath-path="AboutPage.tsx">
                <p data-magicpath-id="21" data-magicpath-path="AboutPage.tsx">
                  Phoenix Imperial was born from a vision to create a hotel experience that seamlessly combines 
                  international standards with authentic Nigerian hospitality. We started in 2020 with a dream 
                  to build a multitenant hotel network that allows guests to enjoy consistent luxury across different cities.
                </p>
                <p data-magicpath-id="22" data-magicpath-path="AboutPage.tsx">
                  Today, with branches in Abuja and Lagos, we serve thousands of guests every year—from business 
                  travelers to families on vacation. Our innovative unified booking platform ensures that whether 
                  you're staying in our capital city location or our vibrant Lagos beachfront property, you'll 
                  experience the same exceptional service and attention to detail.
                </p>
                <p data-magicpath-id="23" data-magicpath-path="AboutPage.tsx">
                  We pride ourselves on being more than just a place to stay. Phoenix Imperial is a home away from 
                  home, where every guest is treated like family, and every stay becomes a cherished memory.
                </p>
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>

          {/* Values Section */}
          <SortableContainer dndKitId="841dbbf9-a868-409c-9eb6-f2579cfea1aa" containerType="regular" prevTag="div" className="p-8 md:p-16 bg-zinc-950" data-magicpath-id="24" data-magicpath-path="AboutPage.tsx">
            <SortableContainer dndKitId="e5322b82-ab29-4ff6-88a6-468483b7abce" containerType="regular" prevTag="div" className="max-w-6xl mx-auto" data-magicpath-id="25" data-magicpath-path="AboutPage.tsx">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-12 text-center" data-magicpath-id="26" data-magicpath-path="AboutPage.tsx">Our Core Values</h2>
              <SortableContainer dndKitId="9df16e20-aeec-4490-ba76-1fe5ff2bc229" containerType="collection" prevTag="div" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" data-magicpath-id="27" data-magicpath-path="AboutPage.tsx">
                {values.map((value, idx) => <motion.div data-magicpath-motion-tag="motion.div" key={idx} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: idx * 0.1
              }} className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-amber-500 transition-all group" data-magicpath-uuid={(value as any)["mpid"] ?? "unsafe"} data-magicpath-id="28" data-magicpath-path="AboutPage.tsx">
                    <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-600 transition-colors" data-magicpath-uuid={(value as any)["mpid"] ?? "unsafe"} data-magicpath-id="29" data-magicpath-path="AboutPage.tsx">
                      <value.icon className="text-amber-500 group-hover:text-white transition-colors" size={24} data-magicpath-uuid={(value as any)["mpid"] ?? "unsafe"} data-magicpath-id="30" data-magicpath-path="AboutPage.tsx" />
                    </div>
                    <h3 className="text-xl font-serif text-white mb-3 group-hover:text-amber-400 transition-colors" data-magicpath-uuid={(value as any)["mpid"] ?? "unsafe"} data-magicpath-field="title:string" data-magicpath-id="31" data-magicpath-path="AboutPage.tsx">
                      {value.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed" data-magicpath-uuid={(value as any)["mpid"] ?? "unsafe"} data-magicpath-field="description:string" data-magicpath-id="32" data-magicpath-path="AboutPage.tsx">{value.description}</p>
                  </motion.div>)}
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>

          {/* Timeline Section */}
          <SortableContainer dndKitId="e16f0ee7-1919-4006-8819-640ea427784e" containerType="regular" prevTag="div" className="p-8 md:p-16 bg-zinc-900" data-magicpath-id="33" data-magicpath-path="AboutPage.tsx">
            <SortableContainer dndKitId="b615d7a0-512e-46df-94e2-191a229adbeb" containerType="regular" prevTag="div" className="max-w-4xl mx-auto" data-magicpath-id="34" data-magicpath-path="AboutPage.tsx">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-12 text-center" data-magicpath-id="35" data-magicpath-path="AboutPage.tsx">Our Journey</h2>
              <SortableContainer dndKitId="77916ecf-f81f-4d3e-9a88-47bf8970ce09" containerType="collection" prevTag="div" className="space-y-8" data-magicpath-id="36" data-magicpath-path="AboutPage.tsx">
                {timeline.map((item, idx) => <motion.div data-magicpath-motion-tag="motion.div" key={idx} initial={{
                opacity: 0,
                x: -20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: idx * 0.15
              }} className="flex gap-6" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="37" data-magicpath-path="AboutPage.tsx">
                    <div className="flex flex-col items-center" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="38" data-magicpath-path="AboutPage.tsx">
                      <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold shrink-0" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="39" data-magicpath-path="AboutPage.tsx">
                        {item.year.slice(-2)}
                      </div>
                      {idx < timeline.length - 1 && <div className="w-0.5 flex-1 bg-zinc-800 mt-2" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="40" data-magicpath-path="AboutPage.tsx" />}
                    </div>
                    <div className="pb-8" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="41" data-magicpath-path="AboutPage.tsx">
                      <p className="text-amber-400 font-bold mb-1" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="year:string" data-magicpath-id="42" data-magicpath-path="AboutPage.tsx">{item.year}</p>
                      <h3 className="text-xl font-serif text-white mb-2" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="title:string" data-magicpath-id="43" data-magicpath-path="AboutPage.tsx">{item.title}</h3>
                      <p className="text-zinc-400" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="description:string" data-magicpath-id="44" data-magicpath-path="AboutPage.tsx">{item.description}</p>
                    </div>
                  </motion.div>)}
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>

          {/* Team Section */}
          <SortableContainer dndKitId="efce570c-e36c-4482-a8a3-a2e7a27a18e7" containerType="regular" prevTag="div" className="p-8 md:p-16 bg-zinc-950" data-magicpath-id="45" data-magicpath-path="AboutPage.tsx">
            <SortableContainer dndKitId="2eb89be7-5552-4d6a-929f-5cbe4d26d579" containerType="regular" prevTag="div" className="max-w-6xl mx-auto text-center" data-magicpath-id="46" data-magicpath-path="AboutPage.tsx">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6" data-magicpath-id="47" data-magicpath-path="AboutPage.tsx">Meet Our Leadership</h2>
              <p className="text-zinc-400 mb-12 max-w-2xl mx-auto" data-magicpath-id="48" data-magicpath-path="AboutPage.tsx">
                Experienced hospitality professionals dedicated to making your stay extraordinary
              </p>
              <SortableContainer dndKitId="1333da62-9c65-48ff-89e7-50ceed3459c3" containerType="collection" prevTag="div" className="grid md:grid-cols-3 gap-8" data-magicpath-id="49" data-magicpath-path="AboutPage.tsx">
                {[{
                name: 'Adebayo Ogunlesi',
                role: 'Chief Executive Officer',
                branch: 'Corporate',
                mpid: "67df4145-23ae-4e4e-a99d-b3bb17898983"
              }, {
                name: 'Fatima Abdullahi',
                role: 'General Manager',
                branch: 'Abuja Branch',
                mpid: "ef8e48f5-6fd8-4154-90d4-61be3d089006"
              }, {
                name: 'Chinedu Okafor',
                role: 'General Manager',
                branch: 'Lagos Branch',
                mpid: "fed2d94f-4f82-4de0-8ff1-db973ef3bc71"
              }].map((member, idx) => <motion.div data-magicpath-motion-tag="motion.div" key={idx} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: idx * 0.1
              }} className="bg-zinc-900 p-6 rounded-lg border border-zinc-800" data-magicpath-uuid={(member as any)["mpid"] ?? "unsafe"} data-magicpath-id="50" data-magicpath-path="AboutPage.tsx">
                    <div className="w-24 h-24 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4" data-magicpath-uuid={(member as any)["mpid"] ?? "unsafe"} data-magicpath-id="51" data-magicpath-path="AboutPage.tsx">
                      <Users className="text-amber-500" size={32} data-magicpath-uuid={(member as any)["mpid"] ?? "unsafe"} data-magicpath-id="52" data-magicpath-path="AboutPage.tsx" />
                    </div>
                    <h3 className="text-xl font-serif text-white mb-1" data-magicpath-uuid={(member as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:unknown" data-magicpath-id="53" data-magicpath-path="AboutPage.tsx">{member.name}</h3>
                    <p className="text-amber-400 text-sm mb-2" data-magicpath-uuid={(member as any)["mpid"] ?? "unsafe"} data-magicpath-field="role:unknown" data-magicpath-id="54" data-magicpath-path="AboutPage.tsx">{member.role}</p>
                    <p className="text-zinc-500 text-xs flex items-center justify-center gap-1" data-magicpath-uuid={(member as any)["mpid"] ?? "unsafe"} data-magicpath-field="branch:unknown" data-magicpath-id="55" data-magicpath-path="AboutPage.tsx">
                      <MapPin size={12} data-magicpath-uuid={(member as any)["mpid"] ?? "unsafe"} data-magicpath-id="56" data-magicpath-path="AboutPage.tsx" />
                      {member.branch}
                    </p>
                  </motion.div>)}
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>

          {/* CTA Section */}
          <SortableContainer dndKitId="27f5f300-9f88-47f4-8b0b-fab19e99461a" containerType="regular" prevTag="div" className="p-8 md:p-16 bg-gradient-to-r from-amber-600 to-amber-700 text-center" data-magicpath-id="57" data-magicpath-path="AboutPage.tsx">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4" data-magicpath-id="58" data-magicpath-path="AboutPage.tsx">Experience Phoenix Imperial</h2>
            <p className="text-amber-100 mb-8 max-w-xl mx-auto" data-magicpath-id="59" data-magicpath-path="AboutPage.tsx">
              Book your stay today and discover why thousands of guests choose us
            </p>
            <button onClick={onClose} className="bg-white text-amber-700 px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-amber-50 transition-colors" data-magicpath-id="60" data-magicpath-path="AboutPage.tsx">
              Explore Our Rooms
            </button>
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>
    </AnimatePresence>;
};