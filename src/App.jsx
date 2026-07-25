import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaBars,
  FaCheckCircle,
  FaCube,
  FaDraftingCompass,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFilePdf,
  FaHardHat,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaMoon,
  FaPhoneAlt,
  FaPinterestP,
  FaRulerCombined,
  FaSun,
  FaTimes,
  FaTools,
  FaWhatsapp,
} from 'react-icons/fa';
import { SiFiverr } from 'react-icons/si';
import './App.css';

const profile = {
  name: 'Hassan Nawaz',
  role: 'Architect Designer',
  location: 'Deira, Dubai, United Arab Emirates',
  email: 'maharhassan151@gmail.com',
  phone: '+971 55 653 9149',
  secondaryPhone: '+971 52 350 9475',
  whatsapp: '971556539149',
  linkedin: 'https://www.linkedin.com/in/hassan-nawaz-655b78278/',
  pinterest: 'https://www.pinterest.com/Architectdesinger/_created/',
  fiverr:
    'https://www.fiverr.com/maharhassan381/be-your-draftsman-architect-and-3d-modeler-for-2d-floor-plans-house-plan?utm_campaign=gigs_show&utm_medium=shared&utm_source=copy_link&utm_term=9yaqmd',
  image: '/assets/pic.jpg',
};

const emailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent('Architectural project enquiry')}`;

const formSubmitEndpoint = `https://formsubmit.co/ajax/${profile.email}`;

const stockVideos = {
  house: 'https://www.pexels.com/download/video/7578541/',
  construction: 'https://www.pexels.com/download/video/19479036/',
  office: 'https://www.pexels.com/download/video/5716999/',
  interior: 'https://www.pexels.com/download/video/3773486/',
};

const sampleVideos = {
  designToHouseClean: '/assets/videos/design-to-house-clean.mp4',
  homeBuildSequence: '/assets/videos/home-build-sequence.mp4',
  projectsBuildSequence: '/assets/videos/projects-build-sequence.mp4',
  aboutBlueprintUnroll: '/assets/videos/about-blueprint-unroll-clean.mp4',
  servicesOfficeConstruction: '/assets/videos/services-realistic-construction.mp4',
  homeVisualization: '/assets/videos/home-visualization.mp4',
};

const services = [
  {
    icon: <FaDraftingCompass />,
    title: '2D Architectural Drafting',
    text: 'Plans, elevations, sections, layouts and working drawings prepared with clear dimensions and disciplined documentation.',
  },
  {
    icon: <FaCube />,
    title: '3D Modeling & Visualization',
    text: 'Exterior and interior models developed into realistic presentation views for design review and client communication.',
  },
  {
    icon: <FaTools />,
    title: 'MEP Coordination',
    text: 'Electrical, plumbing and drainage drawings coordinated with architectural requirements and site execution.',
  },
  {
    icon: <FaHardHat />,
    title: 'Site & Execution Support',
    text: 'Drawing clarification, progress review and coordination support that keeps design decisions aligned with construction.',
  },
  {
    icon: <FaRulerCombined />,
    title: 'Interior Space Planning',
    text: 'Furniture layouts, circulation, finishes and visual concepts for residential, workplace and hospitality interiors.',
  },
  {
    icon: <FaCube />,
    title: 'Prefab & Modular Design',
    text: 'Container units, cabins and modular spaces planned for efficient fabrication, installation and practical operation.',
  },
];

const experience = [
  {
    company: 'Bright Environment LLC',
    location: 'Dubai, UAE',
    period: 'Aug 2025 — Jul 2026',
    role: '2D & 3D Designer / Site Engineer',
    text: 'Produces drawings and visualization packages while coordinating design intent with execution teams on site.',
  },
  {
    company: 'Masah Al Murabba Prefab Houses',
    location: 'Dubai, UAE',
    period: 'Mar 2023 — Jul 2025',
    role: 'Architectural, Civil & MEP Designer',
    text: 'Worked on prefab offices, container units, interior layouts, MEP drawings and technical presentation packages.',
  },
  {
    company: 'Izhar Construction (PVT) Ltd.',
    location: 'Islamabad, Pakistan',
    period: 'Sep 2022 — Mar 2023',
    role: 'Architectural, Civil & MEP Coordinator',
    text: 'Supported technical documentation and coordination for construction work, including the Dolmen Mall project environment.',
  },
  {
    company: "M/S Kingcrete Builder's (PVT) Ltd.",
    location: 'Lahore, Pakistan',
    period: 'Sep 2021 — Aug 2022',
    role: 'Civil Draftsman',
    text: 'Prepared architectural, civil, electrical, plumbing and drainage drawings for active building projects.',
  },
];

const projects = [
  {
    id: 'plan-20x38',
    mediaMode: 'contain',
    title: "20' × 38' Residential Ground Floor Plan",
    category: '2D Drawings',
    image: '/assets/portfolio-extra/plan-20x38.jpg',
    summary: 'Compact residential planning with two bedrooms, dining, kitchen, TV lounge, porch and carefully arranged service spaces.',
    images: ['/assets/portfolio-extra/plan-20x38.jpg'],
  },
  {
    id: 'plan-40x50',
    mediaMode: 'contain',
    title: "40' × 50' Five-Bedroom Floor Plan",
    category: '2D Drawings',
    image: '/assets/portfolio-extra/plan-40x50.jpg',
    summary: 'A five-bedroom plan organised around a central dining zone, family lounge, kitchen, open area and landscaped edge.',
    images: ['/assets/portfolio-extra/plan-40x50.jpg'],
  },
  {
    id: 'plan-32x41',
    mediaMode: 'contain',
    title: "32' × 41' First-Floor Plan",
    category: '2D Drawings',
    image: '/assets/portfolio-extra/plan-32x41.jpg',
    summary: 'A clear first-floor arrangement balancing bedroom privacy, dining, kitchen, drawing room, verandah and stair access.',
    images: ['/assets/portfolio-extra/plan-32x41.jpg'],
  },
  {
    id: 'residential-approval-package',
    mediaMode: 'contain',
    title: 'Residential Approval Drawing Package',
    category: '2D Drawings',
    image: '/assets/2d-plan-with-detail-page-1.png',
    summary: 'A complete approval sheet containing plans, elevations, sections, schedules, site information and construction notes.',
    images: ['/assets/2d-plan-with-detail-page-1.png'],
    pdfs: [{ label: 'Open approval drawing PDF', href: '/assets/2d-plan-with-detail.pdf' }],
  },
  {
    id: 'a-frame-residence',
    title: 'A-Frame Residence Visualization',
    category: '3D Visualization',
    image: '/assets/3d-view-10.jpg',
    summary: 'A modern A-frame residence presented through exterior views with timber expression, extensive glazing and a strong geometric form.',
    images: [
      '/assets/3d-view-10.jpg',
      '/assets/3d-view-1.png',
      '/assets/3d-view-2.png',
      '/assets/3d-view-3.png',
      '/assets/3d-view-6.png',
      '/assets/3d-view-8.jpg',
    ],
  },
  {
    id: 'compact-residence-render',
    title: 'Compact Residence Exterior',
    category: '3D Visualization',
    image: '/assets/3d-page-1.png',
    summary: 'A compact contemporary home with a defined entrance, balcony, glazed elements, texture panels and warm facade lighting.',
    images: ['/assets/3d-page-1.png'],
    pdfs: [{ label: 'Open exterior presentation PDF', href: '/assets/3d.pdf' }],
  },
  {
    id: 'office-510-511',
    mediaMode: 'contain',
    title: 'Office 510 & 511 Proposed Layout',
    category: 'Commercial',
    image: '/assets/portfolio-extra/pdf-previews/office-510.jpg',
    summary: 'A commercial office layout package developed to coordinate work areas, circulation, furniture and functional requirements.',
    images: ['/assets/portfolio-extra/pdf-previews/office-510.jpg'],
    pdfs: [{ label: 'Open office layout PDF', href: '/assets/portfolio-extra/office-510-layout.pdf' }],
  },
  {
    id: 'dnata-innovation-room',
    title: 'DNATA Innovation Room',
    category: 'Commercial',
    image: '/assets/innovation-room-3d-image-page-1.png',
    summary: 'A branded innovation environment with collaborative seating, presentation surfaces, integrated lighting and a distinctive ceiling concept.',
    images: [
      '/assets/innovation-room-3d-image-page-1.png',
      '/assets/innovation-room-3d-image-page-2.png',
      '/assets/innovation-room-3d-image-page-3.png',
      '/assets/innovation-room-3d-image-page-4.png',
      '/assets/innovation-room-3d-image-page-5.png',
    ],
    pdfs: [{ label: 'Open complete concept PDF', href: '/assets/innovation-room-3d-image.pdf' }],
  },
  {
    id: 'aditya-home-stay',
    title: 'Aditya Home Stay',
    category: 'Hospitality',
    image: '/assets/image-7-photo.jpg',
    summary: 'A hospitality residence developed with a calm modern language, considered landscape, open circulation and comfortable guest areas.',
    images: ['/assets/image-7-photo.jpg', '/assets/image-8-photo.jpg', '/assets/image-9-photo.jpg'],
    pdfs: [{ label: 'Open detailed plan PDF', href: '/assets/2d-plan-with-detail.pdf' }],
  },
  {
    id: 'poolside-pavilion',
    title: 'Poolside Guest Pavilion',
    category: 'Hospitality',
    image: '/assets/portfolio-extra/pool-pavilion.jpg',
    summary: 'A lightweight glazed pavilion beside a pool, designed for relaxed hospitality use and visual connection to the landscape.',
    images: ['/assets/portfolio-extra/pool-pavilion.jpg'],
  },
  {
    id: 'residential-interior-collection',
    title: 'Residential Interior Collection',
    category: 'Interior',
    image: '/assets/corridor.jpg',
    summary: 'A coordinated interior set covering circulation, dining, seating and study spaces with warm materials and practical furniture planning.',
    images: ['/assets/corridor.jpg', '/assets/sitting-area.jpg', '/assets/dinning.jpg', '/assets/library.jpg'],
  },
  {
    id: 'dressing-room-interior',
    title: 'Dressing Room Interior',
    category: 'Interior',
    image: '/assets/portfolio-extra/dressing-room.jpg',
    summary: 'A focused dressing-room concept balancing storage, mirrors, lighting, finishes and a comfortable daily-use layout.',
    images: ['/assets/portfolio-extra/dressing-room.jpg'],
  },
  {
    id: 'g1-container-unit',
    mediaMode: 'contain',
    title: 'G+1 Container Unit',
    category: 'Prefab & Modular',
    image: '/assets/g-1-container-2d-3d-page-4.png',
    summary: 'A two-level container solution developed for efficient fabrication, stair access, modular coordination and a professional exterior identity.',
    images: [
      '/assets/g-1-container-2d-3d-page-4.png',
      '/assets/g-1-container-2d-3d-page-5.png',
      '/assets/g-1-container-2d-3d-page-6.png',
    ],
    pdfs: [{ label: 'Open container package PDF', href: '/assets/g-1-container-2d-3d.pdf' }],
  },
  {
    id: 'emirates-bus-shelter',
    title: 'Emirates Bus Waiting Cabin',
    category: 'Prefab & Modular',
    image: '/assets/1-5-photo.jpg',
    summary: 'A glazed modular waiting cabin planned for passenger comfort, visibility, seating and integration with the roadside environment.',
    images: ['/assets/1-5-photo.jpg', '/assets/1-2-photo.jpg', '/assets/1-3-photo.jpg', '/assets/1-4-photo.jpg'],
  },
  {
    id: 'g1-jv-main-office',
    mediaMode: 'contain',
    title: 'G+1 JV Main Office',
    category: 'Prefab & Modular',
    image: '/assets/portfolio-extra/pdf-previews/jv-main-office.jpg',
    summary: 'A large modular office package coordinating room planning, structural modules, circulation, services and fabrication information.',
    images: ['/assets/portfolio-extra/pdf-previews/jv-main-office.jpg'],
    pdfs: [{ label: 'Open complete office package PDF', href: '/assets/portfolio-extra/jv-main-office.pdf' }],
  },
  {
    id: 'modern-villa-front',
    title: 'Modern Villa Front Elevation',
    category: 'Residential',
    image: '/assets/portfolio-extra/villa-front.jpg',
    summary: 'A clean residential elevation using curved geometry, large openings and restrained material contrast for a contemporary street presence.',
    images: ['/assets/portfolio-extra/villa-front.jpg'],
  },
  {
    id: 'home-design-50x27',
    title: "Home Design 50' × 27'",
    category: 'Residential',
    image: '/assets/3d-1.jpg',
    summary: 'A two-storey home concept with car porch, balanced facade composition, vertical accents and supporting drawing documentation.',
    images: ['/assets/3d-1.jpg'],
    pdfs: [
      { label: 'Open 3D presentation PDF', href: '/assets/3d-1.pdf' },
      { label: 'Open floor-plan PDF', href: '/assets/2d-plan.pdf' },
    ],
  },
  {
    id: 'countryside-residence',
    title: 'Countryside Residence',
    category: 'Residential',
    image: '/assets/3d.jpg',
    summary: 'A countryside home with a straightforward footprint, soft landscaping and a clear relationship between interior zones and outdoor areas.',
    images: ['/assets/3d.jpg', '/assets/top-view.jpg'],
  },
];

const categories = ['All', '2D Drawings', '3D Visualization', 'Commercial', 'Hospitality', 'Interior', 'Prefab & Modular', 'Residential'];

const routes = ['home', 'projects', 'about', 'services', 'contact'];

function parseRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '') || 'home';
  if (raw.startsWith('project/')) return { page: 'project', id: raw.split('/')[1] };
  return { page: routes.includes(raw) ? raw : 'home', id: null };
}

function navigate(path) {
  window.location.hash = `#/${path}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function SmartVideo({ src, poster, className = '', eager = false, label }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(eager);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
    setReady(eager);
  }, [src, eager]);

  useEffect(() => {
    if (eager || !ref.current || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '360px' },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [eager, src]);

  return (
    <div ref={ref} className={`smart-video ${className} ${loaded ? 'video-loaded' : ''} ${failed ? 'video-failed' : ''}`}>
      {poster ? <img className="video-poster" src={poster} alt="" aria-hidden="true" /> : <div className="video-placeholder" aria-hidden="true" />}
      {ready && !failed && (
        <video
          key={src}
          className={loaded ? 'is-loaded' : ''}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster || undefined}
          onLoadedData={() => setLoaded(true)}
          onCanPlay={() => setLoaded(true)}
          onCanPlayThrough={() => setLoaded(true)}
          onPlaying={() => setLoaded(true)}
          onError={() => setFailed(true)}
          aria-label={label}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="video-overlay" />
    </div>
  );
}

function Header({ route, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    ['home', 'Home'],
    ['projects', 'Projects'],
    ['about', 'About'],
    ['services', 'Services'],
    ['contact', 'Contact'],
  ];

  useEffect(() => setMenuOpen(false), [route.page]);

  return (
    <header className="site-header">
      <a className="brand" href="#/home" aria-label="Hassan Nawaz home">
        <img src={profile.image} alt="Hassan Nawaz" />
        <span>
          <strong>{profile.name}</strong>
          <small>{profile.role}</small>
        </span>
      </a>

      <button className="menu-toggle" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        {navItems.map(([key, label]) => (
          <a key={key} href={`#/${key}`} className={route.page === key ? 'active' : ''}>
            {label}
          </a>
        ))}
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </nav>
    </header>
  );
}

function SocialRail() {
  return (
    <aside className="social-rail" aria-label="Direct contact links">
      <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
      <a href={emailComposeUrl} target="_blank" rel="noreferrer" aria-label="Email"><FaEnvelope /></a>
      <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
      <a href={profile.fiverr} target="_blank" rel="noreferrer" aria-label="Fiverr"><SiFiverr /></a>
      <a href={profile.pinterest} target="_blank" rel="noreferrer" aria-label="Pinterest"><FaPinterestP /></a>
    </aside>
  );
}

function PageHeading({ eyebrow, title, text }) {
  return (
    <div className="page-heading shell">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="home-hero">
        <SmartVideo
          src={stockVideos.house}
          poster="/assets/videos/home-visualization-poster.jpg"
          className="hero-video"
          eager
          label="Modern house exterior video"
        />
        <div className="home-hero-content shell">
          <p className="eyebrow">Architectural drafting · design · visualization</p>
          <h1>Clear design decisions for spaces that can be built and experienced.</h1>
          <p>
            Hassan Nawaz provides architectural drafting, 3D visualization, interior planning, MEP coordination and modular-design support for clients in the UAE and abroad.
          </p>
          <div className="hero-actions">
            <button className="button primary" type="button" onClick={() => navigate('projects')}>View projects <FaArrowRight /></button>
            <button className="button secondary" type="button" onClick={() => navigate('contact')}>Start an enquiry</button>
          </div>
        </div>
      </section>

      <section className="section shell motion-section">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Design capabilities</p>
          <h2>From initial planning to finished architectural environments.</h2>
          <p>Three focused areas show how design, documentation and visualization support a project from concept to execution.</p>
        </div>

        <div className="motion-grid">
          <article className="motion-card">
            <SmartVideo src={sampleVideos.designToHouseClean} poster="/assets/videos/design-to-house-clean-poster.jpg" label="2D plan transforming into a realistic home" />
            <div className="motion-card-copy"><span>Technical coordination</span><h3>Design prepared for construction</h3><p>From linework to buildable form, drawings are coordinated with realistic design intent.</p></div>
          </article>
          <article className="motion-card">
            <SmartVideo src={sampleVideos.homeBuildSequence} poster="/assets/videos/home-build-sequence-poster.jpg" label="Architectural building process video" />
            <div className="motion-card-copy"><span>Build sequence</span><h3>How planning becomes a finished structure</h3><p>Visual narratives show how architectural decisions translate into structure, envelope and space.</p></div>
          </article>
          <article className="motion-card">
            <SmartVideo src={sampleVideos.homeVisualization} poster="/assets/videos/home-visualization-poster.jpg" label="Realistic architectural visualization video" />
            <div className="motion-card-copy"><span>Design visualization</span><h3>Concepts communicated with realism</h3><p>Residential, office and modular ideas are presented through polished visual storytelling.</p></div>
          </article>
        </div>
      </section>

      <section className="section service-preview">
        <div className="shell">
          <div className="section-heading inline-heading">
            <div><p className="eyebrow">Core services</p><h2>Focused support for design and delivery.</h2></div>
            <button className="text-link" type="button" onClick={() => navigate('services')}>Explore all services <FaArrowRight /></button>
          </div>
          <div className="service-preview-grid">
            {services.slice(0, 4).map((service) => (
              <article key={service.title} className="service-preview-card">
                <span>{service.icon}</span><h3>{service.title}</h3><p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const visibleProjects = useMemo(() => {
    return projects.filter((project) => {
      const categoryMatch = filter === 'All' || project.category === filter;
      const searchMatch = `${project.title} ${project.category} ${project.summary}`.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [filter, search]);

  return (
    <>
      <section className="page-hero projects-hero">
        <SmartVideo src={sampleVideos.projectsBuildSequence} poster="/assets/videos/projects-build-sequence-poster.jpg" eager label="Architectural building process video" />
        <PageHeading
          eyebrow="Projects"
          title="Selected architectural work across drawing, visualization and built environments."
          text="Explore residential, commercial, hospitality, interior and modular projects presented through focused individual case studies."
        />
      </section>

      <section className="section shell project-browser">
        <div className="project-toolbar">
          <div className="filter-row" aria-label="Project categories">
            {categories.map((category) => (
              <button key={category} type="button" className={filter === category ? 'active' : ''} onClick={() => setFilter(category)}>{category}</button>
            ))}
          </div>
          <label className="project-search">
            <span>Search projects</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Project name or category" />
          </label>
        </div>

        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <article key={project.id} className="project-card">
              <button type="button" className="project-card-button" onClick={() => navigate(`project/${project.id}`)}>
                <div className={`project-image-wrap ${project.mediaMode === 'contain' ? 'contain-media' : 'cover-media'}`}>
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <span className="project-image-index">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="project-card-copy">
                  <div className="project-card-meta"><span>{project.category}</span><small>Project case study</small></div>
                  <h2>{project.title}</h2>
                  <p>{project.summary}</p>
                  <strong>Explore project <FaArrowRight /></strong>
                </div>
              </button>
            </article>
          ))}
        </div>

        {!visibleProjects.length && <div className="empty-state"><h2>No matching project found.</h2><p>Choose another category or clear the search field.</p></div>}
      </section>
    </>
  );
}

function ProjectPage({ id }) {
  const project = projects.find((item) => item.id === id);
  if (!project) {
    return <section className="section shell empty-state"><h1>Project not found.</h1><button className="button primary" onClick={() => navigate('projects')}>Return to projects</button></section>;
  }

  const galleryImages = [...new Set(project.images || [])].filter((image) => image !== project.image);
  const totalMedia = 1 + galleryImages.length;
  const mediaClass = project.mediaMode === 'contain' ? 'contain-media' : 'cover-media';

  return (
    <>
      <section className="project-detail-hero shell">
        <button className="back-link" type="button" onClick={() => navigate('projects')}><FaArrowLeft /> All projects</button>
        <div className="project-detail-card">
          <div className="project-detail-title">
            <p className="eyebrow">{project.category}</p>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
            <div className="project-detail-meta">
              <div><span>Discipline</span><strong>{project.category}</strong></div>
              <div><span>Media</span><strong>{totalMedia} {totalMedia === 1 ? 'view' : 'views'}</strong></div>
              <div><span>Format</span><strong>{project.pdfs?.length ? 'Images + PDF' : 'Portfolio images'}</strong></div>
            </div>
          </div>
          <div className={`project-detail-cover ${mediaClass}`}>
            <img src={project.image} alt={project.title} />
          </div>
        </div>
      </section>

      <section className="section shell project-detail-content">
        {galleryImages.length > 0 && (
          <>
            <div className="project-gallery-heading">
              <div><p className="eyebrow">Project gallery</p><h2>Additional views and technical material</h2></div>
              <p>Every image is shown once and kept at its original proportion.</p>
            </div>
            <div className="project-gallery">
              {galleryImages.map((image, index) => (
                <a key={image} href={image} target="_blank" rel="noreferrer" className={`gallery-image ${mediaClass}`}>
                  <img src={image} alt={`${project.title} view ${index + 2}`} loading="lazy" />
                  <span>View full image <FaExternalLinkAlt /></span>
                </a>
              ))}
            </div>
          </>
        )}
        {project.pdfs?.length > 0 && (
          <div className="document-panel">
            <div><p className="eyebrow">Project documents</p><h2>Original drawing and presentation files</h2></div>
            <div>{project.pdfs.map((pdf) => <a key={pdf.href} href={pdf.href} target="_blank" rel="noreferrer" className="button secondary"><FaFilePdf /> {pdf.label}</a>)}</div>
          </div>
        )}
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <section className="page-hero about-hero">
        <SmartVideo src={sampleVideos.aboutBlueprintUnroll} poster="/assets/videos/about-blueprint-unroll-clean-poster.jpg" eager label="A rolled architectural drawing opening and developing on a designer desk" />
        <PageHeading
          eyebrow="About Hassan"
          title="Experience across architectural drafting, design coordination and site execution."
          text="A professional profile built around accurate documentation, practical problem-solving and clear visual communication."
        />
      </section>

      <section className="section shell profile-section">
        <div className="profile-photo"><img src={profile.image} alt="Hassan Nawaz" /></div>
        <div className="profile-copy">
          <p className="eyebrow">Architect Designer</p>
          <h2>{profile.name}</h2>
          <p>Hassan Nawaz works across architectural, civil, MEP, prefab and visualization tasks. His experience in the UAE and Pakistan combines design presentation with the technical decisions required for execution.</p>
          <div className="profile-facts">
            <div><span>Based in</span><strong>{profile.location}</strong></div>
            <div><span>Professional focus</span><strong>Architecture, MEP, 2D drafting and 3D design</strong></div>
            <div><span>Languages</span><strong>English and Urdu</strong></div>
          </div>
        </div>
      </section>

      <section className="section muted-section">
        <div className="shell">
          <div className="section-heading compact-heading"><p className="eyebrow">Professional experience</p><h2>Project environments in the UAE and Pakistan.</h2></div>
          <div className="experience-list">
            {experience.map((item) => (
              <article key={item.company}><span>{item.period}</span><div><h3>{item.company}</h3><p className="experience-meta">{item.role} · {item.location}</p><p>{item.text}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell about-education">
        <div className="education-card">
          <p className="eyebrow">Education</p>
          <h2>AutoCAD Training</h2>
          <p>IPL College, Lahore · 2021</p>
          <p>Technical training covering 2D and 3D drafting, architectural drawing tools, precision detailing, layers and layout management.</p>
        </div>
        <div className="education-card">
          <p className="eyebrow">Qualification</p>
          <h2>Diploma of Civil Draftsman</h2>
          <p>Original certificate and verification pages are available for review.</p>
          <div className="certificate-links"><a href="/assets/diploma-civil-draftsman.pdf" target="_blank" rel="noreferrer"><FaFilePdf /> Open diploma PDF</a><a href="/assets/diploma-civil-draftsman-page-1.png" target="_blank" rel="noreferrer"><FaExternalLinkAlt /> View certificate</a></div>
        </div>
      </section>
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <section className="page-hero services-hero">
        <SmartVideo src={sampleVideos.servicesOfficeConstruction} poster="/assets/videos/services-realistic-construction-poster.jpg" eager label="Realistic architectural construction sequence from foundation to completed building" />
        <PageHeading
          eyebrow="Services"
          title="Architectural services for planning, presentation and execution."
          text="Select the support required for a residential, commercial, hospitality, interior or modular project."
        />
      </section>

      <section className="section shell services-page-grid">
        {services.map((service) => (
          <article key={service.title} className="service-card">
            <span>{service.icon}</span><h2>{service.title}</h2><p>{service.text}</p>
            <button className="text-link" type="button" onClick={() => navigate('contact')}>Discuss this service <FaArrowRight /></button>
          </article>
        ))}
      </section>
    </>
  );
}

function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus('sending');
    setMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const preferredReply = String(
      formData.get('preferred_reply') || 'Email',
    ).toLowerCase();
    const customerName = String(
      formData.get('name') || 'Website visitor',
    ).trim();

    // Both selections are delivered to the owner's Gmail. The selected
    // option only controls the preferred reply channel and customer message.
    formData.set(
      '_subject',
      `New ${preferredReply === 'whatsapp' ? 'WhatsApp' : 'Email'} project enquiry — ${customerName}`,
    );
    formData.set(
      'delivery_note',
      `Send this enquiry to ${profile.email}. Customer selected ${preferredReply === 'whatsapp' ? 'WhatsApp' : 'Email'} as the preferred reply method.`,
    );
    formData.set('_url', window.location.href);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(formSubmitEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
        signal: controller.signal,
      });

      let result = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      const accepted =
        response.ok &&
        (result?.success === true ||
          String(result?.success).toLowerCase() === 'true');

      if (!accepted) {
        throw new Error(
          result?.message || `Form service returned status ${response.status}.`,
        );
      }

      const serviceMessage = String(result?.message || '').toLowerCase();
      const activationRequired =
        serviceMessage.includes('activate') ||
        serviceMessage.includes('activation') ||
        serviceMessage.includes('confirm');

      if (activationRequired) {
        setStatus('activation');
        setMessage(
          `A one-time activation email has been sent to ${profile.email}. The owner must open it and approve the form before enquiries can be delivered.`,
        );
        return;
      }

      form.reset();
      setStatus('success');
      setMessage(
        preferredReply === 'whatsapp'
          ? 'The owner has received your enquiry through WhatsApp and will contact you there shortly.'
          : 'The owner has received your enquiry through Email and will reply to your email address shortly.',
      );
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setStatus('error');
      setMessage(
        error?.name === 'AbortError'
          ? 'The enquiry service took too long to respond. Please try again or contact Hassan directly by email.'
          : 'The enquiry could not be delivered. Please try again or contact Hassan directly by email.',
      );
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  return (
    <form
      className="contact-form"
      action={formSubmitEndpoint}
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="form-grid">
        <label className="form-field">
          <span>Full name *</span>
          <input
            name="name"
            required
            maxLength="120"
            autoComplete="name"
            placeholder="Your full name"
          />
        </label>

        <label className="form-field">
          <span>Email address *</span>
          <input
            name="email"
            type="email"
            required
            maxLength="180"
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>

        <label className="form-field">
          <span>Phone / WhatsApp</span>
          <input
            name="phone"
            type="tel"
            maxLength="80"
            autoComplete="tel"
            placeholder="Country code and number"
          />
        </label>

        <label className="form-field">
          <span>Company</span>
          <input
            name="company"
            maxLength="160"
            autoComplete="organization"
            placeholder="Company or organisation"
          />
        </label>

        <label className="form-field">
          <span>Project type *</span>
          <select name="project_type" required defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.title} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span>Indicative budget</span>
          <select name="budget" defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            <option>Under AED 1,500</option>
            <option>AED 1,500–5,000</option>
            <option>AED 5,000–15,000</option>
            <option>AED 15,000+</option>
            <option>To be discussed</option>
          </select>
        </label>

        <label className="form-field full">
          <span>Required timeline</span>
          <input
            name="timeline"
            maxLength="180"
            placeholder="Example: first issue required within 10 days"
          />
        </label>

        <label className="form-field full">
          <span>Project brief *</span>
          <textarea
            name="message"
            required
            maxLength="3000"
            rows="6"
            placeholder="Describe the site, dimensions, deliverables, reference files and expected output."
          />
        </label>
      </div>

      <fieldset className="preference-field">
        <legend>Preferred reply method</legend>
        <label>
          <input
            type="radio"
            name="preferred_reply"
            value="WhatsApp"
            defaultChecked
          />{' '}
          WhatsApp
        </label>
        <label>
          <input
            type="radio"
            name="preferred_reply"
            value="Email"
          />{' '}
          Email
        </label>
      </fieldset>

      <input
        type="text"
        name="_honey"
        className="honeypot"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
      />

      <input type="hidden" name="_subject" defaultValue="New website project enquiry" />
      <input type="hidden" name="_template" value="table" readOnly />
      <input type="hidden" name="_captcha" value="false" readOnly />
      <input
        type="hidden"
        name="delivery_note"
        defaultValue={`Deliver this website enquiry to ${profile.email}.`}
      />

      <button
        className="button primary submit-button"
        type="submit"
        disabled={status === 'sending'}
      >
        {status === 'sending'
          ? 'Sending enquiry…'
          : 'Send project enquiry'}{' '}
        <FaArrowRight />
      </button>

      {status !== 'idle' && status !== 'sending' && (
        <div
          className={`form-notification ${status}`}
          role="status"
          aria-live="polite"
        >
          {status === 'success' && <FaCheckCircle />}
          <div>
            <strong>
              {status === 'success'
                ? 'Enquiry submitted successfully.'
                : status === 'activation'
                  ? 'One-time email activation required.'
                  : 'Delivery problem.'}
            </strong>
            <p>{message}</p>
            {(status === 'error' || status === 'activation') && (
              <a
                href={emailComposeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open owner email
              </a>
            )}
          </div>
        </div>
      )}
    </form>
  );
}

function ContactPage() {
  return (
    <>
      <section className="page-hero contact-hero animated-contact-hero">
        <div className="contact-hero-animation" aria-hidden="true"><span /><span /><span /></div>
        <PageHeading
          eyebrow="Project enquiry"
          title="Tell Hassan what you need to design, draw or visualize."
          text="Share the project type, available information, expected output, budget and timeline."
        />
      </section>

      <section className="section shell contact-layout">
        <div className="contact-intro">
          <p className="eyebrow">Direct contact</p>
          <h2>Discuss a project or professional opportunity.</h2>
          <p>Use the form for a structured project enquiry. The selected reply method is included in the submitted message.</p>
          <div className="contact-details">
            <a href={emailComposeUrl} target="_blank" rel="noreferrer"><FaEnvelope /><span><small>Email</small>{profile.email}</span></a>
            <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer"><FaWhatsapp /><span><small>WhatsApp</small>{profile.phone}</span></a>
            <a href={`tel:${profile.secondaryPhone.replace(/\s/g, '')}`}><FaPhoneAlt /><span><small>Call</small>{profile.secondaryPhone}</span></a>
            <div><FaMapMarkerAlt /><span><small>Location</small>{profile.location}</span></div>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}

function Footer() {
  const links = [
    ['home', 'Home'], ['projects', 'Projects'], ['about', 'About'], ['services', 'Services'], ['contact', 'Contact'],
  ];
  const footerServices = services.slice(0, 5);
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand"><strong>{profile.name}</strong><span>{profile.role}</span><p>Architectural drafting, design coordination and visualization for residential, commercial and modular projects.</p></div>
        <div><h3>Navigate</h3>{links.map(([key, label]) => <a key={key} href={`#/${key}`}>{label}</a>)}</div>
        <div><h3>Services</h3>{footerServices.map((service) => <a key={service.title} href="#/services">{service.title}</a>)}</div>
        <div><h3>Contact</h3><a href={emailComposeUrl} target="_blank" rel="noreferrer">{profile.email}</a><a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a><span>{profile.location}</span></div>
        <div className="footer-profiles"><h3>Profiles</h3><div className="footer-socials"><a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a><a href={emailComposeUrl} target="_blank" rel="noreferrer" aria-label="Email"><FaEnvelope /></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a><a href={profile.fiverr} target="_blank" rel="noreferrer" aria-label="Fiverr"><SiFiverr /></a><a href={profile.pinterest} target="_blank" rel="noreferrer" aria-label="Pinterest"><FaPinterestP /></a></div></div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Hassan Nawaz. All rights reserved.</span><span>Architect Designer</span></div>
    </footer>
  );
}

function App() {
  const [route, setRoute] = useState(parseRoute);
  const [theme, setTheme] = useState(() => localStorage.getItem('hassan-theme') || 'light');

  useEffect(() => {
    const preloadSources = [
      stockVideos.house,
      sampleVideos.designToHouseClean,
      sampleVideos.homeBuildSequence,
      sampleVideos.projectsBuildSequence,
      sampleVideos.aboutBlueprintUnroll,
      sampleVideos.servicesOfficeConstruction,
      sampleVideos.homeVisualization,
    ];
    const warmCache = () => {
      const cache = preloadSources.map((src) => {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;
        video.src = src;
        video.load();
        return video;
      });
      window.__hassanVideoPreload = cache;
    };
    const id = 'requestIdleCallback' in window ? window.requestIdleCallback(warmCache, { timeout: 1200 }) : window.setTimeout(warmCache, 350);
    return () => {
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseRoute());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) window.location.hash = '#/home';
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('hassan-theme', theme);
  }, [theme]);

  let page;
  if (route.page === 'projects') page = <ProjectsPage />;
  else if (route.page === 'project') page = <ProjectPage id={route.id} />;
  else if (route.page === 'about') page = <AboutPage />;
  else if (route.page === 'services') page = <ServicesPage />;
  else if (route.page === 'contact') page = <ContactPage />;
  else page = <HomePage />;

  return (
    <div className="app-shell">
      <Header route={route} theme={theme} toggleTheme={() => setTheme((value) => (value === 'light' ? 'dark' : 'light'))} />
      <SocialRail />
      <main>{page}</main>
      <Footer />
    </div>
  );
}

export default App;