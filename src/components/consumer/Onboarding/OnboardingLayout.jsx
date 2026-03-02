import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../common/Icon';
import Button from '../../common/Button';

const OnboardingLayout = ({
  currentScreen,
  totalScreens,
  title,
  description,
  illustration,
  onNext,
  onBack,
  onSkip,
  showBack = false
}) => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-6 relative z-10">
        {showBack ? (
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 border border-gray-100 active:scale-95 transition-transform"
          >
            <Icon name="ArrowLeft" size={18} className="text-accent" library="fi" />
          </button>
        ) : (
          <div className="w-10" />
        )}

        <button
          onClick={onSkip}
          className="text-primary text-sm font-bold font-syne tracking-tight px-4 py-2 rounded-lg bg-primary-light/30 active:scale-95 transition-transform"
        >
          Skip
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col relative px-8 pt-4 pb-12">
        {/* Animated Background Element */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[120%] aspect-square bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1 flex flex-col items-center justify-center text-center relative z-10"
          >
            {/* Illustration */}
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
              className="w-72 h-72 rounded-[40px] bg-white border-2 border-primary/10 shadow-xl shadow-primary/5 flex items-center justify-center mb-12 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opaicty-50" />
              {illustration}
            </motion.div>

            {/* Text */}
            <h1 className="text-3xl font-syne font-extrabold text-accent leading-tight mb-4 tracking-tight">
              {title}
            </h1>
            <p className="text-muted text-lg leading-relaxed max-w-[280px]">
              {description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      <div className="px-8 pb-12 relative z-10">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2.5 mb-10">
          {Array.from({ length: totalScreens }).map((_, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                width: i === currentScreen ? 24 : 8,
                backgroundColor: i === currentScreen ? '#00C896' : '#E5E7EB'
              }}
              className="h-2 rounded-full transition-colors"
            />
          ))}
        </div>

        {/* Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onNext}
          className="shadow-lg shadow-primary/20 h-14 text-lg font-syne font-bold"
        >
          {currentScreen === totalScreens - 1 ? 'Get Started Free' : 'Continue'}
          {currentScreen !== totalScreens - 1 && <Icon name="ArrowRight" size={18} className="ml-2" library="fi" />}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingLayout;