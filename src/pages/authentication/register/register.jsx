import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginImage from "./../login_image";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalError, setIsModalError] = useState(false);

  const navigate = useNavigate();

  const validateInput = useCallback(() => {
    // Validasi Nama
    if (!name) {
      setNameError("Nama harus diisi");
      setIsNameValid(false);
    } else {
      setNameError("");
      setIsNameValid(true);
    }

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

    // Validasi Nomor Telepon
    const phoneRegex = /^\+62\d{1,}$/;
    if (!phoneNumber) {
      setPhoneNumberError("Nomor telepon harus diisi");
      setIsPhoneNumberValid(false);
    } else if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError("Nomor telepon harus diawali dengan +62");
      setIsPhoneNumberValid(false);
    } else {
      setPhoneNumberError("");
      setIsPhoneNumberValid(true);
    }

    // Validasi Password
    if (!password) {
      setPasswordError("Password harus diisi");
      setIsPasswordValid(false);
    } else if (password.length < 8 || password.length > 12) {
      setPasswordError("Password harus terdiri dari 8-12 karakter");
      setIsPasswordValid(false);
    } else {
      setPasswordError("");
      setIsPasswordValid(true);
    }
  }, [name, email, phoneNumber, password]);

  useEffect(() => {
    if (isFormSubmitted) {
      validateInput();
    }
  }, [isFormSubmitted, validateInput]);

  const onSubmit = async () => {
    setIsFormSubmitted(true);

    if (isNameValid && isEmailValid && isPhoneNumberValid && isPasswordValid) {
      try {
        const payload = {
          name,
          email,
          password,
          phoneNumber,
        };
        const res = await axios.post("https://idea-academy.up.railway.app/api/v1/register", payload);
        console.log(res);

        setIsModalVisible(true);

        setTimeout(() => {
          setIsModalVisible(false);
          navigate("/User/Login");
        }, 3000);
      } catch (err) {
        if (!email && !name && !phoneNumber && !password) {
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="font-poppins flex h-screen w-screen">
      <div className="flex mx-auto my-auto items-center w-screen md:w-1/2">
        <div className=" mx-auto items-center w-4/5 md:w-1/2">
          <div className="max-w-md mx-auto p-8 space-y-6">
            <h2 className="text-2xl font-semibold">Daftar</h2>
            <form className="space-y-7">
              <div className="space-y-1 relative">
                <div className="block text-sm font-medium text-gray-800">Nama</div>
                <Input
                  placeholder="Nama Lengkap"
                  className={`h-11 ${!isNameValid && isFormSubmitted && "border-red-500"}`}
                  id="name"
                  maxLength={50}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setIsNameValid(false);
                  }}
                  onBlur={() => setIsFormSubmitted(true)}
                />
                <div className={`text-red-500 text-xs absolute top-full ${!isNameValid && isFormSubmitted ? "opacity-100" : "opacity-0"}`}>{!isNameValid && nameError}</div>
              </div>

              <div className="space-y-1 relative">
                <div className="block text-sm font-medium text-gray-800">Email</div>
                <Input
                  placeholder="Contoh: johndee@gmail.com"
                  className={`h-11 ${!isEmailValid && isFormSubmitted && "border-red-500"}`}
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEmailValid(false);
                  }}
                  onBlur={() => setIsFormSubmitted(true)}
                />
                <div className={`text-red-500 text-xs absolute top-full ${!isEmailValid && isFormSubmitted ? "opacity-100" : "opacity-0"}`}>{!isEmailValid && emailError}</div>
              </div>

              <div className="space-y-1 relative mb-10">
                <div className="block text-sm font-medium text-gray-800">Nomor Telepon</div>
                <Input
                  placeholder="+62 . "
                  className={`h-11 ${!isPhoneNumberValid && isFormSubmitted && "border-red-500"}`}
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setIsPhoneNumberValid(false);
                  }}
                  onBlur={() => setIsFormSubmitted(true)}
                />
                <div className={`text-red-500 text-xs absolute top-full ${!isPhoneNumberValid && isFormSubmitted ? "opacity-100" : "opacity-0"}`}>{!isPhoneNumberValid && phoneNumberError}</div>
              </div>

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
                      setIsPasswordValid(false);
                    }}
                    onBlur={() => setIsFormSubmitted(true)}
                  />
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
                <div className={`text-red-500 text-xs absolute top-full ${!isPasswordValid && isFormSubmitted ? "opacity-100" : "opacity-0"}`}>{!isPasswordValid && passwordError}</div>
              </div>

              <div className="pt-3">
                <Button
                  type="button"
                  className="w-full h-11 hover:bg-active"
                  onClick={onSubmit}
                >
                  Submit
                </Button>
              </div>
              <div className="flex justify-center items-center space-x-2 text-sm pt-2">
                <div>Sudah Punya Akun?</div>
                <Link
                  to="/User/Login"
                  className="text-active font-semibold hover:text-primary"
                >
                  Masuk di sini
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden md:flex mx-auto my-auto items-center w-1/2 h-full">
        <LoginImage />
      </div>

      {isModalVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center h-20">
          <div className="bg-success text-white p-4 rounded-md shadow-md">Registrasi berhasil! Mengalihkan ke halaman login...</div>
        </div>
      )}

      {isModalError && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center h-20">
          <div className=" bg-destructive text-white p-4 rounded-md shadow-md">Email sudah digunakan silahkan coba dengan email lain...</div>
        </div>
      )}
    </div>
  );
};

export default Register;
