import MainLayout from "@/components/layout/MainLayout";
import AuthForm from "@/components/auth/AuthForm";

const Register = () => {
  return (
    <MainLayout>
      <div className="container-custom py-12 md:py-16">
        <AuthForm type="register" />
      </div>
    </MainLayout>
  );
};

export default Register;
