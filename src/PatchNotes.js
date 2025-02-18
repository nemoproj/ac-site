import React from 'react';
import Nav from './components/Nav';
import './App.css';

const PatchNote = ({ version, date, changes }) => (
  <div className="patch-note">
    <div className="patch-header">
      <h3 className="text-xl font-semibold">{version}</h3>
      <span className="patch-date">{date}</span>
    </div>
    <ul className="patch-list">
      {changes.map((change, index) => (
        <li key={index}>{change}</li>
      ))}
    </ul>
  </div>
);

function PatchNotes() {
  const patches = [
    {
      version: 'v0.1.0 BETA',
      date: '2025.1.18',
      changes: [
        '소울스왑 SMP 서버 오픈',
      ]
    }
  ];

  return (
    <div className="bg-white text-gray-900">
      <Nav />
      <main className="main-content">
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold tracking-tight mb-12 text-center">패치노트</h1>
          <div className="space-y-8">
            {patches.map((patch, index) => (
              <PatchNote key={index} {...patch} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default PatchNotes;