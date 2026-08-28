import React, { useState } from 'react';
import styles from './ContributeModal.module.css';
import { Tradition, CommunityAnnotation } from '../../data/types';
import { CloseIcon, ShieldCheckIcon, CheckIcon } from '../common/Icons';
import { traditionsRepo } from '../../data/traditionsRepo';

interface ContributeModalProps {
  traditions: Tradition[];
  preselectedTradition?: Tradition | null;
  onClose: () => void;
  onAnnotationSuccess: () => void;
}

export const ContributeModal: React.FC<ContributeModalProps> = ({
  traditions,
  preselectedTradition,
  onClose,
  onAnnotationSuccess
}) => {
  const [selectedTraditionId, setSelectedTraditionId] = useState<string>(
    preselectedTradition?.id || traditions[0]?.id || ''
  );
  const [contributorName, setContributorName] = useState<string>('');
  const [roleOrCommunity, setRoleOrCommunity] = useState<string>('');
  const [dialectAffiliation, setDialectAffiliation] = useState<string>('');
  const [annotationType, setAnnotationType] = useState<CommunityAnnotation['annotationType']>('cultural_context');
  const [proposedText, setProposedText] = useState<string>('');
  const [referenceSource, setReferenceSource] = useState<string>('');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contributorName.trim() || !proposedText.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await traditionsRepo.submitCommunityAnnotation({
        traditionId: selectedTraditionId,
        contributorName,
        roleOrCommunity,
        dialectAffiliation,
        annotationType,
        proposedText,
        referenceSource
      });

      if (res.success) {
        setSuccessMsg(res.message);
        onAnnotationSuccess();
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <CloseIcon size={18} />
          </button>
          <h3 className={styles.modalTitle}>Preserve & Annotate Oral Lore</h3>
          <p className={styles.modalSubtitle}>
            Submit community-verified dialect annotations, missing verse transcriptions, or bard lineage corrections.
          </p>
        </div>

        {/* Form Body */}
        {successMsg ? (
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(16,185,129,0.2)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckIcon size={24} />
            </div>
            <div className={styles.successMessage}>{successMsg}</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.formBody}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Target Oral Tradition</label>
              <select
                className={styles.formSelect}
                value={selectedTraditionId}
                onChange={(e) => setSelectedTraditionId(e.target.value)}
              >
                {traditions.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} ({t.state} — {t.dialect})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Contributor Name / Bard Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. R. Ramanathan or Pulavar Muthu"
                  className={styles.formInput}
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Community / Institutional Role</label>
                <input
                  type="text"
                  placeholder="e.g. Hereditary Bard, Folklorist, Elder"
                  className={styles.formInput}
                  value={roleOrCommunity}
                  onChange={(e) => setRoleOrCommunity(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Dialect / Linguistic Affiliation</label>
                <input
                  type="text"
                  placeholder="e.g. Nellai Tamil, Malabar Malayalam, Tulu-Kannada"
                  className={styles.formInput}
                  value={dialectAffiliation}
                  onChange={(e) => setDialectAffiliation(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Annotation Category</label>
                <select
                  className={styles.formSelect}
                  value={annotationType}
                  onChange={(e) => setAnnotationType(e.target.value as any)}
                >
                  <option value="cultural_context">Cultural & Ritual Context</option>
                  <option value="verse_correction">Verse Transcription / Correction</option>
                  <option value="lineage_update">Bard Lineage & Guru Parampara</option>
                  <option value="alternative_variant">Alternative Regional Variant</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Proposed Oral Text / Annotation Commentary *</label>
              <textarea
                required
                rows={4}
                placeholder="Transcribe the regional verse, phonetic notes, or ethnographic explanation..."
                className={styles.formTextarea}
                value={proposedText}
                onChange={(e) => setProposedText(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Oral Source / Field Recording Reference</label>
              <input
                type="text"
                placeholder="e.g. Pulavar M. Asan (Recorded 2023, Tenkasi), Family Genealogies"
                className={styles.formInput}
                value={referenceSource}
                onChange={(e) => setReferenceSource(e.target.value)}
              />
            </div>

            <div className={styles.modalFooter}>
              <button type="button" className={styles.cancelBtn} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                {isSubmitting ? 'Submitting...' : 'Submit for Archival Review'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
