import React, { useState, useEffect, useRef } from 'react';
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
  useTheme,
  Chip,
  Slider,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Tab,
  Tabs,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  RadioGroup,
  Radio,
  FormControlLabel
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
import LinkIcon from '@mui/icons-material/Link';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotesIcon from '@mui/icons-material/Notes';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TimerIcon from '@mui/icons-material/Timer';
import PersonIcon from '@mui/icons-material/Person';
import MindMap from '@mui/icons-material/AccountTree';
import EventIcon from '@mui/icons-material/Event';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FlagIcon from '@mui/icons-material/Flag';
import TodayIcon from '@mui/icons-material/Today';
import DescriptionIcon from '@mui/icons-material/Description';
import BookIcon from '@mui/icons-material/Book';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import RemoveIcon from '@mui/icons-material/Remove';

const MotionPaper = motion(Paper);
const MotionCard = motion(Card);
const MotionBox = motion(Box);

// Enhanced Types
interface StudyResource {
  id: string;
  title: string;
  type: 'note' | 'link' | 'book' | 'video' | 'practice';
  url?: string;
  description?: string;
}

interface Subtopic {
  id: string;
  name: string;
  completed: boolean;
}

interface RelatedTopic {
  topicId: string;
  relationship: 'prerequisite' | 'related' | 'extension';
}

interface StudySession {
  id: string;
  date: Date;
  duration: number; // in minutes
  completed: boolean;
  notes?: string;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  color?: string;
  difficulty?: number; // 1-5 scale
  estimatedStudyTime?: number; // in hours
  resources?: StudyResource[];
  subtopics?: Subtopic[];
  relatedTopics?: RelatedTopic[];
  studySessions?: StudySession[];
  keyPoints?: string[];
  notes?: string;
  lastReviewed?: Date;
  dueDate?: Date;
}

