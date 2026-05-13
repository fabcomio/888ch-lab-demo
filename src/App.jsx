import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Car,
  CheckCircle2,
  Clock,
  Gauge,
  MapPin,
  Moon,
  Phone,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Sun,
  Target,
  Wrench,
  Zap,
} from 'lucide-react'

const phoneNumber = '+41 76 606 38 38'
const phoneHref = 'tel:+41766063838'

const serviceCards = [
  {
    title: 'Service & Wartung',
    text: 'Werterhalt nach Herstellervorgaben mit sauber dokumentierten Arbeiten, passenden Teilen und klarer Priorisierung.',
    icon: Wrench,
    image:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80',
    metric: 'Planbar',
  },
  {
    title: 'MFK-Vorbereitung',
    text: 'Sorgenfrei durch die amtliche Kontrolle: Wir prüfen Bremsen, Licht, Fahrwerk, Elektronik und relevante Mängel.',
    icon: ShieldCheck,
    image:
      'https://images.unsplash.com/photo-1632823471565-1ecdf5c81708?auto=format&fit=crop&w=1200&q=80',
    metric: 'Kontrollbereit',
  },
  {
    title: 'Diagnose-Technik',
    text: 'Modernste Fehleranalyse für alle Marken, von Steuergeräten über DSG-Mechatronik bis ABS und Airbag-Systeme.',
    icon: Gauge,
    image:
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
    metric: 'Präzise',
  },
  {
    title: 'Reifen-Service',
    text: 'Saisonale Wechsel inklusive Einlagerung, Zustandsprüfung und Beratung für Sicherheit bei jedem Wetter.',
    icon: Car,
    image:
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80',
    metric: 'Saisonal',
  },
]

const specials = [
  {
    title: 'Sommer: Klima-Check',
    text: 'Kühlleistung, Dichtheit und Innenraumfilter prüfen, bevor die Hitze im Aargau spürbar wird.',
    icon: Sun,
  },
  {
    title: 'Winter: Licht-Test',
    text: 'Scheinwerfer, Batterie, Reifenprofil und Sichtsysteme fit machen für dunkle Pendlerstrecken.',
    icon: Snowflake,
  },
  {
    title: 'Performance-Optimierung',
    text: 'Fein abgestimmte Diagnose und Beratung für saubere Leistungsentfaltung ohne unnötiges Risiko.',
    icon: Zap,
  },
]

