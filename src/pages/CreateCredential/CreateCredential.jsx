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

    if (!name.trim() || !email.trim() || !startDate || !subscription) {
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

    try {
      const response = await toast.promise(
        axios.post(`${config.API_URL}/api/admin/create-user`, subscriptionDetails, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }),
        {
          loading: "Sending credentials...",
          success: (response) => response.data.message || "User created and credentials sent successfully",
          error: (error) => error.response?.data?.message || "Failed to send credentials",
        }
      );

      setEmail("");
      setName("");
      setSubscription("monthly");
      setStartDate(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("")}>
      <div className={cn("  p-6 space-y-6")}>
        <Toaster position="top-center" />
        <h2 className={cn("text-2xl font-bold text-center text-gray-900")}>
          Create Credential
        </h2>

        <form onSubmit={handleCreateUser} className={cn("space-y-4")}>
          <div className={cn("space-y-2")}>
            <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className={cn("space-y-2")}>
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className={cn("space-y-2")}>
            <Label htmlFor="subscription">Subscription Plan <span className="text-red-500">*</span></Label>
            <Select
              value={subscription}
              onValueChange={setSubscription}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly Subscription</SelectItem>
                <SelectItem value="6-months">6-Month Subscription</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={cn("space-y-2")}>
            <Label htmlFor="start-date">Start Date <span className="text-red-500">*</span></Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
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
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full bg-black text-white",
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