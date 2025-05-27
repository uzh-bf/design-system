import { useState } from 'react'
import TabsLegacy from './TabsLegacy'

export const Default = () => {
  return (
    <TabsLegacy defaultValue="leaderboard">
      <TabsLegacy.TabList>
        <TabsLegacy.Tab
          key="leaderboard"
          value="leaderboard"
          label="Leaderboard"
        />
        <TabsLegacy.Tab
          key="create"
          value="create"
          label="Gruppe erstellen/beitreten"
        />
      </TabsLegacy.TabList>
      <TabsLegacy.TabContent
        key="leaderboard"
        value="leaderboard"
        className={{ root: 'md:px-4' }}
      >
        Course Tab
      </TabsLegacy.TabContent>
      <TabsLegacy.TabContent
        key="create"
        value="create"
        className={{ root: 'md:px-4' }}
      >
        Create Tab
      </TabsLegacy.TabContent>
    </TabsLegacy>
  )
}

export const Children = () => {
  return (
    <TabsLegacy defaultValue="leaderboard">
      <TabsLegacy.TabList>
        <TabsLegacy.Tab key="leaderboard" value="leaderboard">
          <div className="italic">Leaderboard</div>
        </TabsLegacy.Tab>
        <TabsLegacy.Tab key="create" value="create">
          <div className="font-bold">Child Content</div>
        </TabsLegacy.Tab>
      </TabsLegacy.TabList>
      <TabsLegacy.TabContent
        key="leaderboard"
        value="leaderboard"
        className={{ root: 'md:px-4' }}
      >
        Course Tab
      </TabsLegacy.TabContent>
      <TabsLegacy.TabContent
        key="create"
        value="create"
        className={{ root: 'md:px-4' }}
      >
        Create Tab
      </TabsLegacy.TabContent>
    </TabsLegacy>
  )
}

export const Controlled = () => {
  const [selectedTab, setSelectedTab] = useState('leaderboard')
  return (
    <TabsLegacy
      defaultValue="leaderboard"
      value={selectedTab}
      onValueChange={(tab) => setSelectedTab(tab)}
    >
      <TabsLegacy.TabList>
        <TabsLegacy.Tab
          key="leaderboard"
          value="leaderboard"
          label="Leaderboard"
        />
        <TabsLegacy.Tab
          key="create"
          value="create"
          label="Gruppe erstellen/beitreten"
        />
      </TabsLegacy.TabList>
      <TabsLegacy.TabContent
        key="leaderboard"
        value="leaderboard"
        className={{ root: 'md:px-4' }}
      >
        Course Tab
      </TabsLegacy.TabContent>
      <TabsLegacy.TabContent
        key="create"
        value="create"
        className={{ root: 'md:px-4' }}
      >
        Create Tab
      </TabsLegacy.TabContent>
    </TabsLegacy>
  )
}
