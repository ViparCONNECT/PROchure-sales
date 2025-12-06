export default function Footer() {
  return (
    <footer className="py-8 text-center text-slate-300 text-sm bg-prochure-bg border-t border-prochure-bg">
      &copy; {new Date().getFullYear()} PROchure. All rights reserved.
    </footer>
  );
}
