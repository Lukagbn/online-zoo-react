import React from "react";
import styles from "./Camera.module.scss";
import CameraTitle from "./CameraTitle/CameraTitle";

interface CameraUrlsProps {
  id: number;
  url: string;
}

const CAMERA_URLS: CameraUrlsProps[] = [
  { id: 1, url: "https://www.youtube.com/embed/9LvjI3NelAU" },
  { id: 2, url: "https://www.youtube.com/embed/mH3G5Gai2oY" },
  { id: 3, url: "https://www.youtube.com/embed/yfSyjwY6zSQ" },
  { id: 4, url: "https://www.youtube.com/embed/LHtzZf4T7xw" },
  { id: 5, url: "https://www.youtube.com/embed/RmmAzrAkKqI" },
  { id: 6, url: "https://www.youtube.com/embed/aRs5EN4epyE" },
  { id: 7, url: "https://www.youtube.com/embed/h0CC8PwxsXw" },
  { id: 8, url: "https://www.youtube.com/embed/dXKCmOEq3ns" },
  { id: 9, url: "https://www.youtube.com/embed/dkFYrv1NFPg" },
  { id: 10, url: "https://www.youtube.com/embed/yfSyjwY6zSQ" },
  { id: 11, url: "https://www.youtube.com/embed/gdrNUUf-cQw" },
  { id: 12, url: "https://www.youtube.com/embed/9mg9PoFEX2U" },
  { id: 13, url: "https://www.youtube.com/embed/dXKCmOEq3ns" },
  { id: 14, url: "https://www.youtube.com/embed/5e4lsEe4Vew" },
  { id: 15, url: "https://www.youtube.com/embed/bpibqvcGVYQ" },
  { id: 16, url: "https://www.youtube.com/embed/2360fnKZcIQ" },
  { id: 17, url: "https://www.youtube.com/embed/ghg9lhFDouM" },
  { id: 18, url: "https://www.youtube.com/embed/4wb6o3QvrxY" },
  { id: 19, url: "https://www.youtube.com/embed/BSUnBPvX9K4" },
  { id: 20, url: "https://www.youtube.com/embed/nHdmlkCS2mE" },
  { id: 21, url: "https://www.youtube.com/embed/mH3G5Gai2oY" },
  { id: 22, url: "https://www.youtube.com/embed/lm2FBAr1Nek" },
  { id: 23, url: "https://www.youtube.com/embed/k2kiyWu_XNc" },
  { id: 24, url: "https://www.youtube.com/embed/LHtzZf4T7xw" },
  { id: 25, url: "https://www.youtube.com/embed/2FdvAk95PSk" },
  { id: 26, url: "https://www.youtube.com/embed/Ue3b5pBypPE" },
  { id: 27, url: "https://www.youtube.com/embed/g_L1Ay8P244" },
  { id: 28, url: "https://www.youtube.com/embed/1p_8EffzFsY" },
];

function Camera({ id }: { id: string }) {
  const cameraUrl = CAMERA_URLS[Number(id) - 1];
  return (
    <section className={styles.liveAnimal}>
      <div className={styles.innerContainer}>
        <div className={styles.liveAnimalHeader}>
          <CameraTitle id={id} />
          <div className={styles.pandaLiveWrapper}>
            {cameraUrl ? (
              <iframe
                className={styles.pandaLive}
                width="100%"
                height="100%"
                src={cameraUrl.url}
                title="Live Animal Cam"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p>No camera avaliable!</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Camera;
