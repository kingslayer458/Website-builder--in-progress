"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronRight, Layers, Zap, Code, Layout, Smartphone, PenTool, ArrowRight } from "lucide-react"
import { Button } from "../components/ui/button"

export default function LandingPage() {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigateToApp = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-emerald-50 to-teal-100">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0,0 L1000,0 L1000,1000 L0,1000 Z" fill="url(#topo-pattern)" />
          <defs>
            <pattern id="topo-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
              <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="#2D3748" strokeWidth="0.5" />
              <path d="M0,70 Q25,20 50,70 T100,70" fill="none" stroke="#2D3748" strokeWidth="0.5" />
              <path d="M0,90 Q25,40 50,90 T100,90" fill="none" stroke="#2D3748" strokeWidth="0.5" />
            </pattern>
          </defs>
        </svg>

        {/* Animated geometric shapes */}
        <motion.div
          className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full bg-gradient-to-r from-emerald-300/20 to-teal-300/20 blur-xl"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-[5%] w-80 h-80 rounded-full bg-gradient-to-r from-blue-300/20 to-cyan-300/20 blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white">
            <PenTool size={20} />
          </div>
          <h1 className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-700">
            GeoBuilder
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 transition-colors">
            How It Works
          </a>
          <a href="#testimonials" className="text-gray-700 hover:text-emerald-600 transition-colors">
            Testimonials
          </a>
          <Button
            onClick={navigateToApp}
            variant="outline"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
          >
            Launch App
          </Button>
        </nav>

        <Button
          onClick={navigateToApp}
          variant="outline"
          className="md:hidden border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
        >
          Launch
        </Button>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-20 pb-32 md:pt-32 md:pb-40 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-700">
            Build Beautiful Websites with Nature-Inspired Design
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Craft stunning websites with our intuitive drag-and-drop builder. Inspired by nature's patterns, designed
            for creators.
          </p>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
            <Button
              onClick={navigateToApp}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all group"
            >
              <span>Start Building Now</span>
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-6">
              Watch Demo
            </Button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="mt-16 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative mx-auto max-w-5xl rounded-xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 mix-blend-overlay" />
            <img src="/placeholder-nps4k.png" alt="Website Builder Interface" className="w-full h-auto" />
          </div>

          {/* Floating elements */}
          <motion.div
            className="absolute -top-8 -right-8 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-emerald-100"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Zap size={16} />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-800">Instant Preview</p>
                <p className="text-xs text-gray-500">See changes in real-time</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-emerald-100"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                <Smartphone size={16} />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-800">Fully Responsive</p>
                <p className="text-xs text-gray-500">Looks great on all devices</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-24 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Powerful Features</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to create stunning websites with ease, inspired by nature's perfect design patterns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers className="h-6 w-6 text-emerald-600" />,
                title: "Drag & Drop Builder",
                description:
                  "Intuitively build your website with our easy-to-use drag and drop interface. No coding required.",
              },
              {
                icon: <Layout className="h-6 w-6 text-emerald-600" />,
                title: "Responsive Design",
                description: "Create websites that look perfect on desktop, tablet, and mobile devices automatically.",
              },
              {
                icon: <PenTool className="h-6 w-6 text-emerald-600" />,
                title: "Nature-Inspired Templates",
                description: "Start with beautiful templates inspired by natural patterns and geometric designs.",
              },
              {
                icon: <Code className="h-6 w-6 text-emerald-600" />,
                title: "Custom Code Injection",
                description: "Add your own HTML, CSS, and JavaScript to extend functionality when needed.",
              },
              {
                icon: <Zap className="h-6 w-6 text-emerald-600" />,
                title: "AI-Powered Assistance",
                description: "Get intelligent suggestions and content generation powered by AI.",
              },
              {
                icon: <Smartphone className="h-6 w-6 text-emerald-600" />,
                title: "Export & Deploy",
                description: "Export your website or deploy directly to your hosting platform with one click.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Building your dream website is as simple as following these steps
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-emerald-200 hidden md:block" />

            {[
              {
                title: "Choose a Template",
                description: "Start with one of our nature-inspired templates or begin from scratch.",
                image: "/website-template-selection.png",
              },
              {
                title: "Customize Your Design",
                description: "Drag and drop elements, change colors, fonts, and images to match your vision.",
                image: "/placeholder-2w3k6.png",
              },
              {
                title: "Add Your Content",
                description: "Insert your text, images, videos, and other media to bring your website to life.",
                image: "/placeholder-akgts.png",
              },
              {
                title: "Preview & Publish",
                description: "Preview your site on different devices and publish it with a single click.",
                image: "/placeholder-v7gvz.png",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative mb-16 md:mb-24"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div
                  className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
                >
                  <div className="md:w-1/2">
                    <div className="relative">
                      {/* Step number */}
                      <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                        {index + 1}
                      </div>

                      <div className="rounded-xl overflow-hidden shadow-lg border border-emerald-100">
                        <img src={step.image || "/placeholder.svg"} alt={step.title} className="w-full h-auto" />
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/2 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-lg text-gray-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 px-6 py-24 bg-gradient-to-br from-emerald-50 to-teal-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who have built amazing websites with our platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Freelance Designer",
                image: "/professional-woman-headshot.png",
                quote:
                  "This builder has completely transformed how I create websites for my clients. The nature-inspired templates are stunning and save me hours of work.",
              },
              {
                name: "Michael Chen",
                role: "Small Business Owner",
                image: "/asian-man-professional-headshot.png",
                quote:
                  "As someone with no technical background, I was able to create a beautiful website for my business in just one afternoon. The interface is incredibly intuitive.",
              },
              {
                name: "Emily Rodriguez",
                role: "Marketing Director",
                image: "/latina-professional-headshot.png",
                quote:
                  "The responsive design features ensure our website looks perfect on every device. We've received so many compliments on our new site's design.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-24 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Build Your Dream Website?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join thousands of creators and businesses who have already transformed their online presence.
          </p>

          <Button
            onClick={navigateToApp}
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-10 py-7 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg group"
          >
            <span>Click Here to Start Building</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="mt-6 text-sm text-gray-500">No credit card required. Start building for free.</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white">
                  <PenTool size={20} />
                </div>
                <h1 className="ml-3 text-xl font-bold text-white">GeoBuilder</h1>
              </div>
              <p className="text-gray-400">Building beautiful websites inspired by nature's perfect design.</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Updates
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Licenses
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} GeoBuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
