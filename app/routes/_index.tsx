import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Red Panda Site" },
    { name: "description", content: "Welcome to Red-Panda Site!" },
    { property: "og:title", content: "Red Panda Site" },
    {
      property: "og:description",
      content: "Welcome to the Red Panda Site!",
    },
    { property: "og:image", content: "/redpanda.jpeg" },
    { property: "og:url", content: "https://example.com" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Red Panda Site" },
    {
      name: "twitter:description",
      content: "Welcome to the Red Panda Site!",
    },
    { name: "twitter:image", content: "/redpanda.jpeg" },
  ];
};

export const loader: LoaderFunction = async () => {
  const fetchImages = async () => {
    const promises = Array.from({ length: 20 }, async () => {
      const response = await fetch(
        "https://api.tinyfox.dev/img.json?animal=wah"
      );
      const data = await response.json();
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
    <div className="font-sans p-[10px]">
      <h1 className="text-3xl text-center pt-[10px] pb-[15px] font-bold">
        リロードするたびレッサーパンダが更新されるよ⭐️
      </h1>
      <ul className="columns-2 gap-[1px] md:columns-4 md:gap-[5px]">
        {images.map((url: string, index: number) => (
          <li
            key={index}
            className="break-avoid text-white p-[2px] md:p-1 rounded"
          >
            <a href={url}>
              <img
                src={url}
                alt="レッサーパンダ"
                className="w-full h-auto rounded"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
