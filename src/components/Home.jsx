import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = ({ addNewData, lastId, editData }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('unknown');
    const [score, setScore] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [scoreError, setScoreError] = useState('');
    const [editingId, setEditingId] = useState(null); 

    useEffect(() => {
        if (editData) {
            setFirstName(editData.firstname);
            setLastName(editData.lastname);
            setGender(editData.gender);
            setScore(editData.score);
            setEditingId(editData.id);
        }
    }, [editData]);

    const handleAddClick = () => {
        let errors = false;

        if (!firstName) {
            setFirstNameError('First name is required.');
            errors = true;
        } else {
            setFirstNameError('');
        }

        if (!lastName) {
            setLastNameError('Last name is required.');
            errors = true;
        } else {
            setLastNameError('');
        }

        if (!gender || gender === 'unknown') {
            setGenderError('Gender is required.');
            errors = true;
        } else {
            setGenderError('');
        }

        if (!score) {
            setScoreError('Score is required.');
            errors = true;
        } else if (score <= 0) {
            setScoreError('Minimum score is 0.');
            errors = true;
        } else if (score > 100) {
            setScoreError('Maximum score is 100.');
            errors = true;
        } else {
            setScoreError('');
        }

        if (!errors) {
            if (editingId !== null) {
                const updatedData = {
                    id: editingId,
                    firstname: firstName,
                    lastname: lastName,
                    gender: gender,
                    score: parseFloat(score).toFixed(2),
                };
                addNewData(updatedData, true);
                setEditingId(null);
            } else {
                const newData = {
                    id: lastId + 1,
                    firstname: firstName,
                    lastname: lastName,
                    gender: gender,
                    score: parseFloat(score).toFixed(2),
                };
                addNewData(newData, false);
            }

            setFirstName('');
            setLastName('');
            setGender('unknown');
            setScore('');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="w-50">
                <div className="mb-3">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="firstName" className="form-label">First name</label>
                            <input
                                type="text"
                                id="firstName"
                                className="form-control mb-2"
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                    setFirstNameError('');
                                }}
                            />
                            {firstNameError && <small className="text-danger">{firstNameError}</small>}
                        </div>
                        <div className="col">
                            <label htmlFor="lastName" className="form-label">Last name</label>
                            <input
                                type="text"
                                id="lastName"
                                className="form-control"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                    setLastNameError('');
                                }}
                            />
                            {lastNameError && <small className="text-danger">{lastNameError}</small>}
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                className="form-select"
                                value={gender}
                                onChange={(e) => {
                                    setGender(e.target.value);
                                    setGenderError('');
                                }}
                            >
                                <option value="unknown">Unknown</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                            {genderError && <small className="text-danger">{genderError}</small>}
                        </div>
                        <div className="col">
                            <label htmlFor="score" className="form-label">Score</label>
                            <input
                                type="number"
                                id="score"
                                className="form-control"
                                value={score}
                                onChange={(e) => {
                                    setScore(e.target.value);
                                    setScoreError('');
                                }}
                            />
                            {scoreError && <small className="text-danger">{scoreError}</small>}
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary me-2 px-4" onClick={handleAddClick}>
                        {editingId !== null ? 'Edit' : 'Add'}
                    </button>
                    <button className="btn btn-outline-secondary px-4" onClick={() => {
                        setFirstName('');
                        setLastName('');
                        setGender('unknown');
                        setScore('');
                        setEditingId(null);
                    }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
