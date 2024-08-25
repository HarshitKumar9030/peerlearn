import { cn } from "../../lib/utils";
import {
  IconBook,
  IconBrain,
  IconMessage,
  IconUsers,
  IconBulb,
  IconHeadset,
  IconDeviceLaptop,
  IconRocket,
} from "@tabler/icons-react";
import React from "react";

export function FeaturesSection() {
  const features = [
    {
      title: "Collaborative Study Sessions",
      description:
        "Engage in real-time study sessions with peers and boost your learning efficiency.",
      icon: <IconUsers />,
    },
    {
      title: "AI-Powered Stress Management",
      description:
        "Reduce stress with guided sessions tailored by AI, ensuring better mental health.",
      icon: <IconBrain />,
    },
    {
      title: "Resource Sharing",
      description:
        "Share study resources like PDFs, videos, and notes seamlessly within your group.",
      icon: <IconBook />,
    },
    {
      title: "Live Group Discussions",
      description:
        "Participate in interactive discussions with voice and text chat to enhance understanding.",
      icon: <IconMessage />,
    },
    {
      title: "Personalized Learning Insights",
      description:
        "Track your learning progress and receive personalized insights to help you improve.",
      icon: <IconBulb />,
    },
    {
      title: "24/7 Support and Assistance",
      description:
        "Get instant help whenever you need it with our dedicated support and community assistance.",
      icon: <IconHeadset />,
    },
    {
      title: "Virtual Study Spaces",
      description:
        "Create virtual spaces for focused study sessions, alone or with peers.",
      icon: <IconDeviceLaptop />,
    },
    {
      title: "Motivation and Growth",
      description:
        "Stay motivated with challenges, growth tracking, and community support.",
      icon: <IconRocket />,
    },
  ];

  return (
    <>
      <div className="text-center mt-16 mb-12 h-full">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-800 dark:text-neutral-100">
          Why Choose PeerLearn?
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mt-4">
          Explore the unique features that make PeerLearn your ideal companion
          for collaborative learning and stress management.
        </p>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 relative w-full mx-auto  z-10 py-10 max-w-7xl gap-y-8">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <>
      <div
        className={cn(
          "flex flex-col lg:border-r py-8 relative group/feature bg-bot-neutral-900/5 rounded-md dark:bg-dot-white/5 bg-neutral-100 shadow-sm dark:bg-neutral-900  dark:border-neutral-800",
          (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
          index < 4 && "lg:border-b dark:border-neutral-800"
        )}
      >
        {index < 4 && (
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
        )}
        {index >= 4 && (
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
        )}
        <div className="mb-4 relative z-10 px-6 text-purple-500 dark:text-purple-400">
          {icon}
        </div>
        <div className="text-lg font-bold mb-2 relative z-10 px-6">
          <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-purple-500 transition-all duration-200 origin-center" />
          <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
            {title}
          </span>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-6">
          {description}
        </p>
      </div>
    </>
  );
};
