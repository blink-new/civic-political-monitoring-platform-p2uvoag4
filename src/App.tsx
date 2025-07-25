import { useState } from 'react'
import { LandingPage } from './components/LandingPage'
import { WelcomeScreen } from './components/WelcomeScreen'
import { PriorityConfiguration } from './components/PriorityConfiguration'
import { PoliticianSelection } from './components/PoliticianSelection'
import { CivicDashboard } from './components/CivicDashboard'
import { PoliticianProfile } from './components/PoliticianProfile'
import { ComparisonTool } from './components/ComparisonTool'
import SettingsPanel from './components/SettingsPanel'

export type Priority = {
  id: string
  name: string
  description: string
  weight: number
}

export type Politician = {
  id: string
  name: string
  party: string
  position: string
  avatar: string
  score: number
  scoreBreakdown: {
    [key: string]: number
  }
  recentActions: Action[]
}

export type Action = {
  id: string
  title: string
  description: string
  date: string
  category: string
  impact: number
  source: string
}

export type AppState = 'landing' | 'welcome' | 'priorities' | 'politicians' | 'dashboard' | 'profile' | 'comparison'

function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing')
  const [userPriorities, setUserPriorities] = useState<Priority[]>([])
  const [selectedPoliticians, setSelectedPoliticians] = useState<string[]>([])
  const [selectedPolitician, setSelectedPolitician] = useState<string | null>(null)
  const [comparisonPoliticians, setComparisonPoliticians] = useState<string[]>([])
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleStateChange = (newState: AppState) => {
    setCurrentState(newState)
  }

  const handleGetStarted = () => {
    setCurrentState('welcome')
  }

  const handlePrioritiesSet = (priorities: Priority[]) => {
    setUserPriorities(priorities)
    setCurrentState('politicians')
  }

  const handlePoliticiansSelected = (politicians: string[]) => {
    setSelectedPoliticians(politicians)
    setCurrentState('dashboard')
  }

  const handlePoliticianView = (politicianId: string) => {
    setSelectedPolitician(politicianId)
    setCurrentState('profile')
  }

  const handleComparison = (politicians: string[]) => {
    setComparisonPoliticians(politicians)
    setCurrentState('comparison')
  }

  const renderCurrentScreen = () => {
    switch (currentState) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />
      case 'welcome':
        return <WelcomeScreen onNext={() => handleStateChange('priorities')} />
      case 'priorities':
        return <PriorityConfiguration onNext={handlePrioritiesSet} />
      case 'politicians':
        return (
          <PoliticianSelection
            priorities={userPriorities}
            onNext={handlePoliticiansSelected}
            onBack={() => handleStateChange('priorities')}
          />
        )
      case 'dashboard':
        return (
          <CivicDashboard
            priorities={userPriorities}
            selectedPoliticians={selectedPoliticians}
            onViewPolitician={handlePoliticianView}
            onCompare={handleComparison}
            onBack={() => handleStateChange('politicians')}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )
      case 'profile':
        return (
          <PoliticianProfile
            politicianId={selectedPolitician!}
            priorities={userPriorities}
            onBack={() => handleStateChange('dashboard')}
          />
        )
      case 'comparison':
        return (
          <ComparisonTool
            politicians={comparisonPoliticians}
            priorities={userPriorities}
            onBack={() => handleStateChange('dashboard')}
          />
        )
      default:
        return <LandingPage onGetStarted={handleGetStarted} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentScreen()}
      {currentState !== 'landing' && (
        <SettingsPanel 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
        />
      )}
    </div>
  )
}

export default App