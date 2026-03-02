import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, Building, ShieldAlert, Check } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Toast from '../../components/ui/Toast';
import Modal from '../../components/ui/Modal';

// List of Nigerian states
const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara'
];

const Signup = () => {
  const navigate = useNavigate();

  // Step 1: Role Selection
  const [selectedRole, setSelectedRole] = useState(null); // 'consumer', 'brand', 'nafdac'

  // Step 2: Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    state: '',
    language: 'en',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === 'brand') navigate('/company/signup');
    if (role === 'nafdac') navigate('/nafdac/login');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    // Phone validation (exactly 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Must be exactly 10 digits (e.g., 801 234 5678)';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8 || !/[0-9]/.test(formData.password) || !/[^a-zA-Z0-9]/.test(formData.password)) {
      newErrors.password = 'Must be min 8 chars, 1 number, 1 special char';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the Terms of Service';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Check if phone exists
      if (users.some(u => u.phone === formData.phone)) {
        setErrors({ phone: 'This phone number is already registered' });
        setIsSubmitting(false);
        return;
      }

      // Create new user record
      const newUser = {
        id: crypto.randomUUID(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        password: formData.password, // In a real app, hash this
        state: formData.state,
        language: formData.language,
        role: 'consumer',
        createdAt: new Date().toISOString()
      };

      // Save to local storage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('hasSeenOnboarding', 'true');

      // Show success
      setToast({
        type: 'success',
        message: `🎉 Welcome to SabiLens, ${formData.firstName}!`
      });

      // Redirect
      setTimeout(() => {
        navigate('/home');
      }, 1500);

    } catch (error) {
      setToast({
        type: 'error',
        message: 'Something went wrong. Please try again.'
      });
      setIsSubmitting(false);
    }
  };

  // View Components
  const BrandSidebar = () => (
    <div className="hidden lg:flex w-[40%] bg-gradient-to-br from-[#0A0E1A] to-[#0d1a12] p-12 flex-col relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')] opacity-[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col">
        <Link to="/" className="flex items-center gap-2 mb-20 group inline-flex max-w-max">
          <ShieldCheck className="text-primary w-8 h-8" />
          <span className="font-syne font-bold text-2xl tracking-tight text-white">
            Sabi<span className="text-primary">Lens</span>
          </span>
        </Link>

        <div className="mt-auto">
          <h2 className="text-4xl font-syne font-bold text-white mb-4 leading-tight">Join 50,000+ Nigerians</h2>
          <p className="text-white/60 font-sans text-lg mb-12">Verifying products before they buy.</p>

          <ul className="space-y-6 mb-16 font-sans text-white/80">
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,200,150,0.15)]">🛡️</div>
              <span>Free forensic product scanning</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,200,150,0.15)]">🎙️</div>
              <span>Voice results in your language</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,200,150,0.15)]">📍</div>
              <span>Report fakes directly to NAFDAC</span>
            </li>
          </ul>

          <div className="bg-accent-2/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 border-l-4 border-l-primary">
            <p className="font-sans text-white/90 italic mb-4 leading-relaxed">
              "I avoided buying fake drugs at Ikeja market because of SabiLens."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-surface/10 rounded-full flex items-center justify-center font-syne font-bold text-white text-sm">F</div>
              <span className="font-syne font-bold text-white text-sm">Fatima B., <span className="text-white/50 font-sans font-normal">Kano</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
      )}

      {/* Left Sidebar (Hidden on mobile) */}
      <BrandSidebar />

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">

        {/* Mobile Header (Shows only on small screens) */}
        <div className="lg:hidden p-6 flex justify-between items-center border-b border-border bg-white sticky top-0 z-20">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="text-primary w-6 h-6" />
            <span className="font-syne font-bold text-xl text-accent tracking-tight">
              Sabi<span className="text-primary">Lens</span>
            </span>
          </Link>
          <Link to="/login" className="text-sm font-sans font-medium text-primary bg-primary-light px-4 py-2 rounded-lg">
            Log In
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-xl animate-fade-up">

            {/* Header Area */}
            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-3xl font-syne font-bold text-accent mb-2">Create your account</h1>
              <p className="text-muted font-sans hidden lg:block">
                Already have an account? <Link to="/login" className="text-primary font-medium hover:underline transition-all">Log In</Link>
              </p>
            </div>

            {/* STEP 1: Role Selector */}
            <div className="mb-10">
              <h3 className="font-syne font-semibold text-accent mb-4 text-center lg:text-left">I am a...</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                {/* Consumer */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('consumer')}
                  className={`
                    flex flex-col items-center sm:items-start text-left p-4 rounded-2xl border transition-all duration-200
                    ${selectedRole === 'consumer'
                      ? 'border-primary bg-primary-light ring-1 ring-primary shadow-[0_0_20px_rgba(0,200,150,0.15)] scale-[1.02]'
                      : 'border-border bg-white hover:border-primary/50 hover:bg-surface-2'
                    }
                  `}
                >
                  <div className="flex justify-between w-full items-start mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors ${selectedRole === 'consumer' ? 'bg-primary text-white' : 'bg-surface-2 border border-border'}`}>
                      👤
                    </div>
                    {selectedRole === 'consumer' && <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center"><Check size={12} strokeWidth={4} /></div>}
                  </div>
                  <h4 className={`font-syne font-bold mb-1 transition-colors ${selectedRole === 'consumer' ? 'text-primary-dark' : 'text-accent'}`}>Consumer</h4>
                  <p className="text-xs font-sans text-muted leading-tight text-center sm:text-left">Scan products before buying</p>
                </button>

                {/* Brand */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('brand')}
                  className="flex flex-col items-center sm:items-start text-left p-4 rounded-2xl border border-border bg-white hover:border-primary/50 hover:bg-surface-2 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-full bg-surface-2 border border-border flex items-center justify-center text-xl mb-3">
                    🏢
                  </div>
                  <h4 className="font-syne font-bold mb-1 text-accent">Brand</h4>
                  <p className="text-xs font-sans text-muted leading-tight text-center sm:text-left">Protect my products & supply chain</p>
                </button>

                {/* NAFDAC */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('nafdac')}
                  className="flex flex-col items-center sm:items-start text-left p-4 rounded-2xl border border-border bg-white hover:border-primary/50 hover:bg-surface-2 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-full bg-surface-2 border border-border flex items-center justify-center text-xl mb-3">
                    🏛️
                  </div>
                  <h4 className="font-syne font-bold mb-1 text-accent">NAFDAC</h4>
                  <p className="text-xs font-sans text-muted leading-tight text-center sm:text-left">Enforce national compliance</p>
                </button>

              </div>
            </div>

            {/* STEP 2: Consumer Registration Form */}
            {selectedRole === 'consumer' && (
              <form onSubmit={handleSubmit} className="space-y-5 animate-slideUp bg-white p-6 sm:p-8 rounded-3xl border border-border shadow-soft">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="First Name"
                    name="firstName"
                    placeholder="e.g. Chukwudi"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    placeholder="e.g. Okafor"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                  />
                </div>

                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="801 234 5678"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  prefix={<span className="font-mono text-accent flex items-center gap-2"><span className="text-lg">🇳🇬</span> +234</span>}
                  maxLength={10}
                />

                <p className="text-xs text-muted -mt-3 ml-1 font-sans">Wait gently, enter only the 10 digits after the first 0. Used for account recovery only.</p>

                <Input
                  label="Email (Optional)"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  showPasswordStrength={true}
                />

                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-accent font-sans">State of Residence</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border bg-white px-4 py-3 font-sans text-accent focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none ${errors.state ? 'border-danger focus:border-danger focus:ring-danger' : 'border-border'}`}
                  >
                    <option value="" disabled>Select your state</option>
                    {NIGERIAN_STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && <p className="text-sm text-danger font-sans">{errors.state}</p>}
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <label className="text-sm font-medium text-accent font-sans">Preferred Display Language</label>
                  <div className="flex items-center flex-wrap gap-2">
                    {['en', 'yo', 'ha', 'ig'].map((lang) => {
                      const labels = { en: 'English', yo: 'Yorùbá', ha: 'Hausa', ig: 'Igbo' };
                      return (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => handleInputChange({ target: { name: 'language', value: lang } })}
                          className={`
                            px-4 py-2 rounded-xl text-sm font-sans font-medium transition-all duration-200
                            ${formData.language === lang
                              ? 'bg-primary text-white shadow-soft'
                              : 'bg-white text-muted border border-border hover:bg-surface-2 hover:border-primary/30'
                            }
                          `}
                        >
                          {labels[lang]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 flex items-start gap-3">
                  <div className="relative flex items-start pt-1">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-border transition-all checked:border-primary checked:bg-primary"
                    />
                    <div className="pointer-events-none absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                      <Check size={14} strokeWidth={4} />
                    </div>
                  </div>
                  <label htmlFor="agreeTerms" className={`text-sm font-sans flex-1 cursor-pointer ${errors.agreeTerms ? 'text-danger' : 'text-muted'}`}>
                    I agree to the <button type="button" onClick={() => setShowTermsModal(true)} className="text-primary hover:underline font-medium">Terms of Service</button> and <button type="button" onClick={() => setShowPrivacyModal(true)} className="text-primary hover:underline font-medium">Privacy Policy</button>
                  </label>
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isSubmitting}
                  >
                    Create Free Account
                  </Button>
                </div>

                <div className="relative py-4 flex items-center">
                  <div className="flex-grow border-t border-border"></div>
                  <span className="flex-shrink-0 mx-4 text-muted text-sm font-sans">or continue with</span>
                  <div className="flex-grow border-t border-border"></div>
                </div>

                <button
                  type="button"
                  onClick={() => setToast({ type: 'info', message: 'Google authentication coming soon.' })}
                  className="w-full relative flex items-center justify-center gap-3 bg-white border border-border px-6 py-3.5 rounded-xl hover:bg-surface-2 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-border shadow-soft text-accent font-sans font-medium"
                >
                  <svg className="w-5 h-5 absolute left-6" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </button>
              </form>
            )}

          </div>
        </div>
      </div>

      {/* Terms of Service Modal */}
      <Modal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Terms of Service"
      >
        <div className="space-y-6 font-sans text-accent overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
          <section>
            <h3 className="font-syne font-bold text-lg mb-2">1. Introduction</h3>
            <p className="text-muted leading-relaxed">
              Welcome to SabiLens. By using our application, you agree to comply with and be bound by the following terms and conditions. SabiLens is an AI-powered product verification platform designed to help consumers in Nigeria identify authentic products.
            </p>
          </section>

          <section>
            <h3 className="font-syne font-bold text-lg mb-2">2. Use of Service</h3>
            <p className="text-muted leading-relaxed">
              You agree to use SabiLens only for lawful purposes. You are responsible for maintaining the confidentiality of your account details. Any misuse of our AI verification tools to intentionally spread false information about authentic products is strictly prohibited.
            </p>
          </section>

          <section>
            <h3 className="font-syne font-bold text-lg mb-2">3. Accuracy of AI Verification</h3>
            <p className="text-muted leading-relaxed">
              SabiLens uses advanced forensic AI to provide verification. While we strive for 99% accuracy, verification results are intended as a guide. We recommend always checking for official NAFDAC registration numbers even after a positive scan.
            </p>
          </section>

          <section>
            <h3 className="font-syne font-bold text-lg mb-2">4. User Content & Reporting</h3>
            <p className="text-muted leading-relaxed">
              When you report a counterfeit product, you grant SabiLens the right to use the evidence (images, location, metadata) for enforcement purposes and to share it with regulatory bodies like NAFDAC.
            </p>
          </section>

          <section>
            <h3 className="font-syne font-bold text-lg mb-2">5. Limitation of Liability</h3>
            <p className="text-muted leading-relaxed">
              SabiLens shall not be liable for any damages resulting from the use or inability to use our services, or from reliance on any verification results provided by our AI.
            </p>
          </section>

          <div className="pt-4">
            <Button variant="primary" fullWidth onClick={() => setShowTermsModal(false)}>
              Close & Continue
            </Button>
          </div>
        </div>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        title="Privacy Policy"
      >
        <div className="space-y-6 font-sans text-accent overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
          <section>
            <h3 className="font-syne font-bold text-lg mb-2">Information We Collect</h3>
            <p className="text-muted leading-relaxed">
              We collect your phone number (for account recovery), state of residence (for regional counterfeit hotspots), and images of products you scan. We do NOT collect personal identification beyond what is necessary to secure your account and provide verification services.
            </p>
          </section>

          <section>
            <h3 className="font-syne font-bold text-lg mb-2">How We Use Your Data</h3>
            <ul className="list-disc pl-5 space-y-2 text-muted">
              <li>To provide instant AI product verification.</li>
              <li>To build heatmaps of counterfeit activity in Nigeria.</li>
              <li>To share evidence of fake products with regulatory authorities.</li>
              <li>To personalize your experience in your preferred language.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-syne font-bold text-lg mb-2">Data Security</h3>
            <p className="text-muted leading-relaxed">
              Your data is encrypted and stored securely. We use industry-standard protocols to protect your information from unauthorized access or disclosure.
            </p>
          </section>

          <section>
            <h3 className="font-syne font-bold text-lg mb-2">Transparency</h3>
            <p className="text-muted leading-relaxed">
              By using our scanning feature, you acknowledge that product images and location data will be analyzed by our AI servers. We do not sell your personal information to third-party advertisers.
            </p>
          </section>

          <div className="pt-4">
            <Button variant="primary" fullWidth onClick={() => setShowPrivacyModal(false)}>
              Close & Continue
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Signup;