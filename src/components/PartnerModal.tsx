import React, { useState } from 'react';
import { X, Handshake, CheckCircle, ArrowRight } from 'lucide-react';
import { PartnerEnquiry } from '../types';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier?: 'headline' | 'platinum' | 'gold' | 'exhibitor' | 'custom';
}

export const PartnerModal: React.FC<PartnerModalProps> = ({
  isOpen,
  onClose,
  initialTier = 'headline',
}) => {
  const [tier, setTier] = useState(initialTier);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const enquiry: PartnerEnquiry = {
      tier,
      companyName: formData.companyName,
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      message: formData.message,
      submittedAt: new Date().toISOString(),
    };

    try {
      await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiry),
      }).catch(() => {});
    } catch {
      // Standalone fallback
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 text-left animate-fadeIn">
        
        {/* Header */}
        <div className="bg-[#0f254e] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Handshake className="w-5 h-5 text-[#93c5fd]" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Partner With The Forum</h2>
              <p className="text-xs text-white/80">Be seen by Africa’s inference hardware leadership</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900">Enquiry Received</h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Thank you for your interest in backing the Advanced Inference Silicon Forum. Our partnerships team (chaired by Kiprop Yego & Dr. Michael Apasiku) will review your requirements and reach out within 24 hours with the detailed sponsorship prospectus.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-2.5 text-xs font-bold text-white bg-[#0f254e] hover:bg-[#0a1931] rounded-full transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Tier selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Partnership Package
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'headline', label: 'Headline Partner' },
                    { id: 'platinum', label: 'Platinum' },
                    { id: 'gold', label: 'Gold' },
                    { id: 'exhibitor', label: 'Exhibitor' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setTier(p.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        tier === p.id
                          ? 'border-[#0f254e] bg-[#eff6ff] text-[#0f254e] ring-1 ring-[#0f254e]'
                          : 'border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Company / Entity *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Continental Foundry Co."
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:border-[#0f254e] focus:ring-1 focus:ring-[#0f254e] text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Ama Serwaa"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:border-[#0f254e] focus:ring-1 focus:ring-[#0f254e] text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="partnerships@foundry.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:border-[#0f254e] focus:ring-1 focus:ring-[#0f254e] text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Phone / Country
                  </label>
                  <input
                    type="text"
                    placeholder="+233 ... or USA, UK, Kenya"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:border-[#0f254e] focus:ring-1 focus:ring-[#0f254e] text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Goals & Questions
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your brand goals, exhibition booth requirements, or speaking interests..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:border-[#0f254e] focus:ring-1 focus:ring-[#0f254e] text-sm outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-sm font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-2.5 text-sm font-bold text-white bg-[#0f254e] hover:bg-[#0a1931] rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? 'Submitting...' : 'Submit Partnership Enquiry'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
