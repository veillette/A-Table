import { escapeHtml, thumbPath, imagePath } from '../lib/format.js';

/**
 * HTML for the recipe grid. The recipe title is the only button, so the card
 * has no interactive content nested inside a button. The rest of the card is
 * made clickable with a stretched ::after pseudo-element in CSS.
 */
export function cardsHtml(list, favorites) {
  return list
    .map((r) => {
      const saved = favorites.includes(r.id);
      const name = escapeHtml(r.name);
      return `<article class="card">
  <div class="card-image"><img src="${thumbPath(r.id)}" srcset="${thumbPath(r.id)} 720w, ${imagePath(r.id)} 1200w" sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 400px" alt="" loading="lazy" decoding="async"></div>
  <button class="save" data-save="${escapeHtml(r.id)}" aria-label="${saved ? 'Unsave' : 'Save'} ${name}" aria-pressed="${saved}">${saved ? '♥' : '♡'}</button>
  <div class="card-content">
    <p class="eyebrow">${escapeHtml(r.category)} · THE EVERYDAY COLLECTION</p>
    <h3><button class="open-recipe" data-open="${escapeHtml(r.id)}" aria-haspopup="dialog">${name}</button></h3>
    <p class="desc">${escapeHtml(r.sub)}</p>
    <div class="meta"><span>◷ ${r.time} MIN</span><span>${escapeHtml(r.difficulty)}</span><span>View card ↗</span></div>
  </div>
</article>`;
    })
    .join('');
}
