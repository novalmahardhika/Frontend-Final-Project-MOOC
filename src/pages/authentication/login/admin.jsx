import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useCallback } from "react";
import LoginImage from "./../login_image";
import { useNavigate } from "react-router";
import axios from "axios";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalError, setIsModalError] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const validateInput = useCallback(() => {
    // Validasi Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email Harus diisi");
      setIsEmailValid(false);
    } else if (!emailRegex.test(email)) {
      setEmailError("Format email tidak valid");
      setIsEmailValid(false);
    } else {
      setEmailError("");
      setIsEmailValid(true);
    }

    // Validasi Password
    if (!password) {
      setPasswordError("Password harus diisi");
      setIsPasswordValid(false);
    // } else if (password.length < 8 || password.length > 12) {
      // setPasswordError("Password harus terdiri dari 8-12 karakter");
      // setIsPasswordValid(false);
    } else {
      setPasswordError("");
      setIsPasswordValid(true);
    }
  }, [email, password]);

  useEffect(() => {
    if (isFormSubmitted) {
      validateInput();
    }
  }, [isFormSubmitted, validateInput]);

  const onSubmit = async () => {
    setIsFormSubmitted(true);

    // Cek apakah semua input valid
    if (isEmailValid && isPasswordValid) {
      try {
        const payload = {
          email,
          password,
        };
        const res = await axios.post("https://idea-academy.up.railway.app/api/v1/login", payload);

        setIsModalVisible(true);

        setTimeout(() => {
          setIsModalVisible(false);
          setEmail("");
          setPassword("");
          localStorage.setItem("token", res.data.data.token);
          navigate("/admin");
        }, 3000);
      } catch (err) {
        if (!email && !password) {
          console.log(err);
        } else {
          setIsModalError(true);

          setTimeout(() => {
            setIsModalError(false);
          }, 3000);
        }
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/beranda");
    }
  }, [token, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="font-poppins flex h-screen w-screen">
      <div className=" hidden md:flex mx-auto my-auto items-center w-screen md:w-1/2 h-full">
        <LoginImage />
      </div>
      <div className="flex mx-auto my-auto items-center w-4/5 md:w-1/2">
        <div className=" mx-auto items-center w-4/5 md:w-1/2">
          <div className="max-w-md mx-auto p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-center">Masuk Admin</h2>
            <form className="space-y-7">
              {/* Email */}
              <div className="space-y-1 relative">
                <div className="block text-sm font-medium text-gray-800">Email</div>
                <Input
                  placeholder="Contoh: johndee@gmail.com"
                  className={`h-11 ${!isEmailValid && isFormSubmitted && "border-red-500"}`}
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEmailValid(false); // Setel ke false saat ada perubahan
                  }}
                  onBlur={() => setIsFormSubmitted(true)}
                />
                {/* Pesan Kesalahan Email */}
                <div className={`text-red-500 text-xs absolute top-full ${!isEmailValid && isFormSubmitted ? "opacity-100" : "opacity-0"}`}>{!isEmailValid && emailError}</div>
              </div>

              {/* Password */}
              <div className="space-y-1 relative mb-10">
                <div className="block text-sm font-medium text-gray-800">Password</div>
                <div className="flex space-x-4 relative items-center">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Buat Password"
                    maxLength={12}
                    className={`h-11 relative ${!isPasswordValid && isFormSubmitted && "border-red-500"}`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setIsPasswordValid(false); // Setel ke false saat ada perubahan
                    }}
                    onBlur={() => setIsFormSubmitted(true)}
                  />
                  {/* Toggle Password */}
                  <div
                    className="absolute cursor-pointer text-primary right-4 top-1/2 transform -translate-y-1/2"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className=""
                    />
                  </div>
                </div>
                {/* Pesan Kesalahan Password */}
                <div className={`text-red-500 text-xs absolute top-full ${!isPasswordValid && isFormSubmitted ? "opacity-100" : "opacity-0"}`}>{!isPasswordValid && passwordError}</div>
              </div>

              {/* Tombol Submit */}
              <div className="pt-3">
                <Button
                  type="button"
                  className="w-full h-11 hover:bg-active"
                  onClick={onSubmit}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center h-20">
          <div className="bg-success text-white p-4 rounded-md shadow-md">Login berhasil! Mengalihkan ke halaman Beranda...</div>
        </div>
      )}
      {isModalError && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center h-20">
          <div className=" bg-destructive text-white p-4 rounded-md shadow-md">Login gagal silahkan coba kembali...</div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
