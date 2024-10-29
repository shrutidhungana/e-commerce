import React, { useState } from "react";
import AuthLayout from "@/components/auth/layout";
import Link from "next/link";
import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { FormData } from "@/types";

type LoginProps = {};

const initialState: FormData = {
  email: "",
  password: "",
};

const AuthLogin: React.FC<LoginProps> = () => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <AuthLayout>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h1>
          <p className="mt-2">
            Don&apos;t have an account?
            <Link
              href="/auth/register"
              className="font-medium ml-2 text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </AuthLayout>
  );
};
export default AuthLogin;
