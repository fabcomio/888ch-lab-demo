import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarClock,
  Car,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Cpu,
  FileCheck2,
  Gauge,
  Inbox,
  MapPin,
  MessageCircle,
  Moon,
  Phone,
  PlayCircle,
  Route,
  SearchCheck,
  Send,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  Sun,
  Target,
  Timer,
  UserCheck,
  Wrench,
  Zap,
} from 'lucide-react'

const phoneNumber = '+41 76 606 38 38'
const phoneHref = 'tel:+41766063838'
const whatsappHref =
  'https://wa.me/41766063838?text=Guten%20Tag%20888CH-LAB%2C%20ich%20moechte%20ein%20Fahrzeugproblem%20abklaeren%20lassen.'
const routeHref =
  'https://www.google.com/maps/search/?api=1&query=Suhrerstrasse%2024%2C%205036%20Oberentfelden'

const proofStats = [
  { value: '1998', label: 'Elektronik-Erfahrung' },
  { value: '24h', label: 'Antwortziel per WhatsApp' },
  { value: 'Aarau', label: 'Region' },
  { value: 'MFK', label: 'kontrollbereit' },
]

const intakeDefaults = {
  brand: 'BMW',
  model: '320d',
  year: '2017',
  mileage: '145000',
  issue: 'Motorkontrolllampe leuchtet',
  urgency: 'Diese Woche',
}

const urgencyOptions = ['Heute', 'Diese Woche', 'MFK in 14 Tagen', 'Planbar']

const intakeBenefits = [
  'Fahrzeugdaten vor dem ersten Telefonat',
  'Foto oder Video kann direkt nachgereicht werden',
  'Dringlichkeit ist sofort sichtbar',
  'Werkstatt kann Diagnosezeit besser planen',
]

const appointmentSlots = [
  { time: 'Heute 16:30', type: 'Kurzcheck', note: 'ideal bei Warnlampe' },
  { time: 'Morgen 10:15', type: 'Diagnose', note: '60 Min. reservieren' },
  { time: 'Freitag 14:00', type: 'MFK-Check', note: 'Kontrollpunkte pruefen' },
]

const prepChecklist = [
  'Fahrzeugausweis bereithalten',
  'Foto der Warnlampe senden',
  'Kilometerstand notieren',
  'Symptom kurz beschreiben',
]

const quickReplies = [
  'Danke fuer die Daten. Bitte senden Sie noch ein Foto der Warnlampe und den Kilometerstand.',
  'Wir empfehlen zuerst eine Diagnose. Ein passender Slot waere morgen um 10:15 Uhr.',
  'Fuer die MFK-Vorbereitung bitte Fahrzeugausweis und letzten Pruefbericht mitbringen.',
]

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

const specialistItems = [
  {
    title: 'Steuergeräte & Codierung',
    text: 'Saubere Prüfung, Reparaturabklärung und Codierung für komplexe Elektronikthemen.',
    icon: Cpu,
  },
  {
    title: 'DSG, ABS & Airbag',
    text: 'Systematische Fehleranalyse bei sicherheits- und fahrrelevanten Steuerungssystemen.',
    icon: SearchCheck,
  },
  {
    title: 'MFK-relevante Mängel',
    text: 'Gezielte Vorbereitung mit Fokus auf Licht, Bremsen, Fahrwerk, Elektronik und Abgaswerte.',
    icon: FileCheck2,
  },
]

const workshopCases = [
  {
    title: 'Elektronikfehler sauber eingegrenzt',
    problem: 'Warnlampen im Kombiinstrument und sporadische Kommunikationsfehler.',
    result: 'Ursache dokumentiert, Reparaturweg erklärt und unnötigen Teiletausch vermieden.',
    image:
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'MFK-Vorbereitung ohne Hektik',
    problem: 'Unsichere Ausgangslage vor der amtlichen Kontrolle.',
    result: 'Prüfpunkte priorisiert, Mängel transparent besprochen und Fahrzeug kontrollbereit gemacht.',
    image:
      'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Klima- und Komfortsystem geprüft',
    problem: 'Schwache Kühlleistung und unangenehme Gerüche im Innenraum.',
    result: 'Klimasystem geprüft, Filterzustand beurteilt und klare Empfehlung abgegeben.',
    image:
      'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1200&q=80',
  },
]

