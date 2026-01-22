import { motion, AnimatePresence } from "framer-motion";
import { User, X, Mail, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export interface Profile {
    id: number;
    name: string;
    title: string;
    description: string;
    image?: string;
    // ADDRESS
    buildingName?: string;
    doorShopNo?: string;
    floor?: string;
    street?: string;
    locality?: string;
    landmark?: string;
    state: string;
    city: string;
    pincode?: string;
    gpsLocation?: string;
    // WEBSITE/APP
    website?: string;
    // AVAILABILITY
    availability24x7?: boolean;
    workingDaysFull?: string;
    workingHoursFull?: string;
    breakTime?: string;
    workingDaysHalf?: string;
    workingHoursHalf?: string;
    weeklyOff?: string;
    // CONTACT INFORMATION
    email: string;
    countryCode?: string;
    phone: string;
    contactPersonName?: string;
    contactPersonDesignation?: string;
    preferredLanguages?: string;
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

                <div className="p-4 flex flex-col grow">
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
            className="fixed inset-0 z-999 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
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
                <div className="bg-prochure-bg p-6 text-white relative shrink-0">
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

                        {/* ADDRESS */}
                        {(profile.buildingName || profile.doorShopNo || profile.floor || profile.street || profile.locality || profile.landmark || profile.pincode || profile.gpsLocation) && (
                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Address</h3>
                                <h5 className="text-sm text-slate-400">Head Office / Registered Office / Main Branch</h5>
                                <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                                    {profile.buildingName && <div className="text-slate-700">{profile.buildingName}</div>}
                                    {profile.doorShopNo && <div className="text-slate-700">{profile.doorShopNo}</div>}
                                    {profile.floor && <div className="text-slate-700">{profile.floor}</div>}
                                    {profile.street && <div className="text-slate-700">{profile.street}</div>}
                                    {profile.locality && <div className="text-slate-700">{profile.locality}</div>}
                                    {profile.landmark && <div className="text-slate-700"><span className="font-semibold text-slate-600">Nearest Landmark:</span> {profile.landmark}</div>}
                                    {profile.state && <div className="text-slate-700"><span className="font-semibold text-slate-600">State / Province:</span> {profile.state}</div>}
                                    {profile.city && <div className="text-slate-700"><span className="font-semibold text-slate-600">City / Town:</span> {profile.city}</div>}
                                    {profile.pincode && <div className="text-slate-700"><span className="font-semibold text-slate-600">Pin code / Zip code:</span> {profile.pincode}</div>}
                                </div>
                            </div>
                        )}

                        {/* WEBSITE/APP */}
                        {profile.website && (
                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Website / App</h3>
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-prochure-500 hover:underline break-all">
                                        {profile.website}
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* AVAILABILITY */}
                        {(profile.availability24x7 || profile.workingDaysFull || profile.workingHoursFull || profile.breakTime || profile.workingDaysHalf || profile.workingHoursHalf || profile.weeklyOff) && (
                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Availability</h3>
                                <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                                    {profile.availability24x7 && (
                                        <div className="text-slate-700">We are available 24 x 7, 365 days</div>
                                    )}
                                    {!profile.availability24x7 && (
                                        <>
                                            {profile.workingDaysFull && <div className="text-slate-700"><span className="font-semibold text-slate-600">Working Days (Full):</span> {profile.workingDaysFull}</div>}
                                            {profile.workingHoursFull && <div className="text-slate-700"><span className="font-semibold text-slate-600">Working Hours:</span> {profile.workingHoursFull}</div>}
                                            {profile.breakTime && <div className="text-slate-700"><span className="font-semibold text-slate-600">Break Time:</span> {profile.breakTime}</div>}
                                            {profile.workingDaysHalf && <div className="text-slate-700"><span className="font-semibold text-slate-600">Working Days (Half):</span> {profile.workingDaysHalf}</div>}
                                            {profile.workingHoursHalf && <div className="text-slate-700"><span className="font-semibold text-slate-600">Working Hours:</span> {profile.workingHoursHalf}</div>}
                                            {profile.weeklyOff && <div className="text-slate-700"><span className="font-semibold text-slate-600">Weekly Off:</span> {profile.weeklyOff}</div>}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

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
                                    <span>{profile.countryCode ? `${profile.countryCode} ` : ''}{profile.phone}</span>
                                </div>
                                {profile.contactPersonName && (
                                    <div className="text-slate-700"><span className="font-semibold text-slate-600">Contact Person:</span> {profile.contactPersonName}</div>
                                )}
                                {profile.contactPersonDesignation && (
                                    <div className="text-slate-700"><span className="font-semibold text-slate-600">Designation:</span> {profile.contactPersonDesignation}</div>
                                )}
                                {profile.preferredLanguages && (
                                    <div className="text-slate-700"><span className="font-semibold text-slate-600">Languages:</span> {profile.preferredLanguages}</div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                {/* <div className="p-4 border-t border-gray-100 flex justify-end gap-3 shrink-0 bg-white">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-medium"
                    >
                        Close
                    </button>
                    <button className="px-6 py-2 bg-prochure-bg text-white rounded-lg hover:bg-prochure-900 transition-colors font-medium shadow-lg shadow-prochure-bg/20">
                        Contact Now
                    </button>
                </div> */}
            </motion.div>
        </motion.div>,
        document.body
    );
}
