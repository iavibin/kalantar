import React, { useState, useEffect } from 'react';
import styles from './AdminEditModal.module.css';
import { CloseIcon } from '../common/Icons';
import { Tradition } from '../../data/types';

interface AdminEditModalProps {
  tradition: Tradition;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Tradition>) => void;
}

const CATEGORIES = [
  'Heroic Ballad & Bow-Song',
  'Elegiac Oral Verse',
  'Ritual Trance Invocations',
  'Agrarian Domestic Lore',
  'Heroic Epic & Scroll Ballad',
  'Mystic Oral Philosophy',
  'Heroic Ballad',
  'Temple & Ritual Chant',
  'Pilgrim & Devotional Lore',
  'Dance & Martial Ballad',
  'Matriarchal Life-Cycle Song',
  'Pastoral & Agro Lore'
];

export const AdminEditModal: React.FC<AdminEditModalProps> = ({
  tradition,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState(tradition.title);
  const [category, setCategory] = useState(tradition.category);
  const [region, setRegion] = useState(tradition.region || tradition.state);
  const [dialect, setDialect] = useState(tradition.dialect);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(tradition.id, {
      title: title.trim(),
      category,
      region: region.trim(),
      state: region.trim(),
      dialect: dialect.trim()
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Edit Oral Tradition</h3>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <CloseIcon size={16} />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Title</label>
            <input
              type="text"
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Category</label>
            <select
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Region / State</label>
            <input
              type="text"
              className={styles.input}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Dialect</label>
            <input
              type="text"
              className={styles.input}
              value={dialect}
              onChange={(e) => setDialect(e.target.value)}
              required
            />
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
