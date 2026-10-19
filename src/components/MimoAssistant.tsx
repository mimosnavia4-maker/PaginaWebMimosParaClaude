import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import {
  MIMO_FAQ_TOPICS,
  IMAGES,
  CONTACT_INFO,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';

interface MimoAssistantProps {
  cookieBannerOpen: boolean;
  onAcceptCookies: () => void;
  onRejectCookies: () => void;
  onNavigate?: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  whatsappUrl?: string;
  whatsappCtaLabel?: string;
}

function getTopicById(id: string) {
  return MIMO_FAQ_TOPICS.find((t) => t.id === id) ?? MIMO_FAQ_TOPICS[0];
}

function getLocalFaqReply(query: string): {
  text: string;
  whatsappUrl: string;
  whatsappCtaLabel: string;
} {
  const q = query.toLowerCase();
  if (/costura|arregl|compostur|bajo|bastill|cremallera|bot[oó]n|zurcid|estrech|ensanch/.test(q)) {
    const topic = getTopicById('costura');
    return {
      text: topic.respuesta,
      whatsappUrl: topic.whatsappUrl,
      whatsappCtaLabel: topic.whatsappCtaLabel,
    };
  }
  if (/precio|cuesta|cu[aá]nto|tarifa|camisa|traje|vestido|edred[oó]n|alfombra|cortina/.test(q)) {
    const topic = getTopicById('precios');
    return {
      text: topic.respuesta,
      whatsappUrl: buildMimoWhatsAppUrl(
        `Hola, Mimo. Quiero consultar el precio de: ${query.trim()}`
      ),
      whatsappCtaLabel: 'Consultar precio en WhatsApp de Mimo',
    };
  }
  if (/horari|abiert|abr[ií]s|cerr|s[aá]bad|venezuela|espino|navia|teixugueiras/.test(q)) {
    const topic = getTopicById('horarios-tiendas');
    return {
      text: topic.respuesta,
      whatsappUrl: topic.whatsappUrl,
      whatsappCtaLabel: topic.whatsappCtaLabel,
    };
  }
  if (/punto|colaborador|redondela|gondomar|ponteareas|porri[ñn]o|arregla2|puntadas|telas/.test(q)) {
    const topic = getTopicById('puntos');
    return {
      text: topic.respuesta,
      whatsappUrl: topic.whatsappUrl,
      whatsappCtaLabel: topic.whatsappCtaLabel,
    };
  }
  if (/recog|domicilio|casa|reparto|wash/.test(q)) {
    const topic = getTopicById('domicilio');
    return {
      text: topic.respuesta,
      whatsappUrl: topic.whatsappUrl,
      whatsappCtaLabel: topic.whatsappCtaLabel,
    };
  }
  if (/apartamento|empresa|tur[ií]stic|hotel|limpieza|oficina|presupuesto/.test(q)) {
    const topic = getTopicById('apartamentos-empresas');
    return {
      text: topic.respuesta,
      whatsappUrl: topic.whatsappUrl,
      whatsappCtaLabel: topic.whatsappCtaLabel,
    };
  }
  return {
    text: `Para darte el precio exacto o resolver tu consulta al instante, pulsa el botón inferior para abrir el WhatsApp de Mimo (${CONTACT_INFO.whatsappNumber}) con tu pregunta ya escrita.`,
    whatsappUrl: buildMimoWhatsAppUrl(`Hola, Mimo. Quiero consultar: ${query.trim()}`),
    whatsappCtaLabel: 'Enviar consulta a Mimo por WhatsApp',
  };
}

export const MimoAssistant: React.FC<MimoAssistantProps> = ({
  cookieBannerOpen,
  onAcceptCookies,
  onRejectCookies,
  onNavigate,
}) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: '¡Hola! Soy Mimo, el asistente de Tintorería Mimos Navia. Selecciona un tema o escribe tu consulta para informarte sobre horarios, tiendas, puntos colaboradores o abrir WhatsApp y darte el precio exacto de tus prendas.',
      whatsappUrl: CONTACT_INFO.whatsappGeneralHref,
      whatsappCtaLabel: 'Hablar con Mimo en WhatsApp',
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const handleTopicClick = (topic: (typeof MIMO_FAQ_TOPICS)[number]) => {
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-u`, sender: 'user', text: topic.label },
      {
        id: `${Date.now()}-b`,
        sender: 'bot',
        text: topic.respuesta,
        whatsappUrl: topic.whatsappUrl,
        whatsappCtaLabel: topic.whatsappCtaLabel,
      },
    ]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput('');
    const reply = getLocalFaqReply(trimmed);
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-u`, sender: 'user', text: trimmed },
      {
        id: `${Date.now()}-b`,
        sender: 'bot',
        text: reply.text,
        whatsappUrl: reply.whatsappUrl,
        whatsappCtaLabel: reply.whatsappCtaLabel,
      },
    ]);
  };

  return (
    <>
      {/* Cookie Consent Notice */}
      {cookieBannerOpen && (
        <div
          role="dialog"
          aria-label="Preferencias de cookies"
          className="fixed left-4 bottom-20 md:bottom-4 z-50 max-w-md rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1d36] p-5 shadow-xl text-sm"
        >
          <p className="font-extrabold text-[#002147] dark:text-white mb-1">
            Preferencias de cookies
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Utilizamos almacenamiento técnico en tu navegador para recordar tu elección y el modo visual. Solo si pulsas «Aceptar» activaremos Google Analytics 4 para medir de forma agregada las visitas y el uso de los botones de contacto. Puedes consultar los detalles en nuestra{' '}
            <a
              href="/cookies"
              onClick={(e) => {
                if (onNavigate) {
                  onNavigate('/cookies', e);
                }
              }}
              className="underline font-bold text-[#002147] dark:text-[#60B5F6]"
            >
              Política de cookies
            </a>
            .
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={onAcceptCookies}
              className="w-full px-4 py-2.5 rounded-lg bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] text-white text-xs font-bold cursor-pointer text-center transition-colors"
            >
              Aceptar
            </button>
            <button
              type="button"
              onClick={onRejectCookies}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 hover:border-[#002147] dark:hover:border-white bg-white dark:bg-[#071324] text-slate-800 dark:text-slate-100 text-xs font-bold cursor-pointer text-center transition-colors"
            >
              Rechazar
            </button>
          </div>
        </div>
      )}

      {/* Floating Assistant Trigger (Posicionado por encima de la barra móvil inferior) */}
      {!open && (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setTimeout(() => inputRef.current?.focus(), 50);
          }}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="fixed right-4 bottom-20 md:bottom-5 z-40 inline-flex items-center gap-2.5 bg-[#002147] hover:bg-[#0a3161] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-lg border border-white/20 transition-colors cursor-pointer"
        >
          <img
            src={IMAGES.logoMimos}
            alt=""
            width={26}
            height={26}
            className="w-6.5 h-6.5 rounded-full bg-white/10"
          />
          <span>Asistente Mimo · Precios y dudas</span>
        </button>
      )}

      {/* Assistant Dialog Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Mimo, asistente de Tintorería Mimos"
          className="fixed right-4 bottom-20 md:bottom-5 z-50 w-[min(360px,calc(100vw-2rem))] h-[min(510px,calc(100vh-7rem))] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1d36] shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="bg-[#002147] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={IMAGES.logoMimos}
                alt=""
                width={28}
                height={28}
                className="w-7 h-7 rounded-full bg-white/10"
              />
              <div>
                <p className="text-sm font-extrabold leading-tight">
                  Mimo · Asistente de Tintorería Mimos
                </p>
                <p className="text-[11px] text-slate-300">
                  WhatsApp oficial: {CONTACT_INFO.whatsappNumber}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar asistente"
              className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            ref={scrollRef}
            aria-live="polite"
            className="flex-1 overflow-y-auto p-3.5 space-y-2.5 text-xs sm:text-sm"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[90%] rounded-xl px-3.5 py-2.5 whitespace-pre-wrap leading-relaxed ${
                  m.sender === 'bot'
                    ? 'bg-slate-100 dark:bg-[#071324] text-slate-800 dark:text-slate-100 self-start'
                    : 'bg-[#002147] text-white ml-auto'
                }`}
              >
                <p>{m.text}</p>
                {m.whatsappUrl && (
                  <a
                    href={m.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{m.whatsappCtaLabel || 'Abrir WhatsApp de Mimo'}</span>
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Quick FAQ Buttons */}
          <div className="px-3 pb-2 pt-1.5 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-800">
            {MIMO_FAQ_TOPICS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => handleTopicClick(t)}
                className="px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 hover:border-[#0F76BB] text-[11px] font-bold text-[#002147] dark:text-slate-200 cursor-pointer"
              >
                {t.label}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSend}
            className="p-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-slate-50 dark:bg-[#071324]"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregunta por tu prenda, horario o punto..."
              aria-label="Escribe tu consulta"
              className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0b1d36] text-xs text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
            />
            <button
              type="submit"
              aria-label="Enviar pregunta"
              className="p-2 rounded-lg bg-[#002147] dark:bg-[#0F76BB] text-white cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