const offerItems = [
  {
    title: 'Fehlerdiagnose',
    price: 'ab CHF 89',
    text: 'Auslesen, Plausibilitätsprüfung und verständliche Einschätzung der nächsten Schritte.',
  },
  {
    title: 'MFK-Vorcheck',
    price: 'ab CHF 129',
    text: 'Sicht- und Funktionsprüfung der wichtigsten kontrollrelevanten Fahrzeugbereiche.',
  },
  {
    title: 'Saison-Check',
    price: 'ab CHF 79',
    text: 'Licht, Flüssigkeiten, Reifen, Batterie und saisonrelevante Komfortsysteme.',
  },
]

const reviews = [
  {
    name: 'M. Keller',
    text: 'Sehr transparente Diagnose. Mir wurde verständlich erklärt, was dringend ist und was warten kann.',
  },
  {
    name: 'A. Demir',
    text: 'Schnelle Rückmeldung per WhatsApp und sauberer Service. Genau so wünscht man sich eine Garage.',
  },
  {
    name: 'S. Meier',
    text: 'Kompetent bei Elektronikproblemen. Kein Rätselraten, sondern klare Prüfung und faire Empfehlung.',
  },
]

const diagnosticSignals = [
  { label: 'Steuergerät-Kommunikation', value: 'stabil', tone: 'text-emerald-400' },
  { label: 'Fehlerbild priorisiert', value: 'hoch', tone: 'text-[#2dd4ff]' },
  { label: 'MFK-Relevanz', value: 'geprüft', tone: 'text-[#e11d2e]' },
]

const issueOptions = [
  {
    id: 'warning',
    label: 'Warnlampe leuchtet',
    title: 'Elektronikdiagnose mit sauberer Priorisierung',
    text: 'Wir lesen relevante Systeme aus, prüfen Zusammenhänge und erklären, ob Weiterfahren sinnvoll ist oder eine Reparatur zeitnah geplant werden sollte.',
    next: 'Foto der Warnlampe und Fahrzeugdaten per WhatsApp senden.',
    whatsapp:
      'https://wa.me/41766063838?text=Guten%20Tag%20888CH-LAB%2C%20bei%20meinem%20Fahrzeug%20leuchtet%20eine%20Warnlampe.%20Ich%20sende%20Foto%20und%20Fahrzeugdaten.',
    icon: Activity,
  },
  {
    id: 'mfk',
    label: 'MFK steht bevor',
    title: 'Kontrollrelevante Punkte vorab klären',
    text: 'Licht, Bremsen, Fahrwerk, Reifen, Elektronik und sichtbare Mängel werden gezielt beurteilt, damit Sie nicht unvorbereitet zur Kontrolle fahren.',
    next: 'MFK-Termin oder ungefähres Prüfdatum mitsenden.',
    whatsapp:
      'https://wa.me/41766063838?text=Guten%20Tag%20888CH-LAB%2C%20ich%20moechte%20mein%20Fahrzeug%20fuer%20die%20MFK%20vorbereiten%20lassen.',
    icon: ClipboardCheck,
  },
  {
    id: 'comfort',
    label: 'Klima oder Komfort',
    title: 'Komfortsysteme prüfen, bevor es mühsam wird',
    text: 'Wir prüfen Kühlleistung, Filterzustand, elektrische Funktionen und auffällige Geräusche oder Gerüche mit klarer Empfehlung.',
    next: 'Symptom kurz beschreiben und wenn möglich ein Video anhängen.',
    whatsapp:
      'https://wa.me/41766063838?text=Guten%20Tag%20888CH-LAB%2C%20ich%20habe%20ein%20Problem%20mit%20Klima%20oder%20Komfortsystemen.',
    icon: Snowflake,
  },
  {
    id: 'performance',
    label: 'Leistung fehlt',
    title: 'Performance-Probleme strukturiert eingrenzen',
    text: 'Wir betrachten Fehlerspeicher, Fahrverhalten und relevante Sensorik, damit nicht auf Verdacht Teile ersetzt werden.',
    next: 'Marke, Modell, Motorisierung und Auftreten des Problems senden.',
    whatsapp:
      'https://wa.me/41766063838?text=Guten%20Tag%20888CH-LAB%2C%20mein%20Fahrzeug%20hat%20Leistungsverlust.%20Ich%20sende%20Marke%2C%20Modell%20und%20Symptom.',
    icon: Gauge,
  },
]

