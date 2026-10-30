"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, Play, Search, Wind, X } from "lucide-react";
import Chat from "@/components/Chat";
import { heroImage, packages, media, sourceUrl } from "@/lib/knowledge";

const aircraftImage = "https://pub-89f493a2b50b4e43b99552a737bef138.r2.dev/offerings/apex-gallery/plane.webp";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <a href="#packages">ESCAPES</a>
            <a href="#the-plan">ADVENTURES</a>
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
          <a className="nav-contact" href="https://www.greedyadventures.com/contact">
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
                <a href="#the-plan" onClick={() => setMenuOpen(false)}>
                  GO A LITTLE FURTHER
                </a>
                <a href="#packages" onClick={() => setMenuOpen(false)}>
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
                  href="#packages"
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
              <a className="button lime" href="#packages">
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

        <div id="details" className="facts">
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

        {/* Sticky Experience Sub-Nav (Matches original greedyadventures.com) */}
        <nav className="experience-subnav" aria-label="Experience sub-navigation">
          <div className="experience-subnav-inner">
            <div className="subnav-tabs">
              <a href="#packages" className="subnav-tab active">
                PACKAGES
              </a>
              <a href="#the-plan" className="subnav-tab">
                THE PLAN
              </a>
              <a href="#details" className="subnav-tab">
                DETAILS
              </a>
              <a href="#good-to-know" className="subnav-tab">
                GOOD TO KNOW
              </a>
            </div>
            <a href="#packages" className="subnav-cta">
              CHOOSE PACKAGE
            </a>
          </div>
        </nav>

        {/* Packages Section: CHOOSE YOUR PACKAGE (Matches exact Greedy Adventures design) */}
        <section id="packages" className="packages-section">
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
                      href="https://www.greedyadventures.com/experiences/sea-view-skydiving#packages"
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

        {/* THE PLAN Section (Matches original website) */}
        <section id="the-plan" className="plan-section">
          <div className="plan-container">
            <h2 className="plan-heading">THE PLAN</h2>
            <div className="journey-grid">
              <div>
                <p className="eyebrow">FROM THE GROUND TO THE EXTRAORDINARY</p>
                <h3 className="journey-subheading">
                  From check-in
                  <br />
                  to touchdown.
                </h3>
                <p className="journey-desc">
                  Meet your instructor, take in the coastline and experience the Gulf of Thailand from a whole new perspective.
                </p>
                <a href={sourceUrl} target="_blank" rel="noreferrer" className="journey-link">
                  View Full Experience Details <ArrowUpRight size={17} />
                </a>
              </div>
              <ol className="journey-steps">
                {[
                  "Check in with your photo ID",
                  "Meet your instructor & gear up",
                  "Take flight over the coastline",
                  "Jump, freefall & fly under canopy",
                  "Land with a story to tell",
                ].map((s, i) => (
                  <li key={s}>
                    <span>0{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Video Film Section */}
        <section id="film" className="section film">
          <div id="good-to-know">
            <p className="eyebrow">PATTAYA DROPZONE</p>
            <h2>See the jump for yourself.</h2>
          </div>
          <video
            controls
            playsInline
            preload="none"
            poster={heroImage}
            aria-label="Sea View Skydiving experience video"
          >
            <source src={media[1].url} type="video/mp4" />
            Your browser does not support inline video.
          </video>
          <p className="caption">
            Footage from Greedy Adventures.{" "}
            <a href={media[1].url} target="_blank" rel="noreferrer">
              Open the video directly
            </a>
          </p>
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
