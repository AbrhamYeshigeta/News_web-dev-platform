import { Newspaper, Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useMobileMenu } from "../hooks/useMobileMenu";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

const navStructure = [
  { name: "HOME", type: "link", href: "#" },
  {
    name: "FEATURES",
    type: "dropdown",
    items: [
      { label: "Breaking News Alerts", value: "Push notifications" },
      { label: "Audio Articles", value: "Listen to stories (40+ languages)" },
      { label: "Daily Crossword", value: "Interactive puzzles" },
      { label: "News Quiz", value: "Test your knowledge" },
      { label: "Election Tracker", value: "Live results (seasonal)" },
      { label: "Weather Widget", value: "Local forecasts" },
      { label: "Compare Plans", value: "Free vs Premium features" },
    ],
  },
  {
    name: "NEWSLETTER",
    type: "dropdown",
    items: [
      {
        label: "Daily Briefing",
        value: "7AM ET, 5-min read (50k subscribers)",
      },
      { label: "Week in Review", value: "Sunday roundup (30k subscribers)" },
      { label: "Breaking News", value: "Instant alerts (100k subscribers)" },
      { label: "Tech Insider", value: "Wednesdays (15k subscribers)" },
      { label: "Sports Daily", value: "Evenings (20k subscribers)" },
      { label: "Manage Subscriptions", value: "Preference center" },
    ],
  },
  {
    name: "ADVERTISE",
    type: "dropdown",
    items: [
      { label: "Media Kit", value: "Download PDF (audience demographics)" },
      { label: "Rate Card", value: "CPM pricing, package deals" },
      { label: "Case Studies", value: "Past campaign results" },
      { label: "Ad Specs", value: "Dimensions, file types, deadlines" },
      { label: "Sponsored Content Guidelines", value: "Native ads policy" },
      { label: "Contact Sales", value: "sales@newsflow.com" },
    ],
  },
  {
    name: "CONTACT",
    type: "dropdown",
    items: [
      { label: "General Inquiries", value: "hello@newsflow.com" },
      { label: "Newsroom", value: "editors@newsflow.com" },
      { label: "Careers", value: "jobs@newsflow.com" },
      { label: "Press Office", value: "pr@newsflow.com" },
      { label: "Technical Support", value: "support@newsflow.com" },
      { label: "Office Hours", value: "Mon-Fri, 9AM-6PM ET" },
    ],
  },
  {
    name: "ABOUT",
    type: "dropdown",
    items: [
      {
        label: "Our Story",
        value: 'Founded in 2024 with mission "Truth First"',
      },
      { label: "Leadership Team", value: "Photos + bios of 6 key executives" },
      { label: "Investors & Partners", value: "List of backers" },
      { label: "Diversity & Inclusion", value: "Our commitment statement" },
      { label: "Annual Report", value: "Download PDF (2023, 2024)" },
      { label: "In the News", value: "Press mentions" },
    ],
  },
  {
    name: "HELP",
    type: "dropdown",
    items: [
      { label: "Account Management", value: "Login, password reset" },
      { label: "Billing", value: "Payment methods, refunds, invoices" },
      { label: "Subscription", value: "Cancel, pause, upgrade" },
      { label: "Reading Experience", value: "Dark mode, font size" },
      { label: "Privacy Controls", value: "Data requests, cookie settings" },
      { label: "Report an Issue", value: "Form for bugs/errors" },
      { label: "Correction Request", value: "Form for fact errors" },
    ],
  },
];

interface NavbarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onAdminClick?: () => void;
}