const faqs = [
  {
    question: 'Kann ich zuerst nur ein Foto oder Video senden?',
    answer:
      'Ja. Ein Foto der Warnlampe, ein kurzes Video oder die Fahrzeugdaten reichen oft, um den passenden Termin und die Dringlichkeit besser einzuschätzen.',
  },
  {
    question: 'Werden Teile einfach auf Verdacht ersetzt?',
    answer:
      'Nein. Der Fokus liegt auf Diagnose, Plausibilitätsprüfung und einer nachvollziehbaren Empfehlung, bevor ein Reparaturweg freigegeben wird.',
  },
  {
    question: 'Ist 888CH-LAB nur für bestimmte Marken?',
    answer:
      'Die Diagnose- und Serviceleistungen sind für viele Marken ausgelegt. Bei speziellen Steuergerätethemen wird der Fall vorab sauber eingeordnet.',
  },
  {
    question: 'Wie schnell bekomme ich eine Rückmeldung?',
    answer:
      'Bei WhatsApp-Anfragen ist das Ziel eine zügige Rückmeldung mit klarer Einordnung, besonders bei Warnlampen, MFK-Fragen und akuten Symptomen.',
  },
]

const processSteps = [
  {
    title: 'Problem senden',
    text: 'Per WhatsApp mit Foto, Video oder kurzer Beschreibung starten.',
    icon: Send,
  },
  {
    title: 'Diagnose planen',
    text: 'Fahrzeug, Fehlerbild und Dringlichkeit werden eingeordnet.',
    icon: SearchCheck,
  },
  {
    title: 'Klar entscheiden',
    text: 'Sie erhalten eine verständliche Einschätzung mit sauberer Empfehlung.',
    icon: CheckCircle2,
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
  const [selectedIssue, setSelectedIssue] = useState(issueOptions[0])
  const [intake, setIntake] = useState(intakeDefaults)
  const [selectedSlot, setSelectedSlot] = useState(appointmentSlots[1])
  const SelectedIssueIcon = selectedIssue.icon
  const intakeMessage = `Guten Tag 888CH-LAB, ich möchte eine Diagnose anfragen.%0A%0AFahrzeug: ${intake.brand} ${intake.model}, ${intake.year}%0AKilometer: ${intake.mileage} km%0AProblem: ${intake.issue}%0ADringlichkeit: ${intake.urgency}%0AWunschtermin: ${selectedSlot.time} (${selectedSlot.type})%0A%0AIch kann Fotos oder ein Video vom Fehlerbild senden.`
  const intakeWhatsappHref = `https://wa.me/41766063838?text=${intakeMessage}`
  const displayMileage = Number(intake.mileage || 0).toLocaleString('de-CH')

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
            <a className="transition hover:text-white" href="#faelle">
              Fälle
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
              href={whatsappHref}
              className="whatsapp-cta hidden items-center gap-2 rounded border border-emerald-400/35 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400/18 lg:inline-flex"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4 text-emerald-300" />
              WhatsApp
            </a>
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
        <div className="hero-overlay absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,11,13,0.98)_0%,rgba(11,11,13,0.82)_42%,rgba(11,11,13,0.38)_100%)]" />
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
                href={whatsappHref}
                className="whatsapp-cta inline-flex items-center justify-center gap-3 rounded border border-emerald-400/35 bg-emerald-400/10 px-6 py-4 font-semibold text-white backdrop-blur transition hover:bg-emerald-400/18"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-5 w-5 text-emerald-300" />
                Problem per WhatsApp senden
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 42 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="block"
          >
            <div className="premium-console ml-auto max-w-md overflow-hidden border border-white/12 bg-[#1a1a1a]/72 shadow-2xl backdrop-blur-xl">
              <div className="border-b border-white/10 bg-white/[0.03] px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-[#2dd4ff]">
                      888CH Scan
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">Live Diagnose-Konsole</p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded bg-[#e11d2e]/14 text-[#e11d2e]">
                    <Activity className="h-7 w-7" />
                  </div>
                </div>
              </div>
              <div className="space-y-5 p-6">
                <div className="rounded border border-[#2dd4ff]/20 bg-[#2dd4ff]/10 p-4">
                  <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-zinc-300">
                    <span>Systemstatus</span>
                    <span className="text-emerald-400">bereit</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-[#2dd4ff]"
                      initial={{ width: '18%' }}
                      animate={{ width: '87%' }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
                    />
                  </div>
                </div>
                {diagnosticSignals.map((signal) => (
                  <div key={signal.label} className="flex items-center gap-4">
                    <span className="grid h-9 w-9 place-items-center rounded bg-white/8">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    </span>
                    <span className="text-zinc-200">{signal.label}</span>
                    <span className={`ml-auto text-sm font-semibold uppercase ${signal.tone}`}>
                      {signal.value}
                    </span>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">
                  {[
                    ['1998', 'Elektronik'],
                    ['24h', 'Antwortziel'],
                    ['Aarau', 'Region'],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded bg-white/8 p-3">
                      <p className="text-xl font-semibold text-white">{value}</p>
                      <p className="mt-1 text-xs text-zinc-400">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="proof-strip border-y border-white/10 bg-[#141416] px-5 py-5 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {proofStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="rounded border border-white/10 bg-white/[0.04] px-5 py-4"
            >
              <p className="text-3xl font-semibold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[#0b0b0d] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <Reveal className="rounded border border-white/10 bg-[#1a1a1a] p-7 md:p-9">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#2dd4ff]">
              Sofort-Orientierung
            </p>
            <h2 className="text-3xl font-semibold tracking-normal text-white md:text-5xl">
              Was macht Ihr Fahrzeug gerade?
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              Kunden müssen nicht wissen, welches Bauteil betroffen ist. Ein Symptom reicht,
              um den nächsten sinnvollen Schritt einzuleiten.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {issueOptions.map((issue) => {
                const Icon = issue.icon
                const isSelected = selectedIssue.id === issue.id
                return (
                  <button
                    key={issue.id}
                    type="button"
                    onClick={() => setSelectedIssue(issue)}
                    className={`issue-button flex items-center gap-3 rounded border px-4 py-4 text-left font-semibold transition ${
                      isSelected
                        ? 'border-[#2dd4ff] bg-[#2dd4ff]/12 text-white'
                        : 'border-white/10 bg-white/[0.04] text-zinc-200 hover:bg-white/8'
                    }`}
                  >
                    <Icon className="h-5 w-5 text-[#2dd4ff]" />
                    {issue.label}
                  </button>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded border border-white/10 bg-[#141416] p-7 md:p-9">
            <div className="flex items-start gap-5">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded bg-[#e11d2e]/14 text-[#e11d2e]">
                <SelectedIssueIcon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2dd4ff]">
                  Empfehlung
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-white">{selectedIssue.title}</h3>
              </div>
            </div>
            <p className="mt-6 text-lg leading-8 text-zinc-300">{selectedIssue.text}</p>
            <div className="mt-7 rounded border border-white/10 bg-white/[0.04] p-5">
              <div className="flex gap-4">
                <Timer className="mt-1 h-5 w-5 text-[#2dd4ff]" />
                <div>
                  <p className="font-semibold text-white">Nächster Schritt</p>
                  <p className="mt-1 leading-7 text-zinc-300">{selectedIssue.next}</p>
                </div>
              </div>
            </div>
            <a
              href={selectedIssue.whatsapp}
              className="mt-7 inline-flex items-center justify-center gap-3 rounded bg-[#e11d2e] px-6 py-4 font-semibold text-white shadow-[0_18px_45px_rgba(225,29,46,0.28)] transition hover:bg-[#f43f5e]"
              target="_blank"
              rel="noreferrer"
            >
              Diagnose starten
              <MessageCircle className="h-5 w-5" />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#141416] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#2dd4ff]">
              3-Schritt-System
            </p>
            <h2 className="text-3xl font-semibold tracking-normal text-white md:text-5xl">
              Vom Symptom zur klaren Entscheidung.
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <Reveal key={step.title} delay={index * 0.08}>
                  <div className="relative h-full rounded border border-white/10 bg-[#1a1a1a] p-7">
                    <span className="absolute right-6 top-6 text-5xl font-semibold text-white/[0.06]">
                      0{index + 1}
                    </span>
                    <div className="mb-6 grid h-14 w-14 place-items-center rounded bg-[#2dd4ff]/10 text-[#2dd4ff]">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-3 leading-7 text-zinc-300">{step.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <div className="sticky-cta fixed inset-x-4 bottom-4 z-40 mx-auto max-w-xl rounded border border-white/10 bg-[#1a1a1a]/92 p-3 shadow-2xl backdrop-blur-xl md:bottom-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="px-2">
            <p className="font-semibold text-white">Warnlampe oder MFK-Termin?</p>
            <p className="text-sm text-zinc-400">Foto senden, Einschätzung erhalten.</p>
          </div>
          <a
            href={whatsappHref}
            className="inline-flex items-center justify-center gap-2 rounded bg-[#e11d2e] px-5 py-3 text-sm font-semibold text-white"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>

      <section className="bg-[#0b0b0d] px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Werkstatt Intake-System"
          title="Der Kunde liefert direkt verwertbare Informationen."
          text="Aus einer vagen Nachricht wird eine strukturierte Anfrage: Fahrzeugdaten, Problem, Dringlichkeit und eine fertige WhatsApp-Vorlage für den Garagisten."
        />
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="rounded border border-white/10 bg-[#1a1a1a] p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['brand', 'Marke'],
                ['model', 'Modell'],
                ['year', 'Jahrgang'],
                ['mileage', 'Kilometer'],
              ].map(([key, label]) => (
                <label key={key} className="block">
                  <span className="mb-2 block text-sm font-semibold text-zinc-300">{label}</span>
                  <input
                    value={intake[key]}
                    onChange={(event) => setIntake({ ...intake, [key]: event.target.value })}
                    className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-[#2dd4ff]"
                  />
                </label>
              ))}
            </div>
            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-semibold text-zinc-300">Problem</span>
              <input
                value={intake.issue}
                onChange={(event) => setIntake({ ...intake, issue: event.target.value })}
                className="w-full rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-[#2dd4ff]"
              />
            </label>
            <div className="mt-5">
              <p className="mb-3 text-sm font-semibold text-zinc-300">Dringlichkeit</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {urgencyOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setIntake({ ...intake, urgency: option })}
                    className={`rounded border px-4 py-3 text-left font-semibold transition ${
                      intake.urgency === option
                        ? 'border-[#2dd4ff] bg-[#2dd4ff]/12 text-white'
                        : 'border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/8'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 rounded border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-4 flex items-center gap-3">
                <CalendarClock className="h-5 w-5 text-[#2dd4ff]" />
                <p className="font-semibold text-white">Passenden Werkstatt-Slot vormerken</p>
              </div>
              <div className="grid gap-3">
                {appointmentSlots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`flex items-center justify-between gap-4 rounded border px-4 py-3 text-left transition ${
                      selectedSlot.time === slot.time
                        ? 'border-[#2dd4ff] bg-[#2dd4ff]/12'
                        : 'border-white/10 bg-[#1a1a1a] hover:bg-white/8'
                    }`}
                  >
                    <span>
                      <span className="block font-semibold text-white">{slot.time}</span>
                      <span className="block text-sm text-zinc-400">{slot.note}</span>
                    </span>
                    <span className="rounded bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#2dd4ff]">
                      {slot.type}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-7 grid gap-3">
              {intakeBenefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 text-zinc-300">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  {benefit}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="grid gap-6">
            <div className="rounded border border-white/10 bg-[#141416] p-6 md:p-8">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2dd4ff]">
                    WhatsApp Vorschau
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">Fertige Anfrage</h3>
                </div>
                <MessageCircle className="h-8 w-8 text-emerald-400" />
              </div>
              <div className="rounded border border-emerald-400/20 bg-emerald-400/10 p-5 leading-7 text-zinc-200">
                <p>Guten Tag 888CH-LAB, ich möchte eine Diagnose anfragen.</p>
                <p className="mt-4">
                  Fahrzeug: {intake.brand} {intake.model}, {intake.year}
                </p>
                <p>Kilometer: {displayMileage} km</p>
                <p>Problem: {intake.issue}</p>
                <p>Dringlichkeit: {intake.urgency}</p>
                <p>Wunschtermin: {selectedSlot.time} ({selectedSlot.type})</p>
                <p className="mt-4">Ich kann Fotos oder ein Video vom Fehlerbild senden.</p>
              </div>
              <a
                href={intakeWhatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-3 rounded bg-[#e11d2e] px-6 py-4 font-semibold text-white shadow-[0_18px_45px_rgba(225,29,46,0.28)] transition hover:bg-[#f43f5e]"
              >
                Diese Anfrage senden
                <Send className="h-5 w-5" />
              </a>
            </div>
            <div className="rounded border border-white/10 bg-[#1a1a1a] p-6 md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <Inbox className="h-7 w-7 text-[#2dd4ff]" />
                <h3 className="text-2xl font-semibold text-white">Garagisten-Inbox</h3>
              </div>
              <div className="space-y-3">
                {[
                  ['Neue Anfrage', `${intake.brand} ${intake.model}`, intake.urgency],
                  ['Problemtyp', intake.issue, 'Foto erwartet'],
                  ['Terminwunsch', `${selectedSlot.time} · ${selectedSlot.type}`, selectedSlot.note],
                  ['Planung', 'Diagnose-Slot vorbereiten', 'priorisiert'],
                ].map(([label, value, badge]) => (
                  <div key={label} className="flex items-center gap-4 rounded border border-white/10 bg-white/[0.04] p-4">
                    <UserCheck className="h-5 w-5 text-emerald-400" />
                    <div>
                      <p className="text-sm text-zinc-400">{label}</p>
                      <p className="font-semibold text-white">{value}</p>
                    </div>
                    <span className="ml-auto rounded bg-[#2dd4ff]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#2dd4ff]">
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#141416] px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Vorher / Nachher"
          title="Von 'Auto kaputt' zu einer Anfrage, mit der die Werkstatt arbeiten kann."
          text="Der Unterschied ist nicht nur optisch. Die neue Website reduziert Rückfragen und macht aus Besuchern vorbereitete Kunden."
        />
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded border border-white/10 bg-white/[0.04] p-7 opacity-80">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-400">
                Klassische Website
              </p>
              <h3 className="mt-4 text-3xl font-semibold text-white">"Hallo, Auto macht Probleme."</h3>
              <ul className="mt-6 space-y-4 text-zinc-300">
                {['keine Fahrzeugdaten', 'keine Dringlichkeit', 'keine Fotos', 'mehrere Rückfragen nötig'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#e11d2e]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded border border-[#2dd4ff]/30 bg-[#2dd4ff]/10 p-7 shadow-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2dd4ff]">
                888CH-LAB System
              </p>
              <h3 className="mt-4 text-3xl font-semibold text-white">Strukturierte Diagnose-Anfrage</h3>
              <ul className="mt-6 space-y-4 text-zinc-200">
                {[
                  'Marke, Modell, Jahrgang und Kilometer',
                  'konkretes Symptom',
                  'Dringlichkeit sichtbar',
                  'WhatsApp-Text automatisch vorbereitet',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0b0b0d] px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Zeit sparen nach der Anfrage"
          title="Der Kunde kommt vorbereitet. Die Garage antwortet schneller."
          text="Vorbereitungscheckliste und Antwortvorlagen machen aus einer Anfrage direkt einen planbaren Werkstattprozess."
        />
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="rounded border border-white/10 bg-[#1a1a1a] p-7">
            <div className="mb-5 flex items-center gap-3">
              <ClipboardCheck className="h-7 w-7 text-[#2dd4ff]" />
              <h3 className="text-2xl font-semibold text-white">Kunden-Checkliste vor dem Termin</h3>
            </div>
            <div className="grid gap-3">
              {prepChecklist.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded border border-white/10 bg-white/[0.04] p-4 text-zinc-200">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded border border-white/10 bg-[#141416] p-7">
            <div className="mb-5 flex items-center gap-3">
              <MessageCircle className="h-7 w-7 text-emerald-400" />
              <h3 className="text-2xl font-semibold text-white">Quick Replies für den Garagisten</h3>
            </div>
            <div className="grid gap-3">
              {quickReplies.map((reply, index) => (
                <div key={reply} className="rounded border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2dd4ff]">
                    Vorlage 0{index + 1}
                  </p>
                  <p className="mt-2 leading-7 text-zinc-200">{reply}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="diagnose" className="bg-[#0b0b0d] px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Die Diagnose-Zentrale"
          title="Vier Einstiege, ein klares Ziel: Ihr Fahrzeug kommt zuverlässig weiter."
          text="Die Service-Struktur ist bewusst einfach gehalten: Sie erkennen sofort den passenden Bereich und erhalten eine klare Einschätzung zum nächsten sinnvollen Schritt."
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

      <section className="bg-[#141416] px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Spezialisierung"
          title="Stark bei den Fällen, bei denen Standard-Service nicht reicht."
          text="888CH-LAB verbindet Werkstattpraxis mit Elektronik-Know-how. Besonders hilfreich ist das, wenn Warnlampen, Steuergeräte oder sporadische Fehler eine genaue Analyse verlangen."
        />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {specialistItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={index * 0.08}>
                <div className="h-full rounded border border-white/10 bg-white/[0.04] p-7">
                  <div className="mb-6 grid h-14 w-14 place-items-center rounded bg-[#2dd4ff]/10 text-[#2dd4ff]">
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

      <section id="faelle" className="bg-[#0b0b0d] px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Aus der Werkstatt"
          title="Konkrete Fälle machen Kompetenz sichtbar."
          text="Statt abstrakter Versprechen zeigt 888CH-LAB, wie typische Fahrzeugprobleme strukturiert geprüft und verständlich gelöst werden."
        />
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {workshopCases.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="group h-full overflow-hidden rounded border border-white/10 bg-[#1a1a1a] shadow-xl">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#2dd4ff]">
                    Ausgangslage
                  </p>
                  <p className="mt-2 leading-7 text-zinc-300">{item.problem}</p>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#2dd4ff]">
                    Ergebnis
                  </p>
                  <p className="mt-2 leading-7 text-zinc-300">{item.result}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="specials" className="overflow-hidden bg-[#141416] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#2dd4ff]">
              Saison-Services
            </p>
            <h2 className="text-3xl font-semibold tracking-normal text-white md:text-5xl">
              Regelmässige Checks für Sicherheit, Komfort und zuverlässige Mobilität.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              888CH-LAB prüft saisonrelevante Komponenten frühzeitig und transparent,
              damit kleine Auffälligkeiten nicht erst bei Hitze, Kälte oder der nächsten
              Kontrolle zum Problem werden.
            </p>
            <a
              href="#standort"
              className="season-cta mt-8 inline-flex items-center gap-3 rounded border border-[#2dd4ff]/45 bg-[#2dd4ff]/10 px-5 py-4 font-semibold text-white transition hover:bg-[#2dd4ff]/18"
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
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#2dd4ff]">
              Einblick & Social Proof
            </p>
            <h2 className="text-3xl font-semibold tracking-normal text-white md:text-5xl">
              Diagnose sichtbar machen, Vertrauen schneller aufbauen.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              Kurze Werkstatt-Clips eignen sich ideal, um echte Kompetenz zu zeigen:
              Diagnosegerät im Einsatz, Steuergerät auf der Werkbank oder ein kurzer
              Vorher/Nachher-Check. So versteht man sofort, wie 888CH-LAB arbeitet.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={whatsappHref}
                className="inline-flex items-center justify-center gap-3 rounded bg-[#e11d2e] px-6 py-4 font-semibold text-white shadow-[0_18px_45px_rgba(225,29,46,0.28)] transition hover:bg-[#f43f5e]"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Fahrzeugproblem senden
              </a>
              <a
                href="#faelle"
                className="inline-flex items-center justify-center gap-3 rounded border border-white/15 bg-white/8 px-6 py-4 font-semibold text-white transition hover:bg-white/14"
              >
                Fälle ansehen
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative min-h-[430px] overflow-hidden rounded border border-white/10 bg-[#1a1a1a] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1400&q=80"
                alt="Diagnosearbeit in einer modernen Werkstatt"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,13,0.18)_0%,rgba(11,11,13,0.9)_100%)]" />
              <div className="relative flex min-h-[430px] flex-col justify-end p-7">
                <button
                  type="button"
                  className="mb-8 grid h-20 w-20 place-items-center rounded-full border border-white/25 bg-white/12 text-white backdrop-blur transition hover:scale-105"
                  aria-label="Video Platzhalter abspielen"
                >
                  <PlayCircle className="h-10 w-10" />
                </button>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2dd4ff]">
                  Video-Platzhalter
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-white">
                  30 Sekunden Werkstatt-Einblick
                </h3>
                <p className="mt-3 leading-7 text-zinc-200">
                  Ideal für Startseite, Instagram Reels, TikTok und Google Business.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#141416] px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Klare Einstiegspunkte"
          title="Anfragen werden einfacher, wenn der erste Schritt klar ist."
          text="Die Preise dienen als Orientierung und schaffen Verbindlichkeit. Der genaue Umfang wird nach Fahrzeug, Fehlerbild und Aufwand bestätigt."
        />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {offerItems.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="h-full rounded border border-white/10 bg-[#1a1a1a] p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2dd4ff]">
                  {item.title}
                </p>
                <p className="mt-4 text-4xl font-semibold text-white">{item.price}</p>
                <p className="mt-4 leading-7 text-zinc-300">{item.text}</p>
                <a
                  href={whatsappHref}
                  className="whatsapp-cta mt-7 inline-flex items-center gap-3 rounded border border-white/15 bg-white/8 px-5 py-3 font-semibold text-white transition hover:bg-white/14"
                  target="_blank"
                  rel="noreferrer"
                >
                  Anfrage starten
                  <MessageCircle className="h-5 w-5 text-emerald-300" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#0b0b0d] px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Vertrauens-Check"
          title="Argumente, die vor dem ersten Anruf Vertrauen schaffen."
          text="Klare Kommunikation, sorgfältige Arbeit und regionale Nähe bilden die Grundlage für eine verlässliche Betreuung."
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

      <section className="bg-[#141416] px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Kundenstimmen"
          title="Vertrauen entsteht durch nachvollziehbare Erfahrungen."
          text="Kurze Bewertungen geben neuen Kunden ein Gefühl dafür, wie klar, schnell und sorgfältig die Zusammenarbeit abläuft."
        />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 0.08}>
              <figure className="h-full rounded border border-white/10 bg-white/[0.04] p-7">
                <div className="mb-5 flex gap-1 text-[#e11d2e]" aria-label="5 von 5 Sterne">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <blockquote className="leading-8 text-zinc-200">"{review.text}"</blockquote>
                <figcaption className="mt-6 font-semibold text-white">{review.name}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#0b0b0d] px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Gut zu wissen"
          title="Antworten, bevor Unsicherheit entsteht."
          text="Die häufigsten Fragen werden direkt geklärt, damit der erste Kontakt einfach und angenehm bleibt."
        />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.06}>
              <div className="h-full rounded border border-white/10 bg-[#1a1a1a] p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded bg-[#2dd4ff]/10 text-[#2dd4ff]">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                </div>
                <p className="leading-7 text-zinc-300">{faq.answer}</p>
              </div>
            </Reveal>
          ))}
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
                <MessageCircle className="mt-1 h-5 w-5 text-emerald-400" />
                <div>
                  <p className="font-semibold text-white">WhatsApp-Erstkontakt</p>
                  <p className="text-sm text-zinc-400">
                    Fehlerbild, Foto vom Kombiinstrument oder Fahrzeugdaten direkt senden.
                  </p>
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
            <a
              href={routeHref}
              className="mt-3 inline-flex w-full items-center justify-center gap-3 rounded border border-white/15 bg-white/8 px-6 py-4 font-semibold text-white transition hover:bg-white/14 sm:ml-3 sm:mt-9 sm:w-auto"
              target="_blank"
              rel="noreferrer"
            >
              <Route className="h-5 w-5 text-[#2dd4ff]" />
              Route starten
            </a>
            <a
              href={whatsappHref}
              className="whatsapp-cta mt-3 inline-flex w-full items-center justify-center gap-3 rounded border border-emerald-400/35 bg-emerald-400/10 px-6 py-4 font-semibold text-white transition hover:bg-emerald-400/18 sm:ml-3 sm:mt-9 sm:w-auto"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-5 w-5 text-emerald-300" />
              WhatsApp senden
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

export default App
