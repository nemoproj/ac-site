import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Team from './Team';
import PatchNotes from './PatchNotes';
import './App.css';

// Use logo2.png as fallback since it's smaller
const FALLBACK_IMG = '/ac-site/logo2.png';

const AppContext = React.createContext();

const ImageModal = ({ src, alt, isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={onClose}
    >
      <img
        src={src}
        alt={alt}
        className="modal-image"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

// Component definitions
const FeatureCard = ({ emoji, title, description }) => (
  <div className="feature-card">
    <div className="text-3xl mb-6">{emoji}</div>
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const RecipeCard = ({ title, description, imageNumber }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="recipe-card">
        <img
          src={`/ac-site/${imageNumber}.bmp`}
          alt={title}
          loading="eager"
          decoding="async"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = FALLBACK_IMG;
          }}
          className="recipe-image"
          onClick={() => setIsModalOpen(true)}
        />
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
      <ImageModal
        src={`/ac-site/${imageNumber}.bmp`}
        alt={title}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

const InfoCard = ({ title, content }) => (
  <div className="p-8 rounded-xl border hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white">
    <h2 className="text-3xl font-bold tracking-tight mb-6">{title}</h2>
    {content}
  </div>
);

const ConnectionGuide = ({ title, version, tech, description, serverAddress, port, steps }) => {
  const { copyText } = React.useContext(AppContext);

  return (
    <div className="p-8 rounded-xl border hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="flex gap-2">
          <span className={`px-4 py-1 ${tech === 'ViaVersion' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'} rounded-full text-sm whitespace-nowrap`}>
            {version}
          </span>
          <span className={`px-4 py-1 ${tech === 'ViaVersion' ? 'bg-purple-100 text-purple-700' : 'bg-red-100 text-orange-700'} rounded-full text-sm`}>
            {tech}
          </span>
        </div>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <p className="font-medium mb-2">서버 주소</p>
        <code
          className="block bg-white p-3 rounded border cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => copyText(serverAddress, '서버 주소가 복사되었습니다: ')}
        >
          {serverAddress}
        </code>
      </div>
      {port && (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="font-medium mb-2">포트</p>
          <code
            className="block bg-white p-3 rounded border cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => copyText(port, '포트가 복사되었습니다: ')}
          >
            {port}
          </code>
        </div>
      )}
      <ol className="space-y-3 text-gray-600">
        {steps.map((step, index) => (
          <li key={index}>{`${index + 1}. ${step}`}</li>
        ))}
      </ol>
    </div>
  );
};

const PlayerCard = ({ name, role, avatar }) => (
  <div className="player-card">
    <div className="player-avatar">
      <img src={avatar} alt={name} loading="lazy" />
    </div>
    <div className="player-name">{name}</div>
    <div className="player-role">{role}</div>
  </div>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <a href="https://github.com/nemoproj" target="_blank" rel="noopener noreferrer">
        <img src="/ac-site/logo2.png" alt="alphacorp" className="footer-logo" />
      </a>
      <div className="footer-links">
        <a href="https://github.com/nemoproj" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="#connection-guide">서버 참여하기</a>
        <a href="https://discord.gg/49Ec7PUUHg" target="_blank" rel="noopener noreferrer">Discord</a>
        <a href="https://www.youtube.com/@alphacorp86" target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href="https://www.instagram.com/_alpha.corp" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
      <div className="footer-copyright">
        built by alphacorp. 2025
      </div>
    </div>
  </footer>
);

// Main App component
function App() {
  const copyText = async (text, successMessage) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(successMessage + text, "success");
    } catch (err) {
      showToast("복사 실패", "error");
      console.error("Failed to copy text:", err);
    }
  };

  const scrollToConnectionGuide = () => {
    document.getElementById('connection-guide').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const showToast = (message, type) => {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(100%)";
      toast.style.transition = "all 0.2s ease-out";
      setTimeout(() => toast.remove(), 200);
    }, 2000);
  };

  return (
    <Router basename="/ac-site">
      <Routes>
        <Route path="/" element={
          <AppContext.Provider value={{ copyText }}>
            <div className="bg-white text-gray-900">
              <Nav />
              <main className="main-content">
                <section className="hero-section">
                  <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-7xl font-bold mb-6">소울스왑 SMP</h1>
                    <p className="hero-subtitle text-2xl">차세대 마인크래프트 SMP <span className="version-tag bg-green-100 text-green-700 align-middle">BETA</span></p>
                    <p className="hero-subtitle text-2xl">built by <a href="https://github.com/nemoproj"><img src="/ac-site/logo1.png" alt="nemoproj" className="inline-block h-6 w-auto mr-2" /></a></p>
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                      <div className="flex gap-2">
                        <span className="version-tag bg-blue-100 text-blue-700">
                          Java 1.7.x - 1.21.4
                        </span>
                        <span className="version-tag bg-purple-100 text-purple-700">
                          ViaVersion
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="version-tag bg-green-100 text-green-700">
                          Bedrock 크로스플레이
                        </span>
                        <span className="version-tag bg-red-100 text-orange-700">
                          Geyser
                        </span>
                      </div>
                    </div>
                    <div className="server-ip" onClick={() => copyText('hk1.quvo.pro:15774', '서버 주소가 복사되었습니다: ')}>
                      <span className="text-gray-500 mr-2">서버 IP:</span>
                      <span className="font-medium">hk1.quvo.pro:15774</span>
                    </div>
                  </div>
                </section>

                <section className="max-w-6xl mx-auto px-4 py-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard emoji="💀" title="영혼 시스템" description="플레이어의 머리를 수집하여 강력한 영혼 아이템을 제작하세요" />
                    <FeatureCard emoji="⚡" title="차세대 접근성" description="Bedrock & Java 1.7.x - 1.21.4 모든 버전 지원" />
                    <FeatureCard emoji="🎲" title="랜덤 효과" description="소울 렐릭으로 다양한 버프와 특수 능력을 획득하세요" />
                    <FeatureCard emoji="🛡️" title="공정한 플레이" description="모두가 즐길 수 있는 균형 잡힌 게임 환경을 제공합니다" />
                  </div>
                </section>

                <section className="max-w-8xl mx-auto px-4 py-16">
                  <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">제작 레시피</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <RecipeCard title="소울 오브" description="한명의 플레이어와 몸을 바꾸세요!" imageNumber="1" />
                    <RecipeCard title="소울 샤드" description="AC 서버의 기본 단위" imageNumber="2" />
                    <RecipeCard title="소울 렐릭" description="하늘이 내리는 축복" imageNumber="3" />
                  </div>
                </section>

                <section className="max-w-6xl mx-auto px-4 py-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <InfoCard
                      title="서버 소개"
                      content={
                        <>
                          <p className="text-gray-600 mb-4">
                            플레이어가 죽으면 머리를 드랍합니다! <br></br>
                            머리를 수집하여 강력한 영혼 아이템을 제작하세요!
                          </p>
                          <p className="text-gray-600">
                            Windows, 모바일, 콘솔 모두에서 참여하세요!
                          </p>
                        </>
                      }
                    />
                    <InfoCard title="서버 규칙" content={<img src="https://i.redd.it/sda15hvzgpm41.png" alt="서버 규칙" className="rounded-lg w-full h-auto" />} />
                  </div>
                </section>

                <section className="max-w-6xl mx-auto px-4 py-16">
                  <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">파트너 플레이어</h2>
                  <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    서버의 성장과 함께하며 특별한 혜택을 받을 수 있는 파트너 플레이어를 모집합니다.
                  </p>
                  <div className="player-grid">
                    {[...Array(10)].map((_, index) => (
                      <a
                        key={index}
                        href="https://www.instagram.com/_alpha.corp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="player-card empty"
                      >
                        <div className="player-avatar empty">
                          <span className="empty-slot-number">{index + 1}</span>
                        </div>
                        <div className="player-name">빈 슬롯</div>
                        <div className="player-role">파트너 신청하기</div>
                      </a>
                    ))}
                  </div>
                </section>

                <section id="connection-guide" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-20">
                  <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">버전별 접속 방법</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ConnectionGuide
                      title="Java Edition"
                      version="1.7.x - 1.21.4"
                      tech="ViaVersion"
                      description="Java Edition은 PC에서 즐길 수 있는 기본 버전입니다. ViaVersion을 통해 1.7.x부터 1.21.4까지 모든 버전을 지원합니다."
                      serverAddress="hk1.quvo.pro:15774"
                      steps={[
                        "다중 접속 > 서버 추가를 선택하세요",
                        "서버 주소와 포트를 입력하세요",
                        "저장 후 접속하시면 됩니다"
                      ]}
                    />
                    <ConnectionGuide
                      title="Bedrock Edition"
                      version="크로스플레이"
                      tech="Geyser"
                      description="Bedrock Edition은 모바일, 콘솔, Windows 10에서 플레이할 수 있습니다. Geyser를 통해 Java Edition 서버에 접속이 가능합니다."
                      serverAddress="hk1.quvo.pro"
                      port="15774"
                      steps={[
                        "서버 > 서버 추가를 선택하세요",
                        "서버 주소와 포트를 각각 입력하세요",
                        "저장 후 접속하시면 됩니다"
                      ]}
                    />
                  </div>
                </section>
              </main>
              <Footer />
            </div>
          </AppContext.Provider>
        } />
        <Route path="/team" element={<Team />} />
        <Route path="/patchnotes" element={<PatchNotes />} />
      </Routes>
    </Router>
  );
}

export default App;
