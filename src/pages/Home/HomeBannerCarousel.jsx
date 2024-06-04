import React from "react";

const bannerImages = [
  {
    url: "https://file.hstatic.net/1000075078/file/web_moi_-_desktop_7b7d644a948c41f8ba5a5e4e959d1de2.jpg",
  },
  {
    url: "https://file.hstatic.net/1000075078/file/desktop_a0a5fcd7a6bc4f26ae6d301a02b9b868.jpg",
  },
  {
    url: "https://file.hstatic.net/1000075078/file/desktop_55d525e1af7e4784a1ae64159546bec3.jpg",
  },
  {
    url: "https://file.hstatic.net/1000075078/file/web_moi_-_desktop_12a91ec3b7dd44f49f2bbef095b9c030.jpg",
  },
  {
    url: "https://file.hstatic.net/1000075078/file/web_desktop_01bc8f26a7e447c3a77dda1611fedd2c.jpg",
  },
];

const HomeBannerCarousel = () => {
  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide mb-4"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {bannerImages.length > 0 &&
          bannerImages.map((bannerImage, index) => (
            <div
              key={index}
              className={`carousel-item ${index == 0 ? "active" : ""}`}
              data-bs-interval="5000"
            >
              <img
                src={bannerImage.url}
                className="d-block w-100"
                alt="Home banner"
              />
            </div>
          ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HomeBannerCarousel;
