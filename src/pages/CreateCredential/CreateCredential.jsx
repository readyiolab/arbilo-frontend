import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import config from "@/config.js/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CreateCredential = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subscription, setSubscription] = useState("monthly");
  const [startDate, setStartDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !startDate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const subscriptionDetails = {
      email,
      name,
      subscription_type: subscription,
      start_date: format(startDate, "yyyy-MM-dd"),
    };

    await toast.promise(
      axios.post(`${config.API_URL}/api/auth/create-user`, subscriptionDetails),
      {
        loading: "Sending credentials...",
        success: (response) => {
          setEmail("");
          setName("");
          setSubscription("monthly");
          setStartDate(null);
          return response.data.message || "User created and credentials sent successfully";
        },
        error: (error) => error.response?.data?.message || "Failed to send credentials",
      }
    );

    setLoading(false);
  };

  return (
    <div className={cn("flex items-center justify-center  ")}>
      <div className={cn("mx-auto w-full  p-6  space-y-2")}>
        <Toaster position="top-center" />
        <h2 className={cn("text-3xl font-bold text-center text-gray-900")}>
          Create Credential
        </h2>

        <form onSubmit={handleCreateUser} className={cn("space-y-6")}>
          <div className={cn("space-y-2")}>
            <Label htmlFor="name" className={cn("text-sm font-medium text-gray-700")}>
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className={cn("w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500")}
            />
          </div>

          <div className={cn("space-y-2")}>
            <Label htmlFor="email" className={cn("text-sm font-medium text-gray-700")}>
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className={cn("w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500")}
            />
          </div>

          <div className={cn("space-y-2")}>
            <Label htmlFor="subscription" className={cn("text-sm font-medium text-gray-700")}>
              Subscription Plan <span className="text-red-500">*</span>
            </Label>
            <Select
              value={subscription}
              onValueChange={setSubscription}
              disabled={loading}
            >
              <SelectTrigger className={cn("w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500")}>
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly Subscription - $59</SelectItem>
                <SelectItem value="quarterly">Quarterly Subscription - $129</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={cn("space-y-2")}>
            <Label htmlFor="start-date" className={cn("text-sm font-medium text-gray-700")}>
              Subscription Start Date <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-gray-300",
                    !startDate && "text-muted-foreground"
                  )}
                  disabled={loading}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  className="rounded-md border border-gray-300"
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full bg-black text-white  transition-colors",
              loading && "opacity-50 cursor-not-allowed"
            )}
          >
            {loading ? "Sending..." : "Send Credentials"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCredential;