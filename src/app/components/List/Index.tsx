import React, { useState, useRef } from 'react';
import Column from './Column';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ColumnData {
  id: number;
  title: string;
  completed: boolean;
}

export default function List() {
  const [columns, setColumns] = useState<ColumnData[]>([]);
  const idCounter = useRef<number>(1);

  const handleCreateColumn = () => {
    const newColumn: ColumnData = {
      id: idCounter.current,
      title: `Column ${idCounter.current}`,
      completed: false,
    };
    idCounter.current += 1;
    setColumns([...columns, newColumn]);
  };

  const handleEditColumn = (id: number, title: string) => {
    const updatedColumns = columns.map(column =>
      column.id === id ? { ...column, title } : column
    );
    setColumns(updatedColumns);
  };

  const handleDeleteColumn = (id: number) => {
    const updatedColumns = columns.filter(column => column.id !== id);
    // Adjust IDs after deletion
    const reindexedColumns = updatedColumns.map((column, index) => ({
      ...column,
      id: index + 1,
    }));
    setColumns(reindexedColumns);
    // Decrement idCounter if the deleted column's ID was greater than the counter
    if (id > idCounter.current) {
      idCounter.current -= 1;
    }
  };

  const handleToggleCompletion = (id: number) => {
    const updatedColumns = columns.map(column =>
      column.id === id ? { ...column, completed: !column.completed } : column
    );
    setColumns(updatedColumns);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCreateColumn}>Create Column</Button>
      {columns.map(column => (
        <Column
          key={column.id}
          column={column}
          onEdit={handleEditColumn}
          onDelete={handleDeleteColumn}
          onToggleCompletion={handleToggleCompletion}
        />
      ))}
    </div>
  );
}
