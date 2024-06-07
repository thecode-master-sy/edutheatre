import { Button } from "@/lib/shadcn-ui/button";
import Image from "next/image";
import { Label } from "@/lib/shadcn-ui/label";
import { Input } from "@/lib/shadcn-ui/input";
import { FcGoogle } from "react-icons/fc";

export default function SignupComponent() {
  return (
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid box-animate w-full h-full grid-cols-1 bg-white md:grid-cols-2">
        <div className="bg-[#16202a] text-white flex items-center justify-center flex-col ">
          <div className="my-4">
            <h1 className="text-2xl font-semibold">Sign Up</h1>
            <p className="mt-2 text-xs text-slate-400">
              {""}
              
            </p>
          </div>

          <form>
            <Button
              className="flex items-center w-full gap-4 px-12 bg-transparent rounded-full"
              variant="outline"
            >
              <FcGoogle />
              sign up with google
            </Button>


            <Label htmlFor="email">Name</Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-full "
              type="name"
              id="name"
              placeholder="Name"
            />

            <Label htmlFor="email">Email</Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-full "
              type="email"
              id="email"
              placeholder="email"
            />

            <Label htmlFor="email">Password</Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-full "
              type="password"
              id="password"
              placeholder="Password"
            />

            <Button
              type="submit"
              className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700"
            >
              Sign Up
            </Button>

            
          </form>
          <h1 className="mt-4 text-xs text-slate-200 ">Already have an account?</h1>
          <button>Login</button>

        </div>
        <div className="relative hidden md:block">
          <Image
            className="object-cover"
            fill={true}
            src="/bg.jpg"
            alt="background image"
          />
        </div>
      </div>
    </main>
  );
}

