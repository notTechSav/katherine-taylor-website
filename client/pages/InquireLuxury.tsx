'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, addDays } from "date-fns";
import { ChevronRight, ChevronLeft, Check, Lock, Calendar as CalendarIcon, User, Mail, Phone, Building, Globe, Sparkles, Clock, Shield, Diamond } from "lucide-react";

const inquirySchema = z.object({
  serviceType: z.enum(["consultation", "keynote", "advisory", "partnership", "custom"]),
  projectBudget: z.enum(["under100k", "100k-250k", "250k-500k", "500k-1m", "above1m"]),
  timeline: z.enum(["immediate", "1month", "3months", "6months", "planning"]),
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  company: z.string().min(2, "Company required"),
  position: z.string().min(2, "Position required"),
  website: z.string().url("Valid URL required").optional().or(z.literal("")),
  projectDescription: z.string().min(100, "Minimum 100 characters required"),
  desiredOutcomes: z.array(z.string()).min(1, "Select at least one outcome"),
  referralSource: z.enum(["search", "referral", "social", "press", "event", "other"]),
  referralDetails: z.string().optional(),
  preferredDates: z.array(z.string()).min(1, "Select at least one date"),
  preferredTimeSlot: z.enum(["morning", "afternoon", "evening", "flexible"]),
  meetingType: z.enum(["inperson-sf", "inperson-sac", "inperson-other", "virtual", "hybrid"]),
  linkedinProfile: z.string().url("Valid LinkedIn URL required"),
  ndaRequired: z.boolean(),
  termsAccepted: z.boolean().refine(val => val === true, "Terms must be accepted")
});

type FormData = z.infer<typeof inquirySchema>;

