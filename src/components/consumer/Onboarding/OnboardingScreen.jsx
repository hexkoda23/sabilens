import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ShieldCheck, Zap, Globe, MessageSquare } from 'lucide-react';
import OnboardingLayout from './OnboardingLayout';

const OnboardingScreen = ({ screen, onNext, onBack, onSkip }) => {
  const screens = [
    {
      title: 'Real Products. Real Safety.',
      description: 'SabiLens helps you verify food and drugs in seconds using advanced AI. No more guesswork.',
      illustration: (
        <div className="relative">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-32 h-44 bg-accent rounded-2xl flex flex-col p-3 shadow-2xl relative z-10"
          >
            <div className="w-full h-24 bg-primary/10 rounded-lg mb-2 flex items-center justify-center">
              <ShieldCheck className="text-primary w-12 h-12" />
            </div>
            <div className="space-y-1.5">
              <div className="h-2 w-full bg-white/20 rounded-full" />
              <div className="h-2 w-3/4 bg-white/20 rounded-full" />
              <div className="h-3 w-full bg-primary/20 rounded-full mt-2" />
            </div>
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 z-20"
          >
            <Camera className="text-white w-6 h-6" />
          </motion.div>
        </div>
      )
    },
    {
      title: '2-Point Forensic Scan',
      description: 'Simply scan the front and back of any product. Our AI verifies NAFDAC codes and packaging authenticity.',
      illustration: (
        <div className="relative flex items-center justify-center p-8">
          <motion.div
            className="absolute inset-0 bg-primary/10 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="flex gap-4 relative z-10">
            <motion.div
              animate={{ rotate: [0, 180, 180, 0] }}
              transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 0.6, 1] }}
              className="w-24 h-32 bg-white border-2 border-primary/20 rounded-xl flex items-center justify-center shadow-lg"
            >
              <Zap className="text-primary w-10 h-10" />
            </motion.div>
          </div>
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/40 shadow-[0_0_10px_rgba(0,200,150,0.5)] z-20" />
        </div>
      )
    },
    {
      title: 'In Your Language',
      description: 'Get clear, voice-guided results in Yorùbá, Hausa, Igbo, or English. Sabi is for everyone.',
      illustration: (
        <div className="relative">
          <div className="flex flex-wrap justify-center gap-3 max-w-[240px]">
            {['English', 'Yorùbá', 'Hausa', 'Igbo'].map((lang, i) => (
              <motion.div
                key={lang}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15 + 0.5 }}
                className="px-4 py-2 bg-white border border-border rounded-full shadow-sm text-sm font-syne font-bold text-accent"
              >
                {lang}
              </motion.div>
            ))}
          </div>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center"
          >
            <MessageSquare className="text-primary w-8 h-8" />
          </motion.div>
        </div>
      )
    }
  ];

  return (
    <OnboardingLayout
      currentScreen={screen}
      totalScreens={screens.length}
      title={screens[screen].title}
      description={screens[screen].description}
      illustration={screens[screen].illustration}
      onNext={onNext}
      onBack={onBack}
      onSkip={onSkip}
      showBack={screen > 0}
    />
  );
};

export default OnboardingScreen;