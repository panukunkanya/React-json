import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const Table = ({ data, onEditClick }) => {

    const getGenderLabel = (gender) => {
        switch (gender) {
            case 'M':
                return 'Male';
            case 'F':
                return 'Female';
            default:
                return 'Unknown';
        }
    };

    return (
        <div className="container mt-4">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                <FontAwesomeIcon
                                    icon={faPen}
                                    onClick={() => onEditClick(item)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td style={{ cursor: 'pointer' }} title={getGenderLabel(item.gender)}>{item.gender}</td>
                            <td>{parseFloat(item.score).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
