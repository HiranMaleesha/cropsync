import React from 'react';
import { Sprout, LineChart, UserCircle, LeafIcon, SunIcon } from 'lucide-react';

interface FDashboardProps {
  onNavigate: (page: string) => void;
}

export function FDashboard({ onNavigate }: FDashboardProps) {
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#F0FDF4',
    },
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '30px',
      width: '100%',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '2rem',
    },
    headerIcon: {
      color: '#059669',
      width: '2rem',
      height: '2rem',
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#065F46',
    },
    weatherCard: {
      backgroundColor: '#059669',
      color: 'white',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '25px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    weatherIcon: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: '50%',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
      gap: '15px',
    },
    cardIcon: {
      width: '50px',
      height: '50px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardTitle: {
      margin: '0 0 5px 0',
      fontSize: '18px',
      color: '#111827',
      fontWeight: '500',
    },
    cardDescription: {
      margin: 0,
      color: '#6B7280',
      fontSize: '14px',
    },
  };

  const actionCards = [
    {
      icon: <Sprout size={24} />,
      title: 'View Recommendations',
      description: 'Crop insights and weekly tasks',
      bgColor: '#F0FDF4',
      iconColor: '#059669',
      navigateTo: 'help',
    },
    {
      icon: <LineChart size={24} />,
      title: 'My Farm Data',
      description: 'Fields, crops, and analytics',
      bgColor: '#EFF6FF',
      iconColor: '#3B82F6',
      navigateTo: '', // can add route later if needed
    },
    {
      icon: <UserCircle size={24} />,
      title: 'Farmer Profile',
      description: 'Your account and preferences',
      bgColor: '#FEF3C7',
      iconColor: '#D97706',
      navigateTo: 'reports',
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <header style={styles.header}>
          <LeafIcon style={styles.headerIcon} />
          <h1 style={styles.title}>CropSync Dashboard</h1>
        </header>

        <div style={styles.weatherCard}>
          <div style={styles.weatherIcon}>
            <SunIcon size={32} color="white" />
          </div>
          <div>
            <h2 style={{ margin: '0 0 5px 0', fontSize: '20px' }}>
              Good morning, Thomas
            </h2>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              72°F | Clear skies | Wind: 5 mph NE
            </div>
          </div>
        </div>

        {actionCards.map((card, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => card.navigateTo && onNavigate(card.navigateTo)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <div
              style={{
                ...styles.cardIcon,
                backgroundColor: card.bgColor,
                color: card.iconColor,
              }}
            >
              {card.icon}
            </div>
            <div>
              <h3 style={styles.cardTitle}>{card.title}</h3>
              <p style={styles.cardDescription}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
