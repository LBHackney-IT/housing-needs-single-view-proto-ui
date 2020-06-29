import React from 'react';
import styles from './SnapshotNoteContent.module.scss';

const buildUrl = id =>
  [process.env.REACT_APP_VULNERABILITIES_URL, 'snapshots', id].join('/');

const SnapshotNoteContent = ({
  snapshot: { id, vulnerabilities, assets, notes }
}) => (
  <div className={styles.snapshot}>
    <p>
      <strong>Vulnerabilities:</strong> {vulnerabilities.join(', ')}
    </p>
    <p>
      <strong>Strengths / assets:</strong> {assets.join(', ')}
    </p>
    {notes && (
      <p className={styles.note}>
        <strong>Additional note:</strong> {notes}
      </p>
    )}

    <a className={styles.link} href={buildUrl(id)}>
      View full vulnerabilities snapshot
    </a>
  </div>
);

export default SnapshotNoteContent;