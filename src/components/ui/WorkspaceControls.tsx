import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent, ReactNode } from 'react';
import type { Translate } from '../../data/workspace';

export function WorkspaceDialog({ title, closeLabel, close, children, kind }: {
  title: string;
  closeLabel: string;
  close: () => void;
  children: ReactNode;
  kind?: 'palette';
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const element = dialog.current!;
    const trigger = document.activeElement;
    const viewport = window.visualViewport;
    const updateHeight = () => {
      if (viewport) element.style.setProperty('--visible-height', `${viewport.height}px`);
    };
    element.showModal();
    const focusTarget = window.matchMedia('(pointer: coarse)').matches ? '.close-button' : '[data-dialog-focus]';
    (element.querySelector<HTMLElement>(focusTarget) ?? element).focus({ preventScroll: true });
    updateHeight();
    viewport?.addEventListener('resize', updateHeight);
    return () => {
      viewport?.removeEventListener('resize', updateHeight);
      element.close();
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className={kind === 'palette' ? 'workspace-dialog palette' : 'workspace-dialog'}
      aria-labelledby={titleId}
      tabIndex={-1}
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const box = event.currentTarget.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close();
      }}
    >
      <div className="dialog-heading">
        <h2 id={titleId}>{title}</h2>
        <button type="button" className="close-button" onClick={close} aria-label={closeLabel}>×</button>
      </div>
      {children}
    </dialog>
  );
}

export type SearchItem = { id: string; name: string; category: string; keywords?: string; run: () => void };
const normalize = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export function CommandPalette({ items, tr }: { items: SearchItem[]; tr: Translate }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listId = useId();
  const matches = useMemo(() => {
    const terms = normalize(query.trim()).split(/\s+/);
    return items.filter((item) => terms.every((word) => normalize(item.name + ' ' + item.category + ' ' + (item.keywords ?? '')).includes(word)));
  }, [items, query]);

  useEffect(() => {
    if (matches[active]) document.getElementById(listId + '-' + matches[active].id)?.scrollIntoView({ block: 'nearest' });
  }, [active, listId, matches]);

  function navigate(event: KeyboardEvent<HTMLInputElement>) {
    if (!matches.length || event.nativeEvent.isComposing) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      matches[active]?.run();
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      setActive((index) => (index + step + matches.length) % matches.length);
    }
  }

  return (
    <>
      <input
        data-dialog-focus
        role="combobox"
        type="search"
        aria-label={tr('Buscar en el portfolio', 'Search the portfolio')}
        aria-expanded={matches.length > 0}
        aria-controls={listId}
        aria-activedescendant={matches[active] ? listId + '-' + matches[active].id : undefined}
        autoComplete="off"
        placeholder={tr('Buscar proyectos, tecnologías o acciones…', 'Search projects, technologies or actions…')}
        value={query}
        onChange={(event) => { setQuery(event.target.value); setActive(0); }}
        onKeyDown={navigate}
      />
      <ul id={listId} className="palette-results" role="listbox" aria-label={tr('Resultados', 'Results')}>
        {matches.map((item, index) => (
          <li key={item.id} id={listId + '-' + item.id} role="option" aria-selected={index === active} onClick={item.run}>
            <span>{item.name}</span><small>{item.category}</small>
          </li>
        ))}
      </ul>
      {!matches.length && <p className="palette-empty" role="status">{tr('Sin resultados.', 'No results.')}</p>}
      <div className="palette-help mono"><kbd>↑</kbd> <kbd>↓</kbd> {tr('Navegar', 'Navigate')} <kbd>Enter</kbd> {tr('Abrir', 'Open')} <kbd>Esc</kbd> {tr('Cerrar', 'Close')}</div>
    </>
  );
}

const commands = ['help', 'about', 'skills', 'projects', 'experience', 'education', 'contact', 'cv', 'clear', 'language'] as const;
export type Command = (typeof commands)[number];
type TerminalAction = { label: string; href: string; download?: boolean; run?: () => void };
export type TerminalResponse = { text: string; actions?: TerminalAction[] };

