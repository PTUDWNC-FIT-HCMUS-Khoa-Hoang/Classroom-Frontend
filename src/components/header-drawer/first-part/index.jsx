import { Home as HomeIcon } from '@mui/icons-material';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

export default function HeaderDrawerFirstPart() {
  const listItemAttributes = [
    {
      text: 'Lớp học',
      to: '/classrooms',
      icon: HomeIcon,
    },
  ];

  return (
    <List>
      {listItemAttributes.map((listItem) => {
        const IconComponent = listItem.icon;

        return (
          <ListItem
            button
            component={Link}
            to={listItem.to}
            key={listItem.text}
          >
            <ListItemIcon>
              <IconComponent />
            </ListItemIcon>
            <ListItemText primary={listItem.text} />
          </ListItem>
        );
      })}
    </List>
  );
}
