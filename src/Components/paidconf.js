import React,{useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import images from '../logo.svg'
import { Container,AppBar,InputBase, Toolbar, Button} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: "2%"
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  appbar:{
      background: "white"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '100%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:"teal"
  },
  inputRoot: {
    color: 'black',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    // transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      '&:focus': {
        width: '120ch',
      },
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    background : "cdcdcd"
  },
  content: {
    flex: '1 0 auto',
    background : "cdcdcd"
  },
  cover: {
    width: 190,
 
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function FreeConf() {
  const classes = useStyles();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };


  React.useEffect(() => {
    axios.get('https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences')
    .then(res => {
      var data = res.data.paid
        setItems(data)
    })
      .then(
        (result) => {
          setIsLoaded(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])


  const results = !searchTerm
  ? items
  : items.filter(item =>
      item.city.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

  return (
    <Container >  
    <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <div className={classes.search}>
            <InputBase
              placeholder="Search for city..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
             <SearchIcon className={classes.searchIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div>
      </div>
    { results.map((d)=>(
    <Card className={classes.root}>
        <CardMedia
        className={classes.cover}
        image={d.imageURL}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {d.confName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Stat Date : {d.confStartDate}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Entry Type : {d.entryType}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            City : {d.city} | Country: {d.country}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            confernece URL : {d.confUrl}
          </Typography>
        </CardContent>
      </div>
    </Card>
    ))}
    
    </Container>

  );
}
