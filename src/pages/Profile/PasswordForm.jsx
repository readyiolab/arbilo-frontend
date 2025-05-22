import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import config from '@/config.js/config';
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

export default function PasswordForm() {
  const { auth } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setError(null); // Clear error on input change
    if (name === 'currentPassword') setCurrentPassword(value);
    else if (name === 'newPassword') setNewPassword(value);
    else if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'currentPassword') setIsCurrentPasswordVisible(!isCurrentPasswordVisible);
    else if (field === 'newPassword') setIsNewPasswordVisible(!isNewPasswordVisible);
    else if (field === 'confirmPassword') setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const validateInputs = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      return false;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      toast.error("New password must be at least 8 characters long.");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleConfirmPasswordChange = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    setIsDialogOpen(false);

    try {
      const response = await toast.promise(
        axios.put(
          `${config.API_URL}/api/auth/change-password`,
          { currentPassword, newPassword, confirmPassword },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        ),
        {
          loading: 'Changing password...',
          success: (response) => {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            return response.data.message || "Password changed successfully";
          },
          error: (err) => err.response?.data?.message || "An error occurred while changing the password.",
        }
      );
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while changing the password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="container mx-auto p-6 sm:p-8">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Change Password</CardTitle>
        <p className="text-sm text-gray-600">Enter your current password and choose a new one.</p>
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
            {/* Current Password Field */}
            <div className="flex flex-col">
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <Input
                  id="current-password"
                  name="currentPassword"
                  type={isCurrentPasswordVisible ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                  aria-invalid={error && !currentPassword ? "true" : "false"}
                  aria-describedby={error && !currentPassword ? "current-password-error" : undefined}
                />
                <button
                  type="button"
                  aria-label={isCurrentPasswordVisible ? "Hide current password" : "Show current password"}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility('currentPassword')}
                  disabled={isLoading}
                >
                  {isCurrentPasswordVisible ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>

            {/* New Password Field */}
            <div className="flex flex-col">
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <Input
                  id="new-password"
                  name="newPassword"
                  type={isNewPasswordVisible ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                  aria-invalid={error && newPassword.length < 8 ? "true" : "false"}
                  aria-describedby={error && newPassword.length < 8 ? "new-password-error" : undefined}
                />
                <button
                  type="button"
                  aria-label={isNewPasswordVisible ? "Hide new password" : "Show new password"}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility('newPassword')}
                  disabled={isLoading}
                >
                  {isNewPasswordVisible ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                  aria-invalid={error && newPassword !== confirmPassword ? "true" : "false"}
                  aria-describedby={error && newPassword !== confirmPassword ? "confirm-password-error" : undefined}
                />
                <button
                  type="button"
                  aria-label={isConfirmPasswordVisible ? "Hide confirm password" : "Show confirm password"}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  disabled={isLoading}
                >
                  {isConfirmPasswordVisible ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button disabled={isLoading}>
                Change Password
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Password Change</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to change your password?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmPasswordChange} disabled={isLoading}>
                  {isLoading ? "Changing..." : "Confirm"}
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