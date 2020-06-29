import React from 'react';
import styles from './SnapshotNoteContent.module.scss';

const buildUrl = id =>
  [process.env.REACT_APP_VULNERABILITIES_URL, 'snapshots', id].join('/');

const SnapshotNoteContent = ({
  expandBtn,
  snapshot: { id, vulnerabilities, assets, text },
  trimmed,
  trimmedLength = 128
}) => {
  return (
    <div className={styles.snapshot}>
      <p>
        <strong>Vulnerabilities:</strong> {vulnerabilities.join(', ')}
      </p>
      <p>
        <strong>Strengths / assets:</strong> {assets.join(', ')}
      </p>
      {text && (
        <p className={styles.note} style={{ overflowWrap: 'break-word' }}>
          <strong>Additional note:</strong>{' '}
          {trimmed && text.length > trimmedLength
            ? `${text.substring(0, trimmedLength)} ...`
            : text}
        </p>
      )}
      {expandBtn}
      <a className={styles.link} href={buildUrl(id)}>
        View full vulnerabilities snapshot
      </a>
    </div>
  );
};

export default SnapshotNoteContent;
