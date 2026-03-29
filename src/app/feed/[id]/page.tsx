"use client";
import FetchError from "@/components/FetchError/FetchError";
import Loader from "@/components/Loader/Loader";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import TextBox from "@/components/AnimalBio/TextBox/TextBox";
import layout from "@/app/layout.module.scss";
import { getUserFromToken } from "@/utils/auth";

interface PetProps {
  id: number;
  commonName: string;
  scientificName: string;
  type: string;
  size: string;
  diet: string;
  habitat: string;
  range: string;
  latitude: string;
  longitude: string;
  description: string;
  detailedDescription: string;
}

interface PetApiResponse {
  data: PetProps;
}

interface FormData {
  email: string;
  name: string;
  cardNumber: string;
  cvv: string;
  date: string;
}

interface FormErrors {
  email: string;
  name: string;
  cardNumber: string;
  cvv: string;
  date: string;
}
export interface FeedingTier {
  type: "Basic" | "Standard" | "Premium";
  label: string;
  description: string;
  price: number;
  meals: string[];
}
export interface AnimalFeedingPlan {
  id: number;
  commonName: string;
  tiers: FeedingTier[];
}

export const ANIMAL_FEEDING_PLANS: AnimalFeedingPlan[] = [
  {
    id: 1,
    commonName: "Panda",
    tiers: [
      {
        type: "Basic",
        label: "Bamboo Bundle",
        description: "Essential daily fiber.",
        price: 10,
        meals: [
          "Fresh Bamboo Stems",
          "Water",
          "Bamboo Leaves",
          "Standard Pellets",
          "Oat Straw",
        ],
      },
      {
        type: "Standard",
        label: "Panda Picnic",
        description: "Balanced nutrients and natural sugars.",
        price: 25,
        meals: [
          "Young Bamboo Shoots",
          "Carrot Sticks",
          "Sweet Potato",
          "High-Fiber Biscuits",
          "Fresh Spring Water",
        ],
      },
      {
        type: "Premium",
        label: "Emperor’s Feast",
        description: "Ultimate luxury for total panda happiness.",
        price: 50,
        meals: [
          "Honey-Glazed Apple Slices",
          "Steamed Cornbread",
          "Premium Bamboo Hearts",
          "Frozen Fruit Pops",
          "Vitamin-Enriched Pith",
          "Fresh Pear",
        ],
      },
    ],
  },
  {
    id: 2,
    commonName: "Lemur",
    tiers: [
      {
        type: "Basic",
        label: "Fruit Snack",
        description: "Quick energy boost.",
        price: 5,
        meals: ["Banana Slices", "Leafy Greens", "Water", "Pellets", "Berries"],
      },
      {
        type: "Standard",
        label: "Jungle Mix",
        description: "A colorful variety of tropical flavors.",
        price: 15,
        meals: [
          "Papaya",
          "Mango",
          "Cucumber",
          "Hibiscus Flowers",
          "Sweet Peppers",
        ],
      },
      {
        type: "Premium",
        label: "Madagascar Buffet",
        description: "High-protein enrichment feast.",
        price: 30,
        meals: [
          "Exotic Lychee",
          "Flower Nectar",
          "Protein Mealworms",
          "Dragonfruit",
          "Honey Drops",
          "Fig Halves",
        ],
      },
    ],
  },
  {
    id: 3,
    commonName: "Congo Gorilla",
    tiers: [
      {
        type: "Basic",
        label: "Greenery",
        description: "Standard wild forage.",
        price: 12,
        meals: ["Wild Celery", "Bamboo", "Thistles", "Lettuce", "Tree Bark"],
      },
      {
        type: "Standard",
        label: "Forager Mix",
        description: "Nutrient-dense roots and berries.",
        price: 30,
        meals: [
          "Blackberries",
          "Bamboo Shoots",
          "Ginger Roots",
          "Kale",
          "Nettle Leaves",
        ],
      },
      {
        type: "Premium",
        label: "Silverback Feast",
        description: "The leader's choice for strength.",
        price: 60,
        meals: [
          "Organic Fruit Basket",
          "Protein Pith",
          "Enrichment Walnuts",
          "Steamed Leeks",
          "Herbal Tea",
          "Melon Rind",
        ],
      },
    ],
  },
  {
    id: 4,
    commonName: "Alligator",
    tiers: [
      {
        type: "Basic",
        label: "Meat Nibble",
        description: "Basic swamp protein.",
        price: 15,
        meals: ["Small Tilapia", "Beef Strips", "Vitamins", "Pellets", "Water"],
      },
      {
        type: "Standard",
        label: "Swamp Platter",
        description: "Full predator meal.",
        price: 35,
        meals: [
          "Large Perch",
          "Chicken Thighs",
          "Nutrient Paste",
          "Crab Legs",
          "Turkey Necks",
        ],
      },
      {
        type: "Premium",
        label: "Apex Predator",
        description: "The heavy-weight buffet.",
        price: 70,
        meals: [
          "Whole Game Meat",
          "Nutrient-Rich Organs",
          "Venison Chunks",
          "Whole Duck",
          "Beef Ribs",
          "Blood Cubes",
        ],
      },
    ],
  },
  {
    id: 5,
    commonName: "Eagles",
    tiers: [
      {
        type: "Basic",
        label: "Talons Up",
        description: "Standard high-protein snack.",
        price: 10,
        meals: ["Mice", "Small Fish", "Pellets", "Vitamins", "Water"],
      },
      {
        type: "Standard",
        label: "High Flyer",
        description: "Premium fresh-caught variety.",
        price: 25,
        meals: [
          "Fresh Trout",
          "Rabbit Portions",
          "Quail Eggs",
          "Chicken Wings",
          "Rat Strips",
        ],
      },
      {
        type: "Premium",
        label: "Sky Hunter",
        description: "Nutrient-dense hunting feast.",
        price: 45,
        meals: [
          "Salmon Fillets",
          "Whole Quail",
          "Beef Heart",
          "Enrichment Meat Tubes",
          "Omega-3 Sprat",
          "Turkey Bits",
        ],
      },
    ],
  },
  {
    id: 6,
    commonName: "Koala",
    tiers: [
      {
        type: "Basic",
        label: "Gum Leaf Pack",
        description: "Standard Eucalyptus variety.",
        price: 15,
        meals: ["Blue Gum", "Manna Gum", "Swamp Gum", "Water Spray", "Pellets"],
      },
      {
        type: "Standard",
        label: "Aussie Brunch",
        description: "Selected young shoots for digestion.",
        price: 30,
        meals: [
          "Tallowwood",
          "Grey Gum",
          "Forest Red Gum",
          "Fresh Dew",
          "Supplements",
        ],
      },
      {
        type: "Premium",
        label: "Outback Gourmet",
        description: "Top-tier selection of 5 species.",
        price: 55,
        meals: [
          "Red Ironbark",
          "Spotted Gum",
          "Ribbon Gum",
          "Vitamin-Infused Water",
          "Young Leaf Hearts",
          "Bud Extracts",
        ],
      },
    ],
  },
  {
    id: 7,
    commonName: "Lion",
    tiers: [
      {
        type: "Basic",
        label: "Cubs Portion",
        description: "Standard red meat mix.",
        price: 20,
        meals: [
          "Lean Beef",
          "Chicken Quarters",
          "Water",
          "Supplements",
          "Liver",
        ],
      },
      {
        type: "Standard",
        label: "Savannah Serve",
        description: "Prey-based nutrient balance.",
        price: 45,
        meals: [
          "Beef Chucks",
          "Bone Marrow",
          "Rabbit Portions",
          "Nutritional Oils",
          "Oxtail",
        ],
      },
      {
        type: "Premium",
        label: "King of Jungle",
        description: "Interactive hunting stimulation.",
        price: 90,
        meals: [
          "Whole Rib Cage",
          "Enrichment Meat Puzzles",
          "Blood Ice Blocks",
          "Prime Buffalo",
          "Heart Meat",
          "Lung Portions",
        ],
      },
    ],
  },
  {
    id: 8,
    commonName: "Tiger",
    tiers: [
      {
        type: "Basic",
        label: "Raw Bite",
        description: "Basic predator fuel.",
        price: 20,
        meals: ["Poultry Mix", "Beef Trimmings", "Vitamins", "Water", "Liver"],
      },
      {
        type: "Standard",
        label: "Striped Platter",
        description: "Variety of large mammal cuts.",
        price: 50,
        meals: [
          "Beef Quarters",
          "Bone Pith",
          "Venison Chunks",
          "Turkey",
          "Kidney Bites",
        ],
      },
      {
        type: "Premium",
        label: "Siberian Banquet",
        description: "The cold-climate feast.",
        price: 95,
        meals: [
          "Large Game Cuts",
          "Blood Ice Blocks",
          "Beef Ribs",
          "Whole Carcass Portion",
          "Salmon Fillet",
          "Marrow Bones",
        ],
      },
    ],
  },
  {
    id: 9,
    commonName: "Red Panda",
    tiers: [
      {
        type: "Basic",
        label: "Berry Bite",
        description: "High-altitude fiber.",
        price: 8,
        meals: ["Bamboo Shoots", "Berries", "Water", "Leafy Greens", "Pellets"],
      },
      {
        type: "Standard",
        label: "Himalayan Mix",
        description: "A sweet and savory foraging tray.",
        price: 20,
        meals: ["Acorns", "Lichens", "Bird Eggs", "Apple Slices", "Mulberries"],
      },
      {
        type: "Premium",
        label: "Firefox Feast",
        description: "Energy-rich panda delicacies.",
        price: 40,
        meals: [
          "Honey Grapes",
          "Sweet Potato",
          "Special Pellets",
          "Pear Cubes",
          "Blueberries",
          "Soft Bamboo Pith",
        ],
      },
    ],
  },
  {
    id: 10,
    commonName: "Gorilla",
    tiers: [
      {
        type: "Basic",
        label: "Daily Veg",
        description: "Fiber-rich garden mix.",
        price: 12,
        meals: ["Lettuce", "Bamboo", "Carrots", "Water", "Grass"],
      },
      {
        type: "Standard",
        label: "Tropic Platter",
        description: "Natural forest fruit diet.",
        price: 28,
        meals: [
          "Wild Fruits",
          "Nettle Leaves",
          "Celery",
          "Banana",
          "Sunflower Seeds",
        ],
      },
      {
        type: "Premium",
        label: "Troop Leader",
        description: "Dense nutrients for active gorillas.",
        price: 55,
        meals: [
          "Diverse Fruit Basket",
          "Nutrient-Dense Roots",
          "Tree Bark Pith",
          "Broccoli",
          "Enrichment Peanuts",
          "Herbal Leaves",
        ],
      },
    ],
  },
  {
    id: 11,
    commonName: "Elephant",
    tiers: [
      {
        type: "Basic",
        label: "Hay Bale",
        description: "Core fiber for the herd.",
        price: 25,
        meals: ["Timothy Hay", "Alfalfa", "Grass", "Water", "Oat Straw"],
      },
      {
        type: "Standard",
        label: "Gentle Giant",
        description: "Variety of garden harvest.",
        price: 60,
        meals: [
          "Tree Bark",
          "Cantaloupes",
          "Roots",
          "Whole Carrots",
          "Bamboo Stalks",
        ],
      },
      {
        type: "Premium",
        label: "Matriarch Mix",
        description: "The ultimate hydration feast.",
        price: 120,
        meals: [
          "Whole Watermelons",
          "Pumpkins",
          "Sugarcane",
          "Pineapples",
          "Bran Mash",
          "Banana Clusters",
        ],
      },
    ],
  },
  {
    id: 12,
    commonName: "Sea Otter",
    tiers: [
      {
        type: "Basic",
        label: "Shell Snack",
        description: "Core coastal nutrients.",
        price: 18,
        meals: ["Clams", "Mussels", "Squid", "Vitamins", "Water"],
      },
      {
        type: "Standard",
        label: "Pacific Plate",
        description: "Crunchy seafloor variety.",
        price: 40,
        meals: ["Crabs", "Sea Urchins", "Shrimp", "Clam Shells", "Octopus"],
      },
      {
        type: "Premium",
        label: "Otterly Gourmet",
        description: "The luxury deep-sea tray.",
        price: 80,
        meals: [
          "Abalone",
          "Squid",
          "Prawn Medley",
          "Lobster Bits",
          "Cold Ice Clams",
          "Scallops",
        ],
      },
    ],
  },
  {
    id: 13,
    commonName: "Bengal Tiger",
    tiers: [
      {
        type: "Basic",
        label: "Bengal Bite",
        description: "Daily protein maintenance.",
        price: 22,
        meals: ["Beef", "Chicken", "Water", "Vitamins", "Liver"],
      },
      {
        type: "Standard",
        label: "Jungle Hunter",
        description: "High-activity predator diet.",
        price: 55,
        meals: ["Boar Meat", "Bone Pith", "Turkey", "Beef Hearts", "Venison"],
      },
      {
        type: "Premium",
        label: "Royal Bengal",
        price: 100,
        description: "Aristocratic portion sizes.",
        meals: [
          "Prime Buffalo",
          "Cold Enrichment",
          "Whole Ribs",
          "Blood Pops",
          "Quail",
          "Organ Medley",
        ],
      },
    ],
  },
  {
    id: 14,
    commonName: "Gray Wolf",
    tiers: [
      {
        type: "Basic",
        label: "Pack Snack",
        description: "Essential pack energy.",
        price: 12,
        meals: ["Raw Chicken", "Beef Bits", "Water", "Vitamins", "Liver"],
      },
      {
        type: "Standard",
        label: "Alpha Order",
        description: "Dominant predator portion.",
        price: 30,
        meals: ["Venison", "Organs", "Rabbit", "Turkey Necks", "Heart"],
      },
      {
        type: "Premium",
        label: "Midnight Howl",
        description: "High-fat winter preparation.",
        price: 60,
        meals: [
          "Large Game Ribs",
          "Salmon Cuts",
          "Whole Chicken",
          "Marrow Bones",
          "Blood Slush",
          "Kidneys",
        ],
      },
    ],
  },
  {
    id: 15,
    commonName: "Fennec Fox",
    tiers: [
      {
        type: "Basic",
        label: "Desert Bite",
        description: "Light hydration meal.",
        price: 6,
        meals: ["Insects", "Water", "Berries", "Pellets", "Mealworms"],
      },
      {
        type: "Standard",
        label: "Sahara Mix",
        description: "Balanced desert variety.",
        price: 15,
        meals: ["Crickets", "Rodents", "Dates", "Egg Bits", "Cucumber"],
      },
      {
        type: "Premium",
        label: "Oasis Feast",
        description: "Luxury desert treat tray.",
        price: 30,
        meals: [
          "Sweet Grapes",
          "Cricket Medley",
          "Boiled Egg",
          "Honey Locust",
          "Soft Fruit",
          "Mealworm clusters",
        ],
      },
    ],
  },
  {
    id: 16,
    commonName: "Grizzly Bear",
    tiers: [
      {
        type: "Basic",
        label: "Berry Bowl",
        description: "Summer foraging mix.",
        price: 15,
        meals: ["Wild Berries", "Roots", "Grass", "Insects", "Water"],
      },
      {
        type: "Standard",
        label: "River Run",
        description: "Protein-rich fishing diet.",
        price: 45,
        meals: ["Fresh Salmon", "Trout", "Ant Larvae", "Apple Slices", "Honey"],
      },
      {
        type: "Premium",
        label: "Hibernation Prep",
        description: "Max-calorie enrichment feast.",
        price: 85,
        meals: [
          "Honey Combs",
          "High-Protein Nuts",
          "Fatty Salmon",
          "Whole Fish",
          "Peanut Butter Logs",
          "Acorns",
        ],
      },
    ],
  },
  {
    id: 17,
    commonName: "Dolphin",
    tiers: [
      {
        type: "Basic",
        label: "Small Fry",
        description: "Core ocean protein.",
        price: 20,
        meals: ["Sardines", "Capelin", "Smelt", "Hydration Gel", "Water"],
      },
      {
        type: "Standard",
        label: "Pod Platter",
        description: "Interactive fish variety.",
        price: 45,
        meals: [
          "Squid",
          "Mackerel Fillets",
          "Herring",
          "Anchovies",
          "Vitamin Gel",
        ],
      },
      {
        type: "Premium",
        label: "Oceanic Buffet",
        description: "The deep-sea celebration.",
        price: 85,
        meals: [
          "Spanish Mackerel",
          "Giant Squid",
          "Salmon Cubes",
          "Ice Fish Pops",
          "Whole Mullet",
          "Shrimp",
        ],
      },
    ],
  },
  {
    id: 18,
    commonName: "Snow Leopard",
    tiers: [
      {
        type: "Basic",
        label: "Cliff Bite",
        description: "Lean mountain protein.",
        price: 18,
        meals: ["Goat Meat", "Poultry", "Water", "Vitamins", "Liver"],
      },
      {
        type: "Standard",
        label: "Summit Serve",
        description: "Energy-dense hunting diet.",
        price: 40,
        meals: ["Sheep Cuts", "Nutrients", "Rabbit", "Venison", "Beef Heart"],
      },
      {
        type: "Premium",
        label: "Ghost of Mountains",
        description: "Stimulating high-altitude feast.",
        price: 75,
        meals: [
          "Carcass Enrichment",
          "Cold Meat Slush",
          "Prime Lamb",
          "Marrow Bones",
          "Blood Ice",
          "Quail",
        ],
      },
    ],
  },
  {
    id: 19,
    commonName: "Polar Bear",
    tiers: [
      {
        type: "Basic",
        label: "Arctic Bite",
        description: "Cold-water essentials.",
        price: 25,
        meals: ["Fish Mix", "Water", "Vitamins", "Liver", "Lard"],
      },
      {
        type: "Standard",
        label: "Tundra Platter",
        description: "High-fat maintenance diet.",
        price: 60,
        meals: [
          "Seals-type Protein",
          "Fatty Fish",
          "Herring",
          "Salmon",
          "Beef Fat",
        ],
      },
      {
        type: "Premium",
        label: "Glacier Feast",
        description: "The ultimate energy reserve.",
        price: 110,
        meals: [
          "Blubber Portions",
          "Ice Blocks",
          "Whole Fish",
          "Prime Fat Cuts",
          "Marrow",
          "Cold Beef",
        ],
      },
    ],
  },
  {
    id: 20,
    commonName: "Jaguar",
    tiers: [
      {
        type: "Basic",
        label: "River Bite",
        description: "Wetland hunting snacks.",
        price: 18,
        meals: ["Fish", "Poultry", "Water", "Vitamins", "Liver"],
      },
      {
        type: "Standard",
        label: "Rainforest Run",
        description: "Strong predator protein.",
        price: 45,
        meals: ["Deer Meat", "Boar cuts", "Rabbit", "Heart", "Turkey"],
      },
      {
        type: "Premium",
        label: "Pantanal King",
        description: "The jungle's top luxury.",
        price: 80,
        meals: [
          "Tapir Cuts",
          "Marrow Bones",
          "Fish Skewers",
          "Beef Ribs",
          "Blood Pops",
          "Kidneys",
        ],
      },
    ],
  },
  {
    id: 21,
    commonName: "Ring Tailed Lemur",
    tiers: [
      {
        type: "Basic",
        label: "Tail Snack",
        description: "Daily foliage fiber.",
        price: 5,
        meals: ["Leaves", "Grass", "Water", "Bark", "Pellets"],
      },
      {
        type: "Standard",
        label: "Ring Mix",
        description: "Social foraging variety.",
        price: 15,
        meals: ["Flowers", "Fruit", "Sap", "Berries", "Carrots"],
      },
      {
        type: "Premium",
        label: "Lemur Social",
        description: "Party-sized fruit feast.",
        price: 28,
        meals: ["Insects", "Prickly Pear", "Melon", "Mango", "Honey", "Nectar"],
      },
    ],
  },
  {
    id: 22,
    commonName: "White Rhino",
    tiers: [
      {
        type: "Basic",
        label: "Grazing Box",
        description: "Bulky field grass.",
        price: 22,
        meals: ["Timothy Grass", "Water", "Straw", "Supplements", "Bark"],
      },
      {
        type: "Standard",
        label: "Tank Platter",
        description: "Protein-rich grain mix.",
        price: 50,
        meals: ["Grains", "Legumes", "Alfalfa", "Carrots", "Beet Pulp"],
      },
      {
        type: "Premium",
        label: "Crush Feast",
        description: "The giant reward platter.",
        price: 90,
        meals: [
          "Alfalfa",
          "Apples",
          "Salt Licks",
          "Watermelon",
          "Pumpkin",
          "Sweet Potato",
        ],
      },
    ],
  },
  {
    id: 23,
    commonName: "Arctic Fox",
    tiers: [
      {
        type: "Basic",
        label: "Frozen Bite",
        description: "Small mammal protein.",
        price: 7,
        meals: ["Rodents", "Water", "Vitamins", "Berries", "Pellets"],
      },
      {
        type: "Standard",
        label: "Snow Hunter",
        description: "Coastal foraging diet.",
        price: 18,
        meals: ["Sea Birds", "Fish", "Lemming Mix", "Eggs", "Insects"],
      },
      {
        type: "Premium",
        label: "Winter Coat",
        description: "Fatty nutrient boost.",
        price: 35,
        meals: [
          "Vole Medley",
          "Frozen Egg Treats",
          "Fish Oil",
          "Chicken Hearts",
          "Soft Berries",
          "Turkey Bits",
        ],
      },
    ],
  },
  {
    id: 24,
    commonName: "Saltwater Crocodile",
    tiers: [
      {
        type: "Basic",
        label: "Snap Bite",
        description: "Reptilian core protein.",
        price: 20,
        meals: ["Crustaceans", "Fish", "Water", "Vitamins", "Pellets"],
      },
      {
        type: "Standard",
        label: "Estuary Platter",
        description: "Heavy predator feast.",
        price: 45,
        meals: [
          "Wild Boar meat",
          "Large Fish",
          "Beef chunks",
          "Chicken",
          "Nutrient Paste",
        ],
      },
      {
        type: "Premium",
        label: "Salties Special",
        description: "Ultimate river-king diet.",
        price: 85,
        meals: [
          "Buffalo Portions",
          "Kangaroo Meat",
          "Whole Duck",
          "Heart",
          "Lung",
          "Bone-in Beef",
        ],
      },
    ],
  },
  {
    id: 25,
    commonName: "Scarlet Macaw",
    tiers: [
      {
        type: "Basic",
        label: "Nutty Bite",
        description: "Core seed energy.",
        price: 5,
        meals: ["Sunflower Seeds", "Water", "Corn", "Pellets", "Greens"],
      },
      {
        type: "Standard",
        label: "Rainforest Mix",
        description: "Variety of tropical fats.",
        price: 14,
        meals: ["Palm Fruits", "Brazil Nuts", "Apple", "Banana", "Grapes"],
      },
      {
        type: "Premium",
        label: "High Canopy",
        description: "Sweet nectar and exotic treats.",
        price: 28,
        meals: [
          "Fruit Skewers",
          "Mineral Clay",
          "Walnuts",
          "Mango",
          "Papaya",
          "Flower Buds",
        ],
      },
    ],
  },
  {
    id: 26,
    commonName: "Komodo Dragon",
    tiers: [
      {
        type: "Basic",
        label: "Cold Blood Bite",
        description: "Reptilian energy maintenance.",
        price: 15,
        meals: ["Carrion", "Fish", "Water", "Vitamins", "Pellets"],
      },
      {
        type: "Standard",
        label: "Island Hunter",
        description: "Large mammal variety.",
        price: 40,
        meals: [
          "Goat Meat",
          "Rodents",
          "Chicken",
          "Beef Bites",
          "Nutrient Mix",
        ],
      },
      {
        type: "Premium",
        label: "Dragon’s Fury",
        description: "The island king's banquet.",
        price: 75,
        meals: [
          "Whole Deer Portion",
          "Organ Meat",
          "Beef Ribs",
          "Heart",
          "Turkey",
          "Blood Trimmings",
        ],
      },
    ],
  },
  {
    id: 27,
    commonName: "Sloth",
    tiers: [
      {
        type: "Basic",
        label: "Slow Snack",
        description: "Low-energy foliage.",
        price: 4,
        meals: [
          "Cecropia Leaves",
          "Hibiscus Leaves",
          "Water Mist",
          "Lettuce",
          "Pellets",
        ],
      },
      {
        type: "Standard",
        label: "Dozing Diet",
        description: "Balanced nutrient greens.",
        price: 12,
        meals: ["Tender Shoots", "Buds", "Green Beans", "Boiled Egg", "Kale"],
      },
      {
        type: "Premium",
        label: "Zen Platter",
        description: "The sweet garden delight.",
        price: 25,
        meals: [
          "Hibiscus Flowers",
          "Sweet Peppers",
          "Soft Pear",
          "Grapes",
          "Steamed Squash",
          "Rose Petals",
        ],
      },
    ],
  },
  {
    id: 28,
    commonName: "Cheetah",
    tiers: [
      {
        type: "Basic",
        label: "Sprint Bite",
        description: "Lean predator protein.",
        price: 18,
        meals: ["Poultry", "Beef", "Water", "Vitamins", "Liver"],
      },
      {
        type: "Standard",
        label: "High Speed Mix",
        description: "Wild game flavors.",
        price: 42,
        meals: ["Gazelle Cuts", "Rabbit", "Turkey", "Heart", "Kidney"],
      },
      {
        type: "Premium",
        label: "Acinonyx Elite",
        description: "The athlete's special.",
        price: 78,
        meals: [
          "Bone-in Game",
          "Taurine Supps",
          "Quail",
          "Venison",
          "Beef Ribs",
          "Blood Licks",
        ],
      },
    ],
  },
];
function page() {
  const { id } = useParams();
  const [pet, setPet] = useState<PetProps | null>(null);
  const [donation, setDonation] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const plan = ANIMAL_FEEDING_PLANS.find((p) => p.id === Number(id));
  const [error, setError] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [form, setForm] = useState<FormData>({
    email: "",
    name: "",
    cardNumber: "",
    cvv: "",
    date: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    name: "",
    cardNumber: "",
    cvv: "",
    date: "",
  });

  useEffect(() => {
    if (donation) {
      const user = getUserFromToken();
      if (user) {
        setForm((prev) => ({
          ...prev,
          email: user.email || "",
          name: `${user.firstName} ${user.lastName}` || "",
        }));
      }
      const savedCard = localStorage.getItem("savedCard");
      if (savedCard) {
        const parsed = JSON.parse(savedCard);
        setForm((prev) => ({
          ...prev,
          cardNumber: parsed.creditNumber || "",
          cvv: parsed.cvv || "",
          date:
            parsed.month && parsed.year
              ? `${parsed.year}-${String(MONTHS.indexOf(parsed.month) + 1).padStart(2, "0")}-01`
              : "",
        }));
      }
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [donation]);

  useEffect(() => {
    async function fetchPet() {
      try {
        const res = await fetch(
          `https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets/${id}`,
        );
        if (!res.ok) {
          setError(true);
          return;
        }
        const result: PetApiResponse = await res.json();
        setPet(result.data);
      } catch (err) {
        setError(true);
        console.error("error", err);
      }
    }
    fetchPet();
  }, []);

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const validate = (): boolean => {
    const newErrors: FormErrors = {
      email: "",
      name: "",
      cardNumber: "",
      cvv: "",
      date: "",
    };
    let valid = true;

    if (
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (!form.name.trim() || !/^[a-zA-Z\s]{2,}$/.test(form.name.trim())) {
      newErrors.name = "Name must contain at least 2 letters.";
      valid = false;
    }
    if (!form.cardNumber || form.cardNumber.replace(/\D/g, "").length < 16) {
      newErrors.cardNumber = `Card number must be 16 digits (${form.cardNumber.replace(/\D/g, "").length}/16).`;
      valid = false;
    }
    if (!form.cvv || form.cvv.length < 3) {
      newErrors.cvv = `CVV must be 3 digits (${form.cvv.length}/3).`;
      valid = false;
    }
    if (!form.date) {
      newErrors.date = "Please select an expiry date.";
      valid = false;
    } else {
      const selected = new Date(form.date);
      const now = new Date();
      if (selected < now) {
        newErrors.date = "Expiry date must be in the future.";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 16);
    setForm((prev) => ({ ...prev, cardNumber: val }));
    if (val.length < 16) {
      setErrors((prev) => ({
        ...prev,
        cardNumber: `Card number must be 16 digits (${val.length}/16).`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, cardNumber: "" }));
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 3);
    setForm((prev) => ({ ...prev, cvv: val }));
    if (val.length < 3) {
      setErrors((prev) => ({
        ...prev,
        cvv: `CVV must be 3 digits (${val.length}/3).`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, cvv: "" }));
    }
  };

  const isFormValid = () => {
    return (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
      /^[a-zA-Z\s]{2,}$/.test(form.name.trim()) &&
      form.cardNumber.replace(/\D/g, "").length === 16 &&
      form.cvv.length === 3 &&
      form.date !== "" &&
      new Date(form.date) > new Date()
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError("");

    try {
      const res = await fetch(
        "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/donations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            amount: selectedPrice ?? 0,
            petId: Number(id),
          }),
        },
      );
      if (!res.ok) {
        setSubmitError("Something went wrong. Please try again.");
        return;
      }
      setSubmitSuccess(true);
      setDonation(false);
      alert("Donation successful! Thank you for your support.");
    } catch {
      setSubmitError("Network error. Please try again.");
    }
  };

  if (error) return <FetchError />;
  if (!pet) return <Loader />;

  return (
    <section className={styles.feedSection}>
      <h2>Feed {pet?.commonName}</h2>
      <TextBox
        commonName={pet.commonName}
        diet={pet.diet}
        habitat={pet.habitat}
        id={pet.id}
        latitude={pet.latitude}
        longitude={pet.longitude}
        range={pet.range}
        scientificName={pet.scientificName}
        size={pet.size}
        type={pet.type}
      />
      <h3 className={styles.feedingPlansHeader}>Feeding Plans</h3>
      <div className={`${styles.feedingPlans} ${layout.container}`}>
        {plan?.tiers.map((tier) => (
          <div
            className={`${styles.planCard} ${styles[tier.type.toLowerCase()]}`}
            key={tier.label}
          >
            <h3>{tier.type}</h3>
            <p>{tier.label}</p>
            <div className={styles.meals}>
              {tier.meals.map((meal, index) => (
                <p key={index}>{meal}</p>
              ))}
            </div>
            <button
              onClick={() => {
                setSelectedPrice(tier.price);
                setDonation(true);
              }}
            >
              ${tier.price}
            </button>
          </div>
        ))}
      </div>

      {donation && (
        <div className={styles.overlay} onClick={() => setDonation(false)}>
          <dialog
            className={styles.feedDonation}
            open
            onClick={(e) => e.stopPropagation()}
          >
            <form className={styles.form} onSubmit={handleSubmit}>
              <h2>Fill Up Donation</h2>
              <span className={styles.cross} onClick={() => setDonation(false)}>
                X
              </span>

              {selectedPrice && (
                <p className={styles.donationPlan}>
                  Donation amount: <strong>${selectedPrice}</strong>
                </p>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="email">email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className={styles.fieldError}>{errors.email}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="name">name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="name"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <span className={styles.fieldError}>{errors.name}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="cardNumber">card number</label>
                <input
                  id="cardNumber"
                  type="text"
                  placeholder="card number"
                  value={form.cardNumber}
                  maxLength={16}
                  onKeyDown={(e) => {
                    const allowed = [
                      "Backspace",
                      "Delete",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                    ];
                    if (allowed.includes(e.key)) return;
                    if (!/^\d$/.test(e.key)) e.preventDefault();
                  }}
                  onChange={handleCardNumberChange}
                />
                {errors.cardNumber && (
                  <span className={styles.fieldError}>{errors.cardNumber}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="cvv">cvv</label>
                <input
                  id="cvv"
                  type="text"
                  placeholder="cvv"
                  value={form.cvv}
                  maxLength={3}
                  onKeyDown={(e) => {
                    const allowed = [
                      "Backspace",
                      "Delete",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                    ];
                    if (allowed.includes(e.key)) return;
                    if (!/^\d$/.test(e.key)) e.preventDefault();
                  }}
                  onChange={handleCvvChange}
                />
                {errors.cvv && (
                  <span className={styles.fieldError}>{errors.cvv}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="date">expiry date</label>
                <input
                  id="date"
                  type="month"
                  value={form.date}
                  onChange={handleChange}
                />
                {errors.date && (
                  <span className={styles.fieldError}>{errors.date}</span>
                )}
              </div>

              {submitError && (
                <p className={styles.submitError}>{submitError}</p>
              )}

              <button
                className={styles.submitDonation}
                type="submit"
                disabled={!isFormValid()}
              >
                submit donation
              </button>
            </form>
          </dialog>
        </div>
      )}
    </section>
  );
}

export default page;
