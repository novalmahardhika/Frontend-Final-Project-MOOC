const Footer = () => {
  return (
    <>
      <div className="container-footer bg-primary w-screen h-full text-xl flex flex-col mt-[100px] justify-between">
        <div className="flex   items-center justify-between">
          <div className="flex flex-col items-center w-1/2 ">
            <img
              src="/src/assets/logo new.png"
              alt=""
              className="ml-7 p-2 w-[300px] h-[100px] mt-5 mb-0 bg-cover"
            />
            <p className="text-white p-8 ml-8 text-sm font-semibold whitespace-pre-wrap text-center w-2/3">
              Tempat Belajar coding Dengan Idea Academy Belajar coding menjadi
              lebih mudah
            </p>
          </div>
          <div className="flex flex-row mr-[150px] ">
            <div className="text-white mr-5 whitespace-nowrap text-sm ">
              <p className="font-bold text-lg">Kategori Belajar</p>
              <a href="">
                <p className="mb-1">Data Science</p>
              </a>
              <a href="">
                <p className="mb-1">UI/UX Design</p>
              </a>
              <a href="">
                <p className="mb-1">Android Development</p>
              </a>
              <a href="">
                <p className="mb-1">Web Development</p>
              </a>
              <a href="">
                <p className="mb-1">IOS Development</p>
              </a>
              <a href="">
                <p className="mb-1">Bussiness Intelligence</p>
              </a>
            </div>
            <div className="text-white ml-10 whitespace-nowrap text-sm">
              <p className="font-bold text-lg">Kelas Populer</p>
              <a href="#">
                <p className="mb-1">Belajar Web Designer Dengan Figma</p>
              </a>
              <a href="#">
                <p className="mb-1">
                  Membuat Wireframe Hingga ke Visual Design
                </p>
              </a>
              <a href="#">
                <p className="mb-1">Pengenalan tentang Design System</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
