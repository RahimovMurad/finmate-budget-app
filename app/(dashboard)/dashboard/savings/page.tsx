"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/language-context";
import { TrendingUp, Target, PiggyBank, Calculator } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function SavingsPage() {
  const { language, t } = useLanguage();
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");

  const calculateSavings = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const savings = income - expenses;
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;
    
    return {
      monthlySavings: savings,
      savingsRate: savingsRate,
      yearlySavings: savings * 12
    };
  };

  const savings = calculateSavings();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {language === "az" ? "Qeyd Etml" : "Savings"}
          </h1>
          <p className="text-muted-foreground">
            {language === "az" 
              ? "Maliyy hedeflwriniz v qeyd etm planiniz" 
              : "Your financial goals and savings plan"
            }
          </p>
        </div>
      </div>

      {/* Savings Calculator */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              {language === "az" ? "Qeyd etm Hesablayicisi" : "Savings Calculator"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="income">
                {language === "az" ? "Aylq Gelir" : "Monthly Income"}
              </Label>
              <Input
                id="income"
                type="number"
                placeholder="0"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="expenses">
                {language === "az" ? "Aylq Xercler" : "Monthly Expenses"}
              </Label>
              <Input
                id="expenses"
                type="number"
                placeholder="0"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="savings">
                {language === "az" ? "Mevcut Qeyd Etm" : "Current Savings"}
              </Label>
              <Input
                id="savings"
                type="number"
                placeholder="0"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {language === "az" ? "Qeyd etm Neticeleri" : "Savings Results"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <div className="text-sm text-muted-foreground">
                {language === "az" ? "Aylq Qeyd etm" : "Monthly Savings"}
              </div>
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(savings.monthlySavings)}
              </div>
            </div>
            <div className="p-4 bg-emerald-500/10 rounded-lg">
              <div className="text-sm text-muted-foreground">
                {language === "az" ? "Qeyd etm Faizi" : "Savings Rate"}
              </div>
              <div className="text-2xl font-bold text-emerald-500">
                {savings.savingsRate.toFixed(1)}%
              </div>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <div className="text-sm text-muted-foreground">
                {language === "az" ? "Illik Qeyd etm" : "Yearly Savings"}
              </div>
              <div className="text-2xl font-bold text-blue-500">
                {formatCurrency(savings.yearlySavings)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Savings Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="w-5 h-5" />
            {language === "az" ? "Qeyd etm Mslahetleri" : "Savings Tips"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 border rounded-lg"
            >
              <Target className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-semibold mb-1">
                {language === "az" ? "Hedef Belirleyin" : "Set Clear Goals"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === "az" 
                  ? "Qisa ve uzun muddetli maliyy hedefleri belirleyin."
                  : "Set short and long-term financial goals."
                }
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 border rounded-lg"
            >
              <TrendingUp className="w-8 h-8 text-emerald-500 mb-2" />
              <h3 className="font-semibold mb-1">
                {language === "az" ? "Otomatik Qeyd etm" : "Automate Savings"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === "az" 
                  ? "Her ay otomatik olaraq pul qeyd edin."
                  : "Automatically save money each month."
                }
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 border rounded-lg"
            >
              <PiggyBank className="w-8 h-8 text-blue-500 mb-2" />
              <h3 className="font-semibold mb-1">
                {language === "az" ? "Xercleri Izleyin" : "Track Expenses"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === "az" 
                  ? "Xerclerinizi izleyerek qeyd etm potensialini artirin."
                  : "Increase savings potential by tracking expenses."
                }
              </p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
