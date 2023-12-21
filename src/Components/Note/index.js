import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PaletteIcon from '@mui/icons-material/Palette';
import { SketchPicker } from 'react-color';
import './style.css';

export default function Note({ note, setNotes }) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  console.log(note.title)
 // console.log('Save edit:', editedTitle, editedContent);

  function deleteNote() {
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));
  }
  useEffect(()=>{
    setEditedTitle(note.title)
    setEditedContent(note.content)
    console.log('Save edit:', editedTitle, editedContent);
  },[note])

  function handleColorChange(color) {
    setNotes((prevNotes) =>
      prevNotes.map((n) =>
        n.id === note.id ? { ...n, color: color.hex } : n
      )
    );
  }

  function handleColorPickerToggle() {
    setShowColorPicker(!showColorPicker);
  }

  function handleEditToggle() {
    setEditMode(!editMode);
  }

  function handleSaveEdit() {
    setNotes((prevNotes) =>
      prevNotes.map((n) =>
        n.id === note.id ? { ...n, title: editedTitle, content: editedContent } : n
      )
    );
    setEditMode(false);
  }

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: note.color || '#212125' }}>
      <CardContent>
        <div className="id">{note.id}</div>
        {editMode ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </>
        ) : (
          <>
            <Typography gutterBottom variant="h5" component="div">
              {note.title}
            </Typography>
            <Typography variant="body2">{note.content}</Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        {editMode ? (
          <Button size="small" onClick={handleSaveEdit}>
            Save
          </Button>
        ) : (
          <>
            <Button size="small" onClick={handleEditToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </Button>
            <Button size="small" onClick={deleteNote}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </Button>
            <Button size="small" onClick={handleColorPickerToggle}>
              <PaletteIcon />
            </Button>
          </>
        )}
      </CardActions>
      {showColorPicker && (
        <div style={{ position: 'absolute', zIndex: 1 }}>
          <SketchPicker color={note.color || '#212125'} onChange={handleColorChange} />
        </div>
      )}
    </Card>
  );
}
