import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import LoginImage from "@/components/login_image";

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="font-poppins flex h-screen w-screen">
      <div className="flex mx-auto my-auto items-center w-screen md:w-1/2">
        <div className=" mx-auto items-center w-4/5 md:w-1/2">
          <div className="max-w-md mx-auto p-8 space-y-6">
            <h2 className="text-2xl font-semibold">Masuk</h2>
            <form className="space-y-4">
              {/* Nama */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">Email/No Telepon</label>

                <Input
                  placeholder="Contoh: johndee@gmail.com"
                  className="h-11"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="block text-sm font-medium text-gray-800">Password</label>
                  <a
                    href="#"
                    className="block text-sm font-medium text-active hover:text-primary"
                  >
                    Lupa Password
                  </a>
                </div>
                <div className="flex space-x-4 relative items-center">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Masukkan Password"
                    className="h-11 relative"
                  />
                  <div
                    className="absolute cursor-pointer text-primary right-4"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className=""
                    />
                  </div>
                </div>
              </div>

              {/* Tombol Submit */}
              <div className="pt-3">
                <Button className="w-full h-11 hover:bg-active">Submit</Button>
              </div>
              <div className="flex justify-center items-center space-x-2 text-sm pt-2">
                <div>Belum Punya Akun?</div>
                <a
                  href="/UserRegister"
                  className="text-active font-semibold hover:text-primary"
                >
                  Daftar di sini
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden md:flex mx-auto my-auto items-center w-1/2 h-full">
        <LoginImage />
      </div>
    </div>
  );
};

export default UserLogin;
