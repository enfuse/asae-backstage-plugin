import React, { PropsWithChildren } from "react"
import {TextField} from '@mui/material';
import { useStyles } from '../common/styles';
import FilterListIcon from '@mui/icons-material/FilterList';

export const TitleWithFilterSearch = (props: PropsWithChildren<{handleSearch: (e)=>void, title?:string}>)=>{
    const classes = useStyles()
    const hadleSearch = props.handleSearch
    const title = props.title? props.title : "change-title"
    return (
      <div className={classes.searchBarWithTitle}>
          <h2>{title}</h2>
          <div className={classes.searchBar}> 
            <FilterListIcon/>
            <TextField id="standard-basic" 
                    label="Filter" 
                    variant="standard" 
                    onChange={hadleSearch} />
          </div>
       </div>
    )
  
  }