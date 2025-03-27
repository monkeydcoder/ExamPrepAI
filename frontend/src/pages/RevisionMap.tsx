import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  CircularProgress,
  Divider,
  Tooltip,
  Menu,
  MenuItem,
  Fab,
  InputAdornment,
  alpha,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import MapIcon from '@mui/icons-material/Map';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

const MotionPaper = motion(Paper);
const MotionCard = motion(Card);

// Types
interface Topic {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

interface RevisionMapData {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  createdAt: Date;
  updatedAt: Date;
}

const RevisionMap = () => {
  const theme = useTheme();
  // State for managing revision maps
  const [revisionMaps, setRevisionMaps] = useState<RevisionMapData[]>(() => {
    const savedMaps = localStorage.getItem('revisionMaps');
    return savedMaps ? JSON.parse(savedMaps) : [
      {
        id: '1',
        title: 'General Studies',
        description: 'Core topics for UPSC Prelims',
        topics: [
          { id: '1-1', name: 'Indian Polity', description: 'Constitution, governance, etc.', completed: true },
          { id: '1-2', name: 'Indian Economy', description: 'Economic policies, banking, etc.', completed: true },
          { id: '1-3', name: 'Geography', description: 'Physical & human geography', completed: false },
          { id: '1-4', name: 'Science & Technology', description: 'Latest advancements', completed: false },
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  });

  // State for dialogs
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [topicDialogOpen, setTopicDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  
  // State for form inputs
  const [newMapTitle, setNewMapTitle] = useState('');
  const [newMapDescription, setNewMapDescription] = useState('');
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicDescription, setNewTopicDescription] = useState('');
  
  // State for editing
  const [editMode, setEditMode] = useState(false);
  const [currentMapId, setCurrentMapId] = useState<string | null>(null);
  const [currentTopicId, setCurrentTopicId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{type: 'map' | 'topic', id: string} | null>(null);

  // Menu state
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMapForMenu, setSelectedMapForMenu] = useState<string | null>(null);

  // Save to localStorage whenever revisionMaps changes
  useEffect(() => {
    localStorage.setItem('revisionMaps', JSON.stringify(revisionMaps));
  }, [revisionMaps]);

  // Calculate completion percentage for a map
  const calculateCompletion = (map: RevisionMapData) => {
    if (map.topics.length === 0) return 0;
    const completedCount = map.topics.filter(topic => topic.completed).length;
    return Math.round((completedCount / map.topics.length) * 100);
  };

  // Handle map dialog open
  const handleAddMapClick = () => {
    setEditMode(false);
    setNewMapTitle('');
    setNewMapDescription('');
    setMapDialogOpen(true);
  };

  // Handle map edit
  const handleEditMap = (mapId: string) => {
    const map = revisionMaps.find(m => m.id === mapId);
    if (map) {
      setEditMode(true);
      setCurrentMapId(mapId);
      setNewMapTitle(map.title);
      setNewMapDescription(map.description);
      setMapDialogOpen(true);
    }
    handleMenuClose();
  };

  // Handle map dialog close
  const handleMapDialogClose = () => {
    setMapDialogOpen(false);
  };

  // Handle map save
  const handleMapSave = () => {
    if (!newMapTitle.trim()) return;

    if (editMode && currentMapId) {
      // Update existing map
      setRevisionMaps(maps => 
        maps.map(map => 
          map.id === currentMapId 
            ? { 
                ...map, 
                title: newMapTitle, 
                description: newMapDescription,
                updatedAt: new Date()
              } 
            : map
        )
      );
    } else {
      // Create new map
      const newMap: RevisionMapData = {
        id: Date.now().toString(),
        title: newMapTitle,
        description: newMapDescription,
        topics: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setRevisionMaps([...revisionMaps, newMap]);
    }
    setMapDialogOpen(false);
  };

  // Handle topic dialog open
  const handleAddTopicClick = (mapId: string) => {
    setEditMode(false);
    setCurrentMapId(mapId);
    setNewTopicName('');
    setNewTopicDescription('');
    setTopicDialogOpen(true);
  };

  // Handle topic edit
  const handleEditTopic = (mapId: string, topicId: string) => {
    const map = revisionMaps.find(m => m.id === mapId);
    const topic = map?.topics.find(t => t.id === topicId);
    
    if (map && topic) {
      setEditMode(true);
      setCurrentMapId(mapId);
      setCurrentTopicId(topicId);
      setNewTopicName(topic.name);
      setNewTopicDescription(topic.description);
      setTopicDialogOpen(true);
    }
  };

  // Handle topic dialog close
  const handleTopicDialogClose = () => {
    setTopicDialogOpen(false);
  };

  // Handle topic save
  const handleTopicSave = () => {
    if (!newTopicName.trim() || !currentMapId) return;

    setRevisionMaps(maps => 
      maps.map(map => {
        if (map.id !== currentMapId) return map;
        
        let updatedTopics;
        
        if (editMode && currentTopicId) {
          // Update existing topic
          updatedTopics = map.topics.map(topic => 
            topic.id === currentTopicId 
              ? { ...topic, name: newTopicName, description: newTopicDescription }
              : topic
          );
        } else {
          // Add new topic
          const newTopic: Topic = {
            id: Date.now().toString(),
            name: newTopicName,
            description: newTopicDescription,
            completed: false
          };
          updatedTopics = [...map.topics, newTopic];
        }
        
        return { 
          ...map, 
          topics: updatedTopics,
          updatedAt: new Date()
        };
      })
    );
    
    setTopicDialogOpen(false);
  };

  // Handle topic completion toggle
  const handleToggleComplete = (mapId: string, topicId: string) => {
    setRevisionMaps(maps => 
      maps.map(map => {
        if (map.id !== mapId) return map;
        
        const updatedTopics = map.topics.map(topic => 
          topic.id === topicId 
            ? { ...topic, completed: !topic.completed }
            : topic
        );
        
        return { 
          ...map, 
          topics: updatedTopics,
          updatedAt: new Date()
        };
      })
    );
  };

  // Delete confirmation
  const handleDeleteClick = (type: 'map' | 'topic', id: string, mapId?: string) => {
    setItemToDelete({ 
      type, 
      id: type === 'map' ? id : `${mapId}:${id}` // For topics, we store both ids
    });
    setDeleteConfirmOpen(true);
    handleMenuClose();
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === 'map') {
      // Delete map
      setRevisionMaps(maps => maps.filter(map => map.id !== itemToDelete.id));
    } else {
      // Delete topic
      const [mapId, topicId] = itemToDelete.id.split(':');
      setRevisionMaps(maps => 
        maps.map(map => {
          if (map.id !== mapId) return map;
          return {
            ...map,
            topics: map.topics.filter(topic => topic.id !== topicId),
            updatedAt: new Date()
          };
        })
      );
    }
    
    setDeleteConfirmOpen(false);
    setItemToDelete(null);
  };

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, mapId: string) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedMapForMenu(mapId);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedMapForMenu(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Revision Maps
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon sx={{ visibility: 'visible !important', color: '#ffffff !important' }} />}
          onClick={handleAddMapClick}
          size="medium"
          sx={{
            fontWeight: 600,
            px: 2,
            py: 1,
            '& .MuiSvgIcon-root': {
              visibility: 'visible !important',
              color: '#ffffff !important',
              opacity: 1
            }
          }}
        >
          Add New Map
        </Button>
      </Box>

      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Organize your revision with customized maps for different subjects and track your progress.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {revisionMaps.map((map) => (
          <Grid item xs={12} md={6} key={map.id}>
            <MotionCard
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 3,
                overflow: 'visible'
              }}
            >
              <CardHeader
                title={map.title}
                action={
                  <>
                    <IconButton 
                      aria-label="map settings"
                      onClick={(e) => handleMenuOpen(e, map.id)}
                      sx={{ 
                        color: theme.palette.mode === 'dark' ? '#e2e8f0' : theme.palette.text.secondary
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={menuAnchorEl}
                      open={Boolean(menuAnchorEl) && selectedMapForMenu === map.id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleEditMap(map.id)}>
                        <EditIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
                        Edit Map
                      </MenuItem>
                      <MenuItem onClick={() => handleDeleteClick('map', map.id)}>
                        <DeleteIcon fontSize="small" sx={{ mr: 1, color: theme.palette.error.main }} />
                        Delete Map
                      </MenuItem>
                    </Menu>
                  </>
                }
                subheader={
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                      {map.description}
                    </Typography>
                  </Box>
                }
              />
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  px: 2,
                  py: 1,
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05)
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress 
                    variant="determinate" 
                    value={calculateCompletion(map)} 
                    size={36} 
                    thickness={5}
                    sx={{ mr: 2 }}
                  />
                  <Typography variant="h6">
                    {calculateCompletion(map)}% Complete
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {map.topics.filter(t => t.completed).length}/{map.topics.length} Topics
                </Typography>
              </Box>
              <Divider />
              <CardContent sx={{ flexGrow: 1, p: 0 }}>
                <List sx={{ p: 0 }}>
                  {map.topics.length > 0 ? (
                    map.topics.map((topic) => (
                      <ListItem
                        key={topic.id}
                        secondaryAction={
                          <Box>
                            <Tooltip title="Edit">
                              <IconButton 
                                edge="end" 
                                aria-label="edit"
                                onClick={() => handleEditTopic(map.id, topic.id)}
                                size="small"
                                sx={{ 
                                  mr: 1,
                                  color: theme.palette.mode === 'dark' ? '#e2e8f0' : theme.palette.text.secondary
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton 
                                edge="end" 
                                aria-label="delete"
                                onClick={() => handleDeleteClick('topic', topic.id, map.id)}
                                size="small"
                                sx={{ 
                                  color: theme.palette.mode === 'dark' ? '#f87171' : theme.palette.error.main
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        }
                        sx={{ 
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                          transition: 'background-color 0.2s',
                          '&:hover': {
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03),
                          },
                        }}
                      >
                        <ListItemIcon onClick={() => handleToggleComplete(map.id, topic.id)}>
                          {topic.completed ? (
                            <CheckCircleIcon color="success" />
                          ) : (
                            <RadioButtonUncheckedIcon color="primary" />
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary={
                            <Typography
                              sx={{
                                textDecoration: topic.completed ? 'line-through' : 'none',
                                color: topic.completed ? 'text.secondary' : 'text.primary',
                              }}
                            >
                              {topic.name}
                            </Typography>
                          }
                          secondary={topic.description}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText 
                        primary="No topics added yet" 
                        secondary="Click the + button below to add topics"
                        sx={{ textAlign: 'center', py: 4 }}
                      />
                    </ListItem>
                  )}
                </List>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', p: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon sx={{ visibility: 'visible !important', color: '#ffffff !important' }} />}
                  onClick={() => handleAddTopicClick(map.id)}
                  size="small"
                  sx={{ mt: 2 }}
                >
                  Add Topic
                </Button>
              </CardActions>
            </MotionCard>
          </Grid>
        ))}
      </Grid>

      {/* Map Creation/Edit Dialog */}
      <Dialog open={mapDialogOpen} onClose={handleMapDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Map' : 'Create New Map'}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            {editMode 
              ? 'Update your revision map details below.' 
              : 'Create a new revision map to organize your study topics.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            placeholder="Enter map title"
            type="text"
            fullWidth
            variant="outlined"
            value={newMapTitle}
            onChange={(e) => setNewMapTitle(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            placeholder="Enter map description"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newMapDescription}
            onChange={(e) => setNewMapDescription(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMapDialogClose} color="inherit">Cancel</Button>
          <Button onClick={handleMapSave} color="primary" variant="contained">
            {editMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Topic Creation/Edit Dialog */}
      <Dialog open={topicDialogOpen} onClose={handleTopicDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Topic' : 'Add New Topic'}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            {editMode 
              ? 'Update your topic details below.' 
              : 'Add a new topic to your revision map.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Topic Name"
            placeholder="Enter topic name"
            type="text"
            fullWidth
            variant="outlined"
            value={newTopicName}
            onChange={(e) => setNewTopicName(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            placeholder="Enter topic description"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newTopicDescription}
            onChange={(e) => setNewTopicDescription(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTopicDialogClose} color="inherit">Cancel</Button>
          <Button onClick={handleTopicSave} color="primary" variant="contained">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle sx={{ color: theme.palette.mode === 'dark' ? '#e2e8f0' : theme.palette.text.primary }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: theme.palette.mode === 'dark' ? '#cbd5e1' : theme.palette.text.secondary }}>
            {itemToDelete?.type === 'map' 
              ? 'Are you sure you want to delete this revision map? This will remove all topics within it.'
              : 'Are you sure you want to delete this topic?'
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RevisionMap; 