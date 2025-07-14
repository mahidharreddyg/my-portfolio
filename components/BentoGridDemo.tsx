import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem, ThinRectangle } from "./ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconMicrophone,
} from "@tabler/icons-react";

export function BentoGridDemo() {
  return (
    <BentoGrid className="w-full px-6">
      {/* First row */}
      <BentoGridItem
        title={items[0].title}
        description={items[0].description}
        header={items[0].header}
        icon={items[0].icon}
      />
      
      {/* Thin rectangle spanning columns 2-3 */}
      <ThinRectangle className="md:col-span-2 h-16" />

      {/* Continue with original items maintaining positions */}
      <BentoGridItem
        title={items[1].title}
        description={items[1].description}
        header={items[1].header}
        icon={items[1].icon}
      />
      
      <BentoGridItem
        title={items[2].title}
        description={items[2].description}
        header={items[2].header}
        icon={items[2].icon}
        className="md:row-span-2"
      />
      
      <BentoGridItem
        title={items[3].title}
        description={items[3].description}
        header={items[3].header}
        icon={items[3].icon}
        className="md:row-span-2"
      />
      
      <BentoGridItem
        title={items[4].title}
        description={items[4].description}
        header={items[4].header}
        icon={items[4].icon}
      />
      
      <BentoGridItem
        title={items[5].title}
        description={items[5].description}
        header={items[5].header}
        icon={items[5].icon}
        className="md:col-span-2"
      />
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[4rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />, 
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />, 
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design & The Pursuit of Knowledge",
    description: "Discover the beauty of thoughtful and functional design. Join the quest for understanding and enlightenment.",
    header: <Skeleton />, 
    icon: (
      <div className="flex flex-col gap-1">
        <IconSignature className="h-4 w-4 text-neutral-500" />
        <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />
      </div>
    ),
  },
  {
    title: "Verbal Communication & The Joy of Creation",
    description: "Master the art of speaking and expressing ideas clearly. Experience the thrill of bringing ideas to life.",
    header: <Skeleton />, 
    icon: (
      <div className="flex flex-col gap-1">
        <IconMicrophone className="h-4 w-4 text-neutral-500" />
        <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />
      </div>
    ),
  },
  {
    title: "Written Communication",
    description: "Develop skills in writing and documenting thoughts effectively.",
    header: <Skeleton />, 
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />, 
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];