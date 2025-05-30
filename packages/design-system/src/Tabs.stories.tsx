import { useState } from 'react'
import { TabContent, Tabs } from './Tabs'

export const Default = () => {
  return (
    <Tabs
      defaultValue="leaderboard"
      tabs={[
        { id: 'leaderboard', value: 'leaderboard', label: 'Leaderboard' },
        { id: 'create', value: 'create', label: 'Gruppe erstellen/beitreten' },
      ]}
    >
      <TabContent
        key="leaderboard"
        value="leaderboard"
        className={{ root: 'md:px-4' }}
      >
        Course Tab
      </TabContent>
      <TabContent key="create" value="create" className={{ root: 'md:px-4' }}>
        Create Tab
      </TabContent>
    </Tabs>
  )
}

export const Multiple = () => {
  return (
    <Tabs
      defaultValue="leaderboard"
      tabs={[
        { id: 'leaderboard', value: 'leaderboard', label: 'Leaderboard' },
        { id: 'create', value: 'create', label: 'Gruppe erstellen/beitreten' },
        { id: 'settings', value: 'settings', label: 'Einstellungen' },
        { id: 'help', value: 'help', label: 'Hilfe' },
      ]}
    >
      <TabContent
        key="leaderboard"
        value="leaderboard"
        className={{ root: 'md:px-4' }}
      >
        Course Tab
      </TabContent>
      <TabContent key="create" value="create" className={{ root: 'md:px-4' }}>
        Create Tab
      </TabContent>
      <TabContent
        key="settings"
        value="settings"
        className={{ root: 'md:px-4' }}
      >
        Settings Tab
      </TabContent>
      <TabContent key="help" value="help" className={{ root: 'md:px-4' }}>
        Help Tab
      </TabContent>
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
      <TabContent
        key="leaderboard"
        value="leaderboard"
        className={{ root: 'md:px-4' }}
      >
        Course Tab
      </TabContent>
      <TabContent key="create" value="create" className={{ root: 'md:px-4' }}>
        Create Tab
      </TabContent>
    </Tabs>
  )
}
