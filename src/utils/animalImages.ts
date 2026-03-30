export interface AnimalBioImages {
  id: number;
  url: string;
  alt: string;
}

export interface AnimalBioProps {
  commonName: string;
  diet: string;
  habitat: string;
  id: number;
  latitude: string;
  longitude: string;
  range: string;
  scientificName: string;
  size: string;
  type: string;
}

export const ANIMAL_BIO_IMAGES: AnimalBioImages[] = [
  { id: 1, url: "/images/zoos/animals/panda.png", alt: "panda" },
  { id: 2, url: "/images/zoos/animals/lemur.png", alt: "lemur" },
  {
    id: 3,
    url: "/images/zoos/animals/gorillacongo.png",
    alt: "gorilla in congo",
  },
  { id: 4, url: "/images/zoos/animals/alligator.png", alt: "alligator" },
  { id: 5, url: "/images/zoos/animals/eagles.png", alt: "eagles" },
  { id: 6, url: "/images/zoos/animals/koala.png", alt: "koala" },
  { id: 7, url: "/images/zoos/animals/lion.png", alt: "lion" },
  { id: 8, url: "/images/zoos/animals/tiger.png", alt: "tiger" },
  { id: 9, url: "/images/zoos/animals/redpanda.webp", alt: "red panda" },
  { id: 10, url: "/images/zoos/animals/gorilla.png", alt: "gorilla" },
  { id: 11, url: "/images/zoos/animals/elephant.webp", alt: "elephant" },
  { id: 12, url: "/images/zoos/animals/seaotter.jpg", alt: "sea otter" },
  {
    id: 13,
    url: "/images/zoos/animals/bengaltiger.webp",
    alt: "bengal tiger",
  },
  { id: 14, url: "/images/zoos/animals/graywolf.webp", alt: "graywolf" },
  { id: 15, url: "/images/zoos/animals/fennecfox.webp", alt: "fennec fox" },
  {
    id: 16,
    url: "/images/zoos/animals/grizzlybear.webp",
    alt: "grizzly bear",
  },
  { id: 17, url: "/images/zoos/animals/dolphin.webp", alt: "dolphin" },
  {
    id: 18,
    url: "/images/zoos/animals/snowleopard.webp",
    alt: "snow leopard",
  },
  { id: 19, url: "/images/zoos/animals/polarbear.webp", alt: "polar bear" },
  { id: 20, url: "/images/zoos/animals/jaguar.webp", alt: "jaguar" },
  {
    id: 21,
    url: "/images/zoos/animals/ringtailedlemur.webp",
    alt: "ring tailed lemur",
  },
  { id: 22, url: "/images/zoos/animals/whiterhino.webp", alt: "white rhino" },
  { id: 23, url: "/images/zoos/animals/arcticfox.webp", alt: "arctic" },
  {
    id: 24,
    url: "/images/zoos/animals/saltwatercrocodile.webp",
    alt: "salt water crocodile",
  },
  {
    id: 25,
    url: "/images/zoos/animals/scarletmacaw.webp",
    alt: "scarlet macaw",
  },
  {
    id: 26,
    url: "/images/zoos/animals/komododragon.webp",
    alt: "komodo dragon",
  },
  { id: 27, url: "/images/zoos/animals/sloth.webp", alt: "sloth" },
  { id: 28, url: "/images/zoos/animals/cheetah.webp", alt: "cheetah" },
];
