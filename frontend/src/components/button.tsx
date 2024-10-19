import React from 'react'
import Link from 'next/link'
import { Button, Typography } from '@mui/material'

interface MenuItemButtonProps {
  href: string
  text: string
}

interface AuthenticationButtonProps {
  variant: "text" | "outlined" | "contained" | undefined
  href?: string
  text: string
  onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined
}

export const MenuItemButton: React.FC<MenuItemButtonProps> = ({ href, text }) => {
  return (
    <Link href={href} className="px-1">
      <Button
        variant='contained'
        className="px-4 text-primary transition duration-300 ease-in-out rounded-xl"
      >
        <Typography variant="h5" color="text.primary">
          {text}
        </Typography>
      </Button>
    </Link>
  )
}

export const AuthenticationButton: React.FC<AuthenticationButtonProps> = ({variant, href, text, onClick}) => {
  return (
    <Button 
      color="primary"
      variant={variant}
      size="medium"
      component="a"
      href={href}
      onClick={onClick}
    >
      {text}
    </Button>
  )
}
