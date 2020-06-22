import React, { Component } from 'react';
import moment from 'moment';
import DocumentModal from '../../DocumentModal';
import NoteContent from './NoteContent';
import SnapshotNoteContent from './SnapshotNoteContent';

export default class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDoc: false,
      expanded: false
    };

    this.maxNoteLength = 128;

    if (this.props.note && this.props.note.type === 'document') {
      if (this.props.note.system === 'UHW') {
        this.docUrl = `${process.env.REACT_APP_UHW_DOCUMENT_API_URL}/documents/${this.props.note.id}/view`;
      }
      if (this.props.note.system === 'COMINO') {
        this.docUrl = `${process.env.REACT_APP_COMINO_DOCUMENT_API_URL}/documents/${this.props.note.id}/view`;
      }
      if (this.props.note.system === 'JIGSAW') {
        this.docUrl = `${process.env.REACT_APP_JIGSAW_DOCUMENT_API_URL}/customers/${this.props.note.userid}/documents/${this.props.note.id}`;
      }
    }
  }

  click = () => {
    this.setState({ showDoc: true });
  };

  closeDoc = () => {
    this.setState({ showDoc: false });
  };

  toggleNote = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  expandButton = () => {
    if (this.props.note.text?.length > this.maxNoteLength) {
      const className = this.state.expanded
        ? 'govuk-details__summary govuk-details__summary__arrow-up'
        : 'govuk-details__summary';
      const linkText = this.state.expanded ? 'Read less' : 'Read more';
      return (
        <span onClick={this.toggleNote} className={className}>
          {linkText}
        </span>
      );
    }
  };

  renderNoteContent = () => {
    switch (this.props.note.type) {
      case 'snapshot':
        return <SnapshotNoteContent snapshot={this.props.note} />;
      default:
        return (
          <NoteContent
            text={this.props.note.text}
            trimmed={!this.state.expanded}
            trimmedLength={this.maxNoteLength}
          />
        );
    }
  };

  render() {
    return (
      <tr>
        <td key="date">{moment(this.props.note.date).format('DD/MM/YYYY')}</td>
        <td key="text">
          <p>
            <strong>
              {this.docUrl ? (
                <button onClick={this.click} className="linkStyle govuk-link">
                  {this.props.note.title}
                </button>
              ) : (
                  this.props.note.title
                )}
            </strong>
          </p>
          {this.renderNoteContent()}
          {this.expandButton()}
          <DocumentModal
            open={this.state.showDoc}
            onClose={this.closeDoc}
            url={this.docUrl}
          />
        </td>
        <td key="sys">
          <p>
            <strong>{this.props.note.user}</strong>
          </p>
          <p>
            {this.props.note.system.join
              ? this.props.note.system.join(', ')
              : this.props.note.system}
          </p>
        </td>
      </tr>
    );
  }
}
