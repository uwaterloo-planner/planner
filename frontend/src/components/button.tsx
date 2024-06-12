import React from 'react';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';

interface MenuItemButtonProps {
  href: string
  text: string
}

interface AuthenticationButtonProps {
  variant: "text" | "outlined" | "contained" | undefined
  href: string
  text: string
}

export const MenuItemButton: React.FC<MenuItemButtonProps> = ({ href, text }) => {
  return (
    <Link href={href} className="px-1">
      <Button
        className="py-1.5 px-1 flex items-center text-primary transition duration-300 ease-in-out rounded-3xl"
      >
        <Typography variant="body2" color="text.primary">
          {text}
        </Typography>
      </Button>
    </Link>
  )
}

export const AuthenticationButton: React.FC<AuthenticationButtonProps> = ({variant, href, text}) => {
  return (
    <Button 
      color="primary"
      variant={variant}
      size="small"
      component="a"
      href={href}
    >
      {text}
    </Button>
  )
}
