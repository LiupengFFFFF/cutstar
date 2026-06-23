"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

type Path = "artist" | "agency" | null;

const steps = [
  {
    title: "Upload",
    copy: "Drop in your songs and any footage you want included.",
    meta: "01",
  },
  {
    title: "We handle the rest",
    copy: "Our engine syncs every cut to the beat, pulls in outside clips where needed, and builds out a full batch across multiple styles.",
    meta: "02",
  },
  {
    title: "Post",
    copy: "Receive ready-to-post content and start flooding the For You Page.",
    meta: "03",
  },
];

const clipCards = [
  "Beat lock",
  "Angle switch",
  "Zoom pull",
  "Hook hold",
  "Caption hit",
  "Style pass",
];

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      },
      { threshold: 0.22 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function Wordmark() {
  return (
    <div className="wordmark" aria-label="CUTSTAR">
      {"CUTSTAR".split("").map((letter, index) => (
        <span key={letter + index}>{letter}</span>
      ))}
    </div>
  );
}

function FileDrop({
  label,
  hint,
  multiple,
}: {
  label: string;
  hint: string;
  multiple?: boolean;
}) {
  const [files, setFiles] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files
      ? Array.from(event.target.files).map((file) => file.name)
      : [];
    setFiles(selected.slice(0, multiple ? 2 : 1));
  };

  return (
    <label className="dropzone">
      <input type="file" multiple={multiple} onChange={handleChange} />
      <span className="dropzone__icon">+</span>
      <span className="dropzone__label">{label}</span>
      <span className="dropzone__hint">
        {files.length > 0 ? files.join(", ") : hint}
      </span>
    </label>
  );
}

export default function Home() {
  const [selectedPath, setSelectedPath] = useState<Path>(null);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLElement | null>(null);

  const selectPath = (path: Exclude<Path, null>) => {
    setSelectedPath(path);
    setSubmitted(false);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <section className="section hero-section">
        <div className="grain" aria-hidden="true" />
        <Wordmark />
        <img
          className="hero-star"
          src="cutstar-star.jpeg"
          alt=""
          width={1254}
          height={1254}
        />
        <Reveal className="hero-copy">
          <h1>Months of content. Delivered within a day.</h1>
          <p className="subheadline">
            The internet never stops. Neither should your content.
          </p>
          <p className="body-copy">
            Send us your songs and footage. Our AI delivers a full batch of
            beat-synced, viral-optimized edits across multiple styles, ready to
            post. No briefs. No back and forth. No waiting on editors.
          </p>
          <p className="credibility">
            The first AI music edit engine trained on the editing patterns behind
            thousands of viral TikToks. It does more than sync to the beat. It
            knows when to cut, zoom, hold a shot, switch angles, and create the
            moments that keep people watching.
          </p>
        </Reveal>
      </section>

      <section className="section work-section">
        <Reveal className="section-heading">
          <p className="section-index">How it works</p>
          <h2>Send the raw material. Get the month back.</h2>
        </Reveal>
        <div className="work-layout">
          <div className="video-stack" aria-label="Video edit placeholders">
            {clipCards.map((clip, index) => (
              <Reveal className={`video-card video-card--${index + 1}`} key={clip}>
                <div className="video-card__top">
                  <span />
                  <span />
                </div>
                <div className="video-card__frame">
                  <div className="play-mark" />
                  <div className="timeline">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <p>{clip}</p>
              </Reveal>
            ))}
          </div>
          <div className="steps">
            {steps.map((step) => (
              <Reveal className="step" key={step.title}>
                <span>{step.meta}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section path-section">
        <Reveal className="section-heading path-heading">
          <p className="section-index">Choose your path</p>
          <h2>One engine. Two ways in.</h2>
        </Reveal>
        <div className="path-grid">
          <Reveal className="path-card">
            <h3>I&apos;m an artist or creator</h3>
            <p>Claim your free edit + get notified when unlimited drops.</p>
            <button type="button" onClick={() => selectPath("artist")}>
              Get My Free Edit
            </button>
          </Reveal>
          <Reveal className="path-card path-card--agency">
            <h3>I represent a label, agency, or management</h3>
            <p>See what we can do for your roster.</p>
            <button type="button" onClick={() => selectPath("agency")}>
              Apply for a Demo
            </button>
          </Reveal>
        </div>
      </section>

      <section className="section form-section" ref={formRef}>
        <Reveal className="form-shell">
          <button
            className="back-button"
            type="button"
            aria-label="Back to path selection"
            onClick={() => {
              setSelectedPath(null);
              setSubmitted(false);
            }}
          >
            ×
          </button>

          {!selectedPath ? (
            <div className="form-empty">
              <p className="section-index">Private access</p>
              <h2>Pick a path above to open the right application.</h2>
              <p>
                We keep the intake short because the point is speed. The engine
                does the heavy lift after you send the essentials.
              </p>
            </div>
          ) : submitted ? (
            <div className="success-state">
              <span>Received</span>
              <h2>We&apos;ll review it and follow up with private access.</h2>
              <p>
                Selected applicants receive a private access code. Keep your best
                footage nearby.
              </p>
            </div>
          ) : selectedPath === "artist" ? (
            <form onSubmit={handleSubmit} className="access-form">
              <div className="form-heading">
                <p className="section-index">Artist access</p>
                <h2>Get your first edit in motion.</h2>
              </div>
              <div className="field-grid">
                <label>
                  <span>Name</span>
                  <input required name="name" autoComplete="name" />
                </label>
                <label>
                  <span>Email</span>
                  <input required name="email" type="email" autoComplete="email" />
                </label>
                <label className="full">
                  <span>Artist/Project Name</span>
                  <input required name="project" />
                </label>
              </div>
              <div className="upload-grid">
                <FileDrop label="Upload song" hint="WAV, MP3, or AIFF" />
                <FileDrop
                  label="Upload footage"
                  hint="Up to 2 clips"
                  multiple
                />
              </div>
              <button className="submit-button" type="submit">
                Send It
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="access-form">
              <div className="form-heading">
                <p className="section-index">Roster access</p>
                <h2>Show us the team behind the catalog.</h2>
              </div>
              <div className="field-grid">
                <label>
                  <span>Name</span>
                  <input required name="name" autoComplete="name" />
                </label>
                <label>
                  <span>Email</span>
                  <input required name="email" type="email" autoComplete="email" />
                </label>
                <label>
                  <span>Company Name</span>
                  <input required name="company" />
                </label>
                <label>
                  <span>Company Type</span>
                  <select required name="companyType" defaultValue="">
                    <option value="" disabled>
                      Select one
                    </option>
                    <option>Label</option>
                    <option>Agency</option>
                    <option>Management</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>
              <button className="submit-button" type="submit">
                Request Access
              </button>
            </form>
          )}

          <p className="review-note">
            We review every application. Selected applicants receive a private
            access code.
          </p>
        </Reveal>
      </section>
    </main>
  );
}
