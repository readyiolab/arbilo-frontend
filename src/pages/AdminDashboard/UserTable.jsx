import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
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
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import config from '@/config.js/config';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggleDialogOpen, setToggleDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    subscription_type: '',
    start_date: null,
  });

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          toast.error('Admin not authenticated!');
          return;
        }

        setLoading(true);
        const response = await axios.get(`${config.API_URL}/api/admin/users`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          toast.error('Invalid users data received');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle toggle active status
  const handleToggleActiveStatus = useCallback((user) => {
    setSelectedUser(user);
    setToggleDialogOpen(true);
  }, []);

  // Confirm toggle status
  const confirmToggle = useCallback(async () => {
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        toast.error('Admin not authenticated!');
        return;
      }

      setLoading(true);
      const newStatus = selectedUser.is_active === 1 ? 0 : 1;

      const response = await axios.put(
        `${config.API_URL}/api/admin/users/${selectedUser.id}/toggle-active`,
        { is_active: newStatus },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, is_active: newStatus } : user
        )
      );
      toast.success(response.data.message || 'User status updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error toggling user status');
    } finally {
      setLoading(false);
      setSelectedUser(null);
      setToggleDialogOpen(false);
    }
  }, [selectedUser]);

  // Handle update subscription
  const handleUpdateSubscription = useCallback((user) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      subscription_type: user.subscription_type || 'monthly',
      start_date: user.subscription_start_date
        ? new Date(user.subscription_start_date)
        : new Date(),
    });
    setUpdateDialogOpen(true);
  }, []);

  // Handle form submission for subscription update
  const handleFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          toast.error('Admin not authenticated!');
          return;
        }

        setLoading(true);
        const response = await axios.post(
          `${config.API_URL}/api/admin/update-subscription`,
          {
            ...formData,
            start_date: formData.start_date
              ? format(formData.start_date, 'yyyy-MM-dd')
              : format(new Date(), 'yyyy-MM-dd'),
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === formData.email
              ? {
                  ...user,
                  subscription_type: formData.subscription_type,
                  subscription_start_date:
                    response.data.subscription_details.subscription_start_date,
                  subscription_end_date:
                    response.data.subscription_details.subscription_end_date,
                  subscription_status:
                    response.data.subscription_details.subscription_status,
                  is_active: response.data.subscription_details.is_active,
                }
              : user
          )
        );
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error updating subscription');
      } finally {
        setLoading(false);
        setSelectedUser(null);
        setUpdateDialogOpen(false);
        setFormData({ email: '', subscription_type: '', start_date: null });
      }
    },
    [formData]
  );

  // Close update dialog
  const closeUpdateDialog = useCallback(() => {
    setUpdateDialogOpen(false);
    setSelectedUser(null);
    setFormData({ email: '', subscription_type: '', start_date: null });
  }, []);

  // Show full-screen loader when loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <Table className="border border-gray-200">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="px-4 py-2 text-left text-gray-700">Name</TableHead>
            <TableHead className="px-4 py-2 text-left text-gray-700">Email</TableHead>
            <TableHead className="px-4 py-2 text-left text-gray-700">Status</TableHead>
            <TableHead className="px-4 py-2 text-left text-gray-700">Subscription</TableHead>
            <TableHead className="px-4 py-2 text-left text-gray-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan="5" className="text-center py-4 text-gray-500">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id} className="border-b">
                <TableCell className="px-4 py-2">{user.name}</TableCell>
                <TableCell className="px-4 py-2">{user.email}</TableCell>
                <TableCell className="px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      user.is_active ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-2">
                  {user.subscription_type || 'None'}
                </TableCell>
                <TableCell className="px-4 py-2 space-x-2">
                  <AlertDialog
                    open={toggleDialogOpen && selectedUser?.id === user.id}
                    onOpenChange={(open) => {
                      if (open) {
                        handleToggleActiveStatus(user);
                      } else {
                        setToggleDialogOpen(false);
                        setSelectedUser(null);
                      }
                    }}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="link"
                        className="text-blue-500 hover:text-blue-700"
                        disabled={loading}
                      >
                        {user.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                        <AlertDialogDescription>
                          Do you want to {user.is_active ? 'deactivate' : 'activate'} this user?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => {
                            setToggleDialogOpen(false);
                            setSelectedUser(null);
                          }}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={confirmToggle}
                          className="bg-blue-500 text-white hover:bg-blue-600"
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Dialog
                    open={updateDialogOpen && selectedUser?.id === user.id}
                    onOpenChange={(open) => {
                      if (!open) {
                        closeUpdateDialog();
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="text-green-500 hover:text-green-700"
                        onClick={() => handleUpdateSubscription(user)}
                        disabled={loading}
                      >
                        Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update User Subscription</DialogTitle>
                        <DialogDescription>
                          Modify the subscription details for the user.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <Input value={formData.email} disabled className="mt-1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Subscription Type
                          </label>
                          <Select
                            value={formData.subscription_type}
                            onValueChange={(value) =>
                              setFormData({ ...formData, subscription_type: value })
                            }
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="6-months">6 Months</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Subscription Start Date
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={`w-full justify-start text-left font-normal ${
                                  !formData.start_date && 'text-muted-foreground'
                                }`}
                                disabled={loading}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.start_date ? (
                                  format(formData.start_date, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={formData.start_date}
                                onSelect={(date) =>
                                  setFormData({ ...formData, start_date: date })
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={closeUpdateDialog}
                            disabled={loading}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 text-white hover:bg-blue-600"
                          >
                            {loading ? 'Updating...' : 'Update'}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;