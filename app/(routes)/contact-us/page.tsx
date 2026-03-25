'use client'
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import emailjs from "@emailjs/browser";

function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pixelOffset, setPixelOffset] = useState({ x: 0, y: 0 });
  const [glitchText, setGlitchText] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      alert("MESSAGE DELIVERED! ✨");
      formRef.current?.reset();
    } catch (error) {
      alert("ERROR 0xDEADBEEF! ⚡");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    setPixelOffset({ x, y });
  };

  return (
    <section 
      className="relative bg-[#0a0f0a] overflow-hidden font-game"
      onMouseMove={handleMouseMove}
      id="contact-us"
    >
      {/* Pixelated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#1a3f1a 1px, transparent 1px),
                              linear-gradient(90deg, #1a3f1a 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent via-[#00ff41]/5 to-transparent animate-scan" />

      {/* Pixelated Cursor Trail */}
      <div className="absolute w-8 h-8 border-2 border-[#00ff41] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-0"
        style={{ left: '50%', top: '50%', transform: `translate(calc(-50% + ${pixelOffset.x}px), calc(-50% + ${pixelOffset.y}px))` }}
      />

      <div className="relative container max-w-3xl mx-auto px-6 py-20">
        
        {/* Retro Header with Glitch Effect */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="relative inline-block">
            <h1 className={`text-5xl md:text-7xl font-bold uppercase tracking-wider mb-4 text-[#00ff41] pixel-text ${glitchText ? 'glitch' : ''}`}>
              _CONTACT
            </h1>
            {glitchText && (
              <>
                <h1 className="absolute top-0 left-0 text-5xl md:text-7xl font-bold uppercase tracking-wider text-red-500 opacity-70 glitch-overlay animate-glitch1">_CONTACT</h1>
                <h1 className="absolute top-0 left-0 text-5xl md:text-7xl font-bold uppercase tracking-wider text-blue-500 opacity-70 glitch-overlay animate-glitch2">_CONTACT</h1>
              </>
            )}
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-16 h-0.5 bg-[#00ff41]"></div>
            <p className="text-[#8bff6a] text-sm tracking-[0.3em] animate-pulse">
              [ ENCRYPTED_CHANNEL_ACTIVE ]
            </p>
            <div className="w-16 h-0.5 bg-[#00ff41]"></div>
          </div>
        </motion.div>

        {/* Main Form Box - Pixel Art Style */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Pixel Corner Decorations */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-[#00ff41]"></div>
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-[#00ff41]"></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-[#00ff41]"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-[#00ff41]"></div>

          <div className="bg-[#0a120a] border-4 border-[#00ff41] p-8 md:p-12 shadow-[8px_8px_0_0_#1a3f1a]">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              
              <div className="space-y-6">
                {/* Input Groups with Pixel Borders */}
                <div className="space-y-5">
                  <div className="relative">
                    <label className="block text-[#00ff41] text-sm uppercase mb-2 font-mono tracking-wider">
                       USERNAME
                    </label>
                    <div className="relative">
                      <input 
                        name="user_name"
                        required
                        placeholder="[ ENTER_YOUR_NAME ]"
                        className="w-full bg-black border-2 border-[#2a5f2a] p-3 outline-none text-[#00ff41] font-mono text-sm placeholder:text-[#1a3f1a] focus:border-[#00ff41] transition-all uppercase"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00ff41] text-xs animate-pulse">⏺</div>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-[#00ff41] text-sm uppercase mb-2 font-mono tracking-wider">
                       EMAIL_ADDRESS
                    </label>
                    <div className="relative">
                      <input 
                        name="user_email"
                        type="email"
                        required
                        placeholder="[ RETURN_ADDRESS ]"
                        className="w-full bg-black border-2 border-[#2a5f2a] p-3 outline-none text-[#00ff41] font-mono text-sm placeholder:text-[#1a3f1a] focus:border-[#00ff41] transition-all uppercase"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00ff41] text-xs animate-pulse">⏺</div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-[#00ff41] text-sm uppercase mb-2 font-mono tracking-wider">
                     MESSAGE_PAYLOAD
                  </label>
                  <div className="relative">
                    <textarea 
                      name="message"
                      rows={4}
                      required
                      placeholder="[ ENCODE_YOUR_MESSAGE ]"
                      className="w-full bg-black border-2 border-[#2a5f2a] p-3 outline-none text-[#00ff41] font-mono text-sm placeholder:text-[#1a3f1a] focus:border-[#00ff41] transition-all resize-none uppercase"
                    />
                    <div className="absolute bottom-3 right-3 text-[#00ff41] text-xs animate-pulse">◢◣</div>
                  </div>
                </div>
              </div>

              {/* Submit Button with Pixel Animation */}
              <div className="pt-6 flex flex-col items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    relative px-12 py-4 bg-[#00ff41] text-black font-bold uppercase text-lg tracking-wider
                    border-2 border-[#8bff6a] shadow-[4px_4px_0_0_#0a5f0a]
                    hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#0a5f0a]
                    active:translate-x-1 active:translate-y-1 active:shadow-none
                    transition-all disabled:opacity-50 disabled:cursor-not-allowed
                    font-game
                  `}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      TRANSMITTING...
                    </span>
                  ) : (
                    "> SEND_MESSAGE"
                  )}
                </button>
                
                {/* ASCII Art Decoration */}
                <div className="text-[#1a3f1a] text-xs font-mono whitespace-pre mt-4">
                  {`[${isSubmitting ? '=====TRANSMITTING=====' : '=====READY====='}]`}
                </div>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Pixel Art Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="w-2 h-2 bg-[#00ff41] animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <div className="text-[#2a5f2a] text-[10px] uppercase tracking-wider font-mono text-center">
              <div>SECURE_CONNECTION_ESTABLISHED</div>
              <div className="mt-1">PROTOCOL: PIXEL_V1.0 | STATUS: ONLINE</div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        
        @keyframes glitch1 {
          0%, 100% { transform: translate(0); opacity: 0.7; }
          33% { transform: translate(-2px, 1px); opacity: 0.9; }
          66% { transform: translate(2px, -1px); opacity: 0.5; }
        }
        
        @keyframes glitch2 {
          0%, 100% { transform: translate(0); opacity: 0.7; }
          33% { transform: translate(2px, -1px); opacity: 0.9; }
          66% { transform: translate(-2px, 1px); opacity: 0.5; }
        }
        
        .glitch {
          animation: glitch 0.3s infinite;
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(1px, -1px); }
          60% { transform: translate(-1px, 0); }
          80% { transform: translate(1px, 1px); }
          100% { transform: translate(0); }
        }
        
        .glitch-overlay {
          pointer-events: none;
          mix-blend-mode: screen;
        }
        
        .animate-glitch1 {
          animation: glitch1 0.2s infinite;
        }
        
        .animate-glitch2 {
          animation: glitch2 0.2s infinite;
        }
        
        .pixel-text {
          text-shadow: 3px 3px 0 #0a5f0a;
        }
      `}</style>
    </section>
  );
}

export default ContactUs;