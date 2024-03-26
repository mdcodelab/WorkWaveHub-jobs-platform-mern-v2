import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Landing() {
    React.useEffect(() => {
      AOS.init();
    }, []);

  return (
    <Wrapper>
      <nav>
        <div
          className="nav-content"
          data-aos="slide-right"
          data-aos-duration="1500"
        >
          <h2 className="logo">W</h2>
          <h4>Work Wave Hub</h4>
        </div>
      </nav>
      <div className="container">
        <video className="video" autoPlay muted playsInline loop preload="auto">
          <source src="assets/video.mp4" type="video/mp4"></source>
        </video>
        <div className="cover">
          <div className="cover__content">
            <h1 data-aos="slide-down" data-aos-duration="2500">
              Job <span>Tracking</span> Platform
            </h1>
            <p >
              This job platform is tailored to meet the demands of modern
              professionals and businesses alike. Whether you're an individual
              seeking your next career opportunity or an organization striving
              to find the best talent, our platform bridges the gap, offering a
              seamless, intuitive experience. Dive into a vast pool of
              opportunities, connect with like-minded professionals, and usher
              in a new era of work, all at your fingertips!
            </p>
            <div className="buttons">
              <Link
                className="btn btn-hero-1"
                to="/register"
                data-aos-duration="2000"
              >
                Register
              </Link>

              <Link
                className="btn btn-hero-2"
                to="/login"
                data-aos-duration="2000"
              >
                Login / Demo User
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer__content">
          <p className="footer__info">
            <span className="date">&copy; {new Date().getFullYear()}</span>
            <span className="logo__full">
              <span className="logo__letter">W</span>
              <span className="logo__name"> Work Wave Hub.</span>
            </span>
            All Rights Reserved.
          </p>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  overflow-y: hidden;
  background: var(--primary-900);

  nav {
    width: 100%;
    max-width: 1200px;
    height: 6rem;
    margin: 0 auto;
  }

  .nav-content {
    display: flex;
    height: 100%;
    width: 10rem;
    align-items: center;
    justify-content: space-between;
    width: max-content;
    height: 100%;
  }

  .logo {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: var(--primary-500);
    margin: 0;
    margin-right: 1rem;
  }

  nav h4 {
    color: var(--primary-500);
    margin: 0;
    font-weight: bold;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    height: calc(100vh - 11rem);
  }

  .video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
    margin: 0 auto;
  }

  .cover {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    height: calc(100vh - 11rem);
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .cover__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .cover__content h1 {
    text-align: center;
    margin: 0;
    color: #fff;
    font-size: 3rem;
    text-shadow: 0 1px 3px white;
    margin-bottom: 3.5rem;
  }

  .cover__content h1 span {
    color: var(--primary-900);
  }

  .cover__content p {
    line-height: 1.85rem;
    text-align: justify;
    width: 70%;
    font-size: 1.15rem;
  }

  .buttons {
    width: 20rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .buttons a {
    display: block;
    margin: 0 auto;
    width: max-content;
    margin-top: 2.5rem;
    padding: 0.8rem 0.8rem;
    background: var(--primary-900);
    transform: translateY(300px);
    animation: appear 1s ease forwards;
  }

  @keyframes appear {
    0% {
      transform: translateY(300px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .cover__content p {
    color: #fff;
    margin: 0;
    padding: 0;
  }

  //footer
  .footer {
    width: 100%;
    height: 5rem;
    color: #fff;
    padding-top: 2rem;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .footer__content {
    margin-bottom: 1rem;
  }

  .footer__info {
    width: 19rem;
    height: max-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo__full {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 8rem;
  }

  .logo__letter {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-400);
  }

  .logo__name {
    color: var(--primary-400);
  }

  @media screen and (max-width: 362px) {
    .footer {
      padding-top: 1rem;
    }
    .footer__info {
      flex-direction: column;
      height: max-content;
      line-height: 1.2rem;
    }
    .footer__info span {
      margin: 0;
      padding: 0;
    }
  }

  @media screen and (max-width: 632px) {
    .cover__content {
      padding: 1rem 0;
    }
    .cover__content h1 {
      font-size: 2rem;
    }
    .cover__content p {
      width: 100%;
      line-height: 1.5rem;
    }
  }

  @media screen and (max-width: 419px) {
    .cover__content p {
      line-height: 1.2rem;
    }
    .cover__content h1 {
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
    }
  }

  @media screen and (max-width: 303px) {
    .cover__content h1 {
      font-size: 1.5rem;
    }
    .cover__content p {
      font-size: 1rem;
    }
    .buttons {
      margin-top: -2rem;
    }
  }
`;
export default Landing;

