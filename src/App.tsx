import LoadingAnimation from "./components/LoadingAnimation";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CategoryListPage from "./pages/CategoryListPage";
import SubcategoryListPage from "./pages/SubcategoryListPage";
import SubcategoryPage from "./SubcategoryPage";
import { SubscptionPage } from "./pages/SubscptionPage";

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
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/register" element={<SubscptionPage />} />
              <Route path=":type" element={<CategoryListPage />} />
              <Route path=":type/:category" element={<SubcategoryListPage />} />
              <Route path=":type/:category/:subcategory" element={<SubcategoryPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