const InquireLuxury = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    trigger,
    setValue,
    getValues
  } = useForm<FormData>({
    resolver: zodResolver(inquirySchema),
    mode: "onChange",
    defaultValues: {
      desiredOutcomes: [],
      preferredDates: [],
      ndaRequired: false,
      termsAccepted: false,
      website: ""
    }
  });

  useEffect(() => {
    document.title = "Luxury Inquiry | Katherine Taylor";

    // Generate sparse availability
    const dates: string[] = [];
    const baseDate = new Date();
    for (let i = 7; i < 60; i++) {
      const date = addDays(baseDate, i);
      if (Math.random() > 0.8) {
        dates.push(format(date, 'yyyy-MM-dd'));
      }
    }
    setAvailableDates(dates);
  }, []);

  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return await trigger(["serviceType", "projectBudget", "timeline"]);
      case 2:
        return await trigger(["firstName", "lastName", "email", "phone", "company", "position"]);
      case 3:
        return await trigger(["projectDescription", "desiredOutcomes", "referralSource"]);
      case 4:
        return await trigger(["preferredDates", "preferredTimeSlot", "meetingType"]);
      case 5:
        return await trigger(["linkedinProfile", "termsAccepted"]);
      default:
        return false;
    }
  };

  const nextStep = async () => {
    const isValidStep = await validateStep(currentStep);
    if (isValidStep && currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/luxury-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        window.location.href = "/inquiry-confirmed";
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedOutcomes = watch("desiredOutcomes") || [];
  const selectedDates = watch("preferredDates") || [];

  const toggleOutcome = (outcome: string) => {
    const current = getValues("desiredOutcomes") || [];
    const updated = current.includes(outcome)
      ? current.filter(o => o !== outcome)
      : [...current, outcome];
    setValue("desiredOutcomes", updated, { shouldValidate: true });
  };

  const toggleDate = (date: string) => {
    const current = getValues("preferredDates") || [];
    const updated = current.includes(date)
      ? current.filter(d => d !== date)
      : [...current, date];
    setValue("preferredDates", updated, { shouldValidate: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-3xl mx-auto px-8 py-20">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4, 5].map(step => (
              <div key={step} className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                currentStep >= step ? 'bg-gray-900 border-gray-900 text-white' : 'border-gray-300 text-gray-400'
              }`}>
                {step}
              </div>
            ))}
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gray-900"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / 5) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-thin mb-2">Begin Your Journey</h1>
                  <p className="text-gray-600">Tell us about your engagement needs</p>
                </div>

                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-wider text-gray-600">Service Type</label>
                  <Controller
                    name="serviceType"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { value: "consultation", label: "Consultation" },
                          { value: "keynote", label: "Keynote" },
                          { value: "advisory", label: "Advisory" },
                          { value: "partnership", label: "Partnership" },
                          { value: "custom", label: "Custom" }
                        ].map(type => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => field.onChange(type.value)}
                            className={`p-4 border rounded-lg transition-all ${
                              field.value === type.value ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                  {errors.serviceType && <p className="text-xs text-red-600">{errors.serviceType.message}</p>}
                </div>

                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-wider text-gray-600">Investment Range</label>
                  <Controller
                    name="projectBudget"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        {[
                          { value: "under100k", label: "Under $100K" },
                          { value: "100k-250k", label: "$100K - $250K" },
                          { value: "250k-500k", label: "$250K - $500K" },
                          { value: "500k-1m", label: "$500K - $1M" },
                          { value: "above1m", label: "Above $1M" }
                        ].map(option => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => field.onChange(option.value)}
                            className={`w-full p-4 border rounded-lg text-left transition-all ${
                              field.value === option.value ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                  {errors.projectBudget && <p className="text-xs text-red-600">{errors.projectBudget.message}</p>}
                </div>

                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-wider text-gray-600">Timeline</label>
                  <Controller
                    name="timeline"
                    control={control}
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-3">
                        {[
                          { value: "immediate", label: "Immediate" },
                          { value: "1month", label: "1 Month" },
                          { value: "3months", label: "3 Months" },
                          { value: "6months", label: "6 Months" },
                          { value: "planning", label: "Planning" }
                        ].map(time => (
                          <button
                            key={time.value}
                            type="button"
                            onClick={() => field.onChange(time.value)}
                            className={`px-6 py-3 border rounded-full transition-all ${
                              field.value === time.value ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            {time.label}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                  {errors.timeline && <p className="text-xs text-red-600">{errors.timeline.message}</p>}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-thin mb-2">Your Information</h1>
                  <p className="text-gray-600">Tell us about yourself</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-gray-600">First Name</label>
                    <input
                      {...register("firstName")}
                      className="w-full p-4 border border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none"
                      placeholder="John"
                    />
                    {errors.firstName && <p className="text-xs text-red-600">{errors.firstName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-gray-600">Last Name</label>
                    <input
                      {...register("lastName")}
                      className="w-full p-4 border border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none"
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="text-xs text-red-600">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-600">Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full p-4 border border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none"
                    placeholder="john@company.com"
                  />
                  {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-600">Phone</label>
                  <input
                    {...register("phone")}
                    type="tel"
                    className="w-full p-4 border border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none"
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-gray-600">Company</label>
                    <input
                      {...register("company")}
                      className="w-full p-4 border border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none"
                      placeholder="Company Name"
                    />
                    {errors.company && <p className="text-xs text-red-600">{errors.company.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-gray-600">Position</label>
                    <input
                      {...register("position")}
                      className="w-full p-4 border border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none"
                      placeholder="CEO, Director, etc."
                    />
                    {errors.position && <p className="text-xs text-red-600">{errors.position.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-600">Website (Optional)</label>
                  <input
                    {...register("website")}
                    type="url"
                    className="w-full p-4 border border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none"
                    placeholder="https://company.com"
                  />
                  {errors.website && <p className="text-xs text-red-600">{errors.website.message}</p>}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-thin mb-2">Project Details</h1>
                  <p className="text-gray-600">Describe what you're looking to achieve</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-600">Project Description</label>
                  <textarea
                    {...register("projectDescription")}
                    rows={6}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none resize-none"
                    placeholder="Tell us about your project, goals, and what you hope to achieve... (minimum 100 characters)"
                  />
                  {errors.projectDescription && <p className="text-xs text-red-600">{errors.projectDescription.message}</p>}
                </div>

                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-wider text-gray-600">Desired Outcomes</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Brand Enhancement",
                      "Thought Leadership",
                      "Strategic Guidance",
                      "Market Expansion",
                      "Revenue Growth",
                      "Team Development",
                      "Innovation",
                      "Partnership"
                    ].map(outcome => (
                      <button
                        key={outcome}
                        type="button"
                        onClick={() => toggleOutcome(outcome)}
                        className={`p-3 border rounded-lg text-sm transition-all ${
                          selectedOutcomes.includes(outcome)
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {outcome}
                      </button>
                    ))}
                  </div>
                  {errors.desiredOutcomes && <p className="text-xs text-red-600">{errors.desiredOutcomes.message}</p>}
                </div>

                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-wider text-gray-600">How Did You Hear About Us?</label>
                  <Controller
                    name="referralSource"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        {[
                          { value: "search", label: "Search Engine" },
                          { value: "referral", label: "Referral" },
                          { value: "social", label: "Social Media" },
                          { value: "press", label: "Press/Media" },
                          { value: "event", label: "Event" },
                          { value: "other", label: "Other" }
                        ].map(source => (
                          <button
                            key={source.value}
                            type="button"
                            onClick={() => field.onChange(source.value)}
                            className={`w-full p-3 border rounded-lg text-left transition-all ${
                              field.value === source.value
                                ? 'border-gray-900 bg-gray-900 text-white'
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            {source.label}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                  {errors.referralSource && <p className="text-xs text-red-600">{errors.referralSource.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-600">Additional Details (Optional)</label>
                  <input
                    {...register("referralDetails")}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none"
                    placeholder="e.g., referred by Jane Smith, saw you at TechConf 2024"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-thin mb-2">Scheduling</h1>
                  <p className="text-gray-600">Choose your preferred meeting times</p>
                </div>

                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-wider text-gray-600">Preferred Dates</label>
                  <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto p-4 border border-gray-200 rounded-lg">
                    {availableDates.map(date => (
                      <button
                        key={date}
                        type="button"
                        onClick={() => toggleDate(date)}
                        className={`p-3 border rounded-lg text-sm transition-all ${
                          selectedDates.includes(date)
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {format(new Date(date), 'MMM dd')}
                      </button>
                    ))}
                  </div>
                  {errors.preferredDates && <p className="text-xs text-red-600">{errors.preferredDates.message}</p>}
                </div>

                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-wider text-gray-600">Preferred Time</label>
                  <Controller
                    name="preferredTimeSlot"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: "morning", label: "Morning (9AM-12PM)" },
                          { value: "afternoon", label: "Afternoon (12PM-5PM)" },
                          { value: "evening", label: "Evening (5PM-8PM)" },
                          { value: "flexible", label: "Flexible" }
                        ].map(slot => (
                          <button
                            key={slot.value}
                            type="button"
                            onClick={() => field.onChange(slot.value)}
                            className={`p-4 border rounded-lg transition-all ${
                              field.value === slot.value
                                ? 'border-gray-900 bg-gray-900 text-white'
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                  {errors.preferredTimeSlot && <p className="text-xs text-red-600">{errors.preferredTimeSlot.message}</p>}
                </div>

                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-wider text-gray-600">Meeting Type</label>
                  <Controller
                    name="meetingType"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        {[
                          { value: "inperson-sf", label: "In-Person - San Francisco" },
                          { value: "inperson-sac", label: "In-Person - Sacramento" },
                          { value: "inperson-other", label: "In-Person - Other Location" },
                          { value: "virtual", label: "Virtual Meeting" },
                          { value: "hybrid", label: "Hybrid (In-Person + Virtual)" }
                        ].map(type => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => field.onChange(type.value)}
                            className={`w-full p-4 border rounded-lg text-left transition-all ${
                              field.value === type.value
                                ? 'border-gray-900 bg-gray-900 text-white'
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                  {errors.meetingType && <p className="text-xs text-red-600">{errors.meetingType.message}</p>}
                </div>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-thin mb-2">Verification</h1>
                  <p className="text-gray-600">Final details for your inquiry</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gray-600">LinkedIn Profile</label>
                  <input
                    {...register("linkedinProfile")}
                    type="url"
                    className="w-full p-4 border border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                  {errors.linkedinProfile && <p className="text-xs text-red-600">{errors.linkedinProfile.message}</p>}
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-400">
                    <input
                      {...register("ndaRequired")}
                      type="checkbox"
                      className="w-5 h-5"
                    />
                    <span className="text-sm">This project requires an NDA</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-400">
                    <input
                      {...register("termsAccepted")}
                      type="checkbox"
                      className="w-5 h-5"
                    />
                    <span className="text-sm">
                      I agree to the <a href="/terms" className="underline">Terms of Service</a> and <a href="/privacy" className="underline">Privacy Policy</a>
                    </span>
                  </label>
                  {errors.termsAccepted && <p className="text-xs text-red-600">{errors.termsAccepted.message}</p>}
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="font-light text-lg mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    What Happens Next
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 text-gray-900" />
                      <span>Immediate confirmation email with inquiry number</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 text-gray-900" />
                      <span>Verification review within 24-48 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 text-gray-900" />
                      <span>Discovery call scheduled within 72 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 text-gray-900" />
                      <span>Custom proposal delivered within 1 week</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="ml-auto px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquireLuxury;
