import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Building2, Smartphone, QrCode, ArrowRight, Download, Ticket } from 'lucide-react';
import { PASSES } from '../data/forumData';
import { PassType, RegistrationSubmission } from '../types';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPassType?: PassType;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  initialPassType = 'investor',
}) => {
  const [selectedPass, setSelectedPass] = useState<PassType>(initialPassType);
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [loading, setLoading] = useState(false);
  const [confirmedData, setConfirmedData] = useState<RegistrationSubmission | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    jobTitle: '',
    country: 'Ghana',
    phone: '',
    dietaryOrAccessibility: '',
    paymentMethod: 'credit_card' as 'credit_card' | 'wire_transfer' | 'mobile_money',
  });

  if (!isOpen) return null;

  const currentPass = PASSES.find((p) => p.id === selectedPass) || PASSES[2];

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.organization) return;
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const registrationCode = `AISF-${Math.floor(100000 + Math.random() * 900000)}`;

    const submission: RegistrationSubmission = {
      passType: selectedPass,
      passName: currentPass.name,
      amountUSD: currentPass.priceUSD,
      fullName: formData.fullName,
      email: formData.email,
      organization: formData.organization,
      jobTitle: formData.jobTitle,
      country: formData.country,
      phone: formData.phone,
      dietaryOrAccessibility: formData.dietaryOrAccessibility,
      paymentMethod: formData.paymentMethod,
      paymentStatus: 'confirmed',
      registrationCode,
      createdAt: new Date().toISOString(),
    };

    try {
      // Send to Express API if available
      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      }).catch(() => {
        // Fallback for standalone static execution
      });
    } catch {
      // Silent catch
    }

    setConfirmedData(submission);
    setLoading(false);
    setStep('confirmed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 text-left animate-fadeIn">
        
        {/* Header */}
        <div className="bg-[#0f254e] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Ticket className="w-5 h-5 text-[#93c5fd]" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Register for Accra Forum</h2>
              <p className="text-xs text-white/80">3–5 March 2027 · Accra, Ghana</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: Details */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-6">
              
              {/* Pass Selection Pills */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  Select Your Forum Pass
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {PASSES.map((pass) => (
                    <button
                      key={pass.id}
                      type="button"
                      onClick={() => setSelectedPass(pass.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedPass === pass.id
                          ? 'border-[#0f254e] bg-[#eff6ff]/70 ring-1 ring-[#0f254e]'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-stone-900 truncate">{pass.name}</div>
                      <div className="text-sm font-black text-[#0f254e] font-mono-numbers">
                        ${pass.priceUSD}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pass Summary Bar */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 flex justify-between items-center">
                <div>
                  <span className="font-bold text-stone-900">{currentPass.name}: </span>
                  <span>{currentPass.description}</span>
                </div>
                <span className="font-extrabold text-[#0f254e] text-base shrink-0 ml-3 font-mono-numbers">
                  USD ${currentPass.priceUSD}
                </span>
              </div>

              {/* Attendee Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kwame Mensah"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#0f254e] focus:ring-1 focus:ring-[#0f254e] text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="kwame@enterprise.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#0f254e] focus:ring-1 focus:ring-[#0f254e] text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Organization / Company *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Volta Silicon Labs"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#0f254e] focus:ring-1 focus:ring-[#0f254e] text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Managing Director / Chip Architect"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#0f254e] focus:ring-1 focus:ring-[#0f254e] text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Country of Residence
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ghana, Kenya, South Africa, USA, UK"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#0f254e] focus:ring-1 focus:ring-[#0f254e] text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Mobile / WhatsApp (with country code)
                  </label>
                  <input
                    type="tel"
                    placeholder="+233 24 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#0f254e] focus:ring-1 focus:ring-[#0f254e] text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Special Requirements (Dietary, Accessibility, Bilateral Meeting Requests)
                </label>
                <textarea
                  rows={2}
                  placeholder="Optional details for our hospitality and protocol team..."
                  value={formData.dietaryOrAccessibility}
                  onChange={(e) => setFormData({ ...formData, dietaryOrAccessibility: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:border-[#0f254e] focus:ring-1 focus:ring-[#0f254e] text-sm outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 text-sm font-bold text-white bg-[#0f254e] hover:bg-[#0a1931] rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* STEP 2: Payment */}
          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="text-xs uppercase font-bold text-stone-500 mb-1">Order Summary</div>
                <div className="flex justify-between items-center text-sm font-semibold text-stone-900">
                  <span>{currentPass.name} ({formData.fullName})</span>
                  <span className="text-lg font-bold text-[#0f254e] font-mono-numbers">
                    USD ${currentPass.priceUSD}
                  </span>
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  Tax inclusive. Early-bird confirmation valid until 15 January 2027.
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'credit_card' })}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer ${
                      formData.paymentMethod === 'credit_card'
                        ? 'border-[#0f254e] bg-[#eff6ff]/60 ring-1 ring-[#0f254e]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#0f254e]" />
                    <span className="text-xs font-bold text-stone-900">Credit / Debit Card</span>
                    <span className="text-[11px] text-stone-500">Visa, Mastercard, Amex</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'wire_transfer' })}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer ${
                      formData.paymentMethod === 'wire_transfer'
                        ? 'border-[#0f254e] bg-[#eff6ff]/60 ring-1 ring-[#0f254e]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-[#0f254e]" />
                    <span className="text-xs font-bold text-stone-900">Bank Wire / Invoice</span>
                    <span className="text-[11px] text-stone-500">Pro-forma invoice</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'mobile_money' })}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer ${
                      formData.paymentMethod === 'mobile_money'
                        ? 'border-[#0f254e] bg-[#eff6ff]/60 ring-1 ring-[#0f254e]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-[#0f254e]" />
                    <span className="text-xs font-bold text-stone-900">Mobile Money</span>
                    <span className="text-[11px] text-stone-500">MTN, Telecel, M-Pesa</span>
                  </button>

                </div>
              </div>

              {formData.paymentMethod === 'credit_card' && (
                <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>Card Information</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <ShieldCheck className="w-4 h-4" /> 256-Bit SSL Encrypted
                    </span>
                  </div>
                  <input
                    type="text"
                    disabled
                    value="•••• •••• •••• 4242 (Simulated Test Card)"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-600 text-sm font-mono-numbers"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      disabled
                      value="12 / 28"
                      className="w-full px-3.5 py-2 rounded-lg border border-stone-300 bg-white text-stone-600 text-sm font-mono-numbers"
                    />
                    <input
                      type="text"
                      disabled
                      value="CVC: 888"
                      className="w-full px-3.5 py-2 rounded-lg border border-stone-300 bg-white text-stone-600 text-sm font-mono-numbers"
                    />
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'wire_transfer' && (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                  <div className="font-bold text-stone-900">Institutional Bank Wire Instructions:</div>
                  <div>Bank: Standard Chartered Bank Ghana / Ecobank PLC</div>
                  <div>Account Name: Inference Silicon Forum Organising Secretariat</div>
                  <div>Reference: Will be generated upon confirmation</div>
                </div>
              )}

              {formData.paymentMethod === 'mobile_money' && (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                  <div className="font-bold text-stone-900">Mobile Money Support:</div>
                  <div>Supported on MTN MoMo, Telecel Cash, AirtelTigo and East Africa M-Pesa. Prompt will trigger immediately after confirmation.</div>
                </div>
              )}

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-5 py-2 text-sm font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 text-sm font-bold text-white bg-[#0f254e] hover:bg-[#0a1931] rounded-full shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Confirming Registration...' : `Pay & Confirm USD $${currentPass.priceUSD}`}
                </button>
              </div>

            </form>
          )}

          {/* STEP 3: Confirmed Badge & Ticket */}
          {step === 'confirmed' && confirmedData && (
            <div className="space-y-6 text-center animate-fadeIn">
              
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-1">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-stone-900">
                  Registration Confirmed!
                </h3>
                <p className="text-sm text-stone-600 mt-1">
                  Welcome to the Advanced Inference Silicon Investors Forum. We have dispatched your official credential dossier to <strong className="text-stone-900">{confirmedData.email}</strong>.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="max-w-md mx-auto bg-gradient-to-br from-[#0f254e] to-[#060d1a] text-white rounded-2xl p-6 shadow-xl border border-white/20 text-left relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#93c5fd]">
                      OFFICIAL DELEGATE PASS
                    </span>
                    <h4 className="text-lg font-bold text-white leading-tight">
                      {confirmedData.fullName}
                    </h4>
                    <p className="text-xs text-white/80">
                      {confirmedData.organization} · {confirmedData.jobTitle || 'Executive'}
                    </p>
                  </div>

                  <div className="bg-white p-1.5 rounded-lg">
                    <QrCode className="w-10 h-10 text-stone-900" />
                  </div>
                </div>

                <div className="pt-3 border-t border-white/20 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-white/60 block">Tier</span>
                    <span className="font-bold text-white">{confirmedData.passName}</span>
                  </div>
                  <div>
                    <span className="text-white/60 block">Pass Code</span>
                    <span className="font-mono-numbers font-bold text-[#fde047]">{confirmedData.registrationCode}</span>
                  </div>
                  <div>
                    <span className="text-white/60 block">Dates</span>
                    <span className="font-medium text-white">3–5 March 2027</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print / Save Pass PDF</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-2.5 text-xs font-bold text-white bg-[#0f254e] hover:bg-[#0a1931] rounded-full transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
