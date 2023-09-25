import { SignIn, SignOutButton } from "@clerk/nextjs";

const LoginPage = () => {
  return (
    <div>
      <SignIn />
      <SignOutButton />
    </div>
  );
};

export default LoginPage;
