"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Menu, Play, Search, Wind, X } from "lucide-react";
import Chat from "@/components/Chat";
import { heroImage, packages, media, sourceUrl } from "@/lib/knowledge";

const aircraftImage = "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80";

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
            <a href="#journey">ADVENTURES</a>
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
                <a href="#journey" onClick={() => setMenuOpen(false)}>
                  GO A LITTLE FURTHER
                </a>
                <a href="#packages" onClick={() => setMenuOpen(false)}>
                  BOOK A TANDEM
                </a>
                <a href="/knowledge" onClick={() => setMenuOpen(false)}>
                  KNOWLEDGE BASE
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

        <section id="packages" className="section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">ONE JUMP. THREE WAYS TO CAPTURE IT.</p>
              <h2>Find your perfect package.</h2>
            </div>
            <p>
              Every package offers the same jump altitude,
              <br />
              aircraft and certified instructors.
            </p>
          </div>
          <div className="packages">
            {packages.map((p, i) => (
              <article className={`package ${i === 1 ? "featured" : ""}`} key={p.name}>
                <div className="package-top">
                  <span>
                    0{i + 1} / {p.name}
                  </span>
                  {i === 1 && <span className="tag">WITH VIDEO &amp; PHOTOS</span>}
                </div>
                <h3>{p.subtitle}</h3>
                <p>{p.detail}</p>
                <div className="price">
                  ฿{p.price}
                  <span> / person</span>
                </div>
                <ul>
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check size={16} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  className={`button ${i === 1 ? "lime" : "outline"}`}
                  href={`https://www.greedyadventures.com/experiences/sea-view-skydiving#packages`}
                >
                  Explore {p.name} <ArrowUpRight size={17} />
                </a>
              </article>
            ))}
          </div>
          <p className="caption">
            Prices from the public experience page, captured 30 October 2026. Confirm current prices and
            availability with the team. Prototype only; no bookings are taken here.
          </p>
        </section>

        <section id="film" className="section film">
          <p className="eyebrow">PATTAYA DROPZONE</p>
          <h2>See the jump for yourself.</h2>
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

        <section id="journey" className="journey section">
          <div>
            <p className="eyebrow">FROM THE GROUND TO THE EXTRAORDINARY</p>
            <h2>
              From check-in
              <br />
              to touchdown.
            </h2>
            <p>
              Meet your instructor, take in the coastline and experience the Gulf of Thailand from a whole new perspective.
            </p>
            <a href={sourceUrl} target="_blank" rel="noreferrer">
              View Full Experience Details <ArrowUpRight size={17} />
            </a>
          </div>
          <ol>
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
