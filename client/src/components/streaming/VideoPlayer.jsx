import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import apiRoutes from "../../../utils/apiRoutes";
import axios from "axios";

const VideoPlayer = ({ episodeId }) => {
  const [quality, setQuality] = useState("");
  const [episode, setEpisode] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiRoutes.getStreamingLink(episodeId));
        setQuality(response.data[0].url);
        setEpisode(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [episodeId]);

  const changeQuality = (url) => {
    setQuality(url);
  };

  return (
    <section className="w-full">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {quality && (
            <div className="w-full max-w-8xl mx-auto">
              <div className="relative pt-[56.25%]">
                <ReactPlayer
                  url={quality}
                  controls
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                />
              </div>
            </div>
          )}
          <div className="flex justify-center flex-wrap mt-4">
            {episode.length > 0 && (
              <>
                {episode.map((e) => (
                  <button
                    className="text-sm rounded-md hover:text-gray-400 bg-slate-800 text-white px-4 py-2 m-2"
                    onClick={() => changeQuality(e.url)}
                    key={e.quality}
                  >
                    {e.quality}
                  </button>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default VideoPlayer;
