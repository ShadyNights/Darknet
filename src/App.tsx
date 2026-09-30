/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId } from './types';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { LoginScreen } from './components/screens/LoginScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { ActorsDirectoryScreen } from './components/screens/ActorsDirectoryScreen';
import { ActorDetailScreen } from './components/screens/ActorDetailScreen';
import { AttributionScreen } from './components/screens/AttributionScreen';
import { AttributionCandidateScreen } from './components/screens/AttributionCandidateScreen';
import { InfrastructureScreen } from './components/screens/InfrastructureScreen';
import { SearchScreen } from './components/screens/SearchScreen';
import { TimelineScreen } from './components/screens/TimelineScreen';
import { GraphScreen } from './components/screens/GraphScreen';
import { CasesScreen } from './components/screens/CasesScreen';
import { CaseDetailScreen } from './components/screens/CaseDetailScreen';
import { AdminScreen } from './components/screens/AdminScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [selectedActorId, setSelectedActorId] = useState<string>('A-0142');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('C-1042');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('C-2026-001');

  const currentUser = {
    username: 'analyst01@ntro.gov.in',
    title: 'Senior Cyber Reconnaissance Investigator',
    enclave: 'BRAVO-09 // ASIA-EAST',
  };

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectActor = (actorId: string) => {
    setSelectedActorId(actorId);
    handleNavigate('actor-detail');
  };

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidateId(candidateId);
    handleNavigate('attribution-candidate');
  };

  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    handleNavigate('case-detail');
  };

  // If locked / logged out
  if (currentScreen === 'login') {
    return (
      <LoginScreen
        onLoginSuccess={() => {
          setCurrentScreen('dashboard');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#050810] text-[#dbfcff] font-mono selection:bg-[#00f0ff] selection:text-[#00363a]">
      {/* Tactical Header */}
      <Header
        onLock={() => setCurrentScreen('login')}
        currentUser={currentUser}
      />

      {/* Main Layout Area */}
      <div className="flex">
        {/* Navigation Sidebar */}
        <Sidebar
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
        />

        {/* Dynamic Screen Content */}
        <main className="ml-64 mt-14 flex-1 min-h-[calc(100vh-3.5rem)] p-5 overflow-y-auto bg-[#070b13]">
          {currentScreen === 'dashboard' && (
            <DashboardScreen
              onNavigate={handleNavigate}
              onOpenCandidate={handleSelectCandidate}
              onSelectActor={handleSelectActor}
            />
          )}

          {currentScreen === 'actors' && (
            <ActorsDirectoryScreen
              onNavigate={handleNavigate}
              onSelectActor={handleSelectActor}
            />
          )}

          {currentScreen === 'actor-detail' && (
            <ActorDetailScreen
              actorId={selectedActorId}
              onNavigate={handleNavigate}
              onSelectCandidate={handleSelectCandidate}
            />
          )}

          {currentScreen === 'attribution' && (
            <AttributionScreen
              onNavigate={handleNavigate}
              onSelectCandidate={handleSelectCandidate}
            />
          )}

          {currentScreen === 'attribution-candidate' && (
            <AttributionCandidateScreen
              candidateId={selectedCandidateId}
              onNavigate={handleNavigate}
              onSelectActor={handleSelectActor}
            />
          )}

          {currentScreen === 'infrastructure' && (
            <InfrastructureScreen
              onNavigate={handleNavigate}
              onSelectActor={handleSelectActor}
            />
          )}

          {currentScreen === 'search' && (
            <SearchScreen
              onNavigate={handleNavigate}
              onSelectActor={handleSelectActor}
            />
          )}

          {currentScreen === 'timeline' && (
            <TimelineScreen
              onNavigate={handleNavigate}
              onSelectActor={handleSelectActor}
            />
          )}

          {currentScreen === 'graph' && (
            <GraphScreen
              onNavigate={handleNavigate}
              onSelectActor={handleSelectActor}
            />
          )}

          {currentScreen === 'cases' && (
            <CasesScreen
              onNavigate={handleNavigate}
              onSelectCase={handleSelectCase}
            />
          )}

          {currentScreen === 'case-detail' && (
            <CaseDetailScreen
              caseId={selectedCaseId}
              onNavigate={handleNavigate}
              onSelectActor={handleSelectActor}
            />
          )}

          {currentScreen === 'admin' && (
            <AdminScreen onNavigate={handleNavigate} />
          )}
        </main>
      </div>
    </div>
  );
}
