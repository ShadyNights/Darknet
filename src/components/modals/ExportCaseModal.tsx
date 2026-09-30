import React from 'react';
import { CaseFile } from '../../types';
import { DossierExportModal } from './DossierExportModal';

interface ExportCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseFile: CaseFile;
}

export const ExportCaseModal: React.FC<ExportCaseModalProps> = ({
  isOpen,
  onClose,
  caseFile,
}) => {
  return (
    <DossierExportModal
      isOpen={isOpen}
      onClose={onClose}
      caseFile={caseFile}
    />
  );
};
