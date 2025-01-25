import { component$ } from "@builder.io/qwik";
import { randomId } from "@utils/random";

export default component$(() => {
  const images = Array.from({ length: 50 }, () => ({
    width: Math.floor(Math.random() * 200) + 100,
    height: Math.floor(Math.random() * 200) + 100,
  }));

  return (
    <ul
      class='p-4 border border-dashed rounded-xl overflow-hidden'
      style={{
        listStyle: "none",
        columnGap: "0",
        padding: "0",
        columnCount: 5,
        height: "70vh",
      }}
    >
      {images.map(async (image, index) => (
        <li
          key={await randomId(12)}
          class='m-0 p-0 rounded-xl break-inside-avoid w-full'
        >
          <img
            src={`https://picsum.photos/${image.width}/${image.height}`}
            alt={`${index + 1}`}
            class='w-full h-auto'
          />
        </li>
      ))}
    </ul>
  );
});
