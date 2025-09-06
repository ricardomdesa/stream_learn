import Hls from "hls.js";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type VideoProps = {
  videoUrl: string | undefined;
  token: string | undefined;
};

export default function VideoPlayerHLS({ videoUrl, token }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();
  const source = `${process.env.NEXT_PUBLIC_API_VIDEO_URL}/media/${videoUrl}/stream`;

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const hls = new Hls({
        maxLoadingDelay: 4,
        minAutoBitrate: 0,
        lowLatencyMode: true,
        xhrSetup: (xhr: any) => {
          xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        },
      });
      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data?.response?.code === 401 || data?.response?.code === 403) {
          signOut();
          router.push("/login");
        }
      });
      hls.loadSource(source);
      hls.attachMedia(videoRef.current);
      return () => {
        hls.destroy();
      };
    } else if (videoRef.current) {
      // fallback for browsers with native HLS support
      videoRef.current.src = source;
    }
  }, [source, token, router]);

  return (
    <video ref={videoRef} controls width="90%" style={{ height: "auto" }} />
  );
}
