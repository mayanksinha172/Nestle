import React from 'react';
import { createRoot } from 'react-dom/client';
import MedFactory from './MedFactory.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <MedFactory theme="dark" reviewerName="Munal" />
);
