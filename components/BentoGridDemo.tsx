import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconSpeakerphone,
} from "@tabler/icons-react";

export function BentoGridDemo() {
  return (
    <BentoGrid className="w-full px-7">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={
            i === 0 || i === 1 ? "md:h-44 md:mt-16" : // Apply to both index 0 and 1
              i === 2 ? "md:h-[443.5px] md:mt-16" :
                i === 3 ? "md:row-span-2" :
                  i === 5 ? "md:col-span-2" : ""
          }

        />
      ))}

      {/* Small box above item 1 (positioned in grid column 2, row 1) */}
      <BentoGridItem
        title="Quick Access"
        description="Essential tools and shortcuts."
        header={<Skeleton />}
        icon={<IconBoxAlignTopLeft className="h-5 w-5 text-neutral-500" />}
        className="md:h-12 md:col-start-2 md:row-start-1"
      />

      {/* Small box above item 2 (positioned in grid column 3, row 1) */}
      <BentoGridItem
        title="Updates"
        description="Latest news and notifications."
        header={<Skeleton />}
        icon={<IconArrowWaveRightUp className="h-5 w-5 text-neutral-500" />}
        className="md:h-12 md:col-start-3 md:row-start-1"
      />
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[4.4rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "The Art of Design & The Pursuit of Knowledge",
    description: "Discover the beauty of thoughtful and functional design. Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: (
      <div className="flex flex-col gap-1">
        <IconSignature className="h-5 w-5 text-neutral-500" />
        <IconArrowWaveRightUp className="h-5 w-5 text-neutral-500" />
      </div>
    ),
  },
  {
    title: "Verbal Communication & The Joy of Creation",
    description: "Master the art of speaking and expressing ideas clearly. Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: (
      <div className="flex flex-col gap-1">
        <IconSpeakerphone className="h-5 w-5 text-neutral-500" />
        <IconBoxAlignTopLeft className="h-5 w-5 text-neutral-500" />
      </div>
    ),
  },
  {
    title: "Written Communication",
    description: "Develop skills in writing and documenting thoughts effectively.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-5 w-5 text-neutral-500" />,
  },
];
