import { useState } from 'react'
import Tabs from './Tabs'

export const Default = () => {
  return (
    <Tabs
      defaultValue="leaderboard"
      tabs={[
        { id: 'leaderboard', value: 'leaderboard', label: 'Leaderboard' },
        { id: 'create', value: 'create', label: 'Gruppe erstellen/beitreten' },
      ]}
    >
      <Tabs.TabContent
        key="leaderboard"
        value="leaderboard"
        className={{ root: 'md:px-4' }}
      >
        Course Tab
      </Tabs.TabContent>
      <Tabs.TabContent
        key="create"
        value="create"
        className={{ root: 'md:px-4' }}
      >
        Create Tab
      </Tabs.TabContent>
    </Tabs>
  )
}

export const Controlled = () => {
  const [selectedTab, setSelectedTab] = useState('leaderboard')
  return (
    <Tabs
      defaultValue="leaderboard"
      value={selectedTab}
      onValueChange={(tab) => setSelectedTab(tab)}
      tabs={[
        { id: 'leaderboard', value: 'leaderboard', label: 'Leaderboard' },
        { id: 'create', value: 'create', label: 'Gruppe erstellen/beitreten' },
      ]}
    >
      <Tabs.TabContent
        key="leaderboard"
        value="leaderboard"
        className={{ root: 'md:px-4' }}
      >
        Course Tab
      </Tabs.TabContent>
      <Tabs.TabContent
        key="create"
        value="create"
        className={{ root: 'md:px-4' }}
      >
        Create Tab
      </Tabs.TabContent>
    </Tabs>
  )
}
