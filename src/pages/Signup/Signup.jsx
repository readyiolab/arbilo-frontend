import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import config from "@/config.js/config";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define validation schema with zod
const formSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Initialize react-hook-form with zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${config.API_URL}/api/auth/signup`, {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      navigate("/login");
    } catch (error) {
      if (error.response?.status === 400) {
        if (error.response.data.message === "Email is already registered. Please log in.") {
          form.setError("email", { message: "Email is already registered. Please log in." });
        } else if (error.response.data.errors) {
          error.response.data.errors.forEach((err) => {
            form.setError(err.path || "root", { message: err.msg });
          });
        } else if (error.response.data.message === "Passwords do not match") {
          form.setError("confirmPassword", { message: "Passwords do not match" });
        } else {
          form.setError("root", { message: error.response.data.message || "An error occurred during signup." });
        }
      } else if (error.response?.status === 500) {
        form.setError("root", { message: "Internal Server Error" });
      } else {
        form.setError("root", { message: "An error occurred during signup." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
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

      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className="hidden lg:flex w-full lg:w-1/2 flex-col justify-center items-center bg-transparent p-8">
          <img alt="Logo" src="/assets/images/logo2.png" className="w-40 mb-8" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center max-w-lg">
            Join us and explore the best arbitrage opportunities in the market.
          </h1>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:hidden flex justify-center mb-8 mt-16">
            <img alt="Logo" src="/assets/images/logo2.png" className="w-32" />
          </div>

          <div className="max-w-md w-full mx-auto space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
              Create your account
            </h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={loading} className="w-full rounded-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" disabled={loading} className="w-full rounded-lg" />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            disabled={loading}
                            className="w-full rounded-lg pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            disabled={loading}
                            className="w-full rounded-lg pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black hover:bg-gray-800 text-white"
                >
                  {loading ? "Signing up..." : "Sign up"}
                </Button>
              </form>
            </Form>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-black hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}