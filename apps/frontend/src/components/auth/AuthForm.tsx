import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useAuth } from "@/context/auth";

type AuthFormProps = {
  type: "login" | "register";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const navLocation = useLocation();

  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      api.post("/api/v1/auth/sign-in", data).then((res) => res.data),
    onSuccess: (data) => {
      login(data.accessToken, data.user);
      const from = navLocation.state?.from?.pathname || "/";
      toast.success("Login successful");
      navigate(from);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: {
      email: string;
      password: string;
      username: string;
      location: string;
    }) => api.post("/api/v1/auth/sign-up", data).then((res) => res.data),
    onSuccess: (data) => {
      login(data.accessToken, data.user);
      const from = navLocation.state?.from?.pathname || "/";
      toast.success("Registration successful");
      navigate(from);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "login") {
      // Login
      loginMutation.mutate({ email, password });
    }

    if (type === "register") {
      registerMutation.mutate({ email, password, username, location });
    }
  };

  const isLoading = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-center font-serif">
          {type === "login"
            ? "Sign in to your account"
            : "Create a new account"}
        </h2>
        <p className="text-muted-foreground mt-2 text-center">
          {type === "login"
            ? "Enter your credentials to access your account"
            : "Join our community to share and borrow books"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "register" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter your city and country"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            {type === "login" && (
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <Input
            id="password"
            type="password"
            placeholder={
              type === "login" ? "Enter your password" : "Create a password"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {type === "login" && (
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
        )}

        <Button type="submit" className="w-full border" disabled={isLoading}>
          {isLoading
            ? type === "login"
              ? "Signing in..."
              : "Creating account..."
            : type === "login"
              ? "Sign in"
              : "Create account"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        {type === "login" ? (
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
