import { motion, AnimatePresence } from "framer-motion";
import { User, X, MapPin, Mail, Phone, Globe, Clock, Star, Briefcase, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export interface Profile {
    id: number;
    name: string;
    title: string;
    description: string;
    experience: string;
    location: string;
    email: string;
    phone: string;
    state: string;
    city: string;
    languages: string;
    availability: string;
    rating: string;
    image?: string;
}

interface ProfileCardProps {
    profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div
                className="group relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl hover:shadow-prochure-bg/20 bg-gray-50 transition-all duration-300 h-full flex flex-col"
            >
                <div className="aspect-square w-full bg-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-prochure-100/50 transition-colors duration-300">
                    {profile.image ? (
                        <img
                            src={profile.image}
                            alt={profile.name}
                            className="w-full h-full object-cover transition-transform duration-500"
                        />
                    ) : (
                        <User size={64} className="group-hover:prochure-text transition-colors duration-300" />
                    )}
                </div>

                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-slate-900 mb-1 truncate group-hover:prochure-text transition-colors">
                        {profile.name}
                    </h3>
                    {/* <p className="text-sm text-slate-500 mb-4 truncate">{profile.title}</p> */}
                    <p className="text-sm text-slate-500 mb-4 truncate">{profile.city} | {profile.state}</p>


                    <div className="mt-auto">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full py-2 px-4 bg-prochure-bg text-white rounded-lg font-medium shadow-sm transition-colors active:scale-95 transform cursor-pointer"
                        >
                            View Profile
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <Modal profile={profile} onClose={() => setIsModalOpen(false)} />
                )}
            </AnimatePresence>
        </>
    );
}

function Modal({ profile, onClose }: { profile: Profile; onClose: () => void }) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="bg-prochure-bg p-6 text-white relative flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-prochure-bg overflow-hidden border-2 border-white">
                            {profile.image ? (
                                <img
                                    src={profile.image}
                                    alt={profile.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User size={32} />
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold font-maiandra">{profile.name}</h2>
                            <p className="text-white/80">{profile.title}</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <div className="space-y-6">

                        {/* Description */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">About</h3>
                            <p className="text-slate-700 leading-relaxed">
                                {profile.description}
                            </p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InfoItem icon={Briefcase} label="Experience" value={profile.experience} />
                            <InfoItem icon={MapPin} label="Location" value={profile.location} />
                            <InfoItem icon={Globe} label="Languages" value={profile.languages} />
                            <InfoItem icon={Clock} label="Availability" value={profile.availability} />
                            <InfoItem icon={Star} label="Rating" value={profile.rating} />
                            <InfoItem icon={Award} label="ID" value={`#${profile.id.toString().padStart(4, '0')}`} />
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Contact Information</h3>
                            <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                                <div className="flex items-center gap-3 text-slate-700">
                                    <Mail size={18} className="prochure-text" />
                                    <span>{profile.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <Phone size={18} className="prochure-text" />
                                    <span>{profile.phone}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0 bg-white">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-medium"
                    >
                        Close
                    </button>
                    <button className="px-6 py-2 bg-prochure-bg text-white rounded-lg hover:bg-prochure-900 transition-colors font-medium shadow-lg shadow-prochure-bg/20">
                        Contact Now
                    </button>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
}

function InfoItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
            <Icon size={20} className="text-prochure-500 mt-0.5" />
            <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">{label}</p>
                <p className="font-medium text-slate-800">{value}</p>
            </div>
        </div>
    )
}
