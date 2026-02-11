"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import { loginSchema, type LoginInput } from "@/lib/validations";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log("SignIn result:", result); // Debug

      if (!result) {
        toast({
          title: language === "az" ? "Xəta" : "Error",
          description: language === "az" ? "Daxil olmaq mümkün olmadı" : "Could not sign in",
          variant: "destructive",
        });
        return;
      }

      if (result.error) {
        console.log("SignIn error:", result.error); // Debug
        toast({
          title: language === "az" ? "Xəta" : "Error",
          description: language === "az" ? "E-poçt və ya şifrə yanlışdır" : "Invalid email or password",
          variant: "destructive",
        });
        return;
      }

      if (result.ok) {
        toast({
          title: language === "az" ? "Xoş gəldiniz!" : "Welcome back!",
          description: language === "az" ? "Dashboard-a yönləndirilir..." : "Redirecting to your dashboard...",
          variant: "success",
        });

        // Kiçik gecikmə ilə redirect (session yaradılması üçün)
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 500);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: language === "az" ? "Xəta" : "Error",
        description: language === "az" ? "Bir şey yanlış getdi. Yenidən cəhd edin." : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="glass border-0 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            {language === "az" ? "Xoş gəldiniz" : "Welcome back"}
          </CardTitle>
          <CardDescription>
            {language === "az"
              ? "Maliyyə səyahətinizə davam etmək üçün daxil olun"
              : "Sign in to continue your financial journey"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                {language === "az" ? "E-poçt" : "Email"}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={language === "az" ? "siz@misal.com" : "you@example.com"}
                  className="pl-10"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                {language === "az" ? "Şifrə" : "Password"}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {language === "az" ? "Daxil olunur..." : "Signing in..."}
                </>
              ) : (
                <>
                  {language === "az" ? "Daxil ol" : "Sign In"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {language === "az" ? "Hesabınız yoxdur?" : "Don't have an account?"}{" "}
            </span>
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              {language === "az" ? "Yaradın" : "Create one"}
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

