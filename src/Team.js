import React from 'react';
import Nav from './components/Nav';
import './App.css';

const TeamCard = ({ role, description, members }) => (
  <div className="team-card">
    <h3 className="text-xl font-semibold mb-4 text-center">{role}</h3>
    <p className="text-gray-600 mb-6 text-center">{description}</p>
    <div className="flex flex-wrap justify-center gap-4">
      {members.map((member, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="team-avatar mb-2">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium">{member.name}</span>
          <span className="text-sm text-gray-500">{member.position}</span>
        </div>
      ))}
    </div>
  </div>
);

function Team() {
  const teams = [
    {
      role: '개발팀',
      description: '서버의 기술적인 측면을 담당하며, 게임 시스템과 플러그인을 개발하고 유지보수합니다.',
      members: [
        {
          name: 'Tuco Salamanca',
          position: '플러그인 개발자',
          avatar: 'https://avatars.githubusercontent.com/u/198909138?s=88&v=4'
        },
        {
          name: 'kestrel',
          position: '리드 개발자',
          avatar: 'https://mc-heads.net/avatar/fstat'
        }
      ]
    },
    {
      role: '운영팀',
      description: '서버의 원활한 운영과 커뮤니티 관리를 담당하며, 플레이어들의 피드백을 수집하고 반영합니다.',
      members: [
        {
          name: 'isaac1113',
          position: '서버 관리자',
          avatar: 'https://avatars.githubusercontent.com/u/173257854?s=88&v=4'
        },
        {
          name: 'J.Y.KIM',
          position: '커뮤니티 매니저',
          avatar: 'https://avatars.githubusercontent.com/u/156347229?s=88&v=4'
        }
      ]
    }
  ];

  return (
    <div className="bg-white text-gray-900">
      <Nav />
      <main className="main-content">
        <section className="max-w-4xl mx-auto px-4 py-16">
          <img src="logo1.png" alt="alphacorp" className="rounded-lg w-full h-auto" />
          <h1 className="text-4xl font-bold tracking-tight mb-12 text-center">팀 소개</h1>
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 place-items-center">
            {teams.map((team, index) => (
              <TeamCard key={index} {...team} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Team;