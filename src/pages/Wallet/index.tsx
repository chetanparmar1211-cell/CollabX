import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import {
  Wallet,
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Building2,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

const WalletPage = () => {
  const { user } = useAuth();
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const walletData = {
    balance: user?.role === 'reviewer' ? 12450 : 45670,
    pendingBalance: user?.role === 'reviewer' ? 2340 : 8900,
    totalEarnings: user?.role === 'reviewer' ? 45890 : 156780,
    totalSpent: user?.role === 'reviewer' ? 0 : 98560
  };

  const transactions = [
    {
      id: '1',
      type: 'credit',
      amount: 450,
      description: 'Review payment - Wireless Headphones',
      status: 'completed',
      date: '2024-08-12',
      time: '14:30'
    },
    {
      id: '2',
      type: user?.role === 'reviewer' ? 'debit' : 'debit',
      amount: 2500,
      description: user?.role === 'reviewer' ? 'Withdrawal to bank account' : 'Campaign funding - Smart Watch Pro',
      status: 'completed',
      date: '2024-08-10',
      time: '09:15'
    },
    {
      id: '3',
      type: 'credit',
      amount: 380,
      description: 'Review payment - Fitness Tracker',
      status: 'pending',
      date: '2024-08-09',
      time: '16:45'
    },
    {
      id: '4',
      type: user?.role === 'reviewer' ? 'commission' : 'commission',
      amount: 125,
      description: 'Platform commission (3.5%)',
      status: 'completed',
      date: '2024-08-08',
      time: '11:20'
    },
    {
      id: '5',
      type: 'credit',
      amount: 520,
      description: 'Review payment - Organic Protein Powder',
      status: 'completed',
      date: '2024-08-07',
      time: '13:10'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'credit': return ArrowDownLeft;
      case 'debit': return ArrowUpRight;
      case 'commission': return TrendingUp;
      default: return Wallet;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'credit': return 'text-green-600';
      case 'debit': return 'text-red-600';
      case 'commission': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'pending': return Clock;
      case 'failed': return XCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wallet</h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'reviewer' ? 'Manage your earnings and withdrawals' : 'Manage campaign funding and expenses'}
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Available Balance</p>
                  <p className="text-2xl font-bold mt-1">₹{walletData.balance.toLocaleString()}</p>
                </div>
                <Wallet className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Balance</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">₹{walletData.pendingBalance.toLocaleString()}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {user?.role === 'reviewer' ? 'Total Earnings' : 'Total Revenue'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">₹{walletData.totalEarnings.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          {user?.role === 'brand' && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">₹{walletData.totalSpent.toLocaleString()}</p>
                  </div>
                  <ArrowUpRight className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transactions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest wallet activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => {
                    const Icon = getTransactionIcon(transaction.type);
                    const StatusIcon = getStatusIcon(transaction.status);
                    
                    return (
                      <div key={transaction.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className={`p-2 rounded-lg bg-gray-100`}>
                          <Icon className={`h-5 w-5 ${getTransactionColor(transaction.type)}`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900">{transaction.description}</p>
                            <div className="flex items-center space-x-2">
                              <span className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                                {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                              </span>
                              <Badge variant="secondary" className={`${getStatusColor(transaction.status)} text-xs`}>
                                {transaction.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-500">{transaction.date}</span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{transaction.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="space-y-6">
            {user?.role === 'reviewer' ? (
              /* Reviewer Actions */
              <Card>
                <CardHeader>
                  <CardTitle>Withdraw Funds</CardTitle>
                  <CardDescription>Transfer earnings to your bank account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Withdrawal Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">
                      Available: ₹{walletData.balance.toLocaleString()}
                    </p>
                  </div>

                  <Tabs defaultValue="bank" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                      <TabsTrigger value="upi">UPI</TabsTrigger>
                    </TabsList>
                    <TabsContent value="bank" className="space-y-4">
                      <div className="space-y-2">
                        <Label>Bank Account</Label>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <Building2 className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium">HDFC Bank ****1234</p>
                            <p className="text-xs text-gray-500">John Doe</p>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full">
                        Withdraw to Bank
                      </Button>
                    </TabsContent>
                    <TabsContent value="upi" className="space-y-4">
                      <div className="space-y-2">
                        <Label>UPI ID</Label>
                        <Input placeholder="yourname@paytm" />
                      </div>
                      <Button className="w-full">
                        Withdraw via UPI
                      </Button>
                    </TabsContent>
                  </Tabs>

                  <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded-lg">
                    <p>• Minimum withdrawal: ₹500</p>
                    <p>• Processing time: 1-2 business days</p>
                    <p>• No withdrawal fees</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Brand Actions */
              <Card>
                <CardHeader>
                  <CardTitle>Add Funds</CardTitle>
                  <CardDescription>Fund your campaigns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="addAmount">Amount to Add</Label>
                    <Input
                      id="addAmount"
                      type="number"
                      placeholder="Enter amount"
                    />
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full flex items-center space-x-2">
                      <CreditCard className="h-4 w-4" />
                      <span>Add via Card</span>
                    </Button>
                    <Button variant="outline" className="w-full flex items-center space-x-2">
                      <Building2 className="h-4 w-4" />
                      <span>Add via Bank Transfer</span>
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded-lg">
                    <p>• Secure payment processing</p>
                    <p>• Instant fund availability</p>
                    <p>• 2.9% + ₹3 processing fee</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {user?.role === 'reviewer' ? 'Reviews Completed' : 'Campaigns Funded'}
                  </span>
                  <span className="font-semibold">{user?.role === 'reviewer' ? '8' : '12'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {user?.role === 'reviewer' ? 'Earnings' : 'Spent'}
                  </span>
                  <span className="font-semibold text-green-600">₹{user?.role === 'reviewer' ? '3,240' : '15,680'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {user?.role === 'reviewer' ? '98.2%' : '94.5%'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WalletPage;