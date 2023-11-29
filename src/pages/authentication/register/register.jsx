import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Controller, useForm } from "react-hook-form";
import LoginImage from "@/components/login_image";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submit", data);

    // Check validation conditions
    if (errors.email || errors.password || errors.phone) {
      setShowAlert(true);
      return;
    }
  };

  return (
    <div className="font-poppins flex h-screen w-screen">
      <div className="flex mx-auto my-auto items-center w-screen md:w-1/2">
        <div className="absolute flex flex-col justify-center space-x-2 text-sm top-3">
          {showAlert && (
            <Alert
              variant="destructive"
              className="relative h-14 justify-center mx-auto"
              style={{ width: 500 }}
            >
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
            </Alert>
          )}
        </div>
        <div className="mx-auto md:w-4/5">
          <div className="max-w-md mx-auto p-8 space-y-6">
            <h2 className="text-2xl font-semibold">Daftar</h2>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Nama */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">Nama</label>
                <Input
                  placeholder="Nama Lengkap"
                  className="h-11"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">Email</label>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "Email wajib diisi",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Email tidak valid",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Contoh: johndee@gmail.com"
                      className="h-11"
                      {...field}
                    />
                  )}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              {/* Nomor Telepon */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">Nomor Telepon</label>
                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: "Nomor telepon wajib diisi",
                    pattern: {
                      value: /^\+62[0-9]*$/,
                      message: "Format nomor telepon tidak valid. Harus diawali dengan +62 dan hanya mengandung angka.",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="+62 . "
                      className="h-11"
                      {...field}
                    />
                  )}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">Password</label>
                <div className="flex space-x-4 relative items-center">
                  <Controller
                    control={control}
                    name="password"
                    rules={{
                      required: "Password wajib diisi",
                      minLength: {
                        value: 8,
                        message: "Password minimal 8 karakter",
                      },
                      maxLength: {
                        value: 12,
                        message: "Password maksimal 12 karakter",
                      },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                        message: "Password harus diawali huruf kapital, mengandung angka, dan simbol",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Buat Password"
                        className="h-11 relative"
                        {...field}
                      />
                    )}
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
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>

              {/* Tombol Submit */}
              <div className="pt-3">
                <Button
                  type="submit"
                  className="w-full h-11 hover:bg-active"
                >
                  Submit
                </Button>
              </div>
              <div className="flex justify-center items-center space-x-2 text-sm pt-2">
                <div>Sudah Punya Akun?</div>
                <a
                  href="/UserLogin"
                  className="text-active font-semibold hover:text-primary"
                >
                  Masuk di sini
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

export default Register;
