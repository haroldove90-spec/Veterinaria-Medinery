/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register a clean font
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter',
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingBottom: 20,
    marginBottom: 30,
  },
  logo: {
    fontSize: 20,
    fontWeight: 700,
    color: '#4A5D4E',
  },
  documentTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#7F8C8D',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  infoBox: {
    gap: 4,
  },
  infoLabel: {
    fontSize: 8,
    color: '#7F8C8D',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 10,
    fontWeight: 400,
  },
  table: {
    display: 'flex',
    width: 'auto',
    marginBottom: 40,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 10,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  tableCol: {
    flex: 1,
  },
  tableCell: {
    fontSize: 9,
  },
  tableCellBold: {
    fontSize: 9,
    fontWeight: 700,
  },
  tableCellHeader: {
    fontSize: 8,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#7F8C8D',
  },
  summarySection: {
    marginLeft: 'auto',
    width: 200,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    paddingTop: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 9,
    color: '#7F8C8D',
  },
  summaryTotal: {
    fontSize: 16,
    fontWeight: 700,
    color: '#4A5D4E',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    borderTopWidth: 0.5,
    borderTopColor: '#eeeeee',
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBox: {
    width: 200,
    borderTopWidth: 1,
    borderTopColor: '#000000',
    paddingTop: 10,
    alignItems: 'center',
  },
  signatureText: {
    fontSize: 8,
    color: '#7F8C8D',
    textTransform: 'uppercase',
  }
});

interface DailyReportProps {
  date: string;
  data: {
    sales: number;
    consultations: number;
    surgeries: number;
    pharmacy: number;
    tax: number;
    total: number;
    items: Array<{ service: string, quantity: number, price: number, total: number }>;
  };
}

export const DailyReportPDF: React.FC<DailyReportProps> = ({ date, data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>VetCare Pro</Text>
          <Text style={{ fontSize: 9, color: '#7F8C8D', marginTop: 4 }}>Centro Veterinario & Urgencias</Text>
        </View>
        <View style={{ alignItems: 'right' }}>
          <Text style={styles.documentTitle}>Cierre de Caja Diario</Text>
          <Text style={{ fontSize: 10, marginTop: 4 }}>{date}</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Responsable</Text>
          <Text style={styles.infoValue}>Dr. Alejandro Pérez</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Sucursal</Text>
          <Text style={styles.infoValue}>Clínica Central</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>ID Reporte</Text>
          <Text style={styles.infoValue}>REP-2026-0512-01</Text>
        </View>
      </View>

      <View style={[styles.tableRow, styles.tableHeader]}>
        <View style={[styles.tableCol, { flex: 2 }]}><Text style={styles.tableCellHeader}>Servicio / Producto</Text></View>
        <View style={styles.tableCol}><Text style={[styles.tableCellHeader, { textAlign: 'center' }]}>Cant.</Text></View>
        <View style={styles.tableCol}><Text style={[styles.tableCellHeader, { textAlign: 'right' }]}>Unitario</Text></View>
        <View style={styles.tableCol}><Text style={[styles.tableCellHeader, { textAlign: 'right' }]}>Subtotal</Text></View>
      </View>

      {data.items.map((item, idx) => (
        <View key={idx} style={styles.tableRow}>
          <View style={[styles.tableCol, { flex: 2 }]}><Text style={styles.tableCellBold}>{item.service}</Text></View>
          <View style={styles.tableCol}><Text style={[styles.tableCell, { textAlign: 'center' }]}>{item.quantity}</Text></View>
          <View style={styles.tableCol}><Text style={[styles.tableCell, { textAlign: 'right' }]}>${item.price.toFixed(2)}</Text></View>
          <View style={styles.tableCol}><Text style={[styles.tableCellBold, { textAlign: 'right' }]}>${item.total.toFixed(2)}</Text></View>
        </View>
      ))}

      <View style={styles.summarySection}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.tableCell}>${(data.total / 1.16).toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>IVA (16%)</Text>
          <Text style={styles.tableCell}>${(data.total * 0.16 / 1.16).toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, { marginTop: 10 }]}>
          <Text style={[styles.summaryLabel, { fontWeight: 700, color: '#1a1a1a' }]}>TOTAL NETO</Text>
          <Text style={styles.summaryTotal}>${data.total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.signatureBox}>
          <Text style={styles.signatureText}>Firma del Médico Responsable</Text>
        </View>
        <View style={styles.signatureBox}>
          <Text style={styles.signatureText}>Sello de la Sucursal</Text>
        </View>
      </View>
      
      <Text 
        style={{ position: 'absolute', bottom: 20, left: 40, fontSize: 7, color: '#A8B5A2' }}
        onRender={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages} • Generado por VetCare Pro Management System`}
      />
    </Page>
  </Document>
);
