
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import config from "@/config.js/config";

export default function ProfileForm() {
  const { auth, setAuth } = useContext(AuthContext);
  const [name, setName] = useState(auth.user.name);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setError(null); // Clear error on input change
  };

  const handleConfirmUpdate = async () => {
    if (name.trim() === auth.user.name) {
      toast.error("No changes detected");
      setError("No changes detected");
      return;
    }

    if (name.trim().length < 2) {
      toast.error("Name must be at least 2 characters long");
      setError("Name must be at least 2 characters long");
      return;
    }

    setIsLoading(true);
    try {
      const response = await toast.promise(
        axios.put(
          `${config.API_URL}/api/auth/update-name`,
          { newName: name.trim() },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
              "Content-Type": "application/json",
            },
          }
        ),
        {
          loading: 'Updating name...',
          success: (response) => response.data.message || "Name updated successfully",
          error: (err) => err.response?.data?.message || "An error occurred while updating the name",
        }
      );

      setAuth((prevAuth) => ({
        ...prevAuth,
        user: { ...prevAuth.user, name: response.data.newName },
      }));
      setIsDialogOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while updating the name");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="container mx-auto p-6 sm:p-8">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            {/* Name Field */}
            <div className="flex flex-col">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                value={name}
                onChange={handleNameChange}
                disabled={isLoading}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? "name-error" : "name-label"}
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="bg-gray-100 cursor-not-allowed"
                value={auth.user.email}
                disabled
                aria-describedby="email-label"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Profile Update</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to update your name to "{name}"?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmUpdate} disabled={isLoading}>
                  {isLoading ? "Updating..." : "Confirm"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Toaster />
      </CardContent>
    </Card>
  );
}
