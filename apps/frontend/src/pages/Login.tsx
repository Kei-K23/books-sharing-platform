import MainLayout from "@/components/layout/MainLayout";
import AuthForm from "@/components/auth/AuthForm";

const Login = () => {
  return (
    <MainLayout>
      <div className="container-custom py-12 md:py-16">
        <AuthForm type="login" />
      </div>
    </MainLayout>
  );
};

export default Login;
