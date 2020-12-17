import React, { useEffect, useState } from 'react'
import Table from './Table.js'

function LeaseView(props) {

  const [leases, setLeases] = useState([])

  useEffect(() => {
    fetch("https://hiring-task-api.herokuapp.com/v1/leases")
      .then(response => response.json())
      .then(responseData => setLeases(responseData));
  }, [])

  /**
   * Returns a button element with the onclick handler set to update the leaseId state in the parent component
   * @param {int} leaseId 
   */
  function getButton(leaseId) {
    return (
      <button onClick={() => props.onDetailClick(leaseId)}>View Details</button>
    )
  }

  let leaseTableContent = leases

  if (leaseTableContent.length !== 0) {
    leaseTableContent = leases.map(lease => (
      { ...lease, "Details": getButton(lease.id) }
    ))
  }

  return (
    <>
      <h1>Current Leases</h1>
      <Table content={leaseTableContent} />
    </>)
}

export default LeaseView