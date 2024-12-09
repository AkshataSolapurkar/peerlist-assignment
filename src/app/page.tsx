"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the /form page when the component is mounted
    router.push("/form");
  }, [router]);

  return (
    <div className="flex items-center h-screen justify-center bg-gray-100">
    </div>
  );
};

export default Home;
