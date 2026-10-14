import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import ProfileForm from "../profile-kit/ProfileForm";
import { emptyFormValues } from "../profile-kit/format";
import type { ProfilePayload } from "../profile-kit/types";
import { useAuth } from "../context/AuthContext";
import { openAuthModal } from "../config/authEvents";
import { routeForSlug } from "../config/profileTypes";
import {
    createMyProfile,
    getErrorMessages,
    getMyProfile,
    loadCategoryOptions,
    loadSubCategoryOptions,
} from "../config/myProfileApi";
import { payListingFee } from "../config/razorpay";
import PageSpinner from "../components/PageSpinner";
import { useSeo } from "../hooks/useSeo";

export interface MyProfileLocationState {
    notice?: { kind: "success" | "error" | "info"; text: string };
}

export default function PublishProfilePage() {
    const { type } = useParams();
    const route = routeForSlug(type);
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();
    const [fee, setFee] = useState<number | null>(null);
    const [checking, setChecking] = useState(false);
    const isProfessionalConsultants = type === "professional-consultants";
    console.log(fee);
    

    const cardPublicName = isProfessionalConsultants ? 'Digital Business Card' : 'profile'

    useSeo({
        title: `Publish your ${route?.singular ?? ""} ${cardPublicName} | PROchure`,
        description: `Create your PROchure ${cardPublicName} and get discovered.`,
    });

    useEffect(() => {
        if (!user) return;
        let alive = true;
        setChecking(true);
        getMyProfile()
            .then((res) => {
                if (!alive) return;
                if (res.profile) navigate("/my-profile", { replace: true });
                else setFee(res.fee.amount);
            })
            .catch(() => undefined)
            .finally(() => alive && setChecking(false));
        return () => {
            alive = false;
        };
    }, [user, navigate]);

    const initialValues = useMemo(
        () => emptyFormValues({ phone: user?.phone, email: user?.email }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user?.id],
    );

    if (!route) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-slate-500">
                <h2 className="text-2xl font-bold mb-2">Not Found</h2>
                <Link to="/" className="mt-4 prochure-text hover:underline">Go Home</Link>
            </div>
        );
    }

    if (isLoading || checking) return <div className="min-h-[50vh] flex items-center justify-center"><PageSpinner /></div>;

    if (!user) {
        return (
            <div className="container mx-auto px-4 max-w-xl py-16 text-center">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Publish your {route.singular} {cardPublicName}</h1>
                <p className="text-slate-600 mb-8">Please log in or register first. Your profile will be linked to your account.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => openAuthModal("register")}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-prochure-bg text-white font-semibold hover:opacity-90 cursor-pointer"
                    >
                        <UserPlus size={18} /> Register
                    </button>
                    <button
                        onClick={() => openAuthModal("login")}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-prochure-bg prochure-text font-semibold hover:bg-prochure-50 cursor-pointer"
                    >
                        <LogIn size={18} /> Login
                    </button>
                </div>
            </div>
        );
    }

    const handleSubmit = async (payload: ProfilePayload) => {
        await createMyProfile(payload);
        let state: MyProfileLocationState;
        try {
            await payListingFee();
            state = { notice: { kind: "success", text: "Payment successful — your profile is now live!" } };
        } catch (err) {
            state = { notice: { kind: "error", text: getErrorMessages(err)[0] } };
        }
        navigate("/my-profile", { replace: true, state });
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Publish your {route.singular} {cardPublicName}</h1>
                <p className="mt-2 text-slate-600">
                    Fill in your details — the live preview shows exactly how your {isProfessionalConsultants ? 'e-visiting card' : 'profile'} will look to the public.
                </p>
            </div>
            <ProfileForm
                profileType={route.type}
                initialValues={initialValues}
                loadCategories={loadCategoryOptions}
                loadSubCategories={loadSubCategoryOptions}
                getErrorMessages={getErrorMessages}
                onSubmit={handleSubmit}
                submitLabel={"PUBLISH"}
                submittingLabel="Please wait…"
                onCancel={() => navigate(-1)}
            />
        </div>
    );
}
