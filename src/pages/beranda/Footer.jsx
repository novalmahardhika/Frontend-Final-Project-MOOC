import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className=" absolute b-0 bg-primary w-full font-poppins">
        <div className="container flex space-x-20 items-start justify-between pt-16 pb-10 px-24">
          <div className="items-start w-4/5">
            <img
              src="/src/assets/logo.png"
              alt=""
              className="w-48"
            />
            <p className="text-white text-sm w-4/5 ">Dengan Idea Academy Belajar menjadi lebih mudah</p>
          </div>
          <div className="text-white text-sm space-y-3 w-2/5">
            <div className="font-bold ">Kategori Belajar</div>
            <div className="text-xs space-y-1 flex flex-col">
              <Link to="">Data Science</Link>
              <Link to="">UI/UX Design</Link>
              <Link to="">Android Development</Link>
              <Link to="">Web Development</Link>
              <Link to="">IOS Development</Link>
              <Link to="">Bussiness Intelligence</Link>
            </div>
          </div>
          <div className="text-white text-sm space-y-3 w-2/5">
            <div className="font-bold ">Kategori Belajar</div>
            <div className="text-xs space-y-1 flex flex-col">
              <Link to="">Data Science</Link>
              <Link to="">UI/UX Design</Link>
              <Link to="">Android Development</Link>
              <Link to="">Web Development</Link>
              <Link to="">IOS Development</Link>
              <Link to="">Bussiness Intelligence</Link>
            </div>
          </div>
          <div className="text-white text-sm space-y-3 w-2/5">
            <p className="font-bold">Kelas Populer</p>
            <div className="text-xs space-y-1 flex flex-col">
              <Link to="#">Belajar Web Designer Dengan Figma</Link>
              <Link to="#">Membuat Wireframe Hingga ke Visual Design</Link>
              <Link to="#">Pengenalan tentang Design System</Link>
            </div>
          </div>
        </div>
        <div className="text-white text-xs text-center py-3">&copy; Copyright Idea Academy 2023.</div>
      </footer>
    </>
  );
};

export default Footer;
