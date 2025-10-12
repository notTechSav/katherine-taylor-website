"use client";

import { useState } from "react";
import PageHeroOverlay from "@/components/site/PageHeroOverlay";

const heroImage = {
  src: "/inquire-hero.png",
  alt: "Private threshold with elegant architectural details in soft light",
};

const InquirePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    duration: "",
    location: "",
    referral: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-luxury-white text-luxury-black min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 md:px-8 max-w-2xl text-center space-y-8">
          <h1
            className="text-4xl md:text-5xl font-extralight tracking-[-0.02em] text-luxury-black"
            style={{ fontWeight: 200 }}
          >
            Received
          </h1>
          <p className="text-base font-light leading-[1.85] tracking-[0.01em] text-gray-700">
            I'll review your inquiry within 24 hours and respond directly.
          </p>
          <p className="text-sm font-light italic text-gray-500">
            Thank you for your discretion.
          </p>
          <div className="pt-8">
            <a
              href="/"
              className="inline-flex items-center gap-3 border border-gray-300 px-8 py-4 text-sm font-medium tracking-[0.1em] text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 hover:text-luxury-black hover:shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
              style={{ fontWeight: 300 }}
            >
              RETURN HOME
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-luxury-white text-luxury-black">
      <PageHeroOverlay
        title="Inquire"
        subtitle="Every inquiry is read personally. I respond to those where the fit is mutual."
        eyebrow="Private Inquiry"
        imageSrc={heroImage.src}
        imageAlt={heroImage.alt}
        alignment="left"
      />

      <section className="bg-luxury-white py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-8 max-w-2xl">
          <div className="mb-12 space-y-4 text-center">
            <p className="text-base font-light leading-[1.85] tracking-[0.01em] text-gray-700">
              Please provide enough context for me to understand who you are and what you're looking for.
            </p>
            <p className="text-sm font-light italic text-gray-500">
              Incomplete inquiries rarely receive a response.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-xs font-light tracking-[0.08em] uppercase text-gray-500"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-300 bg-transparent py-3 text-base font-light text-luxury-black placeholder-gray-400 outline-none transition-all duration-300 focus:border-gray-600"
                  style={{ fontWeight: 300 }}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-xs font-light tracking-[0.08em] uppercase text-gray-500"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-300 bg-transparent py-3 text-base font-light text-luxury-black placeholder-gray-400 outline-none transition-all duration-300 focus:border-gray-600"
                  style={{ fontWeight: 300 }}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-xs font-light tracking-[0.08em] uppercase text-gray-500"
              >
                Phone Number <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border-b border-gray-300 bg-transparent py-3 text-base font-light text-luxury-black placeholder-gray-400 outline-none transition-all duration-300 focus:border-gray-600"
                style={{ fontWeight: 300 }}
              />
            </div>

            {/* Preferred Date & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="preferredDate"
                  className="block text-xs font-light tracking-[0.08em] uppercase text-gray-500"
                >
                  Preferred Date
                </label>
                <input
                  type="text"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  placeholder="e.g., March 15 or 'flexible'"
                  className="w-full border-b border-gray-300 bg-transparent py-3 text-base font-light text-luxury-black placeholder-gray-400 outline-none transition-all duration-300 focus:border-gray-600"
                  style={{ fontWeight: 300 }}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="duration"
                  className="block text-xs font-light tracking-[0.08em] uppercase text-gray-500"
                >
                  Duration
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-300 bg-transparent py-3 text-base font-light text-luxury-black outline-none transition-all duration-300 focus:border-gray-600 cursor-pointer"
                  style={{ fontWeight: 300 }}
                >
                  <option value="">Select duration</option>
                  <option value="1-hour">1 hour</option>
                  <option value="2-hours">2 hours</option>
                  <option value="3-hours">3 hours</option>
                  <option value="4-hours">4 hours</option>
                  <option value="5-hours">5 hours</option>
                  <option value="6-hours">6 hours</option>
                  <option value="overnight">Overnight (up to 14 hours)</option>
                  <option value="24-hours">24 hours</option>
                  <option value="48-hours">48 hours</option>
                  <option value="72-hours">72 hours</option>
                  <option value="partnership">Annual Partnership</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="block text-xs font-light tracking-[0.08em] uppercase text-gray-500"
              >
                Location
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 bg-transparent py-3 text-base font-light text-luxury-black outline-none transition-all duration-300 focus:border-gray-600 cursor-pointer"
                style={{ fontWeight: 300 }}
              >
                <option value="">Select location</option>
                <option value="sacramento">Sacramento (your hosting)</option>
                <option value="sacramento-outcall">Sacramento (outcall)</option>
                <option value="west-coast">West Coast Travel</option>
                <option value="midwest">Midwest Travel</option>
                <option value="national">National Travel</option>
                <option value="international">International Travel</option>
              </select>
            </div>

            {/* How did you hear */}
            <div className="space-y-2">
              <label
                htmlFor="referral"
                className="block text-xs font-light tracking-[0.08em] uppercase text-gray-500"
              >
                How did you hear about me?
              </label>
              <input
                type="text"
                id="referral"
                name="referral"
                value={formData.referral}
                onChange={handleChange}
                className="w-full border-b border-gray-300 bg-transparent py-3 text-base font-light text-luxury-black placeholder-gray-400 outline-none transition-all duration-300 focus:border-gray-600"
                style={{ fontWeight: 300 }}
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-xs font-light tracking-[0.08em] uppercase text-gray-500"
              >
                Tell me about yourself
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Who you are, what you're looking for, and why we might be a good fit..."
                className="w-full border border-gray-300 bg-transparent px-4 py-3 text-base font-light leading-[1.8] text-luxury-black placeholder-gray-400 outline-none transition-all duration-300 focus:border-gray-600 resize-none"
                style={{ fontWeight: 300 }}
              />
            </div>

            {/* Divider */}
            <div className="my-12 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            {/* Submit */}
            <div className="text-center space-y-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-3 border border-gray-300 px-12 py-4 text-sm font-medium tracking-[0.1em] text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 hover:text-luxury-black hover:shadow-[0_4px_8px_rgba(0,0,0,0.08)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                style={{ fontWeight: 300 }}
              >
                {isSubmitting ? "SUBMITTING..." : "SUBMIT INQUIRY"}
              </button>

              <p className="text-xs font-light italic text-gray-500">
                All inquiries are handled with complete discretion.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Expectations Section */}
      <section className="border-t border-gray-200 py-20 md:py-28 bg-luxury-gray-50">
        <div className="container mx-auto px-6 md:px-8 max-w-2xl">
          <h2
            className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black"
            style={{ fontWeight: 200 }}
          >
            What to Expect
          </h2>

          <div className="space-y-6">
            <div className="border-l-2 border-gray-300 pl-4 py-2">
              <p className="text-base font-light leading-[1.8] text-gray-700">
                I read every inquiry personally, usually within 24 hours.
              </p>
            </div>
            <div className="border-l-2 border-gray-300 pl-4 py-2">
              <p className="text-base font-light leading-[1.8] text-gray-700">
                If the fit seems mutual, I'll respond with next steps and availability.
              </p>
            </div>
            <div className="border-l-2 border-gray-300 pl-4 py-2">
              <p className="text-base font-light leading-[1.8] text-gray-700">
                If I don't respond within 48 hours, it likely means I'm not the right match.
              </p>
            </div>
            <div className="border-l-2 border-gray-300 pl-4 py-2">
              <p className="text-base font-light leading-[1.8] text-gray-700">
                All correspondence remains private, regardless of outcome.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-luxury-white px-6 py-16">
        <div className="mx-auto max-w-[620px] space-y-6 text-left">
          <nav className="flex flex-wrap gap-3 text-[14px] font-light text-luxury-black">
            <a
              href="/rates"
              className="underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline"
            >
              Rates
            </a>
            <a
              href="/faq"
              className="underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline"
            >
              FAQ
            </a>
            <a
              href="/about"
              className="underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline"
            >
              About
            </a>
          </nav>
          <p className="text-xs font-light text-gray-400 tracking-[0.08em]">
            © 2025 Katherine Taylor
          </p>
        </div>
      </footer>
    </div>
  );
};

export default InquirePage;
