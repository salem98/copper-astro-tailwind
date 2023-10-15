import DynamicIcon from "@/helpers/DynamicIcon";
import { useTabs } from "@/hooks/useTabs";
import { markdownify } from "@/lib/utils/textConverter";
import type { CollectionEntry } from "astro:content";
import React from "react";

type TabItem = CollectionEntry<"homepage">["data"]["homepage_tab"];

export default function TabList({ tablist }: TabItem) {
  const { selectedTab, tabProps } = useTabs({
    tabs: tablist,
    initialTabId: 0,
    onChange: (index: number) => tabProps.setSelectedTab(index),
  });

  return (
    <div className="text-center">
      <ul className="inline-flex flex-wrap items-center justify-center tab-lists">
        {tablist.map((tab, index) => {
          return (
            <li key={index} className="tab-item relative">
              <a
                onClick={() => onChange(index)}
                className="px-6 cursor-pointer "
              >
                <DynamicIcon
                  className="mx-auto mb-3 w-8 h-8 text-light/30"
                  icon="FaCircleDot"
                />
                <span
                  className="font-medium"
                  dangerouslySetInnerHTML={{ __html: markdownify(tab.title) }}
                />
              </a>
            </li>
          );
        })}
      </ul>

      <div className="tab-content mt-20">
        <div className="row items-center justify-center">
          <div className="lg:col-6">
            <img src={selectedTab.image} />
          </div>
          <div className="lg:col-6">
            <h1
              dangerouslySetInnerHTML={{
                __html: markdownify(selectedTab.title),
              }}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: markdownify(selectedTab.content),
              }}
            />
            <button className="btn btn-primary">Click</button>
          </div>
        </div>
      </div>
    </div>
  );
}
