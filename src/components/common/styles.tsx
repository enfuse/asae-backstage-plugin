import { makeStyles } from "@material-ui/core/styles";
import { Theme } from '@material-ui/core';
import { tableCellClasses } from "@mui/material";
export const useStyles = makeStyles<Theme>((theme: Theme)=> ({
    rowClass: {
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgb(242, 247, 245)"
      }
    },
    collapsedContent: {
        "div > p" :{
            padding:0,
            margin:0
        },
        "div > h4" :{
            padding:0,
            margin:0
        }
    },
    notPresent:{
        color: '#888',
        fontWeight: 550,
        fontStyle: 'italic',
        fontSize: '0.8rem'
    },
    configPatternList:{
        "&.MuiPaper-root":{
            height:"100%",
            marginBottom:"10px"
        },
        "& > ul":{
            display:"inline",
            background: "grey",
        }
    },
    tableRow:{
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          }
    },
    tableCell:{
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#3a967f",
            color: theme.palette.common.white,
            fontFamily:"inherit",
            fontSize: 16,
            fontWeight: "bold",
            padding: "0 0 0 0",
            paddingLeft : 15,
            paddingBottom:10,
            paddingTop:10,
        },
          [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
          }
    },
    searchBarWithTitle:{
        display: "flex",
        alignItems: "center",
        justifyContent:"space-between",
        maxHeight:"100px",
        marginBottom:"20px",
        '& h2':{
            marginLeft:"20px"
        }
    },
    searchBar:{
        display:"flex",
        maxWidth:"200px",
        alignItems:"center",
        // backgroundColor:"white"
    }
}))