import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export const HoverEffect = ({
  items,
  className
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedItems, setSearchedItems] = useState([]);

  const filtered = searchQuery
    ? items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : items;

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Filter by name..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-lg mt-5 p-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div
        className={cn("grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-5", className)}>
        {filtered.map((item, idx) => (
          <a
            href={`/patients/${item.pindex}`}
            key={idx}
            className="relative group  block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}>
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }} />
              )}
            </AnimatePresence>
            <Card>
              <CardTitle><span className="text-black font-bold tracking-wide mt-4">Name: </span>{item.name}</CardTitle>
              <CardDescription><span className="text-black font-bold tracking-wide mt-4">Age: </span>{item.age}</CardDescription>
              <CardDescription><span className="text-black font-bold tracking-wide mt-4">Contact: </span>{item.contact}</CardDescription>
              <button onClick={() => window.location.href = `/patients/${item.pindex}`} className="bg-[#132F78] hover:bg-[#0464C4] mt-2 text-white font-bold py-1 px-2 rounded-full cursor-pointer">View Details</button>
            </Card>
          </a>
        ))}
      </div>
    </>
  );
};

export const Card = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white/80 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}>
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children
}) => {
  return (
    <h4 className={cn("text-gray-600 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children
}) => {
  return (
    <p
      className={cn("mt-8 text-gray-600 tracking-wide leading-relaxed text-sm", className)}>
      {children}
    </p>
  );
};
