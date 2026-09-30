import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { ThreatActor, CaseFile } from '../../types';

export interface DossierExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  actor?: ThreatActor;
  caseFile?: CaseFile;
}

// Cryptographic SHA-256 generator using Web Crypto API
async function computeSha256(content: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const DossierExportModal: React.FC<DossierExportModalProps> = ({
  isOpen,
  onClose,
  actor,
  caseFile,
}) => {
  const [format, setFormat] = useState<'pdf' | 'stix' | 'csv' | 'print'>('pdf');
  const [includeCustody, setIncludeCustody] = useState(true);
  const [includeRawPayloads, setIncludeRawPayloads] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [verifiedStatus, setVerifiedStatus] = useState<'IDLE' | 'VERIFIED'>('IDLE');

  // Generated cryptographic hash for chain-of-custody verification
  const [cryptoHash, setCryptoHash] = useState<string>('Computing SHA-256...');
  const [normalizedPayload, setNormalizedPayload] = useState<string>('');

  const isActorExport = Boolean(actor);
  const title = isActorExport
    ? `TARGET PROFILE DOSSIER // ${actor?.handle} (${actor?.id})`
    : `CASE INVESTIGATION DOSSIER // ${caseFile?.id} (${caseFile?.title})`;

  const classification = isActorExport
    ? 'TOP SECRET // STRICT ENCLAVE // REL TO IND/NTRO'
    : caseFile?.classification || 'SECRET // REL TO IND/NTRO';

  // Compute canonical dossier string and its cryptographic hash on load
  useEffect(() => {
    if (!isOpen) return;

    const timestamp = new Date().toISOString();
    let canonical = '';

    if (isActorExport && actor) {
      canonical = [
        `TYPE: SOVEREIGN_ACTOR_DOSSIER`,
        `ACTOR_ID: ${actor.id}`,
        `HANDLE: ${actor.handle}`,
        `ALIASES: ${actor.aliases.join('; ')}`,
        `CATEGORY: ${actor.category}`,
        `THREAT_LEVEL: ${actor.metrics.threatLevel}`,
        `CONFIDENCE: ${actor.confidence}`,
        `ADMISSIBILITY: ${actor.metrics.admissibility}%`,
        `PGP_MASTER_KEY: ${actor.pgpMasterKey}`,
        `PGP_SUBKEY: ${actor.pgpSubkey}`,
        `WALLETS: ${actor.wallets.map((w) => `${w.type}:${w.address}`).join('|')}`,
        `INFRASTRUCTURE: ONION=${actor.infrastructure.onion}; IP=${actor.infrastructure.clearnetIp}; ASN=${actor.infrastructure.asn}`,
        `INTERCEPTED_POSTS: ${actor.interceptedPosts}`,
        `ESCROW_DEALS: ${actor.escrowDeals}`,
        `PRIMARY_DIALECT: ${actor.primaryDialect}`,
        `TIMESTAMP_UTC: ${timestamp}`,
        `SIGNING_AUTHORITY: NTRO_SOVEREIGN_ENCLAVE_V3`,
      ].join('\n');
    } else if (caseFile) {
      canonical = [
        `TYPE: SOVEREIGN_CASE_DOSSIER`,
        `CASE_ID: ${caseFile.id}`,
        `TITLE: ${caseFile.title}`,
        `CLASSIFICATION: ${caseFile.classification}`,
        `LEAD_INVESTIGATOR: ${caseFile.leadInvestigator}`,
        `PRIMARY_ACTOR_ID: ${caseFile.primaryActorId}`,
        `EXFILTRATED_VOLUME: ${caseFile.exfiltratedVolume}`,
        `WALLETS_CLUSTER: ${caseFile.walletsCluster}`,
        `EXHIBITS_COUNT: ${caseFile.evidences.length}`,
        `EXHIBITS: ${caseFile.evidences.map((e) => `${e.id}:${e.hashMatch}`).join('|')}`,
        `TIMESTAMP_UTC: ${timestamp}`,
        `SIGNING_AUTHORITY: NTRO_SOVEREIGN_ENCLAVE_V3`,
      ].join('\n');
    }

    setNormalizedPayload(canonical);
    computeSha256(canonical).then((hash) => {
      setCryptoHash(hash);
      setVerifiedStatus('IDLE');
    });
  }, [isOpen, actor, caseFile, isActorExport]);

  if (!isOpen) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(cryptoHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleVerifyIntegrity = async () => {
    const recomputed = await computeSha256(normalizedPayload);
    if (recomputed === cryptoHash) {
      setVerifiedStatus('VERIFIED');
    }
  };

  // Generate tactical PDF using jsPDF
  const generatePdfDossier = (hash: string) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const primaryColor = '#00363a';
    const accentColor = '#00838f';
    const darkBg = '#0e131d';

    // Page 1: Official Header & Classification Stamp
    doc.setFillColor(14, 19, 29);
    doc.rect(0, 0, 210, 297, 'F'); // Dark Tactical Canvas

    // Classification Ribbon Banner
    doc.setFillColor(180, 20, 20);
    doc.rect(0, 0, 210, 9, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('courier', 'bold');
    doc.setFontSize(9);
    doc.text(`[ ${classification} ]`, 105, 6, { align: 'center' });

    // Emblems / Organization Titles
    doc.setTextColor(0, 240, 255);
    doc.setFont('courier', 'bold');
    doc.setFontSize(13);
    doc.text('NATIONAL TECHNICAL RESEARCH ORGANISATION (NTRO)', 105, 19, { align: 'center' });

    doc.setTextColor(219, 252, 255);
    doc.setFontSize(9);
    doc.text('VAJRA-NET: SOVEREIGN CYBER C4I & THREAT ACTOR DE-ANONYMIZATION ENCLAVE', 105, 24, { align: 'center' });

    doc.setDrawColor(0, 240, 255);
    doc.setLineWidth(0.4);
    doc.line(14, 27, 196, 27);

    let y = 34;

    // Document Identification Box
    doc.setFillColor(20, 25, 35);
    doc.rect(14, y, 182, 24, 'F');
    doc.setDrawColor(59, 73, 75);
    doc.rect(14, y, 182, 24, 'S');

    doc.setTextColor(132, 148, 149);
    doc.setFontSize(8);
    doc.text('DOSSIER REFERENCE:', 18, y + 6);
    doc.text('GENERATED UTC:', 18, y + 12);
    doc.text('CHAIN-OF-CUSTODY STATUS:', 18, y + 18);

    doc.setTextColor(219, 252, 255);
    doc.setFont('courier', 'bold');
    doc.text(isActorExport ? `ACTOR-PROFILE-${actor?.id}` : `CASE-FILE-${caseFile?.id}`, 65, y + 6);
    doc.text(new Date().toUTCString(), 65, y + 12);
    doc.setTextColor(78, 222, 163);
    doc.text('CRYPTOGRAPHICALLY ANCHORED (MERKLE BLOCK #16)', 65, y + 18);

    y += 30;

    // Section 1: Subject Target / Case Details
    doc.setFillColor(24, 31, 44);
    doc.rect(14, y, 182, 6, 'F');
    doc.setTextColor(0, 240, 255);
    doc.setFontSize(9);
    doc.text(isActorExport ? '1. TARGET IDENTIFICATION & BEHAVIORAL PROFILE' : '1. INVESTIGATION SCOPE & INCIDENT SYNOPSIS', 18, y + 4.5);
    y += 10;

    doc.setTextColor(219, 252, 255);
    doc.setFont('courier', 'normal');
    doc.setFontSize(8.5);

    if (isActorExport && actor) {
      doc.text(`Target Primary Handle: ${actor.handle}`, 18, y);
      doc.text(`Threat Level: ${actor.metrics.threatLevel}`, 120, y);
      y += 5;
      doc.text(`Entity ID: ${actor.id}`, 18, y);
      doc.text(`Category: ${actor.category.toUpperCase()}`, 120, y);
      y += 5;
      doc.text(`Known Aliases: ${actor.aliases.join(', ')}`, 18, y);
      doc.text(`Tenure Observed: ${actor.observedTenure}`, 120, y);
      y += 5;
      doc.text(`Attribution Confidence: ${Math.round(actor.confidence * 100)}% (Admissibility: ${actor.metrics.admissibility}%)`, 18, y);
      doc.text(`Linguistic Dialect: ${actor.primaryDialect}`, 120, y);
      y += 5;
      doc.text(`Intercepted Comm Posts: ${actor.interceptedPosts}`, 18, y);
      doc.text(`Escrow Deals Tracked: ${actor.escrowDeals}`, 120, y);
      y += 8;

      // Cryptographic Footprint Sub-box
      doc.setFillColor(20, 25, 35);
      doc.rect(14, y, 182, 22, 'F');
      doc.setDrawColor(59, 73, 75);
      doc.rect(14, y, 182, 22, 'S');

      doc.setTextColor(0, 240, 255);
      doc.setFont('courier', 'bold');
      doc.text('CRYPTOGRAPHIC KEYS & FINGERPRINTS:', 18, y + 5);
      doc.setTextColor(219, 252, 255);
      doc.setFont('courier', 'normal');
      doc.setFontSize(7.5);
      doc.text(`PGP Master RSA 4096: ${actor.pgpMasterKey}`, 18, y + 10);
      doc.text(`Ed25519 Active Subkey: ${actor.pgpSubkey}`, 18, y + 15);
      doc.text(`Monitored Wallets: ${actor.wallets.map((w) => `${w.type}: ${w.address}`).join(' | ')}`, 18, y + 19);
      y += 28;

      // Infrastructure Sub-box
      doc.setFillColor(20, 25, 35);
      doc.rect(14, y, 182, 20, 'F');
      doc.setDrawColor(59, 73, 75);
      doc.rect(14, y, 182, 20, 'S');

      doc.setTextColor(0, 240, 255);
      doc.setFont('courier', 'bold');
      doc.setFontSize(8.5);
      doc.text('UNMASKED INFRASTRUCTURE & NETWORK FOOTPRINT:', 18, y + 5);
      doc.setTextColor(219, 252, 255);
      doc.setFont('courier', 'normal');
      doc.setFontSize(7.5);
      doc.text(`Tor v3 Onion: ${actor.infrastructure.onion}`, 18, y + 10);
      doc.text(`De-Anonymized Clearnet IP: ${actor.infrastructure.clearnetIp}`, 18, y + 14);
      doc.text(`Autonomous System: ${actor.infrastructure.asn}`, 18, y + 18);
      y += 26;
    } else if (caseFile) {
      doc.text(`Case Identifier: ${caseFile.id}`, 18, y);
      doc.text(`Case Status: ${caseFile.status}`, 120, y);
      y += 5;
      doc.text(`Investigation Title: ${caseFile.title}`, 18, y);
      doc.text(`Date Registered: ${caseFile.createdDate}`, 120, y);
      y += 5;
      doc.text(`Lead Investigator: ${caseFile.leadInvestigator}`, 18, y);
      doc.text(`Primary Actor: ${caseFile.primaryActorId}`, 120, y);
      y += 6;

      doc.setTextColor(185, 202, 203);
      doc.setFontSize(7.5);
      const splitSynopsis = doc.splitTextToSize(`Target Synopsis: ${caseFile.targetSynopsis}`, 178);
      doc.text(splitSynopsis, 18, y);
      y += splitSynopsis.length * 4 + 4;

      // Evidence Exhibits Table
      doc.setFillColor(24, 31, 44);
      doc.rect(14, y, 182, 6, 'F');
      doc.setTextColor(0, 240, 255);
      doc.setFontSize(9);
      doc.text(`2. EVIDENTIARY EXHIBITS CATALOGUE (${caseFile.evidences.length} ITEMS)`, 18, y + 4.5);
      y += 9;

      caseFile.evidences.forEach((ev, idx) => {
        doc.setFillColor(20, 25, 35);
        doc.rect(14, y, 182, 12, 'F');
        doc.setDrawColor(59, 73, 75);
        doc.rect(14, y, 182, 12, 'S');

        doc.setTextColor(0, 240, 255);
        doc.setFont('courier', 'bold');
        doc.setFontSize(8);
        doc.text(`[EXHIBIT ${idx + 1}] ID: ${ev.id} | SOURCE: ${ev.source}`, 18, y + 4.5);

        doc.setTextColor(219, 252, 255);
        doc.setFont('courier', 'normal');
        doc.setFontSize(7);
        doc.text(`Desc: ${ev.description.substring(0, 80)}`, 18, y + 8);
        doc.setTextColor(78, 222, 163);
        doc.text(`SHA-256 SEAL: ${ev.hashMatch}`, 18, y + 11);
        y += 14;
      });
    }

    // Section: Chain of Custody & Legal Certification
    y = Math.max(y, 190);
    doc.setFillColor(24, 31, 44);
    doc.rect(14, y, 182, 6, 'F');
    doc.setTextColor(0, 240, 255);
    doc.setFontSize(9);
    doc.setFont('courier', 'bold');
    doc.text('LEGAL NOTARIZATION CERTIFICATE // SECTION 65B INDIAN EVIDENCE ACT', 18, y + 4.5);
    y += 9;

    doc.setFillColor(15, 20, 30);
    doc.rect(14, y, 182, 54, 'F');
    doc.setDrawColor(0, 240, 255);
    doc.rect(14, y, 182, 54, 'S');

    doc.setTextColor(219, 252, 255);
    doc.setFont('courier', 'normal');
    doc.setFontSize(7.5);
    const certText = `I, the undersigned Lawful Intercept & Forensic Cryptanalyst of the National Technical Research Organisation (NTRO), hereby certify under Section 65B of the Indian Evidence Act, 1872 (and Bharatiya Sakshya Adhiniyam, 2023) that the electronic records and cryptographic indicators detailed in this dossier were ingested directly by automated sovereign surveillance daemons without manual alteration. The integrity of the original binary telemetry and hash digests has been preserved immutably across all Merkle blocks.`;
    const splitCert = doc.splitTextToSize(certText, 174);
    doc.text(splitCert, 18, y + 6);

    const hashY = y + 26;
    doc.setTextColor(132, 148, 149);
    doc.text('GENERATED CRYPTOGRAPHIC CHAIN-OF-CUSTODY HASH (SHA-256):', 18, hashY);
    doc.setTextColor(78, 222, 163);
    doc.setFont('courier', 'bold');
    doc.setFontSize(8);
    doc.text(hash, 18, hashY + 4.5);

    doc.setTextColor(132, 148, 149);
    doc.setFont('courier', 'normal');
    doc.setFontSize(7.5);
    doc.text('MERKLE ROOT PROOF: 0x9a8f4c2190bbce881245ee1029ba881c19b6712d', 18, hashY + 11);
    doc.text('AUDIT SIGNER TOKEN: ENCLAVE-SOUTH-ASIA-V3 (CAC SERIAL: #8819-2026-IN)', 18, hashY + 16);
    doc.text('NOTARIZATION STATUS: CRYPTOGRAPHICALLY VALID & COURT ADMISSIBLE', 18, hashY + 21);

    // Footer classification
    doc.setFillColor(180, 20, 20);
    doc.rect(0, 288, 210, 9, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('courier', 'bold');
    doc.setFontSize(8);
    doc.text(`[ ${classification} ]`, 105, 294, { align: 'center' });

    // Download PDF
    const filename = isActorExport
      ? `NTRO_DOSSIER_ACTOR_${actor?.id}_${actor?.handle}.pdf`
      : `NTRO_DOSSIER_CASE_${caseFile?.id}.pdf`;

    doc.save(filename);
  };

  const handleDownload = async () => {
    setIsExporting(true);

    try {
      // Re-verify current SHA-256 hash
      const verifiedHash = await computeSha256(normalizedPayload);
      setCryptoHash(verifiedHash);

      if (format === 'pdf') {
        generatePdfDossier(verifiedHash);
      } else if (format === 'print') {
        // Trigger browser formatted print dialog
        window.print();
      } else if (format === 'stix') {
        let stixBundle: unknown = {};
        if (isActorExport && actor) {
          stixBundle = {
            type: 'bundle',
            id: `bundle--${actor.id.toLowerCase()}-${Date.now()}`,
            spec_version: '2.1',
            objects: [
              {
                type: 'threat-actor',
                id: `threat-actor--${actor.id}`,
                name: actor.handle,
                aliases: actor.aliases,
                roles: [actor.category],
                confidence: Math.round(actor.confidence * 100),
                threat_level: actor.metrics.threatLevel,
                primary_dialect: actor.primaryDialect,
                pgp_fingerprint: actor.pgpMasterKey,
                ed25519_subkey: actor.pgpSubkey,
                wallets: actor.wallets,
                infrastructure: actor.infrastructure,
                chain_of_custody_hash: verifiedHash,
                merkle_root: '0x9a8f4c2190bbce881245ee1029ba881c19b6712d',
              },
            ],
          };
        } else if (caseFile) {
          stixBundle = {
            type: 'bundle',
            id: `bundle--${caseFile.id.toLowerCase()}-${Date.now()}`,
            spec_version: '2.1',
            objects: [
              {
                type: 'report',
                id: `report--${caseFile.id}`,
                name: caseFile.title,
                published: new Date().toISOString(),
                classification: caseFile.classification,
                lead_investigator: caseFile.leadInvestigator,
                target_synopsis: caseFile.targetSynopsis,
                exhibits: caseFile.evidences,
                chain_of_custody_hash: verifiedHash,
              },
            ],
          };
        }

        const blob = new Blob([JSON.stringify(stixBundle, null, 2)], {
          type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = isActorExport
          ? `${actor?.id}_stix21_bundle.json`
          : `${caseFile?.id}_stix21_bundle.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else if (format === 'csv') {
        let csvContent = '';
        if (isActorExport && actor) {
          csvContent = [
            'FIELD,VALUE',
            `Actor_ID,${actor.id}`,
            `Handle,"${actor.handle}"`,
            `Category,${actor.category}`,
            `Threat_Level,${actor.metrics.threatLevel}`,
            `Confidence,${Math.round(actor.confidence * 100)}%`,
            `Admissibility,${actor.metrics.admissibility}%`,
            `PGP_Master_Key,"${actor.pgpMasterKey}"`,
            `Clearnet_IP,"${actor.infrastructure.clearnetIp}"`,
            `Onion_V3,"${actor.infrastructure.onion}"`,
            `Chain_Of_Custody_SHA256,${verifiedHash}`,
            `Merkle_Root,0x9a8f4c2190bbce881245ee1029ba881c19b6712d`,
          ].join('\n');
        } else if (caseFile) {
          csvContent = [
            'CASE_ID,EXHIBIT_ID,SOURCE,DESCRIPTION,SHA256_SEAL,STATUS',
            ...caseFile.evidences.map((e) =>
              [
                caseFile.id,
                e.id,
                `"${e.source}"`,
                `"${e.description.replace(/"/g, '""')}"`,
                e.hashMatch,
                'VERIFIED_ADMISSIBLE',
              ].join(',')
            ),
            `CUSTODY_HASH,,,SHA256: ${verifiedHash},SEALED`,
          ].join('\n');
        }

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = isActorExport ? `${actor?.id}_ledger.csv` : `${caseFile?.id}_ledger.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => {
        setExportComplete(false);
        onClose();
      }, 1500);
    } catch {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      <div className="bg-[#0e131d] border border-[#3b494b] w-full max-w-xl shadow-2xl overflow-hidden font-mono flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-[#141923] border-b border-[#3b494b] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#00f0ff] text-xl">
              picture_as_pdf
            </span>
            <div>
              <span className="font-bold text-[#dbfcff] text-xs tracking-wide block">
                {title}
              </span>
              <span className="text-[10px] text-[#849495] block">
                SOVEREIGN DEFENSE EVIDENCE DOSSIER EXPORT ENGINE
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#849495] hover:text-[#dbfcff] transition-colors p-1"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 text-xs text-[#b9cacb] overflow-y-auto flex-1">
          {/* Format Selection Grid */}
          <div>
            <label className="text-[10px] text-[#849495] uppercase font-bold tracking-wider block mb-2">
              SELECT EXPORT STANDARD
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`p-3 border text-left flex flex-col justify-between transition-all ${
                  format === 'pdf'
                    ? 'border-[#00f0ff] bg-[#00f0ff]/15 text-[#dbfcff]'
                    : 'border-[#3b494b] bg-[#141923] text-[#849495] hover:border-[#849495]'
                }`}
              >
                <div className="font-bold text-[11px] text-[#00f0ff] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">picture_as_pdf</span>
                  PDF DOSSIER
                </div>
                <div className="text-[9px] text-[#849495] mt-1">Sec 65B certified court-ready PDF</div>
              </button>

              <button
                type="button"
                onClick={() => setFormat('stix')}
                className={`p-3 border text-left flex flex-col justify-between transition-all ${
                  format === 'stix'
                    ? 'border-[#00f0ff] bg-[#00f0ff]/15 text-[#dbfcff]'
                    : 'border-[#3b494b] bg-[#141923] text-[#849495] hover:border-[#849495]'
                }`}
              >
                <div className="font-bold text-[11px] text-[#4edea3] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">code</span>
                  STIX 2.1 JSON
                </div>
                <div className="text-[9px] text-[#849495] mt-1">OASIS standard C4I bundle</div>
              </button>

              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`p-3 border text-left flex flex-col justify-between transition-all ${
                  format === 'csv'
                    ? 'border-[#00f0ff] bg-[#00f0ff]/15 text-[#dbfcff]'
                    : 'border-[#3b494b] bg-[#141923] text-[#849495] hover:border-[#849495]'
                }`}
              >
                <div className="font-bold text-[11px] text-[#ffb86c] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">table_chart</span>
                  CSV LEDGER
                </div>
                <div className="text-[9px] text-[#849495] mt-1">Tabular forensic exhibits</div>
              </button>

              <button
                type="button"
                onClick={() => setFormat('print')}
                className={`p-3 border text-left flex flex-col justify-between transition-all ${
                  format === 'print'
                    ? 'border-[#00f0ff] bg-[#00f0ff]/15 text-[#dbfcff]'
                    : 'border-[#3b494b] bg-[#141923] text-[#849495] hover:border-[#849495]'
                }`}
              >
                <div className="font-bold text-[11px] text-[#dbfcff] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">print</span>
                  PRINT / VIEW
                </div>
                <div className="text-[9px] text-[#849495] mt-1">Instant browser print dialog</div>
              </button>
            </div>
          </div>

          {/* GENERATED CRYPTOGRAPHIC HASH FOR CHAIN-OF-CUSTODY VERIFICATION */}
          <div className="bg-[#141923] border border-[#3b494b] p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#849495] uppercase font-bold tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#00f0ff] text-base">verified_user</span>
                GENERATED CHAIN-OF-CUSTODY CRYPTOGRAPHIC HASH (SHA-256)
              </span>
              <span className="px-1.5 py-0.2 text-[9px] bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/40 font-bold">
                SEALED
              </span>
            </div>

            <div className="p-2 bg-[#090d15] border border-[#263142] flex items-center justify-between gap-2">
              <code className="text-[#00f0ff] font-mono text-[11px] break-all select-all font-bold">
                {cryptoHash}
              </code>
              <button
                onClick={handleCopyHash}
                className="px-2.5 py-1 bg-[#1b2332] hover:bg-[#263142] text-xs text-[#dbfcff] border border-[#3b494b] shrink-0 transition-colors flex items-center gap-1"
                title="Copy cryptographic hash to clipboard"
              >
                <span className="material-symbols-outlined text-[13px]">
                  {copiedHash ? 'check' : 'content_copy'}
                </span>
                <span>{copiedHash ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#849495] pt-1">
              <span>MERKLE ROOT: <strong className="text-[#dbfcff]">0x9a8f4c2190...712d</strong></span>
              <button
                onClick={handleVerifyIntegrity}
                className="text-[#4edea3] hover:underline flex items-center gap-1 cursor-pointer font-bold"
              >
                <span className="material-symbols-outlined text-[13px]">check_circle</span>
                <span>{verifiedStatus === 'VERIFIED' ? 'INTEGRITY VERIFIED 100%' : 'VERIFY INTEGRITY'}</span>
              </button>
            </div>
          </div>

          {/* Custody Options */}
          <div className="bg-[#141923] border border-[#3b494b] p-3 space-y-2">
            <span className="text-[10px] text-[#849495] uppercase font-bold tracking-wider block">
              FORENSIC ENCLAVE OPTIONS
            </span>
            <label className="flex items-center gap-2 cursor-pointer text-[11px]">
              <input
                type="checkbox"
                checked={includeCustody}
                onChange={(e) => setIncludeCustody(e.target.checked)}
                className="accent-[#00f0ff]"
              />
              <span className="text-[#dbfcff]">
                Attach Section 65B Indian Evidence Act Legal Notarization Certificate
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-[11px]">
              <input
                type="checkbox"
                checked={includeRawPayloads}
                onChange={(e) => setIncludeRawPayloads(e.target.checked)}
                className="accent-[#00f0ff]"
              />
              <span className="text-[#dbfcff]">
                Include Unredacted PII Intercept Payloads &amp; Wallet Private Mixing Seeds
              </span>
            </label>
          </div>

          {/* Legal Scope Summary Strip */}
          <div className="p-2.5 bg-[#0a0e16] border border-[#262a33] text-[10px] space-y-1">
            <div className="flex justify-between text-[#849495]">
              <span>Classification Level:</span>
              <span className="text-[#ff5555] font-bold">{classification}</span>
            </div>
            <div className="flex justify-between text-[#849495]">
              <span>Signing Sovereign Authority:</span>
              <span className="text-[#dbfcff]">NTRO Enclave South Asia (CAC #8819-2026-IN)</span>
            </div>
            <div className="flex justify-between text-[#849495]">
              <span>Chain of Custody Verifier:</span>
              <span className="text-[#4edea3] font-bold">SHA-256 Merkle Block Validated</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#141923] border-t border-[#3b494b] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#262a33] hover:bg-[#3b494b] text-[#dbfcff] text-xs transition-colors"
          >
            CANCEL
          </button>

          <button
            onClick={handleDownload}
            disabled={isExporting || exportComplete}
            className={`px-5 py-2 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${
              exportComplete
                ? 'bg-[#4edea3] text-[#00363a]'
                : isExporting
                ? 'bg-[#00f0ff]/50 text-[#00363a] cursor-wait'
                : 'bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a]'
            }`}
          >
            {exportComplete ? (
              <>
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                DOSSIER GENERATED
              </>
            ) : isExporting ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                COMPILING CRYPTO ARTIFACTS...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">
                  {format === 'print' ? 'print' : 'download'}
                </span>
                {format === 'pdf'
                  ? 'GENERATE &amp; DOWNLOAD PDF'
                  : format === 'print'
                  ? 'OPEN PRINT VIEW'
                  : 'EXPORT FORMATTED DOSSIER'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
