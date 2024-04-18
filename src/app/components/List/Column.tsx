import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ColumnProps {
    column: {
        id: number;
        title: string;
        completed: boolean;
    };
    onEdit: (id: number, title: string) => void;
    onDelete: (id: number) => void;
    onToggleCompletion: (id: number) => void;
}

export default function Column({ column, onEdit, onDelete, onToggleCompletion }: ColumnProps) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(column.title);

    useEffect(() => {
        setTitle(column.title);
    }, [column.title]);

    const handleEdit = () => {
        setTitle(column.title.replace(/\s*\d+$/, ''));
        setEditing(true);
    };

    const handleSaveEdit = () => {
        onEdit(column.id, title);
        setEditing(false);
    };

    const handleCancelEdit = () => {
        setTitle(column.title);
        setEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const formattedTitle = column.title.replace(/\s*\d+$/, '');

    return (
        <div style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            {editing ? (
                <div className='w-100 flex justify-between  pr-4'>
                    <TextField
                        value={title}
                        onChange={handleChange}
                        id="filled-required"
                        label="Edit"
                        defaultValue="Hello World"
                        variant="filled"
                        color="primary"
                    />
                    <div className="flex items-center">
                        <div className="pr-3">
                            <Button variant="contained" color="primary" onClick={handleSaveEdit}>Save</Button>
                        </div>
                        <Button variant="contained" onClick={handleCancelEdit}>Cancel</Button>
                    </div>
                </div>
            ) : (
                <div className='flex justify-between items-center px-4'>
                    <Typography variant="body1" style={{ textDecoration: column.completed ? 'line-through' : 'none' }}>
                        {formattedTitle}
                    </Typography>
                    <div className="flex" style={{ padding: '0 0 0', }}>
                        <div>
                            <Button variant="contained" color="primary" onClick={handleEdit}>Edit</Button>
                        </div>
                        <div className='px-3'>
                            <Button variant="contained" onClick={() => onToggleCompletion(column.id)}>Finished</Button>
                        </div>
                        <div>
                            <Button variant="contained" color="error" onClick={() => onDelete(column.id)}>Delete</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


