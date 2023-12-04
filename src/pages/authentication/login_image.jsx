import Logo from "./../../assets/logo.png";

const LoginImage = () => {
  return (
    <div className="bg-primary w-full h-full flex items-center my-auto">
      <img
        src={Logo}
        alt="Logo"
        className="mx-auto my-auto w-56"
      />
    </div>
  );
};

export default LoginImage;
