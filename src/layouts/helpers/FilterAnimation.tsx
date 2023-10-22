import { markdownify } from "@/lib/utils/textConverter";
import type { CollectionEntry } from "astro:content";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import React, { useState } from "react";
import DynamicIcon from "./DynamicIcon";
type Props = CollectionEntry<"team">["data"];

const variants: Variants = {
  visible: {
    scale: 1,
    opacity: 1,
    origin: "50%",
  },
  hidden: {
    scale: 0,
    opacity: 0,
    origin: "50%",
  },
};

const FilterAnimation = ({ team_member }: Props) => {
  const groups = [
    ...new Set(team_member.map((member) => member.group.toLocaleLowerCase())),
  ];
  let members = team_member;
  const [selectedDesignation, setDesignation] = useState("all");
  if (selectedDesignation !== "all") {
    members = team_member.filter(
      (member) => member.group.toLowerCase() === selectedDesignation,
    );
  }

  return (
    <>
      <ul className="flex justify-center items-center flex-wrap mt-7">
        <li>
          <button
            onClick={() => setDesignation("all")}
            type="button"
            className={`btn-sm btn-outline-primary border-2 hover:translate-y-[-3px] transition-transform m-3 inline-block capitalize text-primary py-3 ${
              "all" === selectedDesignation ? "bg-primary text-white" : ""
            }`}
          >
            All Together
          </button>
        </li>
        {groups.map((group) => (
          <li key={group}>
            <button
              onClick={() => setDesignation(group.toLocaleLowerCase())}
              type="button"
              className={`btn-sm border-2 btn-outline-primary hover:translate-y-[-3px] transition-transform m-3 inline-block capitalize text-primary py-3 ${
                group === selectedDesignation ? "bg-primary text-white" : ""
              }`}
            >
              {group}
            </button>
          </li>
        ))}
      </ul>
      <motion.div layout className="row justify-center gy-5 gx-4 mt-5 lg:mt-12">
        <AnimatePresence>
          {members.map((member, index) => (
            <motion.div
              layoutId={`container-${index}`}
              variants={variants}
              key={member.name + "_" + index}
              initial={"hidden"}
              animate={"visible"}
              exit={"hidden"}
              transition={{ duration: 0.3 }}
              className="lg:col-4 sm:col-6"
            >
              <div className="text-center ">
                <div className="has-shapes inline-block">
                  <img
                    className="mx-auto rounded-full"
                    src={member.image}
                    alt={member.name}
                    width={250}
                    height={250}
                  />
                  <div className="team-shapes">
                    <div className="shape-2 shape-sm bg-primary/50 rounded-circle" />
                    <div className="shape-1 shape-xs bg-secondary/50 rounded-circle" />
                    <div className="shape-3 shape-sm-2 bg-tertiary/50 rounded-circle" />
                  </div>
                </div>
                <div>
                  <h5
                    className="text-center font-medium mt-3.5"
                    dangerouslySetInnerHTML={{
                      __html: markdownify(member.name),
                    }}
                  />
                  <p
                    className="mb-4 mt-2"
                    dangerouslySetInnerHTML={{
                      __html: markdownify(member.designation),
                    }}
                  />
                  <ul className={"social-icons"}>
                    {member.social.map((social, i) => (
                      <li key={i}>
                        <a
                          aria-label={social.name}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                        >
                          <span className="sr-only">{social.name}</span>
                          <DynamicIcon
                            className="inline-block"
                            icon={social.icon}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default FilterAnimation;