export function Terminal({ tr, execute }: { tr: Translate; execute: (command: Command, args: string) => TerminalResponse }) {
  const [value, setValue] = useState('');
  const [entries, setEntries] = useState<{ command: string; response: TerminalResponse }[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [draft, setDraft] = useState('');
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const matching = value.trim() && !value.trim().includes(' ')
    ? commands.filter((command) => command.startsWith(value.trim().toLowerCase()))
    : [];
  const suggestions = matching.filter((command) => command !== value.trim().toLowerCase());

  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [entries]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const line = value.trim();
    if (!line) return;
    const [name, ...args] = line.toLowerCase().split(/\s+/);
    setValue('');
    setCursor(null);
    setHistory((previous) => [...previous, line]);
    if (name === 'clear' && !args.length) {
      setEntries([]);
      return;
    }
    const command = commands.find((item) => item === name);
    const response = command ? execute(command, args.join(' ')) : { text: tr('Comando desconocido. Escribe help.', 'Unknown command. Type help.') };
    setEntries((previous) => [...previous, { command: line, response }]);
  }

  function browseHistory(step: number) {
    if (!history.length || (cursor === null && step > 0)) return;
    if (cursor === null) setDraft(value);
    const next = Math.max(0, Math.min(history.length, (cursor ?? history.length) + step));
    setCursor(next === history.length ? null : next);
    setValue(next === history.length ? draft : history[next]);
  }

  function keydown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Tab' && !event.shiftKey && suggestions.length === 1) {
      event.preventDefault();
      setValue(suggestions[0]);
    }
    if (history.length && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
      event.preventDefault();
      browseHistory(event.key === 'ArrowUp' ? -1 : 1);
    }
  }

  return (
    <div className="terminal">
      <div className="terminal-bar mono"><span><b aria-hidden="true">›_</b> workspace / shell</span><span>UTF-8</span></div>
      <div ref={log} className="terminal-output mono" role="log" aria-label={tr('Salida de la terminal', 'Terminal output')} tabIndex={0}>
        <p>{tr('Escribe', 'Type')} <button className="inline-command" type="button" onClick={() => { setValue('help'); setCursor(null); input.current?.focus(); }}>help</button> {tr('para ver los comandos.', 'to see available commands.')}</p>
        {entries.map((entry, index) => (
          <div className="terminal-entry" key={index}>
            <div className="terminal-prompt">$ {entry.command}</div>
            <p>{entry.response.text}</p>
            {entry.response.actions?.map((action) => (
              <a key={action.href + action.label} href={action.href} download={action.download} onClick={action.run ? (event) => { event.preventDefault(); action.run?.(); } : undefined}>{action.label}</a>
            ))}
          </div>
        ))}
      </div>
      <form className="terminal-input mono" onSubmit={submit}>
        <span aria-hidden="true">$</span>
        <input ref={input} aria-label={tr('Comando', 'Command')} aria-describedby="terminal-hint" id="terminal-command" value={value}
          autoComplete="off" autoCapitalize="none" spellCheck={false} enterKeyHint="go"
          onChange={(event) => { setValue(event.target.value); setCursor(null); }} onKeyDown={keydown} />
        <button type="submit">{tr('Ejecutar', 'Run')}</button>
      </form>
      <div id="terminal-hint" className="terminal-hint mono">
        <div className="terminal-history" role="group" aria-label={tr('Historial de comandos', 'Command history')}>
          <button type="button" disabled={!history.length || cursor === 0} onClick={() => browseHistory(-1)} aria-label={tr('Comando anterior', 'Previous command')}>↑</button>
          <button type="button" disabled={cursor === null} onClick={() => browseHistory(1)} aria-label={tr('Comando siguiente', 'Next command')}>↓</button>
        </div>
        {suggestions.map((command) => <button key={command} type="button" onClick={() => {
          input.current?.focus({ preventScroll: true });
          setValue(command);
          setCursor(null);
        }}>{command}</button>)}
        <span className="terminal-keyboard-hint">{tr('Tab completa · ↑ ↓ historial', 'Tab completes · ↑ ↓ history')}</span>
      </div>
    </div>
  );
}
