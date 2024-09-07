import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const fetchImages = async () => {
    const promises = Array.from({ length: 20 }, async () => {
      const response = await fetch(
        "https://api.tinyfox.dev/img.json?animal=wah"
      );
      const data = await response.json();
      console.log(data);
      return `https://tinyfox.dev${data.loc}`;
    });
    return Promise.all(promises);
  };

  const images = await fetchImages();
  return json({ images });
};

export default function Index() {
  const { images } = useLoaderData<typeof loader>();

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl text-center pt-[10px] pb-[15px] font-bold">
        リロードするたびレッサーパンダが更新されるよ⭐️
      </h1>
      <div className="columns-4 gap-[5px]">
        {images.map((url: string, index: number) => (
          <div key={index} className="break-avoid text-white p-2 rounded">
            <img src={url} alt="Red Panda" className="w-full h-auto rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
