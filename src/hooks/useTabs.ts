import type { CollectionEntry } from "astro:content";
import { useState } from "react";

type TabItem = CollectionEntry<"homepage">["data"]["homepage_tab"]["tablist"];

export function useTabs({
  tabs,
  initialTabId,
  onChange,
}: {
  tabs: TabItem;
  initialTabId: number;
  onChange?: (id: number) => void;
}) {
  const [selectedTabIndex, setSelectedTab] = useState(() => {
    const indexOfInitialTab = tabs.findIndex((tab, i) => i === initialTabId);
    return indexOfInitialTab === -1 ? 0 : indexOfInitialTab;
  });

  return {
    tabProps: {
      tabs,
      selectedTabIndex,
      onChange,
      setSelectedTab,
    },
    selectedTab: tabs[selectedTabIndex],
    contentProps: {
      selectedTabIndex,
    },
  };
}
