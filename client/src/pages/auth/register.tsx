import React, { useState } from "react";
import AuthLayout from "@/components/auth/layout";
import Link from "next/link";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { FormData } from "@/types";

type RegisterProps = {};

const initialState: FormData = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister: React.FC<RegisterProps> = () => {
    const [formData, setFormData] = useState<FormData>(initialState);
    const onSubmit = (
     e: React.FormEvent<HTMLFormElement>,
      
    ) => {};

  return (
    <AuthLayout>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create new account
          </h1>
          <p className="mt-2">
            Already have an account?
            <Link
              href="/auth/login"
              className="font-medium ml-2 text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </AuthLayout>
  );
};
export default AuthRegister;