export default function Navbar({
  activeCategory,
  onCategoryChange,
  onAdminClick,
}: NavbarProps) {
  const { isOpen, toggle, close } = useMobileMenu();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleNavClick = (category: string) => {
    onCategoryChange(category);
    close();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ui-border bg-page-bg/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8 border-t-2 border-accent-blue">
        {/* Logo */}
        <button
          onClick={() => onCategoryChange("HOME")}
          className="flex items-center gap-2 text-xl font-black tracking-tighter text-text-primary uppercase mr-10 group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded bg-accent-blue text-white group-hover:scale-110 transition-transform">
            <Newspaper className="h-5 w-5" />
          </div>
          <span className="hidden xl:inline-block">NEWSFLOW</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4">
          {navStructure.map((item) => (
            <div
              key={item.name}
              className="relative py-4"
              onMouseEnter={() =>
                item.type === "dropdown" && setActiveDropdown(item.name)
              }
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() =>
                  item.type === "link" && onCategoryChange(item.name)
                }
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-md text-[11px] font-extrabold uppercase tracking-[0.1em] transition-all duration-200",
                  activeCategory === item.name || activeDropdown === item.name
                    ? "text-accent-blue bg-accent-blue/5"
                    : "text-text-muted hover:text-text-primary hover:bg-card-bg",
                )}
              >
                {item.name}
                {item.type === "dropdown" && (
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 text-text-muted/50 transition-transform duration-300",
                      activeDropdown === item.name && "rotate-180",
                    )}
                  />
                )}
              </button>

              {/* Mega Dropdown */}
              <AnimatePresence>
                {item.type === "dropdown" && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    className="absolute left-0 mt-2 w-72 rounded-2xl border border-ui-border bg-page-bg shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-3 z-50 overflow-hidden"
                  >
                    <div className="p-4 mb-3 bg-card-bg rounded-xl border border-ui-border/50">
                      <div className="flex items-center gap-3 text-accent-blue mb-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                          {item.name}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-text-muted/70 leading-relaxed italic">
                        Explore our specialized {item.name.toLowerCase()}{" "}
                        services and information hub.
                      </p>
                    </div>

                    <div className="space-y-1">
                      {item.items?.map((subItem) => (
                        <button
                          key={subItem.label}
                          className="w-full text-left px-4 py-3 rounded-xl hover:bg-accent-blue/[0.03] active:bg-accent-blue/5 group transition-all duration-200 flex flex-col"
                        >
                          <span className="text-[11px] font-black text-text-primary group-hover:text-accent-blue transition-colors flex items-center justify-between uppercase tracking-wider">
                            {subItem.label}
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                          </span>
                          <span className="text-[9px] font-bold text-text-muted/60 mt-1 line-clamp-1">
                            {subItem.value}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onAdminClick}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-black uppercase tracking-[0.15em] border border-ui-border rounded hover:bg-card-bg transition-colors text-text-primary"
          >
            LOGIN
          </button>
          <button className="px-5 py-2 text-xs font-black uppercase tracking-widest bg-accent-green rounded text-white hover:bg-accent-green/90 transition-all shadow-lg shadow-accent-green/20 active:scale-95">
            SUBSCRIBE
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-text-muted hover:text-text-primary"
            onClick={toggle}
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l border-ui-border bg-page-bg overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-ui-border">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-accent-blue flex items-center justify-center text-white">
                    <Newspaper className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-black uppercase text-text-primary tracking-tighter">
                    MENU
                  </span>
                </div>
                <button
                  onClick={close}
                  className="p-2 text-text-muted hover:text-text-primary"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <nav className="flex flex-col gap-4">
                  {navStructure.map((item) => (
                    <div key={item.name} className="space-y-3">
                      <button
                        onClick={() =>
                          item.type === "link" && handleNavClick(item.name)
                        }
                        className={cn(
                          "w-full flex items-center justify-between text-left text-[11px] font-black uppercase tracking-[0.2em] transition-colors",
                          activeCategory === item.name
                            ? "text-accent-blue"
                            : "text-text-primary",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "w-1 h-3 rounded-full",
                              activeCategory === item.name
                                ? "bg-accent-blue"
                                : "bg-ui-border",
                            )}
                          ></span>
                          {item.name}
                        </div>
                        {item.type === "dropdown" && (
                          <div className="flex flex-col items-center">
                            <ChevronDown className="w-4 h-4 text-text-muted/30" />
                          </div>
                        )}
                      </button>

                      {item.type === "dropdown" && (
                        <div className="grid grid-cols-1 gap-2 pl-4 ml-6 border-l border-ui-border/50">
                          {item.items?.map((subItem) => (
                            <button
                              key={subItem.label}
                              className="text-left py-2 group active:bg-accent-blue/5 transition-colors rounded-lg px-2"
                            >
                              <p className="text-[10px] font-black uppercase tracking-wider text-text-primary group-hover:text-accent-blue transition-colors">
                                {subItem.label}
                              </p>
                              <p className="text-[9px] font-bold text-text-muted/60">
                                {subItem.value}
                              </p>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="pt-8 border-t border-ui-border flex flex-col gap-4">
                  <button
                    onClick={() => {
                      close();
                      if (onAdminClick) onAdminClick();
                    }}
                    className="w-full h-12 flex items-center justify-center rounded-xl border border-ui-border text-sm font-black uppercase tracking-widest text-text-primary hover:bg-card-bg"
                  >
                    LOGIN
                  </button>
                  <button className="w-full h-12 flex items-center justify-center rounded-xl bg-accent-green text-white text-sm font-black uppercase tracking-widest shadow-lg shadow-accent-green/20">
                    SUBSCRIBE NOW
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