const trustItems = [
  {
    title: 'Transparente Preise',
    text: 'Klare Einschätzung vor der Reparatur, nachvollziehbare Offerten und keine Überraschungen bei der Abholung.',
    icon: BadgeCheck,
  },
  {
    title: 'Meisterhafte Qualität',
    text: 'Elektronik-Kompetenz seit 1998, kombiniert mit moderner Diagnose und sauberer Werkstattpraxis.',
    icon: Target,
  },
  {
    title: 'Lokale Expertise',
    text: 'Direkt in Oberentfelden, nah bei Aarau und verankert in den Anforderungen Schweizer Fahrzeughalter.',
    icon: MapPin,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <Reveal className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#2dd4ff]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-normal text-white md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-zinc-300 md:text-lg">{text}</p>
    </Reveal>
  )
}

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'

    return (
      window.localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    )
  })

  const isLight = theme === 'light'

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <main className={`theme-shell min-h-screen bg-[#0b0b0d] text-zinc-100 ${isLight ? 'light-mode' : ''}`}>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="888CH-LAB Startseite">
            <span className="grid h-11 w-11 place-items-center rounded border border-[#2dd4ff]/50 bg-white/5 text-sm font-black text-white shadow-[0_0_30px_rgba(45,212,255,0.18)]">
              888
            </span>
            <span>
              <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-white">
                888CH-LAB
              </span>
              <span className="block text-xs text-zinc-400">Garage Oberentfelden</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">
            <a className="transition hover:text-white" href="#diagnose">
              Services
            </a>
            <a className="transition hover:text-white" href="#specials">
              Specials
            </a>
            <a className="transition hover:text-white" href="#standort">
              Standort
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTheme(isLight ? 'dark' : 'light')}
              className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/15 bg-white/8 text-white backdrop-blur transition hover:bg-white/14 focus:outline-none focus:ring-2 focus:ring-[#2dd4ff]"
              aria-label={isLight ? 'Dunkelmodus aktivieren' : 'Hellmodus aktivieren'}
              title={isLight ? 'Dunkelmodus aktivieren' : 'Hellmodus aktivieren'}
            >
              {isLight ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 rounded bg-[#e11d2e] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(225,29,46,0.28)] transition hover:bg-[#f43f5e] focus:outline-none focus:ring-2 focus:ring-[#2dd4ff]"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Direkt-Anruf</span>
              <span className="sm:hidden">Anruf</span>
            </a>
          </div>
        </nav>
      </header>

      <section id="top" className="relative isolate overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=2200&q=85"
          alt="Saubere, hochwertige Werkstatt mit Fahrzeug auf der Hebebuehne"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,11,13,0.98)_0%,rgba(11,11,13,0.82)_42%,rgba(11,11,13,0.38)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#0b0b0d] to-transparent" />

        <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded border border-white/15 bg-white/8 px-4 py-2 text-sm text-zinc-200 backdrop-blur">
              <Sparkles className="h-4 w-4 text-[#2dd4ff]" />
              Autoelektronik, Diagnose und Performance im Aargau
            </div>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-normal text-white md:text-7xl">
              Präzision auf Schweizer Niveau – 888CH-LAB
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200 md:text-xl">
              Ihre Experten für Diagnose, Service und Performance-Optimierung. Von
              Steuergeräten über MFK-Vorbereitung bis zur saisonalen Wartung: klar,
              schnell und professionell.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#standort"
                className="inline-flex items-center justify-center gap-3 rounded bg-[#e11d2e] px-6 py-4 font-semibold text-white shadow-[0_18px_45px_rgba(225,29,46,0.32)] transition hover:bg-[#f43f5e] focus:outline-none focus:ring-2 focus:ring-[#2dd4ff]"
              >
                Jetzt Termin anfragen
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded border border-white/15 bg-white/8 px-6 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/14"
              >
                <Phone className="h-5 w-5 text-[#2dd4ff]" />
                {phoneNumber}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 42 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="hidden md:block"
          >
            <div className="ml-auto max-w-md border border-white/12 bg-[#1a1a1a]/72 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-[#2dd4ff]">
                    Diagnose-Zentrale
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">Live Check-in</p>
                </div>
                <CalendarCheck className="h-10 w-10 text-[#e11d2e]" />
              </div>
              <div className="space-y-4 pt-5">
                {['Fehleranalyse', 'Offerte', 'Reparaturfreigabe'].map((item, index) => (
                  <div key={item} className="flex items-center gap-4">
                    <span className="grid h-9 w-9 place-items-center rounded bg-white/8 text-sm font-semibold text-[#2dd4ff]">
                      0{index + 1}
                    </span>
                    <span className="text-zinc-200">{item}</span>
                    <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-400" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="diagnose" className="bg-[#0b0b0d] px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Die Diagnose-Zentrale"
          title="Vier Einstiege, ein klares Ziel: Ihr Fahrzeug kommt zuverlässig weiter."
          text="Die Service-Struktur ist bewusst einfach gehalten: Kunden erkennen sofort den passenden Bedarf, während das Team gezielt Zusatzpotenzial entdeckt."
        />

        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {serviceCards.map((service, index) => {
            const Icon = service.icon
            return (
              <Reveal key={service.title} delay={index * 0.07}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="group h-full overflow-hidden rounded border border-white/10 bg-[#1a1a1a] shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={`${service.title} bei 888CH-LAB`}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded bg-[#e11d2e] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                      {service.metric}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="mb-5 grid h-12 w-12 place-items-center rounded bg-[#2dd4ff]/10 text-[#2dd4ff]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 leading-7 text-zinc-300">{service.text}</p>
                  </div>
                </motion.article>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section id="specials" className="overflow-hidden bg-[#141416] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#2dd4ff]">
              Portfolio-Boost
            </p>
            <h2 className="text-3xl font-semibold tracking-normal text-white md:text-5xl">
              Saisonale Specials, die monatlich neue Werkstatttermine auslösen.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              Statt nur auf akute Defekte zu warten, holt 888CH-LAB Kunden mit
              relevanten Checks genau dann ab, wenn Bedarf und Zahlungsbereitschaft
              am höchsten sind.
            </p>
            <a
              href="#standort"
              className="mt-8 inline-flex items-center gap-3 rounded border border-[#2dd4ff]/45 bg-[#2dd4ff]/10 px-5 py-4 font-semibold text-white transition hover:bg-[#2dd4ff]/18"
            >
              Saison-Termin sichern
              <ArrowRight className="h-5 w-5" />
            </a>
          </Reveal>

          <div className="grid gap-5">
            {specials.map((special, index) => {
              const Icon = special.icon
              return (
                <Reveal key={special.title} delay={index * 0.08}>
                  <div className="flex gap-5 rounded border border-white/10 bg-white/[0.04] p-5">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded bg-[#e11d2e]/14 text-[#e11d2e]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{special.title}</h3>
                      <p className="mt-2 leading-7 text-zinc-300">{special.text}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0b0b0d] px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Vertrauens-Check"
          title="Argumente, die vor dem ersten Anruf Vertrauen schaffen."
          text="Die wichtigsten Kaufbarrieren werden direkt beantwortet: Preis, Qualität und Nähe."
        />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {trustItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={index * 0.08}>
                <div className="h-full rounded border border-white/10 bg-[#1a1a1a] p-7">
                  <div className="mb-6 grid h-14 w-14 place-items-center rounded bg-white/8 text-[#2dd4ff]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-300">{item.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section id="standort" className="bg-[#141416] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="min-h-[420px] overflow-hidden rounded border border-white/10 bg-[#1a1a1a]">
            <div className="grid h-full min-h-[420px] place-items-center bg-[linear-gradient(135deg,rgba(45,212,255,0.16),rgba(225,29,46,0.14)),url('https://images.unsplash.com/photo-1549927681-0b673b8243ab?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center p-8 text-center">
              <div className="max-w-md rounded border border-white/15 bg-[#0b0b0d]/82 p-7 backdrop-blur">
                <MapPin className="mx-auto h-10 w-10 text-[#2dd4ff]" />
                <h2 className="mt-4 text-3xl font-semibold text-white">Google Maps Platzhalter</h2>
                <p className="mt-3 leading-7 text-zinc-300">
                  Suhrerstrasse 24, 5036 Oberentfelden, Aargau
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="rounded border border-white/10 bg-[#1a1a1a] p-7 md:p-9">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#2dd4ff]">
              Kontakt & Standort
            </p>
            <h2 className="text-3xl font-semibold tracking-normal text-white md:text-5xl">
              Termin anfragen, Fehler schildern, klare nächste Schritte erhalten.
            </h2>

            <div className="mt-8 space-y-5">
              <div className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 text-[#e11d2e]" />
                <div>
                  <p className="font-semibold text-white">{phoneNumber}</p>
                  <p className="text-sm text-zinc-400">Wenn nicht erreichbar, bitte WhatsApp senden.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 text-[#e11d2e]" />
                <div>
                  <p className="font-semibold text-white">Suhrerstrasse 24</p>
                  <p className="text-sm text-zinc-400">5036 Oberentfelden, Kanton Aargau</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="mt-1 h-5 w-5 text-[#e11d2e]" />
                <div>
                  <p className="font-semibold text-white">Montag bis Freitag, 10:00 bis 17:00</p>
                  <p className="text-sm text-zinc-400">Weitere Zeiten nach Terminabsprache.</p>
                </div>
              </div>
            </div>

            <a
              href={phoneHref}
              className="mt-9 inline-flex w-full items-center justify-center gap-3 rounded bg-[#e11d2e] px-6 py-4 font-semibold text-white shadow-[0_18px_45px_rgba(225,29,46,0.3)] transition hover:bg-[#f43f5e] focus:outline-none focus:ring-2 focus:ring-[#2dd4ff] sm:w-auto"
            >
              <Phone className="h-5 w-5" />
              Jetzt direkt anrufen
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

export default App
