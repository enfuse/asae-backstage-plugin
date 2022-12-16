import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
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
    }
})