import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthContext";
import config from "@/config.js/config";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Define validation schema with zod
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Initialize react-hook-form with zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Load remembered credentials
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    if (rememberedEmail && rememberedPassword) {
      form.setValue("email", rememberedEmail);
      form.setValue("password", rememberedPassword);
      setRememberMe(true);
    }
  }, [form]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterClick = () => {
    navigate("/", { state: { scrollTo: "pricing-section" } });
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(`${config.API_URL}/api/auth/login`, {
        email: data.email,
        password: data.password,
      });

      if (response.data && response.data.token && response.data.user) {
        const { token, user } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        setAuth({ user, token });

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", data.email);
          localStorage.setItem("rememberedPassword", data.password);
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
        }

        toast.success(response.data.message || "Login successful");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        toast.error(response.data.message || "Invalid login credentials");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error during login");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 z-50">
          <Loader />
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="fixed top-4 left-4 z-10">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <FaArrowLeft className="w-4 h-4" /> Back
        </Button>
      </div>

      <div className="flex min-h-screen">
        <div className="hidden lg:flex w-1/2 flex-col justify-center items-center bg-gray-50 p-8">
          <img alt="Logo" src="/assets/images/logo2.png" className="w-40 mb-8" />
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center max-w-lg">
            Discover the best arbitrage opportunities in the market.
          </h1>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="lg:hidden flex justify-center mb-8 mt-16">
            <img alt="Logo" src="/assets/images/logo2.webp" className="w-32" />
          </div>

          <div className="max-w-md w-full mx-auto space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-center text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link
                          to="/forgot-password"
                          className="text-sm font-semibold text-gray-900 hover:text-gray-700 hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className="w-full"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? (
                              <FaEyeSlash className="w-5 h-5" />
                            ) : (
                              <FaEye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={handleRegisterClick}
                className="font-semibold text-black hover:text-gray-800 hover:underline"
              >
                Signup
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}