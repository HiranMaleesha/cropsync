import React from 'react'
import {
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  LeafIcon,
  HashIcon,
  TreesIcon,
  RulerIcon,
} from 'lucide-react'
export function MyProfile() {
  const farmerData = {
    id: 'F001',
    name: 'John Smith',
    idNumber: 'ID78901234',
    phone: '+1 (555) 123-4567',
    region: 'North',
    crops: [
      {
        name: 'Wheat',
        area: 5000,
      },
      {
        name: 'Corn',
        area: 3000,
      },
      {
        name: 'Soybeans',
        area: 2500,
      },
      {
        name: 'Potatoes',
        area: 1500,
      },
    ],
  }
  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#F0FDF4',
      padding: '2rem 1rem',
    },
    content: {
      maxWidth: '1024px',
      margin: '0 auto',
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
    grid: {
      display: 'grid',
      gap: '2rem',
      gridTemplateColumns: window.innerWidth >= 768 ? '2fr 1fr' : '1fr',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '2rem',
      padding: '1rem',
      backgroundColor: '#F0FDF4',
      borderRadius: '0.5rem',
    },
    profileIcon: {
      backgroundColor: '#059669',
      color: 'white',
      borderRadius: '50%',
      padding: '1rem',
      width: '4rem',
      height: '4rem',
    },
    profileName: {
      flex: 1,
    },
    name: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#065F46',
      marginBottom: '0.25rem',
    },
    farmerId: {
      color: '#059669',
      fontWeight: '500',
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#065F46',
      marginBottom: '1rem',
      paddingBottom: '0.5rem',
      borderBottom: '1px solid #E5E7EB',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    infoGrid: {
      display: 'grid',
      gap: '1rem',
      gridTemplateColumns: window.innerWidth >= 640 ? '1fr 1fr' : '1fr',
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem',
      backgroundColor: '#F9FAFB',
      borderRadius: '0.5rem',
    },
    infoIcon: {
      color: '#059669',
      width: '1.25rem',
      height: '1.25rem',
    },
    infoLabel: {
      fontSize: '0.875rem',
      color: '#6B7280',
      marginBottom: '0.25rem',
    },
    infoValue: {
      color: '#111827',
      fontWeight: '500',
    },
    cropTable: {
      width: '100%',
      borderCollapse: 'collapse' as const,
    },
    cropRow: {
      borderBottom: '1px solid #E5E7EB',
    },
    cropCell: {
      padding: '0.75rem',
      fontSize: '0.875rem',
      color: '#374151',
    },
    cropHeader: {
      textAlign: 'left' as const,
      padding: '0.75rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#6B7280',
      backgroundColor: '#F9FAFB',
    },
    areaValue: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#059669',
      fontWeight: '500',
    },
  }
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <header style={styles.header}>
          <LeafIcon style={styles.headerIcon} />
          <h1 style={styles.title}>CropSync Profile</h1>
        </header>
        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.profileHeader}>
              <div style={styles.profileIcon}>
                <UserIcon size={32} />
              </div>
              <div style={styles.profileName}>
                <h2 style={styles.name}>{farmerData.name}</h2>
                <span style={styles.farmerId}>Farmer ID: {farmerData.id}</span>
              </div>
            </div>
            <h3 style={styles.sectionTitle}>
                
              <div />
              Personal Information
            </h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <HashIcon style={styles.infoIcon} />
                <div>
                  <div style={styles.infoLabel}>ID Number</div>
                  <div style={styles.infoValue}>{farmerData.idNumber}</div>
                </div>
              </div>
              <div style={styles.infoItem}>
                <PhoneIcon style={styles.infoIcon} />
                <div>
                  <div style={styles.infoLabel}>Phone Number</div>
                  <div style={styles.infoValue}>{farmerData.phone}</div>
                </div>
              </div>
              <div style={styles.infoItem}>
                <MapPinIcon style={styles.infoIcon} />
                <div>
                  <div style={styles.infoLabel}>Region</div>
                  <div style={styles.infoValue}>{farmerData.region}</div>
                </div>
              </div>
            </div>
          </div>
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>
              <TreesIcon size={20} />
              Crops Grown
            </h3>
            <table style={styles.cropTable}>
              <thead>
                <tr>
                  <th style={styles.cropHeader}>Crop</th>
                  <th style={styles.cropHeader}>Area</th>
                </tr>
              </thead>
              <tbody>
                {farmerData.crops.map((crop, index) => (
                  <tr key={index} style={styles.cropRow}>
                    <td style={styles.cropCell}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <LeafIcon size={16} color="#059669" />
                        {crop.name}
                      </div>
                    </td>
                    <td style={styles.cropCell}>
                      <div style={styles.areaValue}>
                        <RulerIcon size={16} />
                        {crop.area.toLocaleString()} sq. ft
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
