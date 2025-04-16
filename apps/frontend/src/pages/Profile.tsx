import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/utils/dummyData";
import {
  ArrowUpCircle,
  UserRound,
  MapPin,
  AtSign,
  CalendarDays,
  Key,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const currentUser = users[0]; // Using the first user as the current user for demo
  const [profile, setProfile] = useState({
    username: currentUser.username,
    email: currentUser.email,
    location: currentUser.location,
    bio: currentUser.bio || "",
    profilePicture: currentUser.profilePicture,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API request delay
    setTimeout(() => {
      setIsEditing(false);
      toast.success("Profile updated");
    }, 800);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API request delay
    setTimeout(() => {
      toast.success("Password updated");

      // Reset form (would be done with a form library in a real app)
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 800);
  };

  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
            <div className="flex-shrink-0">
              <div className="relative">
                <Avatar className="h-28 w-28">
                  <AvatarImage
                    src={profile.profilePicture}
                    alt={profile.username}
                  />
                  <AvatarFallback className="text-3xl">
                    {profile.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full"
                >
                  <ArrowUpCircle className="h-4 w-4 mr-2" />
                  Change
                </Button>
              </div>
            </div>

            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold font-serif">
                {profile.username}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mt-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center">
                  <AtSign className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center">
                  <UserRound className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>{currentUser.role}</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>
                    Joined{" "}
                    {new Date(currentUser.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>

              {!isEditing && profile.bio && (
                <div className="mt-4">
                  <p className="text-muted-foreground">{profile.bio}</p>
                </div>
              )}

              {!isEditing && (
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          <Tabs defaultValue={isEditing ? "edit" : "stats"}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="stats"
                onClick={() => isEditing && setIsEditing(false)}
              >
                Profile Stats
              </TabsTrigger>
              <TabsTrigger
                value="edit"
                onClick={() => !isEditing && setIsEditing(true)}
              >
                Edit Profile
              </TabsTrigger>
              <TabsTrigger
                value="security"
                onClick={() => isEditing && setIsEditing(false)}
              >
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Statistics</CardTitle>
                  <CardDescription>
                    Your activity and engagement on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <div className="text-2xl font-bold">7</div>
                      <div className="text-sm text-muted-foreground">
                        Books Shared
                      </div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-sm text-muted-foreground">
                        Books Borrowed
                      </div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-sm text-muted-foreground">
                        Reviews Written
                      </div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <div className="text-2xl font-bold">15</div>
                      <div className="text-sm text-muted-foreground">
                        Friends
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mb-4">
                    Activity Overview
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between pb-2 border-b">
                      <span>Average Rating Given</span>
                      <span className="font-medium">4.2/5</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>Most Borrowed Genre</span>
                      <span className="font-medium">Fiction</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>Most Shared Genre</span>
                      <span className="font-medium">Mystery</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>Average Response Time</span>
                      <span className="font-medium">8 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Account Status</span>
                      <span className="font-medium text-green-600">Active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="edit" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>
                    Update your profile information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="username"
                          className="text-sm font-medium"
                        >
                          Username
                        </label>
                        <Input
                          id="username"
                          name="username"
                          value={profile.username}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profile.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="location"
                          className="text-sm font-medium"
                        >
                          Location
                        </label>
                        <Input
                          id="location"
                          name="location"
                          value={profile.location}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="bio" className="text-sm font-medium">
                          Bio
                        </label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={profile.bio}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Tell others about yourself and your book preferences..."
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setProfile({
                            username: currentUser.username,
                            email: currentUser.email,
                            location: currentUser.location,
                            bio: currentUser.bio || "",
                            profilePicture: currentUser.profilePicture,
                          });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password & Security</CardTitle>
                  <CardDescription>
                    Manage your password and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="currentPassword"
                          className="text-sm font-medium"
                        >
                          Current Password
                        </label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            required
                          />
                          <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="md:col-span-2 border-t pt-4">
                        <h3 className="text-sm font-medium mb-4">
                          Set New Password
                        </h3>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="newPassword"
                          className="text-sm font-medium"
                        >
                          New Password
                        </label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            required
                          />
                          <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="confirmPassword"
                          className="text-sm font-medium"
                        >
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                          />
                          <RefreshCw className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit">Update Password</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive email alerts for borrow requests and messages
                        </p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <h3 className="font-medium">Privacy Settings</h3>
                        <p className="text-sm text-muted-foreground">
                          Control who can see your profile and collection
                        </p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-destructive">
                          Delete Account
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all data
                        </p>
                      </div>
                      <Button variant="destructive">Delete</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
