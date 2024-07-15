import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Table from './components/Table';

function App() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/sample-data.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addNewData = (newData, isEdit) => {
    if (isEdit) {
      const updatedData = data.map(item =>
        item.id === newData.id ? newData : item
      );
      setData(updatedData);
    } else {
      setData([...data, newData]);
    }
  };

  const handleEditClick = (item) => {
    setEditData(item);
  };

  const lastId = data.length > 0 ? Math.max(...data.map(item => item.id)) : 0;

  return (
    <div className='container mt-5'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Home addNewData={addNewData} lastId={lastId} editData={editData} />
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <Table data={data} onEditClick={handleEditClick} />
        </div>
      </div>
    </div>
  );
}

export default App;
