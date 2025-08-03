/**
 * Page components for different routes
 */

import React from 'react';
import type { Project, Page } from '../../types';
import { Hero } from '../Hero';
import { FeaturedSection } from '../FeaturedSection';
import { AboutSection } from '../AboutSection';
import { AnimatedSection, LoadingSpinner, ErrorMessage } from '../UI';
import { ProjectCard } from '../ProjectCard';

interface HomePageProps {
  setPage: (page: Page) => void;
  onProjectClick: (project: Project) => void;
  games: Project[];
  tools: Project[];
  loading: boolean;
  error: string | null;
}

/**
 * Home page with hero, featured sections and about
 */
export const HomePage = ({ setPage, onProjectClick, games, tools, loading, error }: HomePageProps) => {
  if (loading) {
    return (
      <>
        <Hero setPage={setPage} />
        <LoadingSpinner />
      </>
    );
  }
  
  if (error) {
    return (
      <>
        <Hero setPage={setPage} />
        <ErrorMessage message={error} />
      </>
    );
  }
  
  const featuredGames = games.filter(game => game.featured);
  const featuredTools = tools.filter(tool => tool.featured);
  
  return (
    <>
      <Hero setPage={setPage} />
      <FeaturedSection 
        id="games" 
        title="Popüler Oyunlar" 
        projects={featuredGames} 
        onProjectClick={onProjectClick}
      />
      <FeaturedSection 
        id="tools" 
        title="Popüler Araçlar" 
        projects={featuredTools} 
        onProjectClick={onProjectClick}
      />
      <AboutSection setPage={setPage} />
    </>
  );
};

interface AllProjectsPageProps {
  title: string;
  projects: Project[];
  onProjectClick: (project: Project) => void;
  loading?: boolean;
  error?: string | null;
}

/**
 * Page displaying all projects in a category
 */
export const AllProjectsPage = ({ title, projects, onProjectClick, loading, error }: AllProjectsPageProps) => {
  if (loading) {
    return (
      <section className="page-container">
        <div className="container">
          <h2 className="section-title">{title}</h2>
          <LoadingSpinner />
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="page-container">
        <div className="container">
          <h2 className="section-title">{title}</h2>
          <ErrorMessage message={error} />
        </div>
      </section>
    );
  }
  
  return (
    <section className="page-container">
      <div className="container">
        <AnimatedSection>
          <h2 className="section-title">{title}</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <AnimatedSection key={project.id}>
                <ProjectCard 
                  project={project} 
                  onClick={() => onProjectClick(project)}
                />
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/**
 * About page with detailed company information
 */
export const AboutPage = () => {
  const founders = [
    {
      id: 1,
      name: "Ayberk Doruk",
      role: "CEO & Kurucu Ortak",
      description: "Proje yönetimi ve stratejik planlama konularında uzmanlaşan, ekibin vizyoner liderlerinden biri.",
      image: "https://i.hizliresim.com/nuntquz.png"
    },
    {
      id: 2,
      name: "Efe Berke Ağlık", 
      role: "CEO & Kurucu Ortak",
      description: "Proje yönetimi ve stratejik planlama konularında uzmanlaşan, ekibin vizyoner liderlerinden biri.",
      image: "https://i.hizliresim.com/nuntquz.png"
    },
    {
      id: 3,
      name: "Mustafa Gökay Hamarat",
      role: "CEO & Kurucu Ortak",
      description: "Proje yönetimi ve stratejik planlama konularında uzmanlaşan, ekibin vizyoner liderlerinden biri.",
      image: "https://i.hizliresim.com/nuntquz.png"
    },

     {
      id: 4,
      name: "Muhammet Rüzgar Çelik",
      role: "CEO & Kurucu Ortak",
      description: "Proje yönetimi ve stratejik planlama konularında uzmanlaşan, ekibin vizyoner liderlerinden biri.",
      image: "https://i.hizliresim.com/nuntquz.png"
    }
  ];


  return (
    <section className="page-container about-page">
      <div className="container">
        <AnimatedSection>
          <h2 className="section-title">Hakkımızda</h2>
          <div className="about-page-content">
            <p>
              <strong>
                Nexvor Studio, 2025 yılında henüz lise çağında olan 4 genç girişimci tarafından kuruldu.
              </strong> 
              Dersler arasında kodlama öğrenen, okuldan sonra oyun geliştirme projelerinde çalışan ve 
              geleceğin teknolojilerini bugünden keşfetmeye kararlı dört arkadaşız. Yaşımız küçük olabilir 
              ama hayallerimiz ve hedeflerimiz büyük!
            </p>
            <p>
              Teknolojiye olan tutkumuz bizi bir araya getirdi. Her birimiz farklı yeteneklere sahipken - 
              kimisi kodlamada, kimisi tasarımda, kimisi proje yönetiminde parlıyor - ortak amacımız 
              insanların hayatını kolaylaştıran ve eğlendiren dijital ürünler yaratmak. Lise hayatımız 
              ve öğrenme sürecimiz devam ederken, boş zamanlarımızı bu stüdyoyu büyütmeye adıyoruz.
            </p>
            <p>
              Nexvor Studio olarak, genç bakış açımızla sektöre yenilikçi çözümler getirmeyi, yaşıtlarımıza 
              ilham vermeyi ve teknoloji dünyasında iz bırakmayı hedefliyoruz. Her proje bizim için bir 
              öğrenme deneyimi ve geleceğe atılan bir adım. Çünkü biz, geleceğin teknoloji liderleriyiz! 🚀
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="section-subtitle">Kurucularımız</h3>
          <div className="founders-grid">
            {founders.map((founder) => (
              <div key={founder.id} className="founder-card">
                <div className="founder-image">
                  <img src={founder.image} alt={founder.name} />
                </div>
                <div className="founder-info">
                  <h4 className="founder-name">{founder.name}</h4>
                  <p className="founder-role">{founder.role}</p>
                  <p className="founder-description">{founder.description}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
