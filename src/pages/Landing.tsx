import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Star,
  Users,
  Shield,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
  Target,
  Play,
  Award,
  Clock,
  DollarSign,
  Handshake,
  Gift,
  Lightbulb
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Target,
      title: 'Smart Collaboration Management',
      description: 'Create, manage, and track product collaboration campaigns with intelligent matching algorithms.',
      benefit: 'Save 10+ hours per week on collaboration management'
    },
    {
      icon: Users,
      title: 'Verified Creator Network',
      description: 'Access thousands of verified creators, influencers, and product enthusiasts across all categories.',
      benefit: '95% faster collaboration setup'
    },
    {
      icon: Shield,
      title: 'AI Quality Protection',
      description: 'Advanced AI-powered quality detection ensures authentic collaborations and protects your brand.',
      benefit: '99.9% quality assurance accuracy'
    },
    {
      icon: Zap,
      title: 'Instant Collaboration',
      description: 'Creators get product samples instantly upon campaign approval through our secure system.',
      benefit: '2x faster creator engagement'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      description: 'Track collaboration performance, ROI, and engagement metrics in real-time dashboards.',
      benefit: '30% better collaboration ROI tracking'
    },
    {
      icon: Globe,
      title: 'Global Marketplace',
      description: 'Scale your collaboration campaigns across multiple ecommerce marketplaces worldwide.',
      benefit: 'Access to 15+ global marketplaces'
    }
  ];

  const stats = [
    { label: 'Active Collaborations', value: '2,500+', growth: '+23%', detail: 'this month' },
    { label: 'Verified Creators', value: '15,000+', growth: '+45%', detail: 'this month' },
    { label: 'Successful Partnerships', value: '50,000+', growth: '+67%', detail: 'this month' },
    { label: 'Success Rate', value: '98.5%', growth: '+2%', detail: 'this month' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'E-commerce Manager',
      company: 'TechGear Pro',
      content: 'CollabX transformed our product launch strategy. We went from 0 to 200 authentic collaborations in just 2 weeks.',
      avatar: '/images/Success.jpg',
      results: '200 collaborations in 2 weeks',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Content Creator',
      content: 'As a creator, I love the transparent process and amazing product samples. Built incredible partnerships with top brands!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
      results: '50+ brand partnerships',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      role: 'Brand Owner',
      company: 'Organic Beauty Co.',
      content: 'The quality protection gives me confidence that every collaboration is authentic. ROI has been incredible.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      results: '300% ROI improvement',
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '₹2,999',
      period: '/month',
      description: 'Perfect for small brands starting out',
      features: [
        'Up to 5 active collaborations',
        '50 verified creators',
        'Basic analytics',
        'Email support',
        'Quality protection'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
      price: '₹7,999',
      period: '/month',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 25 active collaborations',
        '250 verified creators',
        'Advanced analytics',
        'Priority support',
        'AI quality detection',
        'Custom reporting'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large-scale operations',
      features: [
        'Unlimited collaborations',
        'Unlimited creators',
        'Custom integrations',
        'Dedicated manager',
        'White-label options',
        'API access'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const socialProof = [
    { label: 'Trusted by', value: '500+', detail: 'brands worldwide' },
    { label: 'Featured in', value: '15+', detail: 'industry publications' },
    { label: 'Customer rating', value: '4.9/5', detail: 'from 2,000+ users' },
    { label: 'Support response', value: '<2 hours', detail: 'average response time' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CollabX</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-purple-100 text-purple-800">
              🚀 Now live on ecommerce marketplace
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Scale Your Ecommerce
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {' '}Collaboration Strategy
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with verified creators, launch authentic collaboration campaigns, and boost your product visibility 
              with our partnership-based platform trusted by thousands of brands.
            </p>
            
            {/* Social Proof Bar */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-gray-600">
              {socialProof.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="font-medium">{item.label}</span>
                  <span className="font-bold text-gray-900">{item.value}</span>
                  <span>{item.detail}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-3" asChild>
                <Link to="/signup" className="flex items-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3" asChild>
                <Link to="/signup?role=creator">
                  Become a Creator
                </Link>
              </Button>
              <Button variant="ghost" size="lg" className="text-lg px-6 py-3" asChild>
                <Link to="#demo" className="flex items-center">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              🎁 Free 14-day trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    {stat.growth} {stat.detail}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to scale collaborations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From campaign creation to quality protection, we've built the most comprehensive 
              collaboration management platform for ecommerce brands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed mb-3">
                      {feature.description}
                    </CardDescription>
                    <div className="flex items-center text-sm text-green-600 font-medium">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {feature.benefit}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How CollabX Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, transparent, and effective in just 4 steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Create Collaboration',
                description: 'Upload product details, set requirements, and define collaboration terms.',
                time: '5 minutes'
              },
              {
                step: '02',
                title: 'Match Creators',
                description: 'Our algorithm matches your product with verified creators in your category.',
                time: '24 hours'
              },
              {
                step: '03',
                title: 'Product Sampling',
                description: 'Creators receive product samples and create authentic content.',
                time: '3-7 days'
              },
              {
                step: '04',
                title: 'Content & Partnership',
                description: 'We verify content quality and facilitate ongoing partnerships.',
                time: '24 hours'
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-3">{step.description}</p>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {step.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Types */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Types of Collaborations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the collaboration model that works best for your brand and goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Gift,
                title: 'Product Sampling',
                description: 'Send free product samples to creators for authentic content creation and social media exposure.',
                benefits: ['Authentic content', 'Social media reach', 'Brand awareness', 'Cost-effective']
              },
              {
                icon: Handshake,
                title: 'Barter Partnerships',
                description: 'Exchange products or services with creators for ongoing collaboration and mutual benefit.',
                benefits: ['Long-term partnerships', 'Mutual value exchange', 'Sustainable growth', 'Creative freedom']
              },
              {
                icon: Lightbulb,
                title: 'Co-Creation Projects',
                description: 'Work directly with creators to develop new products, features, or marketing campaigns.',
                benefits: ['Innovation', 'Direct feedback', 'Product development', 'Market validation']
              }
            ].map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{type.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {type.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your business needs. All plans include our core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`border-2 ${plan.popular ? 'border-purple-500 shadow-xl' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="bg-purple-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by thousands of brands and creators
            </h2>
            <p className="text-xl text-gray-600">
              See what our community has to say about CollabX
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="bg-purple-50 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium text-purple-800">
                      🎯 Result: {testimonial.results}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                        {testimonial.company && ` at ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 to-pink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to scale your ecommerce collaborations?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful brands and creators on the most trusted collaboration platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
              <Link to="/signup">
                Start Free Trial
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-purple-600" asChild>
              <Link to="/signup?role=creator">
                Join as Creator
              </Link>
            </Button>
          </div>
          <p className="text-purple-200 text-sm">
            🎁 14-day free trial • No setup fees • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-bold">CollabX</span>
              </div>
              <p className="text-gray-400">
                The most trusted platform for ecommerce collaborations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Brands</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/campaigns" className="hover:text-white">Create Collaboration</Link></li>
                <li><Link to="/creators" className="hover:text-white">Find Creators</Link></li>
                <li><Link to="/analytics" className="hover:text-white">Analytics</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Creators</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/campaigns/discover" className="hover:text-white">Find Collaborations</Link></li>
                <li><Link to="/wallet" className="hover:text-white">Earnings</Link></li>
                <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CollabX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;