import React from 'react'

/**
 * Table component accepts an array of objects which will be populated in a table.
 * Expects the object keys to be the same, as the table headers are extracted from the first objcet in the array
 */
export default function Table(props) {
    const content = props.content

    function generateTableHeader() {
        if (content.length !== 0) {
            return (
                <thead>
                    <tr>
                        {Object.keys(content[0]).map((key, index) => {
                            return <th key={index}>{key.toUpperCase()}</th>
                        })}
                    </tr>
                </thead>
            )
        }
    }

    function generateTableBody() {
        if (content.length !== 0) {
            return (
                <tbody>
                    {content.map((el, index) => {
                        return <tr key={index}>
                            {Object.values(el).map((key, index) => {
                                return <td key={index}>{key}</td>
                            })}
                        </tr>

                    })}

                </tbody>
            )
        }
    }

    return (
        <table>
            {generateTableHeader()}
            {generateTableBody()}
        </table>
    )
}