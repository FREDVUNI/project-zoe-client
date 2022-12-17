import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import FilterListIcon from '@material-ui/icons/FilterList';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { appPermissions, localRoutes } from '../data/constants';
import XBreadCrumbs from './XBreadCrumbs';
import { IState } from '../data/types';
import { hasAnyRole } from '../data/appRoles';

interface IProps {
  onFilter: (data: any) => void;
  filter: any;
  reportName?: string;
  buttons?: any;
  loading: boolean;
  filterComponent?: any;
  title: string;
  showBreadCrumbs?: boolean;
  enableFiltering?: boolean;
}

const ListHeader = (props: IProps) => {
  const [showFilter, setShowFilter] = useState(false);
  const [value, setValue] = useState("");
  const { showBreadCrumbs = true, enableFiltering = true } = props;
  const profile = useSelector((state: IState) => state.core.user);
  function handleFilterToggle() {
    setShowFilter(!showFilter);
  }

  function handleQuerySearch(query: string) {
    props.onFilter({ ...props.filter, query });
  }

  const updateReportFilter =(newValue:string) =>{
      setValue(newValue)
  }
  return (
    <div>
      {showBreadCrumbs && (
        <Box pb={1}>
          <XBreadCrumbs
            title={props.title}
            paths={[
              {
                path: localRoutes.home,
                label: 'Dashboard',
                auth: hasAnyRole(profile, [appPermissions.roleDashboard]),
              },
            ]}
          />
        </Box>
      )}
      <Grid container spacing={2}>
      {enableFiltering && (
          <Grid item xs={12} md={6}>
            <TextField
              autoComplete="off"
              hiddenLabel
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="inherit" />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => handleQuerySearch(e.target.value)}
              variant="outlined"
              size="small"
              name="query"
              placeholder="Search here ..."
              fullWidth
            />
          </Grid>
        )}
        <Hidden smDown>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              width="100%"
            >
              {props.filterComponent && (
                <Button
                  variant="text"
                  color="primary"
                  startIcon={<FilterListIcon />}
                  onClick={handleFilterToggle}
                  style={{ marginLeft: 8 }}
                >
                  More Filters&nbsp;&nbsp;
                </Button>
              )}
              {props.buttons}
            </Box>
          </Grid>
        </Hidden>
        {props.filterComponent && (
          <Grid item xs={12}>
            <Collapse in={showFilter} timeout="auto" unmountOnExit>
              <Box pb={1}>{props.filterComponent}</Box>
            </Collapse>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
export default ListHeader;
