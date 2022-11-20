import React from 'react'
import Tabs from './Tabs'

export const Default = () => {
  return (
    <Tabs
      defaultValue="course"
      // value={selectedTab}
      // onValueChange={(tab) => setSelectedTab(tab)}
    >
      <Tabs.TabList>
        <Tabs.Tab key="course" value="course" label="Leaderboard" />

        <Tabs.Tab
          key="create"
          value="create"
          label="Gruppe erstellen/beitreten"
        />
      </Tabs.TabList>
      <Tabs.TabContent key="course" value="course" className="md:px-4">
        hello world
      </Tabs.TabContent>
      <Tabs.TabContent key="create" value="create" className="md:px-4">
        hello world
      </Tabs.TabContent>
    </Tabs>
  )
}
