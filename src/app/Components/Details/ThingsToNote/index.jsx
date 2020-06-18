import React, { useState, useCallback, useEffect } from 'react';
import CreateVulnerability from '../../../Gateways/CreateVulnerability';
import FindLatestSnapshot from '../../../Gateways/FindLatestSnapshot';
import SnapshotSummary from './SnapshotSummary';

const ThingsToNote = ({ customerId }) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    snapshot: null
  });

  useEffect(() => {
    const fetch = async () => {
      const { data, success } = await FindLatestSnapshot({ customerId });
      setState(state => ({
        ...state,
        loading: false,
        snapshot: data,
        error: !success ? 'Failed to fetch latest snapshot' : null
      }));
    };

    setState(state => ({ ...state, loading: true }));
    fetch();
  }, [customerId]);

  const createSnapshot = useCallback(async () => {
    setState({ ...state, loading: true });
    try {
      const { location } = await CreateVulnerability({ customerId });
      window.location.href = location;
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: 'Error creating snapshot'
      });
    }
  }, [state, customerId]);

  return (
    <div className="details__left-column__item">
      <h2>Things to note</h2>
      {state.loading
        ? 'Loading...'
        : state.snapshot && <SnapshotSummary snapshot={state.snapshot} />}
      <button
        className="govuk-button lbh-button"
        onClick={createSnapshot}
        disabled={state.loading}
      >
        Add a vulnerability snapshot
      </button>
      {state.error && <div>{state.error}</div>}
    </div>
  );
};

export default ThingsToNote;
