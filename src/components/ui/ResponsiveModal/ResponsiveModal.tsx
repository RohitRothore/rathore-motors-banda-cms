'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

import { isMobile } from '@/constant/COMMON';
import { BottomSheetProps } from '../BottomSheet/BottomSheet';
import { ModalProps } from '../Modal/Modal';

const DynamicBottomSheet = dynamic(() => import('@/components/ui/BottomSheet').then((mod) => mod.BottomSheet));
const DynamicModal = dynamic(() => import('@/components/ui/Modal').then((mod) => mod.Modal));

interface ResponsiveModalProps {
  bottomSheetProps: Omit<BottomSheetProps, 'cancelHandler' | 'isOpen' | 'children'>;
  cancelHandler: () => void;
  children: ReactNode;
  isOpen: boolean;
  modalProps: Omit<ModalProps, 'cancelHandler' | 'isOpen' | 'children'>;
}

export default function ResponsiveModal({
  bottomSheetProps,
  cancelHandler,
  children,
  isOpen,
  modalProps,
}: ResponsiveModalProps) {

  return isMobile ? (
    <DynamicBottomSheet {...bottomSheetProps} cancelHandler={cancelHandler} isOpen={isOpen}>
      {children}
    </DynamicBottomSheet>
  ) : (
    <DynamicModal {...modalProps} cancelHandler={cancelHandler} isOpen={isOpen}>
      {children}
    </DynamicModal>
  );
}
