import React from 'react';
import Button from '@mui/material/Button';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const DefaultButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {label}
    </Button>
  );
};

export default DefaultButton;