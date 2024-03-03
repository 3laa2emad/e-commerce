import React from 'react'
import { Navigate } from 'react-router-dom'

export default function protectedRoute({children}) {




if(localStorage.getItem('tkn') == null){
  return <Navigate to='/login'  />
}

  return <>
  {children}
  </>
}
