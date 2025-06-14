import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Monitor, 
  Zap, 
  Shield, 
  Bell, 
  BarChart3, 
  Globe,
  Check,
  ArrowRight,
  Star,
  Users,
  Twitter,
  Github,
  Linkedin
} from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function LandingPage() {
  const features = [
    {
      icon: Monitor,
      title: 'HTTP(s) Monitoring',
      description: 'Monitor your websites and APIs around the clock with detailed response time tracking.'
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      description: 'Get notified immediately via Email, Slack, Telegram, and more when issues arise.'
    },
    {
      icon: Globe,
      title: 'Public Status Page',
      description: 'Keep your users informed with beautiful, customizable public status pages.'
    },
    {
      icon: Shield,
      title: 'SSL Expiry Alerts',
      description: 'Never miss SSL certificate renewals with automated expiry notifications.'
    },
    {
      icon: BarChart3,
      title: 'Response Time Monitoring',
      description: 'Track performance trends with detailed response time analytics and charts.'
    },
    {
      icon: Zap,
      title: 'Multi-location Checks',
      description: 'Monitor from multiple global locations for comprehensive uptime verification.'
    }
  ];

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        '5 monitors',
        '5-minute checks',
        'Email alerts',
        '30-day data retention',
        'Basic status page'
      ],
      popular: false
    },
    {
      name: 'Solo',
      price: '$7',
      period: 'per month',
      features: [
        '20 monitors',
        '1-minute checks',
        'All alert types',
        '1-year data retention',
        'Custom status pages',
        'SSL monitoring'
      ],
      popular: true
    },
    {
      name: 'Team',
      price: '$25',
      period: 'per month',
      features: [
        '100 monitors',
        '30-second checks',
        'Team collaboration',
        'Unlimited data retention',
        'White-label status pages',
        'API access',
        'Priority support'
      ],
      popular: false
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      features: [
        'Unlimited monitors',
        '10-second checks',
        'SSO integration',
        'Advanced analytics',
        'Dedicated support',
        'SLA guarantees',
        'Custom integrations'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar isLanding={true} />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            {/* Animated Badge */}
            <div className="inline-flex items-center space-x-2 bg-dark-100/50 backdrop-blur-md border border-primary/30 rounded-full px-6 py-2 mb-8 animate-fade-in">
              <Star className="h-4 w-4 text-secondary animate-pulse" />
              <span className="text-sm text-gray-300">Trusted by 50,000+ developers worldwide</span>
            </div>
            
            {/* Main Heading with Staggered Animation */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              <span className="block animate-slide-up">Know when your website goes down.</span>
              <span className="block text-secondary animate-slide-up" style={{ animationDelay: '0.2s' }}>Before your users do.</span>
            </h1>
            
            {/* Subtitle with Fade Animation */}
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Monitor your websites, APIs, and services with instant alerts and beautiful status pages. 
              Join thousands of developers who trust Monitorly.
            </p>
            
            {/* CTA Buttons with Hover Animations */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25">
                  Start Monitoring Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto hover:scale-105 transition-all duration-300 hover:bg-white/10 hover:border-white/30">
                Explore Demo
              </Button>
            </div>
          </div>
          
          {/* Dashboard Preview with Floating Animation */}
          <div className="mt-20 relative animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl p-8 backdrop-blur-sm border border-primary/30 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20">
              <div className="bg-dark-100 rounded-2xl p-6 shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Dashboard Overview</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-dark-200 rounded-xl p-4 hover:bg-dark-200/80 transition-colors duration-300 group">
                    <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform duration-300">99.9%</div>
                    <div className="text-sm text-gray-400">Uptime</div>
                  </div>
                  <div className="bg-dark-200 rounded-xl p-4 hover:bg-dark-200/80 transition-colors duration-300 group">
                    <div className="text-2xl font-bold text-blue-400 group-hover:scale-110 transition-transform duration-300">245ms</div>
                    <div className="text-sm text-gray-400">Avg Response</div>
                  </div>
                  <div className="bg-dark-200 rounded-xl p-4 hover:bg-dark-200/80 transition-colors duration-300 group">
                    <div className="text-2xl font-bold text-secondary group-hover:scale-110 transition-transform duration-300">12</div>
                    <div className="text-sm text-gray-400">Active Monitors</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Everything you need to monitor</h2>
            <p className="text-xl text-gray-400 animate-fade-in" style={{ animationDelay: '0.2s' }}>Comprehensive monitoring tools for modern applications</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card hover={true} className="h-full transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-8 w-8 text-primary group-hover:text-secondary transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof with Counter Animation */}
      <section className="py-20 px-6 bg-dark-100/30 relative">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 animate-fade-in">Trusted by developers worldwide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center group animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform duration-300">50,000+</div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Active Users</div>
            </div>
            <div className="flex flex-col items-center group animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform duration-300">2M+</div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Monitors Created</div>
            </div>
            <div className="flex flex-col items-center group animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-4xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform duration-300">99.99%</div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Service Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section with Staggered Cards */}
      <section id="pricing" className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-400 animate-fade-in" style={{ animationDelay: '0.2s' }}>Choose the plan that fits your monitoring needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className={`relative h-full transform hover:scale-105 transition-all duration-300 ${
                  plan.popular 
                    ? 'border-primary hover:shadow-2xl hover:shadow-primary/20' 
                    : 'hover:shadow-xl hover:shadow-primary/10'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-bounce">
                      <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold mb-1 hover:text-primary transition-colors duration-300">{plan.price}</div>
                    <div className="text-gray-400 text-sm">{plan.period}</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center group">
                        <Check className="h-4 w-4 text-green-400 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={plan.popular ? 'primary' : 'outline'} 
                    className="w-full hover:scale-105 transition-all duration-300"
                  >
                    {plan.name === 'Enterprise' ? 'Contact Us' : 'Get Started'}
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with Hover Effects */}
      <footer className="py-16 px-6 bg-dark-100/50 border-t border-gray-800 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="animate-fade-in">
              <div className="flex items-center space-x-2 mb-4 group">
                <Monitor className="h-8 w-8 text-secondary group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Monitorly</span>
              </div>
              <p className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-300">
                Professional website monitoring for modern applications.
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Status</a></li>
              </ul>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Changelog</a></li>
              </ul>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-gray-400 text-sm">
              © 2024 Monitorly. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}