import React, { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import config from "@/config.js/config";

const SubscriptionPage = () => {
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No authentication token found.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${config.API_URL}/api/auth/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSubscriptionData(response.data.userData);
      } catch (err) {
        setError("Failed to fetch subscription data");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, []);

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";

  const getStatusStyles = (status, isActive) => {
    if (!isActive || status === "inactive") {
      return { color: "text-red-600", text: "Inactive" };
    }
    switch (status?.toLowerCase()) {
      case "active":
        return { color: "text-green-600", text: "Active" };
      case "pending":
        return { color: "text-yellow-600", text: "Pending" };
      case "trial":
        return { color: "text-blue-600", text: "Trial" };
      default:
        return { color: "text-gray-600", text: "Inactive" };
    }
  };

  if (loading) {
    return (
      <Card className="container mx-auto p-6 sm:p-8">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl text-center">Subscription Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-10 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="container mx-auto p-6 sm:p-8">
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const statusStyles = getStatusStyles(subscriptionData?.subscription_status, subscriptionData?.is_active);

  return (
    <Card className="container mx-auto p-6 sm:p-8">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl text-center">Subscription Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            {/* Subscription Type */}
            <div className="flex flex-col">
              <label htmlFor="subscription-type" className="block text-sm font-medium text-gray-700 mb-1">
                Subscription Type
              </label>
              <Input
                id="subscription-type"
                name="subscription-type"
                type="text"
                className="bg-gray-100 cursor-not-allowed"
                value={subscriptionData?.subscription_type || "Not Subscribed"}
                disabled
                aria-describedby="subscription-type-label"
              />
            </div>

            {/* Subscription Status */}
            <div className="flex flex-col">
              <label htmlFor="subscription-status" className="block text-sm font-medium text-gray-700 mb-1">
                Subscription Status
              </label>
              <Input
                id="subscription-status"
                name="subscription-status"
                type="text"
                className={`bg-gray-100 cursor-not-allowed ${statusStyles.color}`}
                value={statusStyles.text}
                disabled
                aria-describedby="subscription-status-label"
              />
            </div>

            {/* Start Date */}
            <div className="flex flex-col">
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <Input
                id="start-date"
                name="start-date"
                type="text"
                className="bg-gray-100 cursor-not-allowed"
                value={formatDate(subscriptionData?.subscription_start_date)}
                disabled
                aria-describedby="start-date-label"
              />
            </div>

            {/* End Date */}
            <div className="flex flex-col">
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <Input
                id="end-date"
                name="end-date"
                type="text"
                className="bg-gray-100 cursor-not-allowed"
                value={formatDate(subscriptionData?.subscription_end_date)}
                disabled
                aria-describedby="end-date-label"
              />
            </div>

            {/* Trial End Date */}
            {subscriptionData?.trial_end_date && (
              <div className="flex flex-col">
                <label htmlFor="trial-end-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Trial End Date
                </label>
                <Input
                  id="trial-end-date"
                  name="trial-end-date"
                  type="text"
                  className="bg-gray-100 cursor-not-allowed"
                  value={formatDate(subscriptionData?.trial_end_date)}
                  disabled
                  aria-describedby="trial-end-date-label"
                />
              </div>
            )}
          </div>

          {/* Upgrade Subscription Button */}
          {!subscriptionData?.is_active && (
            <div className="mt-8 flex justify-end">
              <Button
                onClick={() => (window.location.href = "/subscription")}
                disabled={loading}
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Upgrade Subscription
                </span>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionPage;