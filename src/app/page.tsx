"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, ChevronDown, Menu, Play, Search, Wind, X } from "lucide-react";
import Chat from "@/components/Chat";
import {
  heroImage,
  packages,
  planSteps,
  experienceDetails,
  faqs,
  media,
} from "@/lib/knowledge";

const aircraftImage = "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/plane.webp";

const galleryImages = [
  "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/gearing-up.webp",
  "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/jump-after-exit.webp",
  "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/tandem-with-sea-view.webp",
  "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/instrcutor-with-customer.webp",
  "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/plane.webp",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<string>("options");

  useEffect(() => {
    const sectionIds = ["options", "the-day", "details", "faqs"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      {/* Header / Nav matching Greedy Adventures */}
      <header className="site-header">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="/">
            GREEDY<span>ADVENTURES</span>
          </a>
          <div className="nav-center">
            <Search size={16} aria-hidden="true" />
            <a href="#options">ESCAPES</a>
            <a href="#the-day">ADVENTURES</a>
            <a href="/knowledge">ABOUT</a>
            <button
              className="nav-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              type="button"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
          <a className="nav-contact" href="https://www.greedyadventures.com/contact" target="_blank" rel="noreferrer">
            CONTACT
          </a>
        </nav>

        {/* Dropdown mega menu (shown when menu icon is clicked) */}
        {menuOpen && (
          <div className="nav-mega-menu" role="dialog" aria-label="Navigation menu">
            <button
              className="nav-mega-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              type="button"
            >
              <X size={24} />
            </button>
            <div className="nav-mega-content">
              <div className="nav-mega-links">
                <a href="#the-day" onClick={() => setMenuOpen(false)}>
                  GO A LITTLE FURTHER
                </a>
                <a href="#options" onClick={() => setMenuOpen(false)}>
                  BOOK A TANDEM
                </a>
                <a
                  href="https://www.greedyadventures.com/contact"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  CONTACT
                </a>
                <a href="/" onClick={() => setMenuOpen(false)}>
                  HOME
                </a>
              </div>

              <div className="nav-mega-cards">
                <a
                  href="#options"
                  className="nav-mega-card"
                  style={{ backgroundImage: `url('${heroImage}')` }}
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="nav-mega-card-overlay" />
                  <span>BOOK A TANDEM</span>
                </a>
                <a
                  href="/knowledge"
                  className="nav-mega-card"
                  style={{ backgroundImage: `url('${aircraftImage}')` }}
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="nav-mega-card-overlay" />
                  <span>GUIDES AND STORIES</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Header title block from experience page */}
      <div className="experience-header">
        <p className="eyebrow">PATTAYA DROPZONE</p>
        <h1>SEA VIEW SKYDIVING – TANDEM JUMP OVER PATTAYA</h1>
      </div>

      <main id="main">
        {/* Hero section with ambient background video */}
        <section
          className="hero"
          style={{ backgroundImage: `url('${heroImage}')` }}
          aria-label="Sea View Skydiving experience"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={heroImage}
            className="hero-video"
            aria-hidden="true"
          >
            <source src={media[1].url} type="video/mp4" />
          </video>
          <div className="hero-video-overlay" aria-hidden="true" />

          <div className="hero-inner">
            <p className="hero-copy">
              One leap. An endless coastline.
              <br />
              Your first jump, with an expert by your side.
            </p>
            <div className="hero-actions">
              <a className="button lime" href="#options">
                Compare Packages <ArrowDown size={17} />
              </a>
              <a className="watch" href="#film">
                <span>
                  <Play size={15} />
                </span>{" "}
                Watch the Jump
              </a>
            </div>
            <div className="hero-bottom">
              <span>
                <Wind size={17} /> THE GULF OF THAILAND, FROM ABOVE
              </span>
              <span>01 / SEA VIEW</span>
            </div>
          </div>
        </section>

        {/* Fact bar */}
        <div className="facts">
          <div>
            <strong>
              13,000 <small>ft</small>
            </strong>
            <span>Jump altitude</span>
          </div>
          <div>
            <strong>
              60 <small>seconds</small>
            </strong>
            <span>Approximate freefall</span>
          </div>
          <div>
            <strong>
              3 <small>hours</small>
            </strong>
            <span>Time at the dropzone</span>
          </div>
          <p>
            No experience needed.
            <br />
            Just a little courage.
          </p>
        </div>

        {/* Sticky Experience Sub-Nav (Matches original greedyadventures.com with scroll-spy active indicator) */}
        <nav className="experience-subnav" aria-label="Experience sub-navigation">
          <div className="experience-subnav-inner">
            <div className="subnav-tabs">
              <a
                href="#options"
                className={`subnav-tab ${activeTab === "options" ? "active" : ""}`}
              >
                PACKAGES
              </a>
              <a
                href="#the-day"
                className={`subnav-tab ${activeTab === "the-day" ? "active" : ""}`}
              >
                THE PLAN
              </a>
              <a
                href="#details"
                className={`subnav-tab ${activeTab === "details" ? "active" : ""}`}
              >
                DETAILS
              </a>
              <a
                href="#faqs"
                className={`subnav-tab ${activeTab === "faqs" ? "active" : ""}`}
              >
                GOOD TO KNOW
              </a>
            </div>
            <a href="#options" className="subnav-cta">
              CHOOSE PACKAGE
            </a>
          </div>
        </nav>

        {/* 1. PACKAGES SECTION (#options & #packages) */}
        <section id="options" className="packages-section scroll-target">
          <div id="packages" />
          <div className="packages-container">
            <h2 className="packages-heading">CHOOSE YOUR PACKAGE</h2>
            <div className="packages-cards-grid">
              {packages.map((p) => (
                <article className="package-card" key={p.name}>
                  <div className="package-card-media">
                    <img
                      src={p.image}
                      alt={`${p.name} - ${p.subtitle}`}
                      className="package-card-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="package-card-body">
                    <h3 className="package-card-title">{p.name}</h3>
                    <p className="package-card-subtitle">{p.subtitle}</p>
                    <ul className="package-card-bullets">
                      {p.features.map((f) => (
                        <li key={f}>
                          <span className="plus">+</span> {f}
                        </li>
                      ))}
                    </ul>
                    <div className="package-card-pricing">
                      <span className="price-amount">
                        <span className="currency-symbol">฿</span>
                        {p.price}
                      </span>
                      <span className="price-per">per person</span>
                    </div>
                    <a
                      className="package-card-button"
                      href="https://www.greedyadventures.com/experiences/sea-view-skydiving#options"
                      target="_blank"
                      rel="noreferrer"
                    >
                      CHECK AVAILABILITY
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="caption">
              Prices from the public experience page, captured 30 October 2026. Confirm current prices and
              availability with the team. Prototype only; no bookings are taken here.
            </p>
          </div>
        </section>

        {/* 2. THE PLAN SECTION (#the-day & #the-plan) */}
        <section id="the-day" className="the-plan-section scroll-target">
          <div id="the-plan" />
          <div className="section-container">
            <h2 className="section-main-heading">THE PLAN</h2>
            <ol className="plan-steps-list">
              {planSteps.map((step, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <li className={`plan-step-item ${isEven ? "reverse" : ""}`} key={step.step}>
                    <div className="plan-step-media">
                      <img
                        src={step.image}
                        alt={`Step ${step.step}: ${step.title}`}
                        className="plan-step-img"
                        loading="lazy"
                      />
                    </div>
                    <div className="plan-step-content">
                      <p className="plan-step-number">STEP {step.step}</p>
                      <h3 className="plan-step-title">{step.title}</h3>
                      <p className="plan-step-desc">{step.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Stat bar below The Plan matching live site */}
            <div className="dropzone-stat-bar">
              <div>
                <span>AT THE DROPZONE:</span> <strong>3H</strong>
              </div>
              <span className="divider">·</span>
              <div>
                <span>EXIT ALTITUDE:</span> <strong>13,000 FT</strong>
              </div>
              <span className="divider">·</span>
              <div>
                <span>FREEFALL:</span> <strong>60 SECONDS</strong>
              </div>
            </div>
          </div>
        </section>

        {/* 3. THE DETAILS SECTION (#details) */}
        <section id="details" className="details-section scroll-target">
          <div className="section-container">
            <h2 className="section-main-heading">THE DETAILS</h2>
            <p className="section-sub-copy">
              Everything that comes with this experience, and what to plan for yourself.
            </p>

            <div className="details-grid">
              {/* Highlights */}
              <div className="details-card">
                <h3 className="details-card-title">HIGHLIGHTS</h3>
                <ul className="details-list dot-list">
                  {experienceDetails.highlights.map((h) => (
                    <li key={h}>
                      <span className="bullet-dot">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What's Included */}
              <div className="details-card">
                <h3 className="details-card-title">WHAT'S INCLUDED</h3>
                <ul className="details-list plus-list">
                  {experienceDetails.included.map((inc) => (
                    <li key={inc}>
                      <span className="bullet-plus">+</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Experience Overview */}
              <div className="details-card">
                <h3 className="details-card-title">SEA VIEW TANDEM SKYDIVE - PATTAYA</h3>
                <p className="details-overview-text">{experienceDetails.description}</p>
              </div>

              {/* Where you jump */}
              <div className="details-card">
                <h3 className="details-card-title">WHERE YOU JUMP</h3>
                <p className="details-location-name">{experienceDetails.location.name}</p>
                <p className="details-location-addr">{experienceDetails.location.address}</p>
              </div>

              {/* Operated by */}
              <div className="details-card">
                <h3 className="details-card-title">OPERATED BY</h3>
                <p className="details-operator">{experienceDetails.location.operator}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. GOOD TO KNOW SECTION (#faqs & #good-to-know) */}
        <section id="faqs" className="faqs-section scroll-target">
          <div id="good-to-know" />
          <div className="section-container">
            <h2 className="section-main-heading">GOOD TO KNOW</h2>
            <div className="faqs-accordion">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div className="faq-item" key={faq.question}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span className={`faq-icon ${isOpen ? "open" : ""}`}>
                        <ChevronDown size={18} />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. CUSTOMER MOMENTS GALLERY ("See it. Feel it.") */}
        <section className="customer-clips-section">
          <div className="section-container">
            <p className="eyebrow">A GLIMPSE OF THE JUMP</p>
            <h2 className="section-main-heading">SEE IT. FEEL IT.</h2>
            <p className="section-sub-copy">A few moments from our customers' jumps in Thailand.</p>
            <div className="customer-gallery-reel">
              {galleryImages.map((imgUrl, i) => (
                <div className="gallery-slide" key={imgUrl}>
                  <img
                    src={imgUrl}
                    alt={`Customer skydiving moment ${i + 1}`}
                    className="gallery-slide-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. VIDEO FILM SECTION (#film) */}
        <section id="film" className="film-section scroll-target">
          <div className="section-container">
            <p className="eyebrow">PATTAYA DROPZONE</p>
            <h2 className="section-main-heading">SEE THE JUMP FOR YOURSELF</h2>
            <div className="film-player-wrapper">
              <video
                controls
                playsInline
                preload="none"
                poster={heroImage}
                aria-label="Sea View Skydiving experience video"
                className="film-video"
              >
                <source src={media[1].url} type="video/mp4" />
                Your browser does not support inline video.
              </video>
            </div>
            <p className="caption">
              Footage from Greedy Adventures.{" "}
              <a href={media[1].url} target="_blank" rel="noreferrer">
                Open the video directly
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand" href="/">
          GREEDY<span>ADVENTURES</span>
        </a>
        <p>A prototype for a life less ordinary.</p>
        <a href="/knowledge">
          Knowledge Base <ArrowUpRight size={15} />
        </a>
      </footer>

      <Chat />
    </>
  );
}
