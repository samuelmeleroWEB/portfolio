import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import type { ProjectVideo, Translate } from '../../data/workspace';
import { WorkspaceDialog } from './WorkspaceControls';

export type GallerySlide = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  alt: string;
  video?: ProjectVideo;
};

const motionQuery = '(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)';

function HoverVideo({ video }: { video: ProjectVideo }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia(motionQuery);
    let timer: number;
    function update() {
      window.clearTimeout(timer);
      if (preference.matches) timer = window.setTimeout(() => setReady(true), 280);
      else setReady(false);
    }
    update();
    preference.addEventListener('change', update);
    return () => {
      window.clearTimeout(timer);
      preference.removeEventListener('change', update);
    };
  }, []);

  return ready && <video className="gallery-video" aria-hidden="true" autoPlay muted playsInline preload="none"
    onPlaying={(event) => { event.currentTarget.dataset.playing = ''; }}
    onEnded={(event) => { delete event.currentTarget.dataset.playing; }}>
    <source src={video.src} type={video.type} />
  </video>;
}

export function ProjectMedia({ slides, sizes, title, tr }: {
  slides: readonly [GallerySlide, ...GallerySlide[]];
  sizes: string;
  title: string;
  tr: Translate;
}) {
  const [index, setIndex] = useState(0);
  const [viewer, setViewer] = useState(false);
  const [hoverVideo, setHoverVideo] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const gesture = useRef<{ x: number; y: number; id: number } | null>(null);
  const handledTouch = useRef(false);
  const slide = slides[index];
  const multiple = slides.length > 1;

  function shift(direction: number) {
    setHoverVideo(false);
    setIndex((current) => (current + direction + slides.length) % slides.length);
  }

  function navigate(event: KeyboardEvent) {
    if (!multiple || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    shift(event.key === 'ArrowLeft' ? -1 : 1);
  }

  function openViewer(trigger: HTMLButtonElement) {
    trigger.focus({ preventScroll: true });
    setHoverVideo(false);
    setViewer(true);
  }

  const swipeHandlers = {
    onPointerDown(event: PointerEvent<HTMLElement>) {
      handledTouch.current = false;
      gesture.current = event.pointerType === 'touch' && event.isPrimary
        ? { x: event.clientX, y: event.clientY, id: event.pointerId }
        : null;
    },
    onPointerUp(event: PointerEvent<HTMLElement>) {
      const start = gesture.current;
      gesture.current = null;
      if (!start || start.id !== event.pointerId) return false;
      const x = event.clientX - start.x;
      const y = event.clientY - start.y;
      if (multiple && Math.abs(x) >= 40 && Math.abs(x) >= Math.abs(y) * 1.4) {
        handledTouch.current = true;
        shift(x > 0 ? -1 : 1);
      }
      return Math.hypot(x, y) <= 10;
    },
    onPointerCancel() { gesture.current = null; },
  };

  function tilt(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== 'mouse' || !window.matchMedia(motionQuery).matches) return;
    const element = event.currentTarget;
    const box = element.getBoundingClientRect();
    const x = (0.5 - (event.clientY - box.top) / box.height) * 3.6;
    const y = ((event.clientX - box.left) / box.width - 0.5) * 3.6;
    element.style.setProperty('--gallery-tilt', `perspective(850px) rotateX(${x}deg) rotateY(${y}deg) scale(1.035)`);
  }

  function image(fullSize: boolean) {
    return <img key={slide.src} src={slide.src} srcSet={fullSize ? undefined : slide.srcSet}
      sizes={fullSize ? undefined : sizes} width={slide.width} height={slide.height}
      alt={slide.alt} loading={fullSize || index > 0 ? 'eager' : 'lazy'} decoding="async" draggable={false}
      onLoad={(event) => { event.currentTarget.dataset.loaded = ''; }} />;
  }

  function controls(withCaption: boolean) {
    if (!multiple && !withCaption) return null;
    return <figcaption className="gallery-media-controls">
      {multiple && <button type="button" className="gallery-media-button" onClick={() => shift(-1)}
        aria-label={tr('Captura anterior', 'Previous screenshot')}><FiChevronLeft aria-hidden="true" /></button>}
      <p aria-live="polite" aria-atomic="true">
        {multiple && <span className="mono">{index + 1} / {slides.length}</span>}
        <span className={withCaption ? undefined : 'sr-only'}>{slide.alt}</span>
      </p>
      {multiple && <button type="button" className="gallery-media-button" onClick={() => shift(1)}
        aria-label={tr('Captura siguiente', 'Next screenshot')}><FiChevronRight aria-hidden="true" /></button>}
    </figcaption>;
  }

  return <>
    <figure ref={ref} className="gallery-screen" data-revealed={inView || undefined} onKeyDown={navigate}>
      <button type="button" className="gallery-stage" {...swipeHandlers}
        aria-label={`${tr('Ampliar captura', 'Enlarge screenshot')} · ${title} · ${slide.alt}`}
        aria-haspopup="dialog"
        onPointerEnter={(event) => { if (slide.video && event.pointerType === 'mouse') setHoverVideo(true); }}
        onPointerUp={(event) => {
          if (!swipeHandlers.onPointerUp(event)) return;
          handledTouch.current = true;
          openViewer(event.currentTarget);
        }}
        onPointerMove={tilt}
        onPointerLeave={(event) => {
          event.currentTarget.style.removeProperty('--gallery-tilt');
          setHoverVideo(false);
        }}
        onClick={(event) => {
          if (event.detail === 0 || !handledTouch.current) openViewer(event.currentTarget);
        }}>
        <span className="gallery-image">
          {image(false)}
          {hoverVideo && slide.video && <HoverVideo video={slide.video} />}
        </span>
        <span className="gallery-expand" aria-hidden="true"><FiMaximize2 /></span>
      </button>
      {controls(false)}
    </figure>
    {viewer && <WorkspaceDialog kind="image-viewer" title={title} closeLabel={tr('Cerrar visor', 'Close image viewer')}
      close={() => setViewer(false)} onKeyDown={navigate}>
      <figure className="gallery-viewer-content">
        <div className="gallery-viewer-stage" {...swipeHandlers}>{image(true)}</div>
        {controls(true)}
      </figure>
    </WorkspaceDialog>}
  </>;
}
