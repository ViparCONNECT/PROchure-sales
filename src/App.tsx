import LoadingAnimation from "./components/LoadingAnimation";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import PublishProfilePage from "./pages/PublishProfilePage";
import MyProfilePage from "./pages/MyProfilePage";
import PaymentLinkPage from "./pages/PaymentLinkPage";
import InvoicePage from "./pages/InvoicePage";
import { LEGACY_TYPE_SLUGS } from "./config/profileTypes";
import Layout from "./components/Layout";
import LobbyPage from "./pages/LobbyPage";
import CategoryListPage from "./pages/CategoryListPage";
import SubcategoryListPage from "./pages/SubcategoryListPage";
import SubcategoryPage from "./SubcategoryPage";
import { SubscptionPage } from "./pages/SubscptionPage";
import PolicyPage from "./pages/PolicyPage";
import { useAuth } from "./context/AuthContext";
import { getMyProfile } from "./config/myProfileApi";

/** Old /consultants, /services, /retail, /products links → new type URLs (keeps the rest of the path). */
function LegacyTypeRedirect({ from }: { from: string }) {
  const rest = useParams()["*"];
  return <Navigate to={`/${LEGACY_TYPE_SLUGS[from]}${rest ? `/${rest}` : ""}`} replace />;
}

function ProfileCompletionGate() {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading || !user) return;
    const allowed = ["/my-profile", "/my-profile/invoice"];
    if (allowed.includes(location.pathname)) return;
    if (location.pathname.startsWith("/my-profile")) return;

    let active = true;
    getMyProfile()
      .then((res) => {
        if (!active) return;
        if (res.profile && !res.profileComplete) {
          navigate("/my-profile", {
            replace: true,
            state: {
              notice: {
                kind: "info",
                text: "Please complete the remaining mandatory profile details before continuing.",
              },
            },
          });
        }
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, [isLoading, location.pathname, navigate, user]);

  return null;
}

export default function App() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loading screen after 7 seconds (matching original)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isVisible ? (
        <AnimatePresence>
          <LoadingAnimation />
        </AnimatePresence>
      ) : (
        <BrowserRouter>
          <ProfileCompletionGate />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LobbyPage />} />
              <Route path="/register" element={<SubscptionPage />} />
              <Route path="/policies/:policySlug" element={<PolicyPage />} />
              <Route path="/publish/:type" element={<PublishProfilePage />} />
              <Route path="/my-profile" element={<MyProfilePage />} />
              <Route path="/my-profile/invoice" element={<InvoicePage />} />
              <Route path="/pay/:token" element={<PaymentLinkPage />} />
              {Object.keys(LEGACY_TYPE_SLUGS).map((old) => (
                <Route key={old} path={`/${old}/*`} element={<LegacyTypeRedirect from={old} />} />
              ))}
              <Route path=":type" element={<CategoryListPage />} />
              <Route path=":type/:category" element={<SubcategoryListPage />} />
              <Route path=":type/:category/:subcategory/:profileCode?" element={<SubcategoryPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
