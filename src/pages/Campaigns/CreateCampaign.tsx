import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { ArrowLeft, Upload, Plus, X, Info, Target, Users, DollarSign, Calendar, CheckCircle, Handshake, Gift } from 'lucide-react';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: '',
    productUrl: '',
    productImages: [] as string[],
    creatorsRequired: '',
    collaborationType: 'product_sample',
    deadline: '',
    description: '',
    requirements: [] as string[],
    category: '',
    targetAudience: '',
    collaborationGoal: '',
    investment: '',
    estimatedROI: ''
  });
  const [newRequirement, setNewRequirement] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 1, title: 'Basic Information', description: 'Product details and collaboration basics' },
    { id: 2, title: 'Collaboration Settings', description: 'Requirements and collaboration terms' },
    { id: 3, title: 'Review & Launch', description: 'Final review and collaboration launch' }
  ];

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
      if (!formData.productUrl.trim()) newErrors.productUrl = 'Product URL is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
    }
    
    if (step === 2) {
      if (!formData.creatorsRequired) newErrors.creatorsRequired = 'Number of creators is required';
      if (!formData.deadline) newErrors.deadline = 'Deadline is required';
      if (formData.requirements.length === 0) newErrors.requirements = 'At least one requirement is needed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Mock collaboration creation - in real app, this would be an API call
      console.log('Creating collaboration:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      navigate('/campaigns');
    } catch (error) {
      console.error('Error creating collaboration:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const categories = [
    'Electronics', 'Home & Garden', 'Fashion', 'Beauty', 'Sports', 
    'Books', 'Toys', 'Health', 'Automotive', 'Kitchen', 'Pet Supplies',
    'Office Products', 'Tools & Hardware', 'Baby Products', 'Grocery'
  ];

  const collaborationGoals = [
    'Increase Product Visibility',
    'Boost Brand Awareness',
    'Generate Authentic Content',
    'Launch New Product',
    'Build Creator Relationships',
    'Market Research & Feedback'
  ];

  const targetAudiences = [
    'Tech Enthusiasts',
    'Fitness & Health Conscious',
    'Home Improvement DIYers',
    'Fashion Forward',
    'Parents & Families',
    'Professionals',
    'Students',
    'Seniors'
  ];

  const collaborationTypes = [
    {
      value: 'product_sample',
      label: 'Product Sampling',
      description: 'Send free product samples to creators',
      icon: Gift
    },
    {
      value: 'barter',
      label: 'Barter Partnership',
      description: 'Exchange products or services',
      icon: Handshake
    },
    {
      value: 'co_creation',
      label: 'Co-Creation Project',
      description: 'Work together on product development',
      icon: Target
    }
  ];

  const getStepProgress = () => {
    return (currentStep / 3) * 100;
  };

  const estimatedInvestment = formData.creatorsRequired && formData.investment 
    ? parseInt(formData.creatorsRequired) * parseFloat(formData.investment)
    : 0;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/campaigns" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Collaborations
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Collaboration</h1>
            <p className="text-gray-600">Launch a new product collaboration campaign in just a few steps</p>
          </div>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Step {currentStep} of 3</span>
                <span>{Math.round(getStepProgress())}% Complete</span>
              </div>
              <Progress value={getStepProgress()} className="h-2" />
            </div>
            <div className="flex justify-between">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.id < currentStep 
                      ? 'bg-green-500 text-white' 
                      : step.id === currentStep 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.id < currentStep ? <CheckCircle className="h-4 w-4" /> : step.id}
                  </div>
                  <div className="hidden sm:block">
                    <div className={`text-sm font-medium ${
                      step.id === currentStep ? 'text-purple-600' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Enter your product details and collaboration information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name *</Label>
                    <Input
                      id="productName"
                      placeholder="Wireless Bluetooth Headphones Pro"
                      value={formData.productName}
                      onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                      className={errors.productName ? 'border-red-500' : ''}
                    />
                    {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Product Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productUrl">Product URL *</Label>
                  <Input
                    id="productUrl"
                    placeholder="https://yourstore.com/product/..."
                    value={formData.productUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, productUrl: e.target.value }))}
                    className={errors.productUrl ? 'border-red-500' : ''}
                  />
                  {errors.productUrl && <p className="text-red-500 text-sm">{errors.productUrl}</p>}
                  <p className="text-xs text-gray-500">Make sure the URL is accessible and the product is available</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Product Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product, its key features, and what makes it special..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                  <p className="text-xs text-gray-500">This helps creators understand your product better</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="collaborationGoal">Collaboration Goal</Label>
                    <Select value={formData.collaborationGoal} onValueChange={(value) => setFormData(prev => ({ ...prev, collaborationGoal: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                      <SelectContent>
                        {collaborationGoals.map((goal) => (
                          <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Select value={formData.targetAudience} onValueChange={(value) => setFormData(prev => ({ ...prev, targetAudience: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        {targetAudiences.map((audience) => (
                          <SelectItem key={audience} value={audience}>{audience}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Collaboration Settings */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Collaboration Settings
                </CardTitle>
                <CardDescription>
                  Set your collaboration requirements and terms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="creatorsRequired">Number of Creators Required *</Label>
                    <Input
                      id="creatorsRequired"
                      type="number"
                      min="1"
                      max="100"
                      placeholder="20"
                      value={formData.creatorsRequired}
                      onChange={(e) => setFormData(prev => ({ ...prev, creatorsRequired: e.target.value }))}
                      className={errors.creatorsRequired ? 'border-red-500' : ''}
                    />
                    {errors.creatorsRequired && <p className="text-red-500 text-sm">{errors.creatorsRequired}</p>}
                    <p className="text-xs text-gray-500">Recommended: 10-50 creators for best results</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">Collaboration Deadline *</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                      className={errors.deadline ? 'border-red-500' : ''}
                    />
                    {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline}</p>}
                    <p className="text-xs text-gray-500">Give creators enough time to create quality content</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collaborationType">Collaboration Type</Label>
                  <Select value={formData.collaborationType} onValueChange={(value) => setFormData(prev => ({ ...prev, collaborationType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {collaborationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center space-x-2">
                            <type.icon className="h-4 w-4" />
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Choose how creators will collaborate with your brand</p>
                </div>

                <div className="space-y-2">
                  <Label>Collaboration Requirements *</Label>
                  <div className="space-y-3">
                    {formData.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={requirement}
                          onChange={(e) => {
                            const newRequirements = [...formData.requirements];
                            newRequirements[index] = e.target.value;
                            setFormData(prev => ({ ...prev, requirements: newRequirements }));
                          }}
                          placeholder="e.g., Must create social media content"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeRequirement(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <Input
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                        placeholder="Add a new requirement..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                      />
                      <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements}</p>}
                  <p className="text-xs text-gray-500">Clear requirements help creators understand expectations</p>
                </div>

                {/* Investment Estimate */}
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Estimated Collaboration Investment:</strong> ₹{estimatedInvestment.toLocaleString()}
                    <br />
                    <span className="text-sm">This includes {formData.creatorsRequired || 0} creators for product sampling and collaboration</span>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review & Launch */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Review & Launch
                </CardTitle>
                <CardDescription>
                  Review your collaboration details and launch
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Collaboration Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Product Name</p>
                      <p className="font-medium">{formData.productName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-medium">{formData.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Creators Required</p>
                      <p className="font-medium">{formData.creatorsRequired}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Collaboration Type</p>
                      <p className="font-medium">{collaborationTypes.find(t => t.value === formData.collaborationType)?.label}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Deadline</p>
                      <p className="font-medium">{formData.deadline}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Investment</p>
                      <p className="font-medium text-lg text-green-600">₹{estimatedInvestment.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Collaboration Requirements</h3>
                  <ul className="space-y-2">
                    {formData.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Important:</strong> Once launched, your collaboration will be visible to verified creators. 
                    Make sure all details are correct before proceeding.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            <div className="flex space-x-3">
              {currentStep < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Next Step
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Launching Collaboration...' : 'Launch Collaboration'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateCampaign;