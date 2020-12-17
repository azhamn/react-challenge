import React, { useState } from "react"
import LeaseDetailView from "./LeaseDetailView"
import LeaseView from "./LeaseView"

function App() {
    const [leaseId, setLeaseId] = useState(null)

    /**
     * Handler function for view details button
     * @param {int} lease-id
     */
    function handleDetailClick(id) {
        console.log("Button clicked: " + id)
        setLeaseId(id)
    }

    /**
     * Handler function for the close button
     */
    function handleCloseClick() {
        setLeaseId(null)
    }

    return (<>
        {leaseId == null && <LeaseView onDetailClick={handleDetailClick} />}
        {leaseId != null && <LeaseDetailView onCloseClick={handleCloseClick} leaseId={leaseId} />}
    </>)
}

export default App