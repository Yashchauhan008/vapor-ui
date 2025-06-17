import React, { useState, useEffect } from "react";
import {
  Play,
  ArrowRight,
  Sparkles,
  Zap,
  Code,
  Layers,
  Github,
  Download,
  ExternalLink,
  Star,
  Users,
  Rocket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VaporUILanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  // const [scrollY, setScrollY] = useState(0);
  const nav = useNavigate();
  const navItems = [
    { label: "Docs", url: "/interactive-elements/apple-dock" },
    { label: "Components", url: "/interactive-elements/apple-dock" },
    { label: "Showcase", url: "/interactive-elements/apple-dock" },
    { label: "GitHub", url: "https://github.com/Yashchauhan008/vapor-ui" },
  ];

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    // const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("mousemove", handleMouseMove);
    // window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigate = () => {
    nav("/interactive-elements/apple-dock");
  };

  const handleNavigateGit = () => {
    window.location.href = "https://github.com/Yashchauhan008/vapor-ui";
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden selection:bg-cyan-500/30">
      {/* Enhanced Dynamic Mouse Gradient */}
      <div
        className="fixed inset-0 opacity-40 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(900px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(1, 235, 255, 0.12), rgba(1, 235, 255, 0.06) 40%, transparent 70%)`,
        }}
      />

      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(1,235,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(1,235,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px] animate-grid"></div>

        {/* Enhanced Floating Orbs with Cyan Theme */}
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-cyan-300 via-cyan-500 to-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-float-slow"></div>
        <div className="absolute top-10 right-10 w-48 h-48 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mix-blend-screen filter blur-2xl opacity-15 animate-float-reverse"></div>
      </div>

      {/* Enhanced Noise Texture with Cyan Tint */}
      <div className="absolute inset-0 opacity-[0.02] bg-noise mix-blend-overlay"></div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Enhanced Navigation with Parallax */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${
            isLoaded
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <div className="mx-auto max-w-7xl px-6 py-6">
            <div className="backdrop-blur-2xl bg-black/20 border border-white/10 rounded-2xl p-4 shadow-2xl shadow-cyan-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 group cursor-pointer">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                      <Zap className="w-6 h-6 text-white animate-pulse" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-white tracking-tight">
                      VaporUI
                    </h1>
                    <p className="text-xs text-cyan-300 -mt-1 animate-pulse">
                      Next-Gen Interface
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center space-x-8">
                  {navItems.map((item, i) => (
                    <a
                      key={item.label}
                      href={item.url}
                      target={item.label === "GitHub" ? "_blank" : "_self"}
                      rel={item.label === "GitHub" ? "noopener noreferrer" : ""}
                      className={`text-gray-300 cursor-pointer hover:text-cyan-300 transition-all duration-300 text-sm font-medium hover:scale-110 relative group ${
                        item.label === "GitHub"
                          ? "flex items-center space-x-2"
                          : ""
                      }`}
                    >
                      {item.label === "GitHub" && (
                        <Github className="w-4 h-4" />
                      )}
                      <span>{item.label}</span>
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></div>
                    </a>
                  ))}

                  <button onClick={handleNavigate} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 relative overflow-hidden group">
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Enhanced Hero Section */}
        <section className="pt-40 pb-20 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-12">
              {/* Enhanced Badge with Stats */}
              <div
                onClick={handleNavigateGit}
                className={`inline-flex items-center space-x-4 bg-gradient-to-r from-white/5 via-cyan-500/5 to-white/5 backdrop-blur-2xl border border-cyan-500/20 rounded-full px-8 py-4 group hover:bg-gradient-to-r hover:from-white/10 hover:via-cyan-500/10 hover:to-white/10 transition-all duration-500 cursor-pointer shadow-lg shadow-cyan-500/10 ${
                  isLoaded ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full -translate-x-4"></div>
                </div>
                <span className="text-sm text-gray-300 font-medium -translate-x-3">
                  Introducing VaporJS 2.0
                </span>
                <div className="flex items-center space-x-4 text-xs text-cyan-300">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>12.4k</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>50k+</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-2 transition-transform duration-300" />
              </div>

              {/* Enhanced Main Heading with Better Typography */}
              <div
                className={`transition-all duration-1000 delay-200 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
              >
                <div className="relative">
                  <h1 className="z-10 text-7xl md:text-9xl lg:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-200 leading-none -translate-y-3 tracking-tighter animate-text-shimmer">
                    CRAFT
                  </h1>
                  <div className="z-[10] absolute inset-0 text-7xl md:text-9xl lg:text-[12rem] font-black text-cyan-500/10 blur-3xl tracking-tighter">
                    CRAFT
                  </div>
                </div>
                <h2 className="z-[200] text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 -mt-6 lg:-mt-12 tracking-tight animate-text-glow">
                  BEAUTIFUL
                </h2>
                <h3 className="z-[300] text-4xl md:text-6xl lg:text-7xl font-black text-white/90 -mt-4 lg:-mt-8 tracking-wide translate-y-[10px]">
                  INTERFACES
                </h3>
              </div>

              {/* Enhanced Subtitle with Better Spacing */}
              <div
                className={`space-y-6 transition-all duration-1000 delay-400 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
              >
                <p className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                  The next-generation UI library that empowers developers to
                  create
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold">
                    {" "}
                    award-winning interfaces{" "}
                  </span>
                  with glassmorphic designs, fluid animations, and premium
                  aesthetics.
                </p>

                {/* New Feature Highlights */}
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2">
                    <Rocket className="w-4 h-4 text-cyan-400" />
                    <span>Lightning Fast</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2">
                    <Code className="w-4 h-4 text-cyan-400" />
                    <span>JavaScript Ready</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>50+ Components</span>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row items-center justify-center gap-8 pt-12 transition-all duration-1000 delay-600 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
              >
                <button onClick={handleNavigate} className="group relative bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-600 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-500 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 flex items-center space-x-4 overflow-hidden">
                  <Download className="w-6 h-6 group-hover:animate-bounce" />
                  <span className="relative z-10">Start Building</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/30 rounded-full animate-ping"></div>
                </button>

                <button className="group flex items-center space-x-6 text-white hover:text-cyan-300 transition-all duration-300">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-white/10 via-cyan-500/10 to-white/5 backdrop-blur-2xl border border-cyan-500/20 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-white/20 group-hover:via-cyan-500/20 group-hover:to-white/10 group-hover:border-cyan-400/40 transition-all duration-300 group-hover:scale-110 shadow-lg shadow-cyan-500/10">
                      <Play className="w-7 h-7 fill-current ml-1 text-cyan-400" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-xl">Watch Demo</p>
                    <p className="text-sm text-gray-400">
                      3 min showcase • 4K quality
                    </p>
                  </div>
                </button>
              </div>

              {/* New Trust Indicators */}
              {/* <div className={`pt-16 transition-all duration-1000 delay-800 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <p className="text-sm text-gray-500 mb-6">Trusted by leading companies worldwide</p>
                <div className="flex justify-center items-center space-x-12 opacity-40">
                  {['Vercel', 'GitHub', 'Stripe', 'Discord', 'Shopify'].map((company, i) => (
                    <div key={company} className="text-white font-semibold text-lg hover:text-cyan-300 transition-colors cursor-pointer">
                      {company}
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* Enhanced Showcase Cards */}
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Enhanced Main Feature Card */}
              <div
                className={`lg:col-span-2 group cursor-pointer transition-all duration-1000 delay-1000 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-40 opacity-0"
                }`}
              >
                <div className="relative h-[28rem] bg-gradient-to-br from-white/10 via-cyan-500/5 to-transparent backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 hover:border-cyan-400/40 transition-all duration-500 group-hover:scale-[1.02] overflow-hidden shadow-2xl shadow-cyan-500/10">
                  {/* Enhanced animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                            <Sparkles className="w-7 h-7 text-white animate-pulse" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold text-white">
                              Glassmorphic Design System
                            </h3>
                            <p className="text-cyan-300 text-sm font-medium">
                              Premium UI Components • v2.0
                            </p>
                          </div>
                        </div>
                        <div className="text-right text-xs text-gray-400">
                          <p>Latest Update</p>
                          <p className="text-cyan-400">2 hours ago</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-gray-300 text-xl leading-relaxed">
                          Experience the future of interface design with our
                          revolutionary glassmorphic components. Built for
                          performance, designed for beauty, optimized for
                          developers.
                        </p>

                        {/* New feature list */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          {[
                            "Dark/Light themes",
                            "Responsive design",
                            "Custom animations",
                          ].map((feature, i) => (
                            <div
                              key={i}
                              className="flex items-center space-x-2 text-sm text-gray-400"
                            >
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6">
                      <div className="flex space-x-3">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              i === 0
                                ? "bg-cyan-400 w-12"
                                : i === 1
                                ? "bg-cyan-400/60 w-8"
                                : "bg-white/20 w-2"
                            }`}
                          ></div>
                        ))}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-gray-400">
                          Explore more
                        </span>
                        <ExternalLink className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors group-hover:scale-110" />
                      </div>
                    </div>
                  </div>

                  {/* Enhanced floating elements */}
                  <div className="absolute top-6 right-6 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                  <div className="absolute top-[26px] right-[26px] w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-20 right-8 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce"></div>
                </div>
              </div>

              {/* Enhanced Side Cards */}
              <div className="space-y-8">
                {[
                  {
                    icon: Code,
                    title: "Developer Experience",
                    desc: "Intuitive APIs & Documentation",
                    color: "from-cyan-500 to-blue-600",
                  },
                  {
                    icon: Layers,
                    title: "Component Library",
                    desc: "50+ Premium Components",
                    color: "from-blue-500 to-teal-500",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className={`group cursor-pointer transition-all duration-1000 ${
                      isLoaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-40 opacity-0"
                    }`}
                    style={{ transitionDelay: `${1200 + i * 200}ms` }}
                  >
                    <div className="relative bg-gradient-to-br from-white/8 via-cyan-500/5 to-transparent backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 hover:border-cyan-400/40 transition-all duration-500 group-hover:scale-105 overflow-hidden shadow-xl shadow-cyan-500/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative z-10">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/20`}
                        >
                          <card.icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-white font-bold text-xl mb-3">
                          {card.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {card.desc}
                        </p>

                        {/* Progress indicator */}
                        <div className="mt-6 flex items-center space-x-2">
                          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${card.color} transform scale-x-75 origin-left transition-transform duration-1000 group-hover:scale-x-100`}
                            ></div>
                          </div>
                          <span className="text-xs text-cyan-400 font-medium">
                            95%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="border-t border-cyan-500/10 px-6 py-16 bg-gradient-to-t from-black to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6">
              {/* <div className="flex justify-center items-center space-x-6 text-gray-400 text-sm">
                <a href="#" className="hover:text-cyan-300 transition-colors">
                  Privacy
                </a>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <a href="#" className="hover:text-cyan-300 transition-colors">
                  Terms
                </a>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <a href="#" className="hover:text-cyan-300 transition-colors">
                  Support
                </a>
              </div> */}
              <p className="text-gray-500 text-sm">
                © 2025 VaporUI. Crafted with precision for the modern web.
                <span onClick={()=>window.location.href="https://yash-chauhan.vercel.app"} className="text-cyan-400">
                  {" "}
                  Made with ❤️ for Yash chauhan
                </span>
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(8deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-35px) rotate(-8deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(20px) rotate(-3deg);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes text-shimmer {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes text-glow {
          0%,
          100% {
            text-shadow: 0 0 20px rgba(1, 235, 255, 0.5);
          }
          50% {
            text-shadow: 0 0 40px rgba(1, 235, 255, 0.8);
          }
        }
        @keyframes grid {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(80px);
          }
        }
        @keyframes particle {
          0% {
            opacity: 0;
            transform: translateY(100vh) scale(0);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-100vh) scale(1);
          }
        }
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 9s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 11s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 6s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        .animate-text-shimmer {
          background-size: 200% 200%;
          animation: text-shimmer 4s ease-in-out infinite;
        }
        .animate-text-glow {
          animation: text-glow 3s ease-in-out infinite;
        }
        .animate-grid {
          animation: grid 20s linear infinite;
        }
        .animate-particle {
          animation: particle linear infinite;
        }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