interface RevisionMapData {
  id: string;
  title: string;
  description: string;
  subject?: string;
  topics: Topic[];
  createdAt: Date;
  updatedAt: Date;
  examDate?: Date;
  icon?: string;
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
        subject: 'UPSC',
        topics: [
          { 
            id: '1-1', 
            name: 'Indian Polity', 
            description: 'Constitution, governance, etc.', 
            completed: true,
            priority: 'high',
            color: '#8884d8',
            difficulty: 4,
            estimatedStudyTime: 20,
            keyPoints: [
              'Indian Constitution',
              'Parliamentary System',
              'Fundamental Rights',
              'Directive Principles'
            ],
            resources: [
              {id: '1-1-1', title: 'Laxmikanth Polity', type: 'book', description: 'Complete reference for Indian Polity'}
            ],
            subtopics: [
              {id: '1-1-1', name: 'Constitution', completed: true},
              {id: '1-1-2', name: 'Parliament', completed: false},
            ]
          },
          { 
            id: '1-2', 
            name: 'Indian Economy', 
            description: 'Economic policies, banking, etc.', 
            completed: true,
            priority: 'high',
            color: '#82ca9d',
            difficulty: 3,
            estimatedStudyTime: 15
          },
          { 
            id: '1-3', 
            name: 'Geography', 
            description: 'Physical & human geography', 
            completed: false,
            priority: 'medium',
            color: '#ffc658',
            difficulty: 3,
            estimatedStudyTime: 12
          },
          { 
            id: '1-4', 
            name: 'Science & Technology', 
            description: 'Latest advancements', 
            completed: false,
            priority: 'low',
            color: '#ff8042',
            difficulty: 2,
            estimatedStudyTime: 8
          },
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
  const [resourceDialogOpen, setResourceDialogOpen] = useState(false);
  const [studySessionDialogOpen, setStudySessionDialogOpen] = useState(false);
  const [mindMapDialogOpen, setMindMapDialogOpen] = useState(false);
  
  // State for form inputs
  const [newMapTitle, setNewMapTitle] = useState('');
  const [newMapDescription, setNewMapDescription] = useState('');
  const [newMapSubject, setNewMapSubject] = useState('');
  const [newMapExamDate, setNewMapExamDate] = useState<Date | null>(null);
  
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicDescription, setNewTopicDescription] = useState('');
  const [newTopicPriority, setNewTopicPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [newTopicColor, setNewTopicColor] = useState('');
  const [newTopicDifficulty, setNewTopicDifficulty] = useState<number>(3);
  const [newTopicEstimatedStudyTime, setNewTopicEstimatedStudyTime] = useState<number>(10);
  const [newTopicKeyPoints, setNewTopicKeyPoints] = useState<string[]>([]);
  const [newTopicNotes, setNewTopicNotes] = useState('');
  
  const [newResourceTitle, setNewResourceTitle] = useState('');
  const [newResourceType, setNewResourceType] = useState<'note' | 'link' | 'book' | 'video' | 'practice'>('note');
  const [newResourceUrl, setNewResourceUrl] = useState('');
  const [newResourceDescription, setNewResourceDescription] = useState('');
  
  const [newSessionDate, setNewSessionDate] = useState<Date | null>(new Date());
  const [newSessionDuration, setNewSessionDuration] = useState(30);
  const [newSessionNotes, setNewSessionNotes] = useState('');
  
  // State for editing
  const [editMode, setEditMode] = useState(false);
  const [currentMapId, setCurrentMapId] = useState<string | null>(null);
  const [currentTopicId, setCurrentTopicId] = useState<string | null>(null);
  const [currentResourceId, setCurrentResourceId] = useState<string | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{type: 'map' | 'topic' | 'resource' | 'session', id: string} | null>(null);

  // UI state
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMapForMenu, setSelectedMapForMenu] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedMap, setSelectedMap] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'mindmap' | 'schedule'>('list');
  const [showMindMap, setShowMindMap] = useState(false);

  // References
  const mindMapContainerRef = useRef<HTMLDivElement>(null);

  // Save to localStorage whenever revisionMaps changes
  useEffect(() => {
    localStorage.setItem('revisionMaps', JSON.stringify(revisionMaps));
  }, [revisionMaps]);

  // Initialize the selected map
  useEffect(() => {
    if (revisionMaps.length > 0 && !selectedMap) {
      setSelectedMap(revisionMaps[0].id);
    }
  }, [revisionMaps, selectedMap]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleViewModeChange = (mode: 'list' | 'mindmap' | 'schedule') => {
    setViewMode(mode);
  };

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
              ? { 
                  ...topic, 
                  name: newTopicName, 
                  description: newTopicDescription,
                  priority: newTopicPriority,
                  color: newTopicColor || topic.color,
                  difficulty: newTopicDifficulty,
                  estimatedStudyTime: newTopicEstimatedStudyTime,
                  notes: newTopicNotes
                }
              : topic
          );
        } else {
          // Add new topic
          const newTopic: Topic = {
            id: Date.now().toString(),
            name: newTopicName,
            description: newTopicDescription,
            completed: false,
            priority: newTopicPriority,
            color: newTopicColor || `#${Math.floor(Math.random()*16777215).toString(16)}`,
            difficulty: newTopicDifficulty,
            estimatedStudyTime: newTopicEstimatedStudyTime,
            keyPoints: newTopicKeyPoints || [],
            notes: newTopicNotes || ''
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
  const handleDeleteClick = (type: 'map' | 'topic' | 'resource' | 'session', id: string, mapId?: string) => {
    setItemToDelete({ 
      type, 
      id: type === 'map' ? id : type === 'topic' ? `${mapId}:${id}` : type === 'resource' ? id : type === 'session' ? id : `${mapId}:${id}` // For topics and resources, we store both ids
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
      // Delete topic or resource
      const [mapId, topicId] = itemToDelete.id.split(':');
      if (itemToDelete.type === 'topic') {
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
      } else if (itemToDelete.type === 'resource') {
        setRevisionMaps(maps => 
          maps.map(map => {
            if (map.id !== mapId) return map;
            return {
              ...map,
              topics: map.topics.map(topic => 
                topic.id === topicId 
                  ? { ...topic, resources: topic.resources?.filter(r => r.id !== topicId) }
                  : topic
              ),
              updatedAt: new Date()
            };
          })
        );
      } else if (itemToDelete.type === 'session') {
        setRevisionMaps(maps => 
          maps.map(map => {
            if (map.id !== mapId) return map;
            return {
              ...map,
              topics: map.topics.map(topic => 
                topic.id === topicId 
                  ? { ...topic, studySessions: topic.studySessions?.filter(s => s.id !== topicId) }
                  : topic
              ),
              updatedAt: new Date()
            };
          })
        );
      }
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

  // Mind Map Component
  const MindMapView = ({ map }: { map: RevisionMapData }) => {
    const theme = useTheme();
    const mindMapRef = useRef<HTMLDivElement>(null);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isHovering, setIsHovering] = useState<string | null>(null);

    // Define types for our node tree
    interface MindMapNode {
      id: string;
      name: string;
      children: MindMapNode[];
      depth: number;
      index: number;
      completed?: boolean;
      priority?: 'high' | 'medium' | 'low';
      color: string;
      x: number;
      y: number;
      parentId?: string;
    }

    interface NodeTree {
      root: MindMapNode;
      nodeMap: Map<string, MindMapNode>;
    }

    useEffect(() => {
      if (mindMapRef.current) {
        const { width, height } = mindMapRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }

      const handleResize = () => {
        if (mindMapRef.current) {
          const { width, height } = mindMapRef.current.getBoundingClientRect();
          setDimensions({ width, height });
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!map || !map.topics || map.topics.length === 0) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <Typography variant="subtitle1" color="text.secondary">
            No topics available to display in mind map view
          </Typography>
        </Box>
      );
    }

    // Create a properly organized node tree for better layout
    const createNodeTree = (): NodeTree => {
      const nodeMap = new Map<string, MindMapNode>();
      
      // Create root node
      const rootNode: MindMapNode = {
        id: 'root',
        name: map.title,
        children: [],
        depth: 0,
        index: 0,
        x: 0,
        y: 0,
        color: theme.palette.primary.main
      };
      
      nodeMap.set('root', rootNode);
      
      // Create nodes for each topic
      map.topics.forEach((topic, index) => {
        const node: MindMapNode = {
          id: topic.id,
          name: topic.name,
          children: [],
          depth: 1,
          index,
          completed: topic.completed,
          priority: topic.priority,
          color: topic.color || theme.palette.secondary.main,
          // Will calculate x,y later
          x: 0,
          y: 0
        };
        
        nodeMap.set(topic.id, node);
        rootNode.children.push(node);
        
        // Add subtopics if they exist
        if (topic.subtopics && topic.subtopics.length > 0) {
          topic.subtopics.forEach((subtopic, subIndex) => {
            const subNode: MindMapNode = {
              id: subtopic.id,
              name: subtopic.name,
              children: [],
              depth: 2,
              parentId: topic.id,
              index: subIndex,
              completed: subtopic.completed,
              color: alpha(topic.color || theme.palette.secondary.main, 0.8),
              x: 0,
              y: 0
            };
            
            nodeMap.set(subtopic.id, subNode);
            node.children.push(subNode);
          });
        }
      });
      
      return { root: rootNode, nodeMap };
    };
    
    const { root, nodeMap } = createNodeTree();
    
    // Calculate positions based on a radial layout algorithm
    const calculatePositions = () => {
      // Position the root at the center
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      
      root.x = centerX;
      root.y = centerY;
      
      // Position level 1 nodes (direct children of root) in a circle
      const topic1Radius = Math.min(dimensions.width, dimensions.height) * 0.25; // Distance from center
      const topicCount = root.children.length;
      
      root.children.forEach((node, index) => {
        // Space topics evenly in a circle
        const angle = (2 * Math.PI * index) / topicCount;
        node.x = centerX + Math.cos(angle) * topic1Radius;
        node.y = centerY + Math.sin(angle) * topic1Radius;
        
        // Position level 2 nodes (subtopics) in an arc around their parent
        if (node.children && node.children.length > 0) {
          const subtopicRadius = topic1Radius * 0.6; // Smaller radius for subtopics
          const subtopicCount = node.children.length;
          
          // Calculate angle to parent from center
          const parentAngle = Math.atan2(node.y - centerY, node.x - centerX);
          
          // Calculate arc range based on number of subtopics
          const arcRange = Math.min(Math.PI / 3, Math.PI / (topicCount * 1.5));
          
          node.children.forEach((subNode, subIndex) => {
            // Position in an arc on the outside of parent
            const subArcOffset = arcRange * (subIndex - (subtopicCount - 1) / 2);
            const subAngle = parentAngle + subArcOffset;
            
            subNode.x = node.x + Math.cos(subAngle) * subtopicRadius;
            subNode.y = node.y + Math.sin(subAngle) * subtopicRadius;
          });
        }
      });
    };
    
    // Only calculate positions if we have dimensions
    if (dimensions.width > 0 && dimensions.height > 0) {
      calculatePositions();
    }
    
    // Handle zoom controls with smaller increments for smoother zooming
    const handleZoomIn = () => {
      setZoom(prev => Math.min(prev + 0.05, 2));
    };
    
    const handleZoomOut = () => {
      setZoom(prev => Math.max(prev - 0.05, 0.5));
    };
    
    const handleZoomReset = () => {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    };
    
    // Handle panning with improved handling to avoid conflicts with hovering
    const handleMouseDown = (e: React.MouseEvent) => {
      // Only initiate drag if it's the main container being clicked, not a node
      if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('drag-area')) {
        if (e.button === 0) { // Left mouse button
          setIsDragging(true);
          setStartDragPos({ x: e.clientX, y: e.clientY });
          e.preventDefault(); // Prevent text selection during drag
        }
      }
    };
    
    const handleMouseMove = (e: React.MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - startDragPos.x;
        const dy = e.clientY - startDragPos.y;
        setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        setStartDragPos({ x: e.clientX, y: e.clientY });
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    const handleMouseLeave = () => {
      setIsDragging(false);
    };

    // Node event handlers to avoid interference with dragging
    const handleNodeMouseEnter = (id: string) => {
      if (!isDragging) {
        setIsHovering(id);
      }
    };

    const handleNodeMouseLeave = () => {
      setIsHovering(null);
    };

    const handleNodeClick = (e: React.MouseEvent, mapId: string, nodeId: string) => {
      e.stopPropagation();
      if (!isDragging) {
        handleEditTopic(mapId, nodeId);
      }
    };

    // Calculate path for curved connections
    const getCurvedPath = (startX: number, startY: number, endX: number, endY: number) => {
      // Calculate midpoint for control point
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;
      
      // Calculate distance and direction
      const dx = endX - startX;
      const dy = endY - startY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Create control point with curvature based on distance
      const curveFactor = Math.min(0.3, 30 / distance);
      const perpX = -dy * curveFactor;
      const perpY = dx * curveFactor;
      const controlX = midX + perpX;
      const controlY = midY + perpY;
      
      return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
    };

    return (
      <Box sx={{ p: 2, position: 'relative' }}>
        <Box 
          ref={mindMapRef}
          sx={{ 
            width: '100%', 
            height: 600, 
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            background: alpha(theme.palette.background.paper, 0.7),
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="drag-area"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
              width: '100%',
              height: '100%'
            }}
            className="drag-area"
          >
            {/* Draw connections first (so they appear behind nodes) */}
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }} className="drag-area">
              {/* Root to topic connections */}
              {root.children.map((node) => (
                <path
                  key={`conn-root-${node.id}`}
                  d={getCurvedPath(root.x, root.y, node.x, node.y)}
                  stroke={node.color}
                  strokeWidth={2}
                  fill="none"
                  strokeDasharray={node.completed ? "5,5" : "none"}
                  opacity={0.8}
                  className="drag-area"
                />
              ))}
              
              {/* Topic to subtopic connections */}
              {root.children.map((node) => 
                node.children.map((subNode) => (
                  <path
                    key={`conn-${node.id}-${subNode.id}`}
                    d={getCurvedPath(node.x, node.y, subNode.x, subNode.y)}
                    stroke={subNode.color}
                    strokeWidth={1.5}
                    fill="none"
                    strokeDasharray={subNode.completed ? "3,3" : "none"}
                    opacity={0.6}
                    className="drag-area"
                  />
                ))
              )}
            </svg>
            
            {/* Root node */}
            <Box 
              sx={{ 
                position: 'absolute',
                top: root.y,
                left: root.x,
                transform: 'translate(-50%, -50%)',
                width: 180,
                height: 80,
                background: root.color,
                color: 'white',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
                boxShadow: 3,
                zIndex: 10,
                textAlign: 'center',
                transition: 'box-shadow 0.2s ease'
              }}
            >
              <Typography fontWeight={600}>{root.name}</Typography>
            </Box>
            
            {/* Topic nodes */}
            {root.children.map((node) => (
              <Box
                key={node.id}
                sx={{ 
                  position: 'absolute',
                  top: node.y,
                  left: node.x,
                  transform: 'translate(-50%, -50%)',
                  width: 150,
                  background: node.color,
                  color: 'white',
                  borderRadius: 2,
                  padding: 2,
                  boxShadow: isHovering === node.id ? 4 : 2,
                  zIndex: isHovering === node.id ? 6 : 5,
                  cursor: 'pointer',
                  opacity: node.completed ? 0.7 : 1,
                  textDecoration: node.completed ? 'line-through' : 'none',
                  transition: 'box-shadow 0.2s ease, opacity 0.2s ease',
                  '&:hover': {
                    opacity: node.completed ? 0.9 : 1,
                    boxShadow: 4
                  }
                }}
                onClick={(e) => handleNodeClick(e, map.id, node.id)}
                onMouseEnter={() => handleNodeMouseEnter(node.id)}
                onMouseLeave={handleNodeMouseLeave}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {node.completed ? (
                    <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                  ) : (
                    <PanoramaFishEyeIcon fontSize="small" sx={{ mr: 1 }} />
                  )}
                  <Typography variant="body1" fontWeight={500}>{node.name}</Typography>
                </Box>
                
                {nodeMap.get(node.id)?.children && nodeMap.get(node.id)?.children.length > 0 && (
                  <Chip 
                    size="small" 
                    label={`${nodeMap.get(node.id)?.children?.length || 0} subtopics`} 
                    sx={{ mt: 1, fontSize: '0.7rem' }}
                  />
                )}
                
                {node.priority && (
                  <Chip
                    size="small"
                    icon={<FlagIcon fontSize="small" />}
                    label={node.priority}
                    color={
                      node.priority === 'high' 
                        ? 'error' 
                        : node.priority === 'medium' 
                          ? 'warning' 
                          : 'success'
                    }
                    sx={{ mt: 1, ml: 1, fontSize: '0.7rem' }}
                  />
                )}
              </Box>
            ))}
            
            {/* Subtopic nodes */}
            {root.children.map((node) => 
              node.children.map((subNode) => (
                <Box
                  key={subNode.id}
                  sx={{ 
                    position: 'absolute',
                    top: subNode.y,
                    left: subNode.x,
                    transform: 'translate(-50%, -50%)',
                    background: subNode.color,
                    color: 'white',
                    borderRadius: 2,
                    padding: 1,
                    fontSize: '0.8rem',
                    boxShadow: isHovering === subNode.id ? 3 : 1,
                    zIndex: isHovering === subNode.id ? 5 : 4,
                    cursor: 'pointer',
                    opacity: subNode.completed ? 0.7 : 1,
                    textDecoration: subNode.completed ? 'line-through' : 'none',
                    maxWidth: 120,
                    transition: 'box-shadow 0.2s ease, opacity 0.2s ease',
                    '&:hover': {
                      opacity: subNode.completed ? 0.9 : 1,
                      boxShadow: 3
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle subtopic click if needed
                  }}
                  onMouseEnter={() => handleNodeMouseEnter(subNode.id)}
                  onMouseLeave={handleNodeMouseLeave}
                >
                  <Typography variant="caption">{subNode.name}</Typography>
                </Box>
              ))
            )}
          </Box>
          
          {/* Zoom controls */}
          <Box sx={{ position: 'absolute', right: 16, bottom: 16, zIndex: 20 }}>
            <Paper sx={{ p: 0.5, borderRadius: 6, boxShadow: 2 }}>
              <IconButton size="small" onClick={handleZoomIn} title="Zoom In">
                <AddIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleZoomReset} title="Reset Zoom">
                <CenterFocusStrongIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleZoomOut} title="Zoom Out">
                <RemoveIcon fontSize="small" />
              </IconButton>
            </Paper>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Tip: Drag background to pan view. Click on any topic to edit it. Use zoom controls to adjust view.
          </Typography>
        </Box>
      </Box>
    );
  };
  
  // Study Planner Component
  const StudyPlannerView = ({ map }: { map: RevisionMapData }) => {
    if (!map || !map.topics || map.topics.length === 0) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <Typography variant="subtitle1" color="text.secondary">
            No topics available to create a study plan
          </Typography>
        </Box>
      );
    }
    
    // Calculate total study time
    const totalEstimatedHours = map.topics.reduce((total, topic) => 
      total + (topic.estimatedStudyTime || 0), 0);
      
    // Group topics by priority
    const highPriorityTopics = map.topics.filter(t => t.priority === 'high');
    const mediumPriorityTopics = map.topics.filter(t => t.priority === 'medium');
    const lowPriorityTopics = map.topics.filter(t => t.priority === 'low');
    
    // Calculate completion percentage
    const calculateCompletionRatio = (studyTime?: number) => {
      if (!studyTime) return 0;
      return Math.round((studyTime / totalEstimatedHours) * 100);
    };
    
    return (
      <Box sx={{ p: 2 }}>
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AccessTimeIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
            <Typography variant="h6">Study Time Overview</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                Total Estimated Study Time: <strong>{totalEstimatedHours} hours</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                This is the cumulative study time needed for all topics in this revision map.
              </Typography>
              
              <Typography variant="body1" gutterBottom>
                Topics by Priority:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip 
                  icon={<FlagIcon />} 
                  label={`${highPriorityTopics.length} High Priority`} 
                  color="error" 
                  variant="outlined" 
                />
                <Chip 
                  icon={<FlagIcon />} 
                  label={`${mediumPriorityTopics.length} Medium Priority`} 
                  color="warning" 
                  variant="outlined" 
                />
                <Chip 
                  icon={<FlagIcon />} 
                  label={`${lowPriorityTopics.length} Low Priority`} 
                  color="success" 
                  variant="outlined" 
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">High Priority</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {highPriorityTopics.reduce((sum, t) => sum + (t.estimatedStudyTime || 0), 0)} hrs
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', height: 12, bgcolor: 'grey.300', borderRadius: 6, mb: 2 }}>
                  <Box 
                    sx={{ 
                      height: '100%', 
                      bgcolor: 'error.main', 
                      borderRadius: 6,
                      width: `${calculateCompletionRatio(highPriorityTopics.reduce((sum, t) => sum + (t.estimatedStudyTime || 0), 0))}%`
                    }} 
                  />
                </Box>
                
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Medium Priority</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {mediumPriorityTopics.reduce((sum, t) => sum + (t.estimatedStudyTime || 0), 0)} hrs
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', height: 12, bgcolor: 'grey.300', borderRadius: 6, mb: 2 }}>
                  <Box 
                    sx={{ 
                      height: '100%', 
                      bgcolor: 'warning.main', 
                      borderRadius: 6,
                      width: `${calculateCompletionRatio(mediumPriorityTopics.reduce((sum, t) => sum + (t.estimatedStudyTime || 0), 0))}%`
                    }} 
                  />
                </Box>
                
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Low Priority</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {lowPriorityTopics.reduce((sum, t) => sum + (t.estimatedStudyTime || 0), 0)} hrs
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', height: 12, bgcolor: 'grey.300', borderRadius: 6 }}>
                  <Box 
                    sx={{ 
                      height: '100%', 
                      bgcolor: 'success.main', 
                      borderRadius: 6,
                      width: `${calculateCompletionRatio(lowPriorityTopics.reduce((sum, t) => sum + (t.estimatedStudyTime || 0), 0))}%`
                    }} 
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        
        <Typography variant="h6" sx={{ mb: 2 }}>Study Sessions Schedule</Typography>
        
        <Grid container spacing={2}>
          {map.topics.map((topic) => (
            <Grid item xs={12} key={topic.id}>
              <Accordion sx={{ borderRadius: 2, overflow: 'hidden', '&:before': { display: 'none' } }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ 
                    backgroundColor: alpha(topic.color || theme.palette.primary.main, 0.1),
                    '&.Mui-expanded': {
                      minHeight: 48
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        backgroundColor: topic.color || theme.palette.primary.main,
                        mr: 1.5
                      }} />
                      <Typography variant={topic.completed ? 'body2' : 'body1'} sx={{ 
                        textDecoration: topic.completed ? 'line-through' : 'none',
                        color: topic.completed ? 'text.secondary' : 'text.primary',
                        fontWeight: topic.completed ? 400 : 600
                      }}>
                        {topic.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {topic.priority && (
                        <Chip
                          size="small"
                          label={topic.priority}
                          color={
                            topic.priority === 'high' 
                              ? 'error' 
                              : topic.priority === 'medium' 
                                ? 'warning' 
                                : 'success'
                          }
                          sx={{ mr: 1 }}
                        />
                      )}
                      <Chip 
                        size="small" 
                        label={`${topic.estimatedStudyTime || 0} hrs`} 
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {topic.description}
                  </Typography>
                  
                  {/* Study sessions list */}
                  {topic.studySessions && topic.studySessions.length > 0 ? (
                    <List disablePadding>
                      {topic.studySessions.map((session) => (
                        <ListItem 
                          key={session.id}
                          sx={{ 
                            py: 1, 
                            borderBottom: '1px solid', 
                            borderColor: 'divider',
                            opacity: session.completed ? 0.7 : 1
                          }}
                          secondaryAction={
                            <IconButton 
                              edge="end" 
                              size="small"
                              onClick={() => handleEditSession(map.id, topic.id, session.id)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          }
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {session.completed ? (
                              <CheckCircleIcon color="success" fontSize="small" />
                            ) : (
                              <EventIcon color="primary" fontSize="small" />
                            )}
                          </ListItemIcon>
                          <ListItemText 
                            primary={
                              <Typography variant="body2" sx={{ 
                                textDecoration: session.completed ? 'line-through' : 'none' 
                              }}>
                                {new Date(session.date).toLocaleDateString()}
                              </Typography>
                            }
                            secondary={`${session.duration} minutes`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ my: 2 }}>
                      No study sessions scheduled for this topic
                    </Typography>
                  )}
                  
                  <Button
                    startIcon={<AlarmAddIcon />}
                    variant="outlined"
                    size="small"
                    onClick={() => handleAddStudySession(map.id, topic.id)}
                    sx={{ mt: 2 }}
                  >
                    Add Study Session
                  </Button>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  // Handle resources
  const handleAddResource = (mapId: string, topicId: string) => {
    setEditMode(false);
    setCurrentMapId(mapId);
    setCurrentTopicId(topicId);
    setNewResourceTitle('');
    setNewResourceType('note');
    setNewResourceUrl('');
    setNewResourceDescription('');
    setResourceDialogOpen(true);
  };

  const handleEditResource = (mapId: string, topicId: string, resourceId: string) => {
    const map = revisionMaps.find(m => m.id === mapId);
    const topic = map?.topics.find(t => t.id === topicId);
    const resource = topic?.resources?.find(r => r.id === resourceId);
    
    if (map && topic && resource) {
      setEditMode(true);
      setCurrentMapId(mapId);
      setCurrentTopicId(topicId);
      setCurrentResourceId(resourceId);
      setNewResourceTitle(resource.title);
      setNewResourceType(resource.type);
      setNewResourceUrl(resource.url || '');
      setNewResourceDescription(resource.description || '');
      setResourceDialogOpen(true);
    }
  };

  const handleResourceDialogClose = () => {
    setResourceDialogOpen(false);
  };

  const handleResourceSave = () => {
    if (!newResourceTitle.trim() || !currentMapId || !currentTopicId) return;

    setRevisionMaps(maps => 
      maps.map(map => {
        if (map.id !== currentMapId) return map;
        
        const updatedTopics = map.topics.map(topic => {
          if (topic.id !== currentTopicId) return topic;
          
          let updatedResources;
          
          if (editMode && currentResourceId) {
            // Update existing resource
            updatedResources = (topic.resources || []).map(resource => 
              resource.id === currentResourceId 
                ? { 
                    ...resource, 
                    title: newResourceTitle, 
                    type: newResourceType,
                    url: newResourceUrl,
                    description: newResourceDescription
                  }
                : resource
            );
          } else {
            // Add new resource
            const newResource: StudyResource = {
              id: Date.now().toString(),
              title: newResourceTitle,
              type: newResourceType,
              url: newResourceUrl,
              description: newResourceDescription
            };
            updatedResources = [...(topic.resources || []), newResource];
          }
          
          return { 
            ...topic, 
            resources: updatedResources
          };
        });
        
        return { 
          ...map, 
          topics: updatedTopics,
          updatedAt: new Date()
        };
      })
    );
    
    setResourceDialogOpen(false);
  };

  // Handle study sessions
  const handleAddStudySession = (mapId: string, topicId: string) => {
    setEditMode(false);
    setCurrentMapId(mapId);
    setCurrentTopicId(topicId);
    setNewSessionDate(new Date());
    setNewSessionDuration(30);
    setNewSessionNotes('');
    setStudySessionDialogOpen(true);
  };

  const handleEditSession = (mapId: string, topicId: string, sessionId: string) => {
    const map = revisionMaps.find(m => m.id === mapId);
    const topic = map?.topics.find(t => t.id === topicId);
    const session = topic?.studySessions?.find(s => s.id === sessionId);
    
    if (map && topic && session) {
      setEditMode(true);
      setCurrentMapId(mapId);
      setCurrentTopicId(topicId);
      setCurrentSessionId(sessionId);
      setNewSessionDate(new Date(session.date));
      setNewSessionDuration(session.duration);
      setNewSessionNotes(session.notes || '');
      setStudySessionDialogOpen(true);
    }
  };

  const handleStudySessionDialogClose = () => {
    setStudySessionDialogOpen(false);
  };

  const handleSessionSave = () => {
    if (!newSessionDate || !currentMapId || !currentTopicId) return;

    setRevisionMaps(maps => 
      maps.map(map => {
        if (map.id !== currentMapId) return map;
        
        const updatedTopics = map.topics.map(topic => {
          if (topic.id !== currentTopicId) return topic;
          
          let updatedSessions;
          
          if (editMode && currentSessionId) {
            // Update existing session
            updatedSessions = (topic.studySessions || []).map(session => 
              session.id === currentSessionId 
                ? { 
                    ...session, 
                    date: newSessionDate, 
                    duration: newSessionDuration,
                    notes: newSessionNotes
                  }
                : session
            );
          } else {
            // Add new session
            const newSession: StudySession = {
              id: Date.now().toString(),
              date: newSessionDate,
              duration: newSessionDuration,
              completed: false,
              notes: newSessionNotes
            };
            updatedSessions = [...(topic.studySessions || []), newSession];
          }
          
          return { 
            ...topic, 
            studySessions: updatedSessions
          };
        });
        
        return { 
          ...map, 
          topics: updatedTopics,
          updatedAt: new Date()
        };
      })
    );
    
    setStudySessionDialogOpen(false);
  };

  const handleSessionComplete = (mapId: string, topicId: string, sessionId: string) => {
    setRevisionMaps(maps => 
      maps.map(map => {
        if (map.id !== mapId) return map;
        
        const updatedTopics = map.topics.map(topic => {
          if (topic.id !== topicId) return topic;
          
          const updatedSessions = (topic.studySessions || []).map(session => 
            session.id === sessionId 
              ? { ...session, completed: !session.completed }
              : session
          );
          
          return { 
            ...topic, 
            studySessions: updatedSessions
          };
        });
        
        return { 
          ...map, 
          topics: updatedTopics,
          updatedAt: new Date()
        };
      })
    );
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

      {selectedMap && (
        <>
          <Box sx={{ mb: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 1,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tabs 
                  value={viewMode} 
                  onChange={(e, newValue) => handleViewModeChange(newValue)}
                  sx={{ 
                    minHeight: 48,
                    '& .MuiTab-root': {
                      minHeight: 48,
                      py: 1
                    }
                  }}
                >
                  <Tab 
                    value="list" 
                    label="List View" 
                    icon={<FormatListBulletedIcon />} 
                    iconPosition="start"
                    sx={{ minHeight: 48 }}
                  />
                  <Tab 
                    value="mindmap" 
                    label="Mind Map" 
                    icon={<MindMap />} 
                    iconPosition="start"
                    sx={{ minHeight: 48 }}
                  />
                  <Tab 
                    value="schedule" 
                    label="Study Planner" 
                    icon={<CalendarTodayIcon />} 
                    iconPosition="start"
                    sx={{ minHeight: 48 }}
                  />
                </Tabs>
              </Box>
              
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <Select
                  value={selectedMap}
                  onChange={(e) => setSelectedMap(e.target.value)}
                  displayEmpty
                  sx={{ borderRadius: 2 }}
                >
                  {revisionMaps.map((map) => (
                    <MenuItem key={map.id} value={map.id}>
                      {map.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          </Box>

          {viewMode === "list" && (
            <Grid container spacing={4}>
              {revisionMaps
                .filter(map => map.id === selectedMap)
                .map((map) => (
                  <Grid item xs={12} key={map.id}>
                    <MotionCard
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      sx={{ 
                        borderRadius: 2,
                        boxShadow: 2,
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
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      <Typography
                                        sx={{
                                          textDecoration: topic.completed ? 'line-through' : 'none',
                                          color: topic.completed ? 'text.secondary' : 'text.primary',
                                          mr: 2
                                        }}
                                      >
                                        {topic.name}
                                      </Typography>
                                      {topic.priority && (
                                        <Chip 
                                          size="small" 
                                          label={topic.priority} 
                                          color={
                                            topic.priority === 'high' 
                                              ? 'error' 
                                              : topic.priority === 'medium' 
                                                ? 'warning' 
                                                : 'success'
                                          }
                                          sx={{ mr: 1 }}
                                        />
                                      )}
                                      {topic.estimatedStudyTime && (
                                        <Chip 
                                          size="small" 
                                          icon={<TimerIcon fontSize="small" />}
                                          label={`${topic.estimatedStudyTime} hrs`} 
                                          variant="outlined"
                                        />
                                      )}
                                    </Box>
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
                          startIcon={<AddIcon />}
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
          )}

          {viewMode === "mindmap" && (
            <Paper 
              elevation={2} 
              sx={{ 
                borderRadius: 2, 
                overflow: 'hidden', 
                minHeight: 650 
              }}
            >
              {revisionMaps
                .filter(map => map.id === selectedMap)
                .map((map) => (
                  <MindMapView key={map.id} map={map} />
                ))}
            </Paper>
          )}

          {viewMode === "schedule" && (
            <Paper 
              elevation={2} 
              sx={{ 
                borderRadius: 2, 
                overflow: 'hidden',
                minHeight: 650
              }}
            >
              {revisionMaps
                .filter(map => map.id === selectedMap)
                .map((map) => (
                  <StudyPlannerView key={map.id} map={map} />
                ))}
            </Paper>
          )}
        </>
      )}

      {!selectedMap && revisionMaps.length === 0 && (
        <Box 
          sx={{ 
            textAlign: 'center', 
            p: 6, 
            border: '2px dashed', 
            borderColor: 'divider',
            borderRadius: 4,
            my: 4
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No revision maps created yet
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Create your first revision map to organize your study topics
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />} 
            onClick={handleAddMapClick}
          >
            Create Revision Map
          </Button>
        </Box>
      )}

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
            required
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
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              value={newTopicPriority}
              label="Priority"
              onChange={(e) => setNewTopicPriority(e.target.value as 'high' | 'medium' | 'low')}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            margin="dense"
            id="estimatedStudyTime"
            label="Estimated Study Time (hours)"
            type="number"
            fullWidth
            variant="outlined"
            value={newTopicEstimatedStudyTime}
            onChange={(e) => setNewTopicEstimatedStudyTime(Number(e.target.value))}
            InputProps={{ inputProps: { min: 1, max: 100 } }}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTopicDialogClose} color="inherit">Cancel</Button>
          <Button onClick={handleTopicSave} color="primary" variant="contained">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Resource Dialog */}
      <Dialog open={resourceDialogOpen} onClose={handleResourceDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Resource' : 'Add Learning Resource'}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Add study materials, links, or notes that will help you with this topic.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="resourceTitle"
            label="Resource Title"
            placeholder="E.g., Textbook Chapter 5"
            type="text"
            fullWidth
            variant="outlined"
            value={newResourceTitle}
            onChange={(e) => setNewResourceTitle(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel id="resource-type-label">Resource Type</InputLabel>
            <Select
              labelId="resource-type-label"
              id="resourceType"
              value={newResourceType}
              label="Resource Type"
              onChange={(e) => setNewResourceType(e.target.value as 'note' | 'link' | 'book' | 'video' | 'practice')}
            >
              <MenuItem value="note">Note</MenuItem>
              <MenuItem value="link">Link</MenuItem>
              <MenuItem value="book">Book</MenuItem>
              <MenuItem value="video">Video</MenuItem>
              <MenuItem value="practice">Practice Materials</MenuItem>
            </Select>
          </FormControl>
          
          {newResourceType === 'link' && (
            <TextField
              margin="dense"
              id="resourceUrl"
              label="URL"
              placeholder="Enter website or resource link"
              type="url"
              fullWidth
              variant="outlined"
              value={newResourceUrl}
              onChange={(e) => setNewResourceUrl(e.target.value)}
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
          
          <TextField
            margin="dense"
            id="resourceDescription"
            label="Description"
            placeholder="Describe this resource or add notes"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newResourceDescription}
            onChange={(e) => setNewResourceDescription(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResourceDialogClose} color="inherit">Cancel</Button>
          <Button onClick={handleResourceSave} color="primary" variant="contained">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Study Session Dialog */}
      <Dialog open={studySessionDialogOpen} onClose={handleStudySessionDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Study Session' : 'Schedule Study Session'}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Plan when you'll study this topic and track your progress.
          </DialogContentText>
          
          <TextField
            margin="dense"
            id="sessionDate"
            label="Study Date"
            type="date"
            fullWidth
            variant="outlined"
            value={newSessionDate ? new Date(newSessionDate).toISOString().split('T')[0] : ''}
            onChange={(e) => setNewSessionDate(new Date(e.target.value))}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          
          <TextField
            margin="dense"
            id="sessionDuration"
            label="Duration (minutes)"
            type="number"
            fullWidth
            variant="outlined"
            value={newSessionDuration}
            onChange={(e) => setNewSessionDuration(Number(e.target.value))}
            InputProps={{ inputProps: { min: 5, max: 480, step: 5 } }}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="dense"
            id="sessionNotes"
            label="Study Notes"
            placeholder="What do you plan to cover in this session?"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newSessionNotes}
            onChange={(e) => setNewSessionNotes(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStudySessionDialogClose} color="inherit">Cancel</Button>
          <Button onClick={handleSessionSave} color="primary" variant="contained">
            {editMode ? 'Update' : 'Schedule'}
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
              : itemToDelete?.type === 'topic' 
                ? 'Are you sure you want to delete this topic?'
                : itemToDelete?.type === 'resource' 
                  ? 'Are you sure you want to delete this resource?'
                  : 'Are you sure you want to delete this session?'
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