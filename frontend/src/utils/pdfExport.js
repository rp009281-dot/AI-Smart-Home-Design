import { jsPDF } from 'jspdf';

export function generateDesignReportPDF({ design, plannerInput }) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header Bar
  doc.setFillColor(30, 64, 175); // Brand navy-blue
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('AI SMART HOME DESIGN SPECIFICATION REPORT', 14, 13);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on ${new Date().toLocaleDateString()} | Architectural AI Design Engine v2.4`, 14, 21);

  y = 38;

  // Project Summary
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(`Design Tier: ${design.title} (${design.qualityTier} Grade)`, 14, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(design.description, 14, y, { maxWidth: pageWidth - 28 });
  y += 14;

  // Key Statistics Box
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, y, pageWidth - 28, 26, 3, 3, 'F');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);

  const col1 = 20;
  const col2 = 65;
  const col3 = 115;
  const col4 = 160;

  doc.text('ESTIMATED COST', col1, y + 8);
  doc.text('BUILT-UP AREA', col2, y + 8);
  doc.text('ENERGY SCORE', col3, y + 8);
  doc.text('VASTU SCORE', col4, y + 8);

  doc.setFontSize(13);
  doc.setTextColor(37, 99, 235);
  doc.text(`Rs. ${(design.estimated_total_cost / 100000).toFixed(2)} Lakh`, col1, y + 18);
  doc.setTextColor(15, 23, 42);
  doc.text(`${design.total_built_up_area} sq.ft`, col2, y + 18);
  doc.setTextColor(16, 185, 129);
  doc.text(`${design.energy_score} / 100`, col3, y + 18);
  doc.setTextColor(99, 102, 241);
  doc.text(`${design.vastu_score} / 100`, col4, y + 18);

  y += 34;

  // Cost Breakdown Section
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Cost Estimation Breakdown', 14, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);

  const breakdown = design.cost_breakdown?.breakdown || {};
  const costRows = [
    ['Materials (Cement, Steel, Bricks, Sand)', `Rs. ${(breakdown.materialCost || 0).toLocaleString()}`],
    ['Skilled & Unskilled Labour', `Rs. ${(breakdown.labourCost || 0).toLocaleString()}`],
    ['Electrical Wiring & Fixtures', `Rs. ${(breakdown.electricalCost || 0).toLocaleString()}`],
    ['Plumbing & Sanitaryware', `Rs. ${(breakdown.plumbingCost || 0).toLocaleString()}`],
    ['Flooring, Tiling & Painting Finishes', `Rs. ${(breakdown.finishingCost || 0).toLocaleString()}`],
    ['Smart Home Automation & IoT Ecosystem', `Rs. ${(breakdown.smartHomeCost || 0).toLocaleString()}`],
    ['Contingency & Reserve Budget (2%)', `Rs. ${(breakdown.contingencyCost || 0).toLocaleString()}`]
  ];

  costRows.forEach(([item, amount]) => {
    doc.text(item, 16, y);
    doc.text(amount, pageWidth - 16, y, { align: 'right' });
    doc.setDrawColor(226, 232, 240);
    doc.line(16, y + 2, pageWidth - 16, y + 2);
    y += 6;
  });

  y += 6;

  // Space Utilization Section
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Plot & Spatial Efficiency', 14, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Total Plot Area: ${plannerInput?.plot_size_sqft || 1200} sq.ft | Ground Coverage: ${design.space_utilization_pct}%`, 16, y);
  y += 5;
  doc.text(`Carpet Area: ${design.carpet_area} sq.ft | Open Garden / Greenery: ${design.open_space_area} sq.ft`, 16, y);
  y += 10;

  // Material Highlights
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Recommended Core Materials', 14, y);
  y += 6;

  if (design.materials && design.materials.length > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    design.materials.slice(0, 5).forEach((mat) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${mat.category}: ${mat.material_name}`, 16, y);
      doc.setFont('helvetica', 'normal');
      doc.text(`(${mat.price_range}) - ${mat.reason.substring(0, 85)}...`, 16, y + 4);
      y += 9;
    });
  }

  y += 4;

  // Vastu & Legal Disclaimer
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'DISCLAIMER: This document is an AI-generated architectural planning brief intended for conceptualization and cost estimation purposes. Consult a licensed civil engineer or architect for structural construction drawings.',
    14,
    pageHeight - 10,
    { maxWidth: pageWidth - 28 }
  );

  doc.save(`SmartHome_Design_${design.tier_type}_${new Date().toISOString().slice(0, 10)}.pdf`);
}
